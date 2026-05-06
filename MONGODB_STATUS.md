# ✅ MongoDB Setup Complete!

## 🎉 Current Status

| Component | Status | Details |
|-----------|--------|---------|
| **MongoDB Service** | ✅ Running | Automatic startup enabled |
| **MongoDB Shell** | ✅ Installed | Version 2.7.0 |
| **Database** | ✅ Created | `evidms` |
| **Collections** | ✅ Created | `users`, `applications`, `otps` |
| **Seed Data** | ✅ Loaded | Default admin user created |
| **Backend Config** | ✅ Ready | `.env` file configured |

---

## 📊 Database Information

### Connection Details
```
Host: 127.0.0.1 (localhost)
Port: 27017
Database: evidms
Connection String: mongodb://127.0.0.1:27017/evidms
```

### Collections Created

#### 1. **users** Collection
Stores all user accounts (applicants, embassy officers, admins)

**Schema:**
```javascript
{
  role: String,              // "APPLICANT" | "OFFICER" | "ADMIN"
  email: String,             // For applicants
  mobileNumber: String,      // For applicants (10 digits)
  passportId: String,        // For applicants (unique)
  embassyId: String,         // For officers
  username: String,          // For admins (unique)
  password: String,          // For officers and admins (min 8 chars)
  createdAt: Date,
  updatedAt: Date
}
```

**Current Data:**
- ✅ 1 admin user created

#### 2. **applications** Collection
Stores visa applications

**Schema:**
```javascript
{
  applicantId: ObjectId,     // Reference to User
  visaType: String,
  country: String,
  status: String,            // "draft" | "submitted" | "under_review" | "approved" | "rejected"
  documents: [String],       // Array of file paths
  personalInfo: Object,
  travelInfo: Object,
  createdAt: Date,
  updatedAt: Date
}
```

**Current Data:**
- Empty (will be populated when users apply)

#### 3. **otps** Collection
Stores one-time passwords for authentication

**Schema:**
```javascript
{
  passportId: String,
  otp: String,
  expiresAt: Date,
  verified: Boolean,
  createdAt: Date
}
```

**Current Data:**
- Empty (will be created when users request OTP)

---

## 👤 Default Admin User

A default admin account has been created for testing:

```
Username: admin
Password: changeme1
Role: ADMIN
```

**⚠️ Important:** Change this password in production!

---

## 🔌 MongoDB Compass Connection

### How to Connect:

1. **Open MongoDB Compass**

2. **Use this connection string:**
   ```
   mongodb://127.0.0.1:27017
   ```

3. **Or fill in manually:**
   - Host: `127.0.0.1`
   - Port: `27017`
   - Authentication: None (for local development)

4. **Click "Connect"**

5. **Navigate to `evidms` database**

6. **View collections:**
   - Click on `users` to see the admin user
   - Click on `applications` (empty for now)
   - Click on `otps` (empty for now)

---

## 🧪 Verify Setup

### Test 1: Check MongoDB Service
```powershell
Get-Service -Name MongoDB
```
**Expected:** Status = Running ✅

### Test 2: Check Database
```bash
mongosh evidms --eval "db.getCollectionNames()"
```
**Expected:** `[ 'users', 'applications', 'otps' ]` ✅

### Test 3: Check Admin User
```bash
mongosh evidms --eval "db.users.countDocuments()"
```
**Expected:** `1` ✅

### Test 4: View Admin User
```bash
mongosh evidms --eval "db.users.findOne()"
```
**Expected:** Admin user document ✅

---

## 🚀 Start Backend Server

Now that MongoDB is set up, you can start the backend:

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

## 📝 Backend Configuration

Your `backend/.env` file is configured with:

```env
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/evidms

# JWT
JWT_SECRET=evidms_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRES_IN=7d

# Email (Brevo/Sendinblue)
BREVO_API_KEY=your_brevo_api_key_here
EMAIL_FROM=noreply@evidms.com
EMAIL_FROM_NAME=EVIDMS E-Visa System

# Server
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
```

**⚠️ To Do:** Update `BREVO_API_KEY` with your actual API key for email functionality.

---

## 🎯 Next Steps

### 1. Get Brevo API Key (for OTP emails)

1. Sign up at https://www.brevo.com/ (formerly Sendinblue)
2. Go to Settings → API Keys
3. Create a new API key
4. Copy the key
5. Update `BREVO_API_KEY` in `backend/.env`

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

### 3. Test the Application

1. Frontend: http://localhost:3000
2. Backend: http://localhost:5000
3. Try registering a new applicant
4. Try logging in as admin (username: admin, password: changeme1)

### 4. Monitor in Compass

- Keep MongoDB Compass open
- Refresh collections to see new data
- Watch as users register and applications are created

---

## 🔧 Useful Commands

### MongoDB Service Management
```powershell
# Check status
Get-Service -Name MongoDB

# Start service
Start-Service -Name MongoDB

# Stop service
Stop-Service -Name MongoDB

# Restart service
Restart-Service -Name MongoDB
```

### Database Operations
```bash
# Connect to database
mongosh evidms

# Show all collections
show collections

# Count documents in users
db.users.countDocuments()

# Find all users
db.users.find().pretty()

# Find admin users
db.users.find({ role: "ADMIN" }).pretty()

# Delete all OTPs (cleanup)
db.otps.deleteMany({})

# Exit shell
exit
```

### Backend Commands
```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Seed database
npm run seed
```

---

## 📚 Documentation Files

I've created several guides for you:

1. **MONGODB_SETUP.md** - Complete MongoDB installation and setup guide
2. **COMPASS_GUIDE.md** - MongoDB Compass usage guide
3. **MONGODB_STATUS.md** - This file (current status)
4. **PROJECT_STATUS.md** - Overall project status
5. **QUICK_START.md** - Quick start guide for the entire project

---

## ✅ Setup Checklist

- [x] MongoDB Server installed
- [x] MongoDB Service running (automatic startup)
- [x] MongoDB Shell (mongosh) available
- [x] Database `evidms` created
- [x] Collections created (`users`, `applications`, `otps`)
- [x] Default admin user seeded
- [x] Backend `.env` configured
- [x] Backend dependencies installed
- [ ] Brevo API key configured (optional, for OTP emails)
- [ ] Backend server started
- [ ] Application tested

---

## 🎉 Summary

Your MongoDB setup is **100% complete and ready to use!**

**What's Working:**
- ✅ MongoDB running locally
- ✅ Database and collections created
- ✅ Sample admin user available
- ✅ Backend configured to connect
- ✅ Ready to start development

**What's Next:**
1. Get Brevo API key (for email OTP)
2. Start backend server
3. Test the application
4. Start building features!

---

## 💡 Pro Tips

### Compass Tips
- Use filters to search: `{ role: "APPLICANT" }`
- Click refresh (🔄) to see new data
- Use "Explain Plan" to optimize queries
- Create indexes for better performance

### Development Tips
- Keep Compass open while developing
- Monitor database changes in real-time
- Use seed script to reset test data
- Backup important data before testing

### Security Tips
- Change default admin password
- Use strong JWT secret in production
- Enable MongoDB authentication for production
- Never commit `.env` file to git

---

**🎊 Congratulations! Your MongoDB is ready for EVIDMS development!**
