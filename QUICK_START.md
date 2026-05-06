# EVIDMS Quick Start Guide

## 🚀 Get Everything Running

### Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed (local) OR MongoDB Atlas account
- ✅ Sendinblue account (for OTP emails)

---

## Step 1: Frontend (Already Running ✅)

The frontend is already running at **http://localhost:3000**

If you need to restart it:
```bash
npm start
```

---

## Step 2: Backend Setup

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `backend/.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/evidms
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/evidms

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Email Configuration (Sendinblue)
SENDINBLUE_API_KEY=your_sendinblue_api_key_here
SENDINBLUE_SENDER_EMAIL=noreply@evidms.com
SENDINBLUE_SENDER_NAME=EVIDMS
```

### Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

The backend will start at **http://localhost:5000**

---

## Step 3: Database Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. Use connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/evidms
   ```

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates sample data for testing.

---

## Step 4: Email Setup (Sendinblue)

1. Sign up at https://www.sendinblue.com/
2. Get your API key from Settings → SMTP & API
3. Update `SENDINBLUE_API_KEY` in `backend/.env`
4. Verify sender email address

---

## 🧪 Testing the Application

### 1. Check Backend Health

Open browser or use curl:
```bash
curl http://localhost:5000
```

### 2. Test Frontend

Navigate to http://localhost:3000

### 3. Test Registration Flow

1. Go to Applicant Registration
2. Fill in details
3. Upload passport scan
4. Submit → Should receive OTP email
5. Enter OTP to verify

### 4. Test Login Flow

1. Go to Applicant Login
2. Enter passport ID
3. Request OTP
4. Enter OTP
5. Access dashboard

---

## 📁 Project Structure

```
evidms/
├── frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── backend (Node.js/Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Common Issues & Solutions

### Issue: Backend won't start
**Solution**: Check if port 5000 is already in use
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000
```

### Issue: MongoDB connection failed
**Solution**: 
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Issue: OTP emails not sending
**Solution**:
- Verify Sendinblue API key
- Check sender email is verified
- Review Sendinblue dashboard for errors

### Issue: CORS errors
**Solution**: Backend already has CORS enabled. Ensure:
- Backend is running on port 5000
- Frontend is running on port 3000
- `REACT_APP_API_URL` is set correctly

---

## 🎯 Available Scripts

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-restart)
npm run seed       # Seed database with sample data
```

---

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017 (if local)

---

## 📞 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new applicant
- `POST /api/auth/login` - Login (request OTP)
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/embassy-login` - Embassy officer login
- `POST /api/auth/admin-login` - Admin login

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

---

## ✅ Checklist

- [ ] Frontend running on port 3000
- [ ] Backend dependencies installed
- [ ] `.env` file configured
- [ ] MongoDB running and connected
- [ ] Sendinblue API key configured
- [ ] Backend running on port 5000
- [ ] Can access landing page
- [ ] Can register new user
- [ ] Can receive OTP email
- [ ] Can login with OTP

---

## 🎉 You're All Set!

Once all steps are complete, you'll have a fully functional E-Visa management system with:
- User registration and authentication
- OTP-based login
- Role-based access (Applicant, Embassy, Admin)
- Document management
- Application tracking
- Payment processing

Happy coding! 🚀
