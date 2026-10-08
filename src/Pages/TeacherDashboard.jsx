import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [classIssues, setClassIssues] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [certificateUploads, setCertificateUploads] = useState([]);
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const API = "http://localhost:5000/api";

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = getToken();

      if (!token) {
        navigate("/");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        classIssueResponse,
        leaveResponse,
        certificateUploadResponse,
        certificateRequestResponse,
        eventResponse,
        approvedResponse,
      ] = await Promise.all([
        fetch(`${API}/class-issues/pending`, { headers }),
        fetch(`${API}/leave-od/pending`, { headers }),
        fetch(`${API}/certificate-uploads/pending`, { headers }),
        fetch(`${API}/certificate-requests/pending`, { headers }),
        fetch(`${API}/events`, { headers }),
        fetch(`${API}/leave-od/approved/current`, { headers }),
      ]);

      if (
        !classIssueResponse.ok ||
        !leaveResponse.ok ||
        !certificateUploadResponse.ok ||
        !certificateRequestResponse.ok ||
        !eventResponse.ok ||
        !approvedResponse.ok
      ) {
        throw new Error("Failed to load dashboard data from server.");
      }

      const classIssueData = await classIssueResponse.json();
      const leaveData = await leaveResponse.json();
      const certificateUploadData =
        await certificateUploadResponse.json();
      const certificateRequestData =
        await certificateRequestResponse.json();
      const eventData = await eventResponse.json();
      const approvedData = await approvedResponse.json();

      setClassIssues(
        classIssueData.requests || classIssueData.issues || []
      );
      setLeaveRequests(leaveData.requests || []);
      setCertificateUploads(certificateUploadData.uploads || []);
      setCertificateRequests(certificateRequestData.requests || []);
      setEvents(eventData.events || []);
      setApprovedRequests(approvedData.requests || []);
    } catch (error) {
      console.error("Teacher dashboard error:", error);
      setErrorMessage(
        error.message || "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  let user = null;

  try {
    const raw = localStorage.getItem("user");

    if (raw) {
      user = JSON.parse(raw);
    }
  } catch {
    user = null;
  }

  const teacherName = user?.name || user?.username || "Faculty";
  const department = user?.department || "";

  const pendingClassIssues = classIssues.length;
  const pendingLeaveRequests = leaveRequests.length;
  const pendingCertificateUploads = certificateUploads.length;
  const pendingCertificateRequests = certificateRequests.length;
  const eventCount = events.length;

  const totalPendingWork =
    pendingClassIssues +
    pendingLeaveRequests +
    pendingCertificateUploads +
    pendingCertificateRequests;

  const absentStudents = approvedRequests.filter(
    (request) => request.request_type === "LEAVE"
  );

  const odStudents = approvedRequests.filter(
    (request) => request.request_type === "OD"
  );

  const formatDate = (date) => {
    if (!date) return "-";

    const value = String(date).split("T")[0];
    const parts = value.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatTime = (time) => {
    if (!time) return "";

    const value = String(time).substring(0, 5);
    const parts = value.split(":");

    if (parts.length < 2) return time;

    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">

      {/* ================= TEACHER SIDEBAR ================= */}
      <Sidebar role="teacher" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 min-w-0 flex flex-col">

        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">

          {/* ================= GREETING HERO ================= */}
          <div className="mb-8 bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 sm:p-8 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />

                  <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                    Faculty Management Desk
                  </span>

                  <span className="text-xs text-[#555555]">
                    •
                  </span>

                  <span className="text-xs text-[#888888]">
                    {todayFormatted}
                  </span>

                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Welcome, {teacherName}
                </h1>

                <p className="text-sm text-[#888888] mt-1.5 max-w-2xl leading-relaxed">
                  Review student grievances, verify credentials,
                  validate leave applications, and supervise
                  departmental on-duty participation.
                </p>

                {department && (
                  <div className="mt-3">

                    <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#292929] text-xs text-[#B8B8B8]">

                      Department:{" "}

                      <strong className="text-white font-semibold">
                        {department}
                      </strong>

                    </span>

                  </div>
                )}

              </div>

              {/* STATUS SUMMARY PILL */}
              <div className="shrink-0 flex items-center gap-3 bg-[#080808] border border-[#222222] p-4 rounded-xl">

                <div className="w-10 h-10 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-lg text-[#D4AF37]">
                  ⚡
                </div>

                <div>

                  <p className="text-xs font-semibold text-white">
                    {totalPendingWork > 0
                      ? `${totalPendingWork} Pending Actions`
                      : "All Queues Clear"}
                  </p>

                  <p className="text-[11px] text-[#888888]">
                    {totalPendingWork > 0
                      ? "Awaiting your review & decision"
                      : "No pending backlog"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">

              <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />

              <span className="leading-relaxed">
                {errorMessage}
              </span>

            </div>
          )}

          {/* ================= KEY METRICS / OVERVIEW CARDS ================= */}
          <div className="mb-10">

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-base font-bold text-white tracking-tight">
                  Review Queues & Workflows
                </h2>

                <p className="text-xs text-[#888888]">
                  Real-time queue counts prioritized for quick processing
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* 1. CLASS ISSUES */}
              <Link
                to="/teacher/class-issues"
                className="group bg-[#0D0D0D] border border-[#292929] hover:border-[#D4AF37]/70 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
                      Class Issues
                    </span>

                    <span className="text-lg">
                      🏫
                    </span>

                  </div>

                  <div className="mt-3">

                    <span className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {loading ? "—" : pendingClassIssues}
                    </span>

                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">

                  <span className="text-[11px] text-[#888888]">
                    Pending
                  </span>

                  <span className="text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                    Review →
                  </span>

                </div>

              </Link>

              {/* 2. LEAVE / OD */}
              <Link
                to="/teacher/leave-od"
                className="group bg-[#0D0D0D] border border-[#292929] hover:border-[#D4AF37]/70 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
                      Leave / OD
                    </span>

                    <span className="text-lg">
                      📝
                    </span>

                  </div>

                  <div className="mt-3">

                    <span className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {loading ? "—" : pendingLeaveRequests}
                    </span>

                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">

                  <span className="text-[11px] text-[#888888]">
                    Pending
                  </span>

                  <span className="text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                    Process →
                  </span>

                </div>

              </Link>

              {/* 3. CERTIFICATES */}
              <Link
                to="/teacher/certificates"
                className="group bg-[#0D0D0D] border border-[#292929] hover:border-[#D4AF37]/70 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
                      Cert Uploads
                    </span>

                    <span className="text-lg">
                      📜
                    </span>

                  </div>

                  <div className="mt-3">

                    <span className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {loading ? "—" : pendingCertificateUploads}
                    </span>

                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">

                  <span className="text-[11px] text-[#888888]">
                    Pending
                  </span>

                  <span className="text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                    Verify →
                  </span>

                </div>

              </Link>

              {/* 4. CERTIFICATE REQUESTS */}
              <Link
                to="/teacher/certificate-requests"
                className="group bg-[#0D0D0D] border border-[#292929] hover:border-[#D4AF37]/70 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
                      Cert Requests
                    </span>

                    <span className="text-lg">
                      📋
                    </span>

                  </div>

                  <div className="mt-3">

                    <span className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {loading ? "—" : pendingCertificateRequests}
                    </span>

                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">

                  <span className="text-[11px] text-[#888888]">
                    Pending
                  </span>

                  <span className="text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                    Process →
                  </span>

                </div>

              </Link>

              {/* 5. EVENTS */}
              <Link
                to="/teacher/events"
                className="group bg-[#0D0D0D] border border-[#292929] hover:border-[#D4AF37]/70 rounded-2xl p-5 transition-all duration-150 flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
                      Campus Events
                    </span>

                    <span className="text-lg">
                      🎉
                    </span>

                  </div>

                  <div className="mt-3">

                    <span className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {loading ? "—" : eventCount}
                    </span>

                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">

                  <span className="text-[11px] text-[#888888]">
                    Published
                  </span>

                  <span className="text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                    Manage →
                  </span>

                </div>

              </Link>

            </div>

          </div>

          {/* ================= LIVE STUDENT STATUS SECTION ================= */}
          <div className="mb-10">

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-base font-bold text-white tracking-tight">
                  Live Student Status (Today)
                </h2>

                <p className="text-xs text-[#888888]">
                  Real-time roster of students currently on officially
                  approved Leave or On-Duty permissions
                </p>

              </div>

              <Link
                to="/teacher/leave-od"
                className="text-xs text-[#D4AF37] hover:underline font-semibold"
              >
                Manage Leave / OD →
              </Link>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* ABSENT STUDENTS */}
              <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl overflow-hidden flex flex-col shadow-sm">

                <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#080808]">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-[#F87171]" />

                    <h3 className="text-sm font-bold text-white">
                      Absent Students (Leave)
                    </h3>

                  </div>

                  <StatusBadge status="ABSENT" />

                </div>

                <div className="p-4 flex-1">

                  {loading ? (
                    <LoadingState message="Loading absent student records..." />
                  ) : absentStudents.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#777777]">
                      ✓ No students are currently on approved leave today.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#1A1A1A]">

                      {absentStudents.map((student) => (

                        <div
                          key={student.id}
                          className="py-3 px-2 hover:bg-[#121212] rounded-lg transition"
                        >

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                            <div>

                              <p className="text-xs font-bold text-white">
                                {student.student_name}
                              </p>

                              <p className="text-[11px] text-[#888888] font-mono mt-0.5">
                                {student.student_user_id}

                                {student.department
                                  ? ` • ${student.department}`
                                  : ""}
                              </p>

                            </div>

                            <div className="sm:text-right text-xs">

                              <span className="text-[#CCCCCC] font-medium">
                                {formatDate(student.from_date)} →{" "}
                                {formatDate(student.to_date)}
                              </span>

                              {(student.from_time ||
                                student.to_time) && (
                                <p className="text-[10px] text-[#777777]">
                                  {formatTime(student.from_time)} →{" "}
                                  {formatTime(student.to_time)}
                                </p>
                              )}

                            </div>

                          </div>

                          {student.reason && (
                            <p className="text-sm text-[#888888] mt-2 bg-[#080808] p-2 rounded border border-[#1C1C1C]">

                              <strong className="text-[#AAAAAA]">
                                Reason:
                              </strong>{" "}

                              {student.reason}

                            </p>
                          )}

                        </div>

                      ))}

                    </div>
                  )}

                </div>

              </div>

              {/* OD STUDENTS */}
              <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl overflow-hidden flex flex-col shadow-sm">

                <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#080808]">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />

                    <h3 className="text-sm font-bold text-white">
                      On-Duty Students (OD)
                    </h3>

                  </div>

                  <StatusBadge status="OD" />

                </div>

                <div className="p-4 flex-1">

                  {loading ? (
                    <LoadingState message="Loading OD student records..." />
                  ) : odStudents.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#777777]">
                      ✓ No students are currently on approved on-duty participation.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#1A1A1A]">

                      {odStudents.map((student) => (

                        <div
                          key={student.id}
                          className="py-3 px-2 hover:bg-[#121212] rounded-lg transition"
                        >

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                            <div>

                              <p className="text-xs font-bold text-white">
                                {student.student_name}
                              </p>

                              <p className="text-[11px] text-[#888888] font-mono mt-0.5">
                                {student.student_user_id}

                                {student.department
                                  ? ` • ${student.department}`
                                  : ""}
                              </p>

                            </div>

                            <div className="sm:text-right text-xs">

                              <span className="text-[#CCCCCC] font-medium">
                                {formatDate(student.from_date)} →{" "}
                                {formatDate(student.to_date)}
                              </span>

                              {(student.from_time ||
                                student.to_time) && (
                                <p className="text-[10px] text-[#777777]">
                                  {formatTime(student.from_time)} →{" "}
                                  {formatTime(student.to_time)}
                                </p>
                              )}

                            </div>

                          </div>

                          {(student.activity_name ||
                            student.reason) && (

                            <p className="text-[11px] text-[#888888] mt-2 bg-[#080808] p-2 rounded border border-[#1C1C1C]">

                              <strong className="text-[#AAAAAA]">
                                Activity:
                              </strong>{" "}

                              {student.activity_name ||
                                student.reason}

                            </p>

                          )}

                        </div>

                      ))}

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </main>

        <Footer />

      </div>
    </div>
  );
}

export default TeacherDashboard;