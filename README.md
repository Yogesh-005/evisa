# EVIDMS - E-Visa & Immigration Document Management System

## Frontend Application

A comprehensive web-based visa application management portal built with React.

### Tech Stack

- **React 18** - Frontend framework with functional components and hooks
- **React Router DOM v6** - Client-side routing for role-based pages
- **Axios** - HTTP client for API communication
- **React Icons** - Icon library for UI elements
- **CSS Variables** - Custom design system (bleach & white palette)

### Project Structure

```
evidms-frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.js                    # Application entry point
│   ├── App.js                      # Route definitions for all roles
│   ├── global.css                  # Design system & shared styles
│   ├── Navbar.js                   # Shared navigation component
│   │
│   ├── Landing.js                  # Public landing page with role selector
│   │
│   ├── ApplicantLogin.js           # Two-step login (Passport + OTP)
│   ├── ApplicantRegister.js        # Registration with passport scan
│   ├── Dashboard.js                # Applicant home dashboard
│   ├── ApplyNewVisa.js             # 3-step visa application form
│   ├── CompleteApplication.js      # Draft management
│   ├── TrackStatus.js              # Application tracking
│   ├── Payment.js                  # Payment processing
│   ├── PrintApplication.js         # PDF download
│   ├── ReuploadDocument.js         # Document replacement
│   │
│   ├── EmbassyLogin.js             # Embassy officer login
│   ├── EmbassyDashboard.js         # Officer's application list
│   ├── ApplicationDetail.js        # Application review & approval
│   │
│   ├── AdminLogin.js               # Admin authentication
│   ├── AdminDashboard.js           # Admin navigation hub
│   ├── AllApplications.js          # System-wide application view
│   └── EmbassyManagement.js        # Embassy CRUD operations
│
├── package.json
└── README.md
```

### Features by Role

#### Applicants
- Register with passport scan upload
- Two-step OTP authentication
- Apply for new visas (3-step process)
- Save and complete draft applications
- Track application status
- Make payments
- Download application PDFs
- Reupload documents if needed

#### Embassy Officers
- Login with Embassy ID and password
- View applications for their country
- Search and filter applications
- Review full application details
- Approve or reject with remarks

#### Admins
- System-wide application management
- Filter by country and search by ID
- Full embassy CRUD operations
- Delete confirmation guards

### Getting Started

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API endpoint (optional):
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

#### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

### API Integration

The frontend expects a backend API running at `http://localhost:5000` by default. You can configure this using the `REACT_APP_API_URL` environment variable.

All API calls use Axios with authentication headers where required.

### Design System

The application uses a custom CSS design system defined in `global.css`:

- **Color Palette**: Bleach & white theme
- **Shared Components**: Cards, forms, buttons, tables, badges
- **Responsive Design**: Mobile-friendly layouts
- **No External UI Library**: Pure CSS with variables

### Routes

#### Public Routes
- `/` - Landing page

#### Applicant Routes
- `/applicant/login` - Login
- `/applicant/register` - Registration
- `/dashboard` - Home dashboard
- `/apply-new-visa` - New application
- `/complete-application` - Draft management
- `/track-status` - Status tracking
- `/payment` - Payment processing
- `/print-application` - PDF download
- `/reupload-document` - Document replacement

#### Embassy Routes
- `/embassy/login` - Officer login
- `/embassy/dashboard` - Application list
- `/embassy/application/:id` - Application details

#### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin hub
- `/admin/applications` - All applications
- `/admin/embassies` - Embassy management

### Development Notes

- All components use React functional components with hooks
- State management is handled with useState and useEffect
- Navigation uses React Router's useNavigate hook
- Form validation is implemented inline
- File uploads support passport scans and visa documents
- OTP verification with resend functionality
- Confirmation dialogs for destructive actions

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Status**: ✅ Development server running on http://localhost:3000
