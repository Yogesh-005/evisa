# EVIDMS — Frontend Structure Reference

## Tech Stack
- React (Create React App)
- React Router DOM v6
- Axios
- React Icons (fa)

## Install Dependencies
```bash
npm install react-router-dom axios react-icons
```

## Environment Variable
Create `.env` in project root:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## File Structure

```
src/
├── styles/
│   └── global.css              # Design system: CSS variables, shared components
│
├── components/
│   └── Navbar.js               # Shared top nav for all authenticated pages
│
├── pages/
│   ├── Landing.js              # Public landing — role selector + FAQ sidebar
│   │
│   ├── applicant/
│   │   ├── ApplicantLogin.js   # Passport ID → OTP → login  [US-2]
│   │   ├── ApplicantRegister.js# Register + OTP verify       [US-3]
│   │   ├── Dashboard.js        # 5-card navigation dashboard [US-4]
│   │   ├── ApplyNewVisa.js     # 3-step form (details/docs/review + submit) [US-5]
│   │   ├── CompleteApplication.js # Resume draft + submit    [US-6]
│   │   ├── TrackStatus.js      # Status + history by App ID  [US-7]
│   │   ├── Payment.js          # Create order + verify       [US-8]
│   │   ├── ReuploadDocument.js # Replace doc within deadline [US-9]
│   │   └── PrintApplication.js # Fetch PDF URL + download    [US-10]
│   │
│   ├── embassy/
│   │   ├── EmbassyLogin.js     # Embassy ID + password       [US-11]
│   │   ├── EmbassyDashboard.js # Applications list + search  [US-12]
│   │   └── ApplicationDetail.js# Full detail + approve/reject[US-13]
│   │
│   └── admin/
│       ├── AdminLogin.js       # Username + password         [US-14]
│       ├── AdminDashboard.js   # Nav to Applications + Embassies
│       ├── AllApplications.js  # All apps + country filter   [US-15]
│       └── EmbassyManagement.js# CRUD embassies              [US-16]
│
└── App.js                      # All route definitions
```

---

## Color Palette — Bleach & White

| Token            | Value     | Usage                         |
|------------------|-----------|-------------------------------|
| `--bg`           | `#F7F7F5` | Page background               |
| `--surface`      | `#FFFFFF` | Cards, inputs                 |
| `--surface-2`    | `#F0F0ED` | Hover state, table rows       |
| `--border`       | `#E2E2DC` | Borders                       |
| `--border-strong`| `#C8C8C0` | Focused/hover borders         |
| `--text-primary` | `#111110` | Main text                     |
| `--text-secondary`| `#5A5A54`| Labels, descriptions          |
| `--text-muted`   | `#9A9A94` | Placeholder, minor text       |
| `--accent`       | `#1B1B18` | Primary buttons, active state |

---

## API Map — Frontend → Backend

| Page                  | Method | Endpoint                              |
|-----------------------|--------|---------------------------------------|
| ApplicantLogin        | POST   | /api/auth/send-otp                    |
| ApplicantLogin        | POST   | /api/auth/verify-otp                  |
| ApplicantRegister     | POST   | /api/auth/register                    |
| ApplicantRegister     | POST   | /api/auth/send-otp                    |
| ApplicantRegister     | POST   | /api/auth/verify-otp                  |
| ApplyNewVisa          | POST   | /api/applications                     |
| ApplyNewVisa          | POST   | /api/documents/upload                 |
| ApplyNewVisa          | PUT    | /api/applications/submit/:id          |
| CompleteApplication   | GET    | /api/applications/user                |
| CompleteApplication   | PUT    | /api/applications/draft/:id           |
| CompleteApplication   | PUT    | /api/applications/submit/:id          |
| TrackStatus           | GET    | /api/applications/status/:id          |
| Payment               | POST   | /api/payments/create-order            |
| Payment               | POST   | /api/payments/verify                  |
| PrintApplication      | GET    | /api/applications/:id                 |
| PrintApplication      | GET    | /api/applications/:id/print           |
| ReuploadDocument      | PUT    | /api/documents/reupload/:id           |
| EmbassyLogin          | POST   | /api/auth/officer/login               |
| EmbassyDashboard      | GET    | /api/officer/applications             |
| ApplicationDetail     | GET    | /api/officer/applications/:id         |
| ApplicationDetail     | PUT    | /api/officer/applications/:id/status  |
| AdminLogin            | POST   | /api/auth/admin/login                 |
| AllApplications       | GET    | /api/admin/applications               |
| AllApplications       | GET    | /api/admin/applications?country=      |
| EmbassyManagement     | GET    | /api/admin/embassies                  |
| EmbassyManagement     | POST   | /api/admin/embassies                  |
| EmbassyManagement     | PUT    | /api/admin/embassies/:id              |
| EmbassyManagement     | DELETE | /api/admin/embassies/:id              |
