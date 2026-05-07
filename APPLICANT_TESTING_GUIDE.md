# 🧪 Applicant Side Testing Guide

## ✅ Current Status

| Service | Status | URL |
|---------|--------|-----|
| **Frontend** | ✅ Running | http://localhost:3000 |
| **Backend** | ✅ Running | http://localhost:5000 |
| **MongoDB** | ✅ Connected | mongodb://127.0.0.1:27017/evidms |
| **Email API** | ✅ Configured | Brevo/Sendinblue |

---

## 🎯 What's New in This Update

### Backend Features Added:
- ✅ Application management (create, read, update, delete)
- ✅ Document upload with Multer
- ✅ Payment processing
- ✅ JWT authentication middleware
- ✅ File serving for uploaded documents

### Frontend Features Added:
- ✅ Complete application form with validation
- ✅ Multi-step form wizard
- ✅ Document upload interface
- ✅ Payment integration
- ✅ Application tracking
- ✅ Protected routes with authentication

### New API Endpoints:
```
POST   /api/auth/register              - Register new applicant
POST   /api/auth/send-otp              - Send OTP to email
POST   /api/auth/verify-otp            - Verify OTP and login

POST   /api/applications               - Create new application
GET    /api/applications               - Get user's applications
GET    /api/applications/:id           - Get specific application
PUT    /api/applications/:id           - Update application
DELETE /api/applications/:id           - Delete application

POST   /api/documents/upload           - Upload documents
POST   /api/documents/reupload         - Reupload document

POST   /api/payments/create-order      - Create payment order
POST   /api/payments/verify            - Verify payment
```

---

## 🧪 Complete Testing Flow

### Test 1: Registration & OTP Login

#### Step 1: Register New Applicant

1. **Open browser**: http://localhost:3000
2. **Click**: "Applicant" card on landing page
3. **Click**: "Register" link
4. **Fill in the form**:
   ```
   Full Name: John Doe
   Email: your-real-email@example.com  (use your real email!)
   Mobile: 9876543210
   Passport ID: AB123456
   Date of Birth: 1990-01-15
   Nationality: Indian
   ```
5. **Upload**: Passport scan (any image file)
6. **Click**: "Register"

**Expected Result:**
- ✅ Success message: "Registration successful! OTP sent to your email"
- ✅ You receive an email with 6-digit OTP
- ✅ Redirected to OTP verification page

**Check in MongoDB Compass:**
- Open `users` collection
- You should see your new user document

#### Step 2: Verify OTP

1. **Check your email** for the OTP code
2. **Enter the 6-digit OTP**
3. **Click**: "Verify OTP"

**Expected Result:**
- ✅ Success message: "Login successful!"
- ✅ Redirected to applicant dashboard
- ✅ JWT token stored in localStorage

**Check in Browser DevTools:**
- Open Console (F12)
- Type: `localStorage.getItem('token')`
- You should see a JWT token

---

### Test 2: Apply for New Visa

#### Step 1: Start New Application

1. **From Dashboard**, click: "Apply for New Visa"
2. **You'll see a 3-step form**:
   - Step 1: Personal Information
   - Step 2: Travel Information
   - Step 3: Document Upload

#### Step 2: Fill Personal Information

```
Full Name: John Doe
Date of Birth: 1990-01-15
Passport Number: AB123456
Passport Issue Date: 2020-01-01
Passport Expiry Date: 2030-01-01
Nationality: Indian
Gender: Male
Marital Status: Single
Occupation: Software Engineer
```

**Click**: "Next"

#### Step 3: Fill Travel Information

```
Destination Country: United States
Visa Type: Tourist
Purpose of Visit: Tourism
Intended Date of Arrival: 2024-06-01
Intended Date of Departure: 2024-06-15
Duration of Stay: 14 days
Address in Destination: 123 Main St, New York, NY
```

**Click**: "Next"

#### Step 4: Upload Documents

**Required Documents:**
- Passport Copy (PDF or Image)
- Photograph (Image)
- Travel Itinerary (PDF)
- Bank Statement (PDF)

**Upload each document** and click "Next"

#### Step 5: Review & Submit

1. **Review all information**
2. **Check the declaration checkbox**
3. **Click**: "Submit Application"

**Expected Result:**
- ✅ Success message: "Application submitted successfully!"
- ✅ Application ID displayed (e.g., "APP-2024-001")
- ✅ Redirected to payment page

**Check in MongoDB Compass:**
- Open `applications` collection
- You should see your new application document
- Status should be "submitted"

**Check in File System:**
- Navigate to `backend/uploads/`
- You should see uploaded files

---

### Test 3: Payment Processing

#### After Submitting Application:

