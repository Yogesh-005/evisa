# 🎯 Quick Test Example - Applicant Registration

## Step-by-Step Test with Expected Results

### ✅ Prerequisites Check

**Services Running:**
```bash
# Check frontend (should return HTML)
curl http://localhost:3000

# Check backend (should return {"ok":true})
curl http://localhost:5000/health
```

---

## 📝 Test: Complete Applicant Registration Flow

### Step 1: Open Application

1. **Open browser**: http://localhost:3000
2. **You should see**: Landing page with three role cards
   - Applicant
   - Embassy Officer  
   - Admin

**Screenshot moment**: Landing page

---

### Step 2: Navigate to Registration

1. **Click**: "Applicant" card
2. **You should see**: Applicant login page
3. **Click**: "Register" link or "New User? Register Here"
4. **You should see**: Registration form

**Form fields visible:**
- Full Name
- Email
- Mobile Number
- Passport ID
- Date of Birth
- Nationality
- Passport Scan Upload

---

### Step 3: Fill Registration Form

**Enter these details** (use YOUR real email!):

```
Full Name: Test User
Email: your-email@gmail.com  ← USE YOUR REAL EMAIL!
Mobile Number: 9876543210
Passport ID: TEST123456
Date of Birth: 1995-05-15
Nationality: Indian
```

**Upload Passport Scan:**
- Click "Choose File"
- Select any image (JPG/PNG) or PDF
- File should be < 5MB

**Click**: "Register" button

---

### Step 4: Check Backend Response

**Expected in Browser:**
- ✅ Success message: "Registration successful! OTP sent to your email"
- ✅ Automatic redirect to OTP verification page
- ✅ Message: "Please check your email for OTP"

**Expected in Backend Terminal:**
```
[nodemon] starting `node server.js`
MongoDB connected
API listening on http://localhost:5000
POST /api/auth/register 201 - - 1234 ms
Email sent successfully to your-email@gmail.com
```

---

### Step 5: Check Your Email

**Open your email inbox** (the one you used in registration)

**You should receive an email:**
```
From: EVIDMS E-Visa System <noreply@evidms.com>
Subject: Your EVIDMS OTP Code

Your OTP code is: 123456

This code will expire in 10 minutes.

Do not share this code with anyone.
```

**Copy the 6-digit OTP code**

---

### Step 6: Verify OTP

**On the OTP verification page:**

1. **Enter the 6-digit OTP** from your email
2. **Click**: "Verify OTP"

**Expected Result:**
- ✅ Success message: "Login successful!"
- ✅ Redirected to Applicant Dashboard
- ✅ You see welcome message with your name
- ✅ Navigation cards visible:
  - Apply for New Visa
  - Complete Application
  - Track Status
  - Print Application
  - Reupload Document

---

### Step 7: Verify in MongoDB Compass

**Open MongoDB Compass:**

1. **Connect to**: mongodb://127.0.0.1:27017
2. **Click on**: `evidms` database
3. **Click on**: `users` collection
4. **You should see**: Your new user document

**Example Document:**
```json
{
  "_id": ObjectId("..."),
  "role": "APPLICANT",
  "email": "your-email@gmail.com",
  "mobileNumber": "9876543210",
  "passportId": "TEST123456",
  "createdAt": ISODate("2024-05-06T..."),
  "updatedAt": ISODate("2024-05-06T..."),
  "__v": 0
}
```

5. **Click on**: `otps` collection
6. **You should see**: OTP record (may be marked as verified)

**Example OTP Document:**
```json
{
  "_id": ObjectId("..."),
  "passportId": "TEST123456",
  "otp": "123456",
  "expiresAt": ISODate("2024-05-06T..."),
  "verified": true,
  "createdAt": ISODate("2024-05-06T...")
}
```

---

### Step 8: Check Browser Storage

**Open Browser DevTools** (Press F12)

**Go to**: Application tab → Local Storage → http://localhost:3000

