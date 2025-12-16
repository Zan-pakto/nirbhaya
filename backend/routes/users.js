const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/users/trusted-contacts
// @desc    Add trusted contact
// @access  Private
router.post(
  '/trusted-contacts',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('email').optional().isEmail().withMessage('Valid email required'),
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

      const { name, phone, email } = req.body;
      const user = await User.findById(req.user._id);

      user.trustedContacts.push({ name, phone, email });
      await user.save();

      res.json({
        success: true,
        data: user.trustedContacts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// @route   DELETE /api/users/trusted-contacts/:id
// @desc    Remove trusted contact
// @access  Private
router.delete('/trusted-contacts/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.trustedContacts = user.trustedContacts.filter(
      (contact) => contact._id.toString() !== req.params.id
    );
    await user.save();

    res.json({
      success: true,
      data: user.trustedContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