1. **You're on the payment page**
2. **See payment details**:
   ```
   Application ID: APP-2024-001
   Visa Type: Tourist
   Amount: $160.00
   ```
3. **Click**: "Proceed to Payment"

**Expected Result:**
- ✅ Payment order created
- ✅ Mock payment interface shown
- ✅ Payment verification successful
- ✅ Application status updated to "paid"

**Check in MongoDB Compass:**
- Refresh `applications` collection
- Your application status should be "paid"
- Payment details should be added

---

### Test 4: Track Application Status

#### From Dashboard:

1. **Click**: "Track Application Status"
2. **Enter your Application ID**: APP-2024-001
3. **Click**: "Track"

**Expected Result:**
- ✅ Application details displayed
- ✅ Current status shown
- ✅ Status history timeline
- ✅ Submitted documents list

**Status Timeline Example:**
```
✅ Application Submitted - 2024-05-06 10:30 AM
✅ Payment Completed - 2024-05-06 10:35 AM
⏳ Under Review - Pending
⏳ Approved/Rejected - Pending
```

---

### Test 5: Complete Draft Application

#### Save as Draft:

1. **Start a new application**
2. **Fill only Step 1** (Personal Info)
3. **Click**: "Save as Draft" (if available)
4. **Go to**: "Complete Application" from dashboard

**Expected Result:**
- ✅ Draft application listed
- ✅ Can resume from where you left off
- ✅ Can delete draft
- ✅ Can complete and submit

---

### Test 6: Print Application

#### After Submitting:

1. **From Dashboard**, click: "Print Application"
2. **Enter Application ID**: APP-2024-001
3. **Click**: "Download PDF"

**Expected Result:**
- ✅ PDF download initiated
- ✅ PDF contains all application details
- ✅ Formatted for printing

---

### Test 7: Reupload Document

#### If Document Rejected:

1. **From Dashboard**, click: "Reupload Document"
2. **Enter Application ID**: APP-2024-001
3. **Select document type** to replace
4. **Upload new file**
5. **Check confirmation**: "I confirm this is the correct document"
6. **Click**: "Upload"

**Expected Result:**
- ✅ Old document replaced
- ✅ New document uploaded
- ✅ Application updated

---

## 🔍 API Testing with Postman/Thunder Client

### 1. Register User

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "mobileNumber": "9876543210",
  "passportId": "XY789012"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration successful. OTP sent to email.",
  "userId": "..."
}
```

### 2. Send OTP

```http
POST http://localhost:5000/api/auth/send-otp
Content-Type: application/json

{
  "passportId": "XY789012"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent to registered email"
}
```

### 3. Verify OTP

```http
POST http://localhost:5000/api/auth/verify-otp
Content-Type: application/json

