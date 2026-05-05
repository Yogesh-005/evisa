import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";

/* Landing */
import Landing from "./pages/Landing";

/* Applicant */
import ApplicantLogin       from "./pages/applicant/ApplicantLogin";
import ApplicantRegister    from "./pages/applicant/ApplicantRegister";
import Dashboard            from "./pages/applicant/Dashboard";
import ApplyNewVisa         from "./pages/applicant/ApplyNewVisa";
import CompleteApplication  from "./pages/applicant/CompleteApplication";
import TrackStatus          from "./pages/applicant/TrackStatus";
import PrintApplication     from "./pages/applicant/PrintApplication";
import ReuploadDocument     from "./pages/applicant/ReuploadDocument";
import Payment              from "./pages/applicant/Payment";

/* Embassy Officer */
import EmbassyLogin         from "./pages/embassy/EmbassyLogin";
import EmbassyDashboard     from "./pages/embassy/EmbassyDashboard";
import ApplicationDetail    from "./pages/embassy/ApplicationDetail";

/* Admin */
import AdminLogin           from "./pages/admin/AdminLogin";
import AdminDashboard       from "./pages/admin/AdminDashboard";
import AllApplications      from "./pages/admin/AllApplications";
import EmbassyManagement    from "./pages/admin/EmbassyManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"                        element={<Landing />} />

        {/* Applicant */}
        <Route path="/applicant/login"         element={<ApplicantLogin />} />
        <Route path="/applicant/register"      element={<ApplicantRegister />} />
        <Route path="/dashboard"               element={<Dashboard />} />
        <Route path="/apply-new-visa"          element={<ApplyNewVisa />} />
        <Route path="/complete-application"    element={<CompleteApplication />} />
        <Route path="/track-status"            element={<TrackStatus />} />
        <Route path="/print-application"       element={<PrintApplication />} />
        <Route path="/reupload-document"       element={<ReuploadDocument />} />
        <Route path="/payment"                 element={<Payment />} />

        {/* Embassy Officer */}
        <Route path="/embassy/login"           element={<EmbassyLogin />} />
        <Route path="/embassy/dashboard"       element={<EmbassyDashboard />} />
        <Route path="/embassy/application/:id" element={<ApplicationDetail />} />

        {/* Admin */}
        <Route path="/admin/login"             element={<AdminLogin />} />
        <Route path="/admin/dashboard"         element={<AdminDashboard />} />
        <Route path="/admin/applications"      element={<AllApplications />} />
        <Route path="/admin/embassies"         element={<EmbassyManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
