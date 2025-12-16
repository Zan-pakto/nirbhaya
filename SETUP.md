# Setup Instructions

## Quick Start Guide

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nirbhaya
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

**For Gmail Setup:**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to App Passwords
4. Generate a new app password
5. Use that password in `EMAIL_PASS`

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

(Optional) Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 3. MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB locally
- Make sure it's running on `mongodb://localhost:27017`

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get your connection string
- Update `MONGODB_URI` in backend `.env` file

### 4. Create Admin User

After starting the backend, you can create an admin user by:

1. Register a normal user through the UI
2. In MongoDB, update the user document:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass to manually change the role field.

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Default Routes

- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main safety dashboard
- `/profile` - User profile and trusted contacts
- `/admin` - Admin dashboard (admin only)

## Testing

1. Register a new user
2. Add trusted contacts in the Profile page
3. Test SOS alert from Dashboard
4. Check email inbox for notifications
5. Login as admin to view alerts

