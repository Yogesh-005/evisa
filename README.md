# EVIDMS — E-Visa & Immigration Document Management System

A full-stack MERN application: a React frontend (applicant / embassy / admin
portals) and an Express + MongoDB backend with passport-OTP authentication via
Brevo (Sendinblue) email.

---

## Repository Layout

```
evisa/
├── public/                       # CRA static assets
├── src/                          # React frontend
│   ├── index.js
│   ├── App.js                    # Route definitions
│   ├── styles/
│   │   └── global.css            # Design system: CSS variables, shared classes
│   ├── components/
│   │   └── Navbar.js             # Shared top nav
│   ├── config/
│   │   └── index.js              # Reads REACT_APP_* env vars (single source)
│   ├── services/
│   │   └── api.js                # Shared axios instance (baseURL + auth header)
│   └── pages/
│       ├── Landing.js
│       ├── applicant/
│       │   ├── ApplicantLogin.js
│       │   ├── ApplicantRegister.js
│       │   ├── Dashboard.js
│       │   ├── ApplyNewVisa.js
│       │   ├── CompleteApplication.js
│       │   ├── TrackStatus.js
│       │   ├── Payment.js
│       │   ├── ReuploadDocument.js
│       │   ├── PrintApplication.js
│       │   └── forms/
│       │       └── steps/                     # 8-step apply-new-visa wizard
│       │           ├── MainForm.js
│       │           ├── Buttons.js
│       │           ├── PersonalDetails.js
│       │           ├── PassportDetails.js
│       │           ├── AddressDetails.js
│       │           ├── FamilyDetails.js
│       │           ├── ContactDetails.js
│       │           ├── VisaDetails.js
│       │           ├── DocumentUpload.js
│       │           └── ReviewSubmit.js
│       ├── embassy/
│       │   ├── EmbassyLogin.js
│       │   ├── EmbassyDashboard.js
│       │   └── ApplicationDetail.js
│       └── admin/
│           ├── AdminLogin.js
│           ├── AdminDashboard.js
│           ├── AllApplications.js
│           └── EmbassyManagement.js
│
├── backend/                      # Express + MongoDB API
│   ├── server.js                 # App entry (express + cors + mongoose)
│   ├── seed.js                   # Optional DB seeder
│   ├── config/
│   │   └── env.js                # Reads .env — single source of truth
│   ├── middleware/
│   │   ├── auth.js               # JWT verification + role guard
│   │   └── upload.js             # multer config for document uploads
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── applicationController.js
│   │   ├── documentController.js
│   │   └── paymentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── documentRoutes.js
│   │   └── paymentRoutes.js
│   ├── services/
│   │   └── authService.js
│   ├── schemas/
│   │   ├── userSchema.js
│   │   ├── otpSchema.js
│   │   └── applicationSchema.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Otp.js
│   │   └── Application.js
│   ├── utils/
│   │   ├── generateOtp.js
│   │   ├── generateId.js
│   │   ├── buildApplicationPdf.js  # pdfkit-based print PDF
│   │   └── sendEmail.js
│   ├── uploads/                  # multer storage (gitignored)
│   ├── .env.example
│   └── package.json
│
├── .env.example                  # Frontend env template
└── package.json                  # Frontend (CRA) package
```

---

## Centralized configuration (API key, email, base URL)

Secrets and per-environment values live in **two `.env` files** — one for each
half of the stack. Change a value once and every consumer in that half picks
it up.

### Frontend — `./.env`
```
REACT_APP_API_URL=http://localhost:5000
```
All React code reads this through `src/config/index.js`, which is consumed by
`src/services/api.js` (the shared axios instance). To point the app at a
different API, edit this one variable.

### Backend — `./backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/evidms
JWT_SECRET=replace-me
JWT_EXPIRES_IN=1d
BREVO_API_KEY=xkeysib-...
EMAIL_FROM=no-reply@example.com
EMAIL_FROM_NAME=E-Visa App
CLIENT_ORIGIN=http://localhost:3000
```
All backend code reads these through `backend/config/env.js`. The Brevo API
key and the sender email/name are consumed by `backend/utils/sendEmail.js`,
the JWT secret by `backend/services/authService.js`, etc. Update the `.env`
once and the whole backend follows.

> Never commit real `.env` files. Only `.env.example` is tracked.

---

## Running locally

```bash
# 1. Backend
cd backend
cp .env.example .env       # then fill in real values
npm install
npm run dev                # http://localhost:5000

# 2. Frontend (in a second terminal, from repo root)
cp .env.example .env
npm install
npm start                  # http://localhost:3000
```

---

## API endpoints (backend)

All `/api/applications`, `/api/documents`, and `/api/payments` routes require
`Authorization: Bearer <jwt>` and the `applicant` role.

### Auth (public)
| Method | Path                  | Body                                                  |
|--------|-----------------------|-------------------------------------------------------|
| POST   | `/api/auth/send-otp`  | `{ passportId, purpose, email?, mobileNumber? }`      |
| POST   | `/api/auth/verify-otp`| `{ passportId, otp, purpose }`                        |

### Applications (applicant)
| Method | Path                                  | Notes                            |
|--------|---------------------------------------|----------------------------------|
| POST   | `/api/applications`                   | Create DRAFT, returns `applicationId` |
| GET    | `/api/applications/user`              | List the user's applications      |
| GET    | `/api/applications/:id`               | Fetch one (must own)             |
| GET    | `/api/applications/status/:id`        | `{ status, history }`            |
| GET    | `/api/applications/:id/print`         | `{ fileUrl }` (stub)             |
| PUT    | `/api/applications/draft/:id`         | Save DRAFT                       |
| PUT    | `/api/applications/submit/:id`        | DRAFT → SUBMITTED                |

### Documents (applicant)
| Method | Path                                  | Notes                            |
|--------|---------------------------------------|----------------------------------|
| POST   | `/api/documents/upload`               | multipart `file`, `applicationId` |
| PUT    | `/api/documents/reupload/:id`         | multipart `file`                 |

### Payments (applicant)
| Method | Path                                  | Notes                            |
|--------|---------------------------------------|----------------------------------|
| POST   | `/api/payments/create-order`          | `{ applicationId, amount }`      |
| POST   | `/api/payments/verify`                | `{ orderId, paymentId, applicationId }` |

---

## Editing the applicant detail form

The "Apply New Visa" page is an 8-step wizard composed of one component
per step under `src/pages/applicant/forms/steps/`. To change a field:

1. Edit the corresponding step file (e.g. `PersonalDetails.js`) — update
   the `data` shape, validation, and JSX.
2. Mirror the change in `ReviewSubmit.js` so the new value appears on the
   final review screen.
3. Mirror the path in `backend/schemas/applicationSchema.js` so Mongoose
   persists it.

`MainForm.js` accepts an `initialData` prop, so `CompleteApplication.js`
can reuse the same wizard to resume drafts.
