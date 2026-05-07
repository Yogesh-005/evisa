# EVIDMS Backend - Complete Code Reference

## 📁 Project Structure

\\\
backend/
├── config/
│   └── env.js
├── controllers/
│   ├── authController.js
│   ├── applicationController.js
│   ├── documentController.js
│   └── paymentController.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Application.js
│   └── Otp.js
├── routes/
│   ├── authRoutes.js
│   ├── applicationRoutes.js
│   ├── documentRoutes.js
│   └── paymentRoutes.js
├── schemas/
│   ├── userSchema.js
│   ├── applicationSchema.js
│   └── otpSchema.js
├── services/
│   └── authService.js
├── utils/
│   ├── generateOtp.js
│   ├── generateId.js
│   └── sendEmail.js
├── uploads/          (file storage directory)
├── .env              (environment variables)
├── .env.example      (environment template)
├── .gitignore
├── package.json
├── seed.js
└── server.js
\\\

---

## 📦 package.json

