import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";

/* Landing */
import Landing from "./Landing";

/* Applicant */
import ApplicantLogin    from "./ApplicantLogin";
import ApplicantRegister from "./ApplicantRegister";
import Dashboard         from "./Dashboard";
import ApplyNewVisa      from "./ApplyNewVisa";
import CompleteApplication from "./CompleteApplication";
import TrackStatus       from "./TrackStatus";
import PrintApplication  from "./PrintApplication";
import ReuploadDocument  from "./ReuploadDocument";
import Payment           from "./Payment";

/* Embassy Officer */
import EmbassyLogin       from "./EmbassyLogin";
import EmbassyDashboard   from "./EmbassyDashboard";
import ApplicationDetail  from "./ApplicationDetail";

/* Admin */
import AdminLogin        from "./AdminLogin";
import AdminDashboard    from "./AdminDashboard";
import AllApplications   from "./AllApplications";
import EmbassyManagement from "./EmbassyManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"                    element={<Landing />} />

        {/* Applicant */}
        <Route path="/applicant/login"     element={<ApplicantLogin />} />
        <Route path="/applicant/register"  element={<ApplicantRegister />} />
        <Route path="/dashboard"           element={<Dashboard />} />
        <Route path="/apply-new-visa"      element={<ApplyNewVisa />} />
        <Route path="/complete-application" element={<CompleteApplication />} />
        <Route path="/track-status"        element={<TrackStatus />} />
        <Route path="/print-application"   element={<PrintApplication />} />
        <Route path="/reupload-document"   element={<ReuploadDocument />} />
        <Route path="/payment"             element={<Payment />} />

        {/* Embassy Officer */}
        <Route path="/embassy/login"       element={<EmbassyLogin />} />
        <Route path="/embassy/dashboard"   element={<EmbassyDashboard />} />
        <Route path="/embassy/application/:id" element={<ApplicationDetail />} />

        {/* Admin */}
        <Route path="/admin/login"         element={<AdminLogin />} />
        <Route path="/admin/dashboard"     element={<AdminDashboard />} />
        <Route path="/admin/applications"  element={<AllApplications />} />
        <Route path="/admin/embassies"     element={<EmbassyManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