**You should see:**
```
Key: token
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZhNDhlNjQ3MTVkOGMzOGNmZTU4Y2UiLCJyb2xlIjoiQVBQTElDQU5UIiwiaWF0IjoxNzE1MDI4MzQyLCJleHAiOjE3MTU2MzMxNDJ9.abc123...
```

This JWT token is used for authentication in all subsequent requests.

---

### Step 9: Test Protected Route

**From Dashboard, click**: "Apply for New Visa"

**Expected Result:**
- ✅ You can access the page (not redirected to login)
- ✅ You see the visa application form
- ✅ Form has 3 steps:
  1. Personal Information
  2. Travel Information
  3. Document Upload

**This confirms:**
- ✅ JWT authentication is working
- ✅ Protected routes are accessible
- ✅ User session is maintained

---

## 🎯 Success Indicators

### ✅ Registration Successful If:

1. **Email Received**
   - OTP email arrived in inbox
   - OTP is 6 digits
   - Email from EVIDMS

2. **Database Updated**
   - User document in `users` collection
   - OTP document in `otps` collection
   - Correct data stored

3. **Login Successful**
   - JWT token in localStorage
   - Redirected to dashboard
   - Can access protected routes

4. **Backend Working**
   - No errors in terminal
   - API responses are correct
   - MongoDB connected

5. **Frontend Working**
   - Pages load correctly
   - Forms submit successfully
   - Navigation works

---

## 🔍 Debugging Tips

### If OTP Email Not Received:

**Check Backend Terminal:**
```
Look for:
✅ "Email sent successfully to ..."
❌ "Error sending email: ..."
```

**If error, check:**
1. Brevo API key in `backend/.env`
2. Email address is valid
3. Internet connection
4. Brevo account status

**Manual OTP Check:**
```bash
# In MongoDB Compass or mongosh
use evidms
db.otps.find({ passportId: "TEST123456" }).sort({ createdAt: -1 }).limit(1)
```

Copy the OTP from database and use it!

---

### If Login Fails:

**Check:**
1. OTP is correct (6 digits)
2. OTP not expired (< 10 minutes old)
3. Passport ID matches registration

**Try:**
- Request new OTP
- Check backend logs for errors
- Verify MongoDB connection

---

### If Dashboard Not Loading:

**Check:**
1. JWT token in localStorage
2. Token not expired
3. Backend running
4. No console errors (F12)

**Try:**
- Clear localStorage
- Login again
- Check network tab for API errors

---

## 📊 Expected API Calls

**During Registration Flow:**

```
1. POST /api/auth/register
   Request: { email, mobileNumber, passportId, ... }
   Response: { success: true, message: "...", userId: "..." }

2. POST /api/auth/send-otp
   Request: { passportId: "TEST123456" }
   Response: { success: true, message: "OTP sent" }

3. POST /api/auth/verify-otp
   Request: { passportId: "TEST123456", otp: "123456" }
   Response: { success: true, token: "...", user: {...} }

4. GET /api/applications (when accessing dashboard)
   Headers: { Authorization: "Bearer <token>" }
   Response: { success: true, applications: [] }
```

**View in Browser DevTools:**
- Press F12
- Go to Network tab
- Filter: XHR
- See all API calls

---

## 🎉 Test Complete!

If you successfully:
- ✅ Registered with your email
- ✅ Received OTP email
- ✅ Verified OTP
- ✅ Logged into dashboard
- ✅ Can access protected routes

**Then your applicant side is working perfectly!** 🎊

---

## 🚀 Next Steps

Now you can test:

1. **Apply for New Visa**
   - Fill the 3-step form
   - Upload documents
   - Submit application

2. **Track Application**
   - Use application ID
   - View status timeline

3. **Make Payment**
   - Complete payment flow
   - Verify payment status

4. **Print Application**
   - Download PDF
   - View formatted application

---

## 📞 Quick Reference

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

**Test Credentials:**
- Create your own by registering!
- Use real email for OTP

**MongoDB:**
- Connection: mongodb://127.0.0.1:27017
- Database: evidms
- Collections: users, applications, otps

**Files:**
- Uploads: backend/uploads/
- Logs: Backend terminal

---

**Happy Testing! 🎯**
