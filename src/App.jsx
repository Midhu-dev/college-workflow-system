import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login
import Login from "./Pages/Login";

// Student pages
import StudentDashboard from "./Pages/StudentDashboard";
import ClassIssue from "./Pages/ClassIssue";
import MyClassIssues from "./Pages/MyClassIssues";
import LeaveOD from "./Pages/LeaveOD";
import Events from "./Pages/Events";
import CertificateUpload from "./Pages/CertificateUpload";
import CertificateRequest from "./Pages/CertificateRequest";
import MyRequests from "./Pages/MyRequests";

// Teacher pages
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherClassIssues from "./Pages/TeacherClassIssues";
import TeacherLeaveOD from "./Pages/TeacherLeaveOD";
import TeacherCertificates from "./Pages/TeacherCertificates";
import TeacherEvents from "./Pages/TeacherEvents";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("college-theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("college-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("college-theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          transition-colors
          duration-300
          bg-[#DDE2DE]
          text-[#26312C]
          dark:bg-[#18231F]
          dark:text-[#E8EEE9]
        "
      >
        <Routes>

          {/* ================= LOGIN ================= */}
          <Route path="/" element={<Login />} />

          {/* ================= STUDENT ================= */}
          <Route
            path="/student"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/class-issue"
            element={<ClassIssue />}
          />

          <Route
            path="/student/my-class-issues"
            element={<MyClassIssues />}
          />

          <Route
            path="/student/leave-od"
            element={<LeaveOD />}
          />

          <Route
            path="/student/events"
            element={<Events />}
          />

          <Route
            path="/student/certificate-upload"
            element={<CertificateUpload />}
          />

          <Route
            path="/student/certificate-request"
            element={<CertificateRequest />}
          />

          <Route
            path="/student/requests"
            element={<MyRequests />}
          />

          {/* ================= TEACHER ================= */}
          <Route
            path="/teacher"
            element={<TeacherDashboard />}
          />

          <Route
            path="/teacher/class-issues"
            element={<TeacherClassIssues />}
          />

          <Route
            path="/teacher/leave-od"
            element={<TeacherLeaveOD />}
          />

          <Route
            path="/teacher/certificates"
            element={<TeacherCertificates />}
          />

          <Route
            path="/teacher/events"
            element={<TeacherEvents />}
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;