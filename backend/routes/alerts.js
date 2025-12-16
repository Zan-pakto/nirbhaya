const express = require('express');
const { body, validationResult } = require('express-validator');
const Alert = require('../models/Alert');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// @route   POST /api/alerts
// @desc    Create a new alert
// @access  Private
router.post(
  '/',
  protect,
  [
    body('type').isIn(['sos', 'silent']).withMessage('Invalid alert type'),
    body('location.latitude').isFloat().withMessage('Valid latitude required'),
    body('location.longitude').isFloat().withMessage('Valid longitude required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { type, location } = req.body;
      const user = await User.findById(req.user._id);

      // Create alert
      const alert = await Alert.create({
        user: req.user._id,
        type,
        location,
      });

      // Notify trusted contacts
      if (user.trustedContacts && user.trustedContacts.length > 0) {
        const notifiedContacts = [];
        
        for (const contact of user.trustedContacts) {
          if (contact.email) {
            try {
              const emailHtml = `
                <h2>Emergency Alert from ${user.name}</h2>
                <p><strong>Alert Type:</strong> ${type.toUpperCase()}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Location:</strong></p>
                <p>Latitude: ${location.latitude}</p>
                <p>Longitude: ${location.longitude}</p>
                ${location.address ? `<p>Address: ${location.address}</p>` : ''}
                <p><a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" target="_blank">View on Google Maps</a></p>
                <p>Please check on ${user.name} immediately!</p>
              `;

              await sendEmail({
                email: contact.email,
                subject: `🚨 Emergency Alert from ${user.name}`,
                html: emailHtml,
              });

              notifiedContacts.push({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                notifiedAt: new Date(),
              });
            } catch (error) {
              console.error(`Failed to notify ${contact.email}:`, error);
            }
          }
        }

        alert.notifiedContacts = notifiedContacts;
        await alert.save();
      }

      res.status(201).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// @route   GET /api/alerts/my-alerts
// @desc    Get current user's alerts
// @access  Private
router.get('/my-alerts', protect, async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone');

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/alerts
// @desc    Get all alerts (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone')
      .populate('resolvedBy', 'name email');

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/alerts/:id/resolve
// @desc    Resolve an alert (Admin only)
// @access  Private/Admin
router.put(
  '/:id/resolve',
  protect,
  authorize('admin'),
  [
    body('status').isIn(['resolved', 'false_alarm']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { status, notes } = req.body;

      const alert = await Alert.findById(req.params.id);
      if (!alert) {
        return res.status(404).json({
          success: false,
          message: 'Alert not found',
        });
      }

      alert.status = status;
      alert.resolvedBy = req.user._id;
      alert.resolvedAt = new Date();
      if (notes) alert.notes = notes;

      await alert.save();

      res.json({
        success: true,
        data: alert,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;