{
  "passportId": "XY789012",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "passportId": "XY789012",
    "email": "test@example.com",
    "role": "APPLICANT"
  }
}
```

### 4. Create Application (Protected Route)

```http
POST http://localhost:5000/api/applications
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "visaType": "Tourist",
  "destinationCountry": "United States",
  "personalInfo": {
    "fullName": "John Doe",
    "dateOfBirth": "1990-01-15",
    "passportNumber": "AB123456"
  },
  "travelInfo": {
    "purposeOfVisit": "Tourism",
    "intendedArrival": "2024-06-01",
    "intendedDeparture": "2024-06-15"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application created successfully",
  "application": {
    "_id": "...",
    "applicationId": "APP-2024-001",
    "status": "draft",
    ...
  }
}
```

### 5. Get My Applications

```http
GET http://localhost:5000/api/applications
Authorization: Bearer YOUR_JWT_TOKEN
```

**Expected Response:**
```json
{
  "success": true,
  "applications": [
    {
      "_id": "...",
      "applicationId": "APP-2024-001",
      "visaType": "Tourist",
      "status": "submitted",
      ...
    }
  ]
}
```

---

## 📊 MongoDB Verification

### Check Users Collection

```javascript
// In MongoDB Compass or mongosh
use evidms
db.users.find({ role: "APPLICANT" }).pretty()
```

**Expected Fields:**
- `_id`
- `role`: "APPLICANT"
- `email`
- `mobileNumber`
- `passportId`
- `createdAt`
- `updatedAt`

### Check Applications Collection

```javascript
db.applications.find().pretty()
```

**Expected Fields:**
- `_id`
- `applicationId`: "APP-2024-001"
- `applicantId`: ObjectId (reference to user)
- `visaType`
- `destinationCountry`
- `status`: "draft" | "submitted" | "paid" | "under_review" | "approved" | "rejected"
- `personalInfo`: Object
- `travelInfo`: Object
- `documents`: Array
- `createdAt`
- `updatedAt`

### Check OTPs Collection

```javascript
db.otps.find().sort({ createdAt: -1 }).limit(5).pretty()
```

**Expected Fields:**
- `_id`
- `passportId`
- `otp`: "123456"
- `expiresAt`: Date (10 minutes from creation)
- `verified`: Boolean
- `createdAt`

---

## 🎯 Expected Behaviors

### ✅ Success Cases

1. **Registration**:
   - Email sent with OTP
   - User created in database
   - OTP valid for 10 minutes

2. **Login**:
   - OTP verified successfully
   - JWT token returned
   - Token valid for 7 days

3. **Application Creation**:
   - Application ID generated (APP-YYYY-NNN)
   - Status set to "draft" initially
   - User can save and resume

4. **Document Upload**:
   - Files saved to `backend/uploads/`
   - File paths stored in database
   - Supports PDF, JPG, PNG

5. **Payment**:
   - Payment order created
   - Status updated to "paid"
   - Payment details recorded

### ❌ Error Cases to Test

1. **Duplicate Registration**:
   - Try registering with same email/passport
   - Should get error: "User already exists"

2. **Invalid OTP**:
   - Enter wrong OTP
   - Should get error: "Invalid or expired OTP"

3. **Expired OTP**:
   - Wait 10+ minutes
   - Try to verify
   - Should get error: "OTP expired"

4. **Unauthorized Access**:
   - Try accessing protected routes without token
   - Should get 401 Unauthorized

5. **Invalid File Upload**:
   - Try uploading .exe or other invalid files
   - Should get error: "Invalid file type"

---

## 🔧 Troubleshooting

### Issue: OTP Email Not Received

**Check:**
1. Brevo API key is correct in `.env`
2. Email address is valid
3. Check spam folder
4. Check Brevo dashboard for send logs

**Solution:**
```bash
# Check backend logs
# Look for email sending errors
```

### Issue: File Upload Fails

**Check:**
1. `backend/uploads/` directory exists
2. File size < 5MB
3. File type is allowed (PDF, JPG, PNG)

**Solution:**
```bash
cd backend
mkdir uploads
```

### Issue: JWT Token Invalid

**Check:**
1. Token not expired (7 days)
2. JWT_SECRET matches in `.env`
3. Token format: "Bearer <token>"

**Solution:**
- Login again to get new token
- Check localStorage in browser

### Issue: Application Not Found

**Check:**
1. Application ID is correct
2. User is logged in
3. Application belongs to logged-in user

**Solution:**
- Check MongoDB for application
- Verify user ID matches

---

## 📝 Test Checklist

### Registration & Authentication
- [ ] Register new applicant
- [ ] Receive OTP email
- [ ] Verify OTP successfully
- [ ] Login with OTP
- [ ] JWT token stored
- [ ] Token works for protected routes

### Application Management
- [ ] Create new application
- [ ] Save as draft
- [ ] Resume draft application
- [ ] Submit application
- [ ] View application list
- [ ] Track application status

### Document Management
- [ ] Upload passport copy
- [ ] Upload photograph
- [ ] Upload supporting documents
- [ ] View uploaded documents
- [ ] Reupload rejected document

### Payment
- [ ] View payment details
- [ ] Create payment order
- [ ] Complete payment
- [ ] Payment status updated
- [ ] Receipt generated

### Additional Features
- [ ] Print application PDF
- [ ] View status timeline
- [ ] Update profile (if available)
- [ ] Logout functionality

---

## 🎉 Success Criteria

Your applicant side is working correctly if:

✅ Users can register and receive OTP
✅ Users can login with OTP
✅ Users can create visa applications
✅ Users can upload documents
✅ Users can make payments
✅ Users can track application status
✅ All data is saved to MongoDB
✅ Files are uploaded to server
✅ JWT authentication works
✅ Protected routes are secure

---

## 📞 Quick Commands

### Start Everything
```bash
# Terminal 1: Frontend
npm start

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: MongoDB (if needed)
net start MongoDB
```

### Check Status
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:5000/health

# MongoDB
mongosh evidms --eval "db.stats()"
```

### View Logs
```bash
# Backend logs (in terminal running npm run dev)
# Frontend logs (in terminal running npm start)
# MongoDB logs (in MongoDB Compass)
```

---

## 🚀 Ready to Test!

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB Compass: mongodb://127.0.0.1:27017

**Test Account:**
- Create your own by registering!
- Use your real email to receive OTP

**Start Testing:**
1. Open http://localhost:3000
2. Click "Applicant"
3. Register with your email
4. Check email for OTP
5. Complete the flow!

Happy Testing! 🎊
