# Nirbhaya - Safety Platform

A comprehensive web-based safety platform designed to empower women with independent, instant, and discreet emergency action features.

## Features

### Core Safety Features
- **One-tap SOS Alert**: Send emergency alerts with live location to trusted contacts
- **Silent Emergency Mode**: Discreet alerts without sound for sensitive situations
- **Real-time Location Sharing**: Continuous location updates during emergencies
- **Fake Incoming Call**: Digital escape mechanism for unsafe social situations
- **Trusted Contacts Management**: Add and manage emergency contacts

### Admin Features
- **Alert Dashboard**: Monitor all emergency alerts in real-time
- **Alert Resolution**: Mark alerts as resolved or false alarms
- **User Management**: View user information and alert history
- **Location Tracking**: View alert locations on Google Maps

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Hot Toast** for notifications

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nirbhaya
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Usage

### User Registration
1. Navigate to the registration page
2. Fill in your details (name, email, password, phone)
3. After registration, you'll be redirected to the dashboard

### Adding Trusted Contacts
1. Go to Profile page
2. Click "Add Contact"
3. Enter contact details (name, phone, email)
4. Save the contact

### Sending Emergency Alerts
1. **SOS Alert**: Click the red "SOS ALERT" button on the dashboard
2. **Silent Alert**: Click the orange "SILENT ALERT" button for discreet alerts
3. Both alerts will:
   - Capture your current location
   - Send email notifications to all trusted contacts
   - Start continuous location tracking

### Fake Call Feature
1. Click "Fake Incoming Call" on the dashboard
2. A fake call interface will appear
3. Use this to create an excuse to leave unsafe situations

### Admin Dashboard
1. Login with an admin account
2. View all alerts in real-time
3. Resolve alerts and add notes
4. Monitor active emergencies

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Alerts
- `POST /api/alerts` - Create a new alert
- `GET /api/alerts/my-alerts` - Get user's alerts
- `GET /api/alerts` - Get all alerts (Admin only)
- `PUT /api/alerts/:id/resolve` - Resolve an alert (Admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/trusted-contacts` - Add trusted contact
- `DELETE /api/users/trusted-contacts/:id` - Remove trusted contact

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Role-based access control (Admin/User)
- Secure API communication

## Email Configuration

To enable email notifications, configure your email service in the `.env` file:

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## Future Enhancements

- SMS notifications via Twilio
- Push notifications
- Mobile app version
- Integration with local authorities
- Safety tips and resources
- Community features

## License

This project is open source and available for use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the repository.

