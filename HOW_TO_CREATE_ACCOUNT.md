# 📝 How to Create an Account - Step by Step

## 🎯 Quick Overview

To create an applicant account, you need:
1. A **valid email address** (you'll receive OTP here)
2. A **10-digit mobile number**
3. A **unique passport ID**
4. Basic personal information

---

## ✅ Valid Example Data

### Example 1: John Doe

```
Full Name: John Doe
Email: john.doe@gmail.com          ← Use YOUR real email!
Mobile Number: 9876543210
Passport ID: AB123456
Date of Birth: 1990-05-15
Nationality: Indian
```

### Example 2: Sarah Smith

```
Full Name: Sarah Smith
Email: sarah.smith@yahoo.com       ← Use YOUR real email!
Mobile Number: 9123456789
Passport ID: CD789012
Date of Birth: 1995-08-20
Nationality: American
```

### Example 3: Raj Kumar

```
Full Name: Raj Kumar
Email: raj.kumar@outlook.com       ← Use YOUR real email!
Mobile Number: 8765432109
Passport ID: EF345678
Date of Birth: 1988-12-10
Nationality: Indian
```

---

## 🚀 Step-by-Step Registration Process

### Step 1: Open the Application

1. **Open your browser**
2. **Go to**: http://localhost:3000
3. **You'll see**: Landing page with 3 cards
   - Applicant
   - Embassy Officer
   - Admin

### Step 2: Navigate to Registration

1. **Click**: "Applicant" card
2. **You'll see**: Login page
3. **Click**: "Register" link (usually at the bottom)
4. **You'll see**: Registration form

---

## 📋 Fill the Registration Form

### Field-by-Field Guide

#### 1. Full Name
**What to enter**: Your full legal name as on passport
**Examples**:
- ✅ `John Michael Doe`
- ✅ `Sarah Elizabeth Smith`
- ✅ `Raj Kumar Singh`
- ❌ `john` (too short)
- ❌ `J.D.` (use full name)

#### 2. Email Address
**What to enter**: YOUR REAL EMAIL (you'll receive OTP here!)
**Examples**:
- ✅ `john.doe@gmail.com`
- ✅ `sarah_smith@yahoo.com`
- ✅ `raj.kumar123@outlook.com`
- ❌ `notanemail` (invalid format)
- ❌ `test@test` (invalid domain)

**⚠️ IMPORTANT**: Use your REAL email address! You need to receive the OTP code.

#### 3. Mobile Number
**What to enter**: 10-digit Indian mobile number
**Format**: No spaces, no dashes, just 10 digits
**Examples**:
- ✅ `9876543210`
- ✅ `8765432109`
- ✅ `7654321098`
- ❌ `987654321` (only 9 digits)
- ❌ `98765 43210` (no spaces)
- ❌ `+91-9876543210` (no country code or dashes)

#### 4. Passport ID
**What to enter**: Unique passport number
**Format**: Letters and numbers (no special characters)
**Examples**:
- ✅ `AB123456`
- ✅ `CD789012`
- ✅ `EF345678`
- ✅ `Z1234567`
- ❌ `AB-123456` (no dashes)
- ❌ `AB 123456` (no spaces)

**⚠️ IMPORTANT**: Each passport ID must be unique. If someone already registered with `AB123456`, you need a different one.

#### 5. Date of Birth
**What to enter**: Your birth date
**Format**: YYYY-MM-DD (or use date picker)
**Examples**:
- ✅ `1990-05-15` (May 15, 1990)
- ✅ `1995-08-20` (August 20, 1995)
- ✅ `1988-12-10` (December 10, 1988)

**Tip**: Click the calendar icon to pick a date easily.

#### 6. Nationality
**What to enter**: Your country of citizenship
**Examples**:
- ✅ `Indian`
- ✅ `American`
- ✅ `British`
- ✅ `Canadian`
- ✅ `Australian`

#### 7. Passport Scan (Optional but Recommended)
**What to upload**: Image or PDF of your passport
**Accepted formats**: JPG, PNG, PDF
**Max size**: 5MB
**Examples**:
- ✅ `passport_scan.jpg`
- ✅ `passport.pdf`
- ✅ `my_passport.png`

**Tip**: You can use any image file for testing. Just make sure it's < 5MB.

---

## 🎯 Complete Example - Copy & Paste Ready

### Example Set 1 (For Testing)

```
Full Name: Test User One
Email: YOUR_EMAIL@gmail.com        ← REPLACE WITH YOUR EMAIL!
Mobile Number: 9876543210
Passport ID: TEST001
Date of Birth: 1990-01-01
Nationality: Indian
```

### Example Set 2 (For Testing)

```
Full Name: Demo Applicant
Email: YOUR_EMAIL@gmail.com        ← REPLACE WITH YOUR EMAIL!
Mobile Number: 9123456789
Passport ID: DEMO001
Date of Birth: 1995-06-15
Nationality: American
```

### Example Set 3 (For Testing)

```
Full Name: Sample User
Email: YOUR_EMAIL@gmail.com        ← REPLACE WITH YOUR EMAIL!
Mobile Number: 8765432109
Passport ID: SAMPLE001
Date of Birth: 1988-03-20
Nationality: British
```

---

## 📸 Visual Guide

### What You'll See:

```
┌─────────────────────────────────────────┐
│         APPLICANT REGISTRATION          │
├─────────────────────────────────────────┤
│                                         │
│  Full Name:                             │
│  [________________________]             │
│                                         │
│  Email:                                 │
│  [________________________]             │
│                                         │
│  Mobile Number:                         │
│  [________________________]             │
│                                         │
│  Passport ID:                           │
│  [________________________]             │
│                                         │
│  Date of Birth:                         │
│  [________] 📅                          │
│                                         │
│  Nationality:                           │
│  [________________________]             │
│                                         │
│  Passport Scan:                         │
│  [Choose File] No file chosen           │
│                                         │
│  [        REGISTER        ]             │
│                                         │
│  Already have an account? Login         │
└─────────────────────────────────────────┘
```

---

## ✅ After Clicking "Register"

### What Happens:

1. **Form Validation**
   - All fields are checked
   - Email format validated
   - Mobile number must be 10 digits
   - Passport ID must be unique

2. **Account Creation**
   - User account created in database
   - OTP generated (6-digit code)
   - Email sent to your address

3. **Success Message**
   ```
   ✅ Registration successful!
   📧 OTP sent to your email
   ```

4. **Automatic Redirect**
   - You're taken to OTP verification page
   - Enter the 6-digit code from your email

---

## 📧 Check Your Email

### What to Look For:

**Email Subject**: "Your EVIDMS OTP Code"

**Email Content**:
```
Your OTP code is: 123456

This code will expire in 10 minutes.

Do not share this code with anyone.

---
EVIDMS E-Visa System
```

**⚠️ Check**:
- Inbox
- Spam/Junk folder (if not in inbox)
- Promotions tab (Gmail)

---

## 🔐 Enter OTP

### OTP Verification Page:

```
┌─────────────────────────────────────────┐
│         VERIFY YOUR EMAIL               │
├─────────────────────────────────────────┤
│                                         │
│  We've sent a 6-digit code to:         │
│  your.email@gmail.com                   │
│                                         │
│  Enter OTP:                             │
│  [__] [__] [__] [__] [__] [__]         │
│                                         │
│  [      VERIFY OTP      ]               │
│                                         │
│  Didn't receive? Resend OTP             │
└─────────────────────────────────────────┘
```

**Enter the 6-digit code** from your email and click "Verify OTP"

---

## ✅ Success! You're Logged In

### After OTP Verification:

1. **Success Message**
   ```
   ✅ Login successful!
   Welcome, [Your Name]!
   ```

2. **Redirected to Dashboard**
   - You'll see the Applicant Dashboard
   - Navigation cards for all features
   - Your name displayed

3. **JWT Token Stored**
   - Authentication token saved in browser
   - You stay logged in for 7 days

---

## 🎯 Quick Test - Use This!

### Ready-to-Use Test Data:

**Just replace the email with yours:**

```
Full Name: Test Applicant
Email: YOUR_ACTUAL_EMAIL@gmail.com    ← PUT YOUR EMAIL HERE!
Mobile Number: 9999999999
Passport ID: TEST123
Date of Birth: 1995-01-01
Nationality: Indian
```

### Steps:
1. Copy the data above
2. Replace `YOUR_ACTUAL_EMAIL@gmail.com` with your real email
3. Go to http://localhost:3000
4. Click "Applicant" → "Register"
5. Paste/type the data
6. Click "Register"
7. Check your email for OTP
8. Enter OTP
9. Done! You're logged in!

---

## 🔧 Troubleshooting

### Problem: "Email already exists"

**Solution**: Use a different email or passport ID
```
Try: test123@gmail.com instead of test@gmail.com
Or: TEST124 instead of TEST123
```

### Problem: "Invalid mobile number"

**Solution**: Must be exactly 10 digits
```
❌ Wrong: 987654321 (9 digits)
❌ Wrong: 98765432109 (11 digits)
✅ Correct: 9876543210 (10 digits)
```

### Problem: "Invalid email format"

**Solution**: Use proper email format
```
❌ Wrong: test@test
❌ Wrong: test.com
✅ Correct: test@gmail.com
```

### Problem: "OTP not received"

**Solutions**:
1. Check spam/junk folder
2. Wait 1-2 minutes
3. Check email address is correct
4. Click "Resend OTP"
5. Check backend terminal for errors

### Problem: "Passport ID already exists"

**Solution**: Use a unique passport ID
```
If TEST001 is taken, try:
- TEST002
- TEST123
- DEMO001
- SAMPLE001
```

---

## 📊 Multiple Test Accounts

### Create Multiple Accounts for Testing:

**Account 1:**
```
Email: youremail+test1@gmail.com
Passport ID: TEST001
Mobile: 9876543210
```

**Account 2:**
```
Email: youremail+test2@gmail.com
Passport ID: TEST002
Mobile: 9876543211
```

**Account 3:**
```
Email: youremail+test3@gmail.com
Passport ID: TEST003
Mobile: 9876543212
```

**💡 Gmail Tip**: `youremail+anything@gmail.com` all go to `youremail@gmail.com`!

---

## ✅ Verification Checklist

After registration, verify:

- [ ] Received OTP email
- [ ] OTP is 6 digits
- [ ] OTP verification successful
- [ ] Redirected to dashboard
- [ ] Can see your name on dashboard
- [ ] Can access "Apply for New Visa"
- [ ] Token stored in browser (check DevTools → Application → Local Storage)

---

## 🎉 You're Ready!

Once registered and logged in, you can:

✅ Apply for new visa
✅ Upload documents
✅ Track application status
✅ Make payments
✅ Print applications
✅ Manage your profile

---

## 📞 Quick Reference

**Registration URL**: http://localhost:3000 → Applicant → Register

**Required Fields**:
- Full Name (any text)
- Email (YOUR real email!)
- Mobile (10 digits)
- Passport ID (unique)
- Date of Birth (any valid date)
- Nationality (any country)

**Optional**:
- Passport Scan (any image/PDF < 5MB)

**After Registration**:
- Check email for OTP
- Enter 6-digit code
- Login successful!

---

## 🚀 Start Now!

1. **Open**: http://localhost:3000
2. **Click**: "Applicant"
3. **Click**: "Register"
4. **Use this data** (with YOUR email):

```
Full Name: Your Name
Email: your.real.email@gmail.com
Mobile Number: 9876543210
Passport ID: TEST001
Date of Birth: 1995-01-01
Nationality: Indian
```

5. **Click**: "Register"
6. **Check email** for OTP
7. **Enter OTP** and verify
8. **Start using** the application!

---

**Happy Testing! 🎊**
