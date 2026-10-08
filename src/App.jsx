import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";

import ClassIssue from "./Pages/ClassIssue";
import LeaveOD from "./Pages/LeaveOD";
import Events from "./Pages/Events";
import CertificateUpload from "./Pages/CertificateUpload";
import CertificateRequest from "./Pages/CertificateRequest";
import MyRequests from "./Pages/MyRequests";

import TeacherClassIssues from "./Pages/TeacherClassIssues";
import TeacherLeaveOD from "./Pages/TeacherLeaveOD";
import TeacherCertificates from "./Pages/TeacherCertificates";
import TeacherEvents from "./Pages/TeacherEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/class-issue" element={<ClassIssue />} />
        <Route path="/student/leave-od" element={<LeaveOD />} />
        <Route path="/student/events" element={<Events />} />
        <Route
          path="/student/certificate-upload"
          element={<CertificateUpload />}
        />
        <Route
          path="/student/certificate-request"
          element={<CertificateRequest />}
        />
        <Route path="/student/requests" element={<MyRequests />} />

        {/* Teacher */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route
          path="/teacher/class-issues"
          element={<TeacherClassIssues />}
        />
        <Route path="/teacher/leave-od" element={<TeacherLeaveOD />} />
        <Route
          path="/teacher/certificates"
          element={<TeacherCertificates />}
        />
        <Route path="/teacher/events" element={<TeacherEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;