import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function StudentDashboard() {
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch {
    user = null;
  }

  const studentName = user?.name || user?.username || "Student";
  const studentId = user?.userId || user?.studentId || "";
  const department = user?.department || "";

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const modules = [
    {
      title: "Class Issue",
      description: "Report maintenance, timetable, or classroom issues directly to faculty.",
      link: "/student/class-issue",
      actionText: "Report Issue",
      icon: "🏫",
      badge: "Grievance",
    },
    {
      title: "My Class Issues",
      description: "Track status updates and faculty resolution comments on your reported issues.",
      link: "/student/my-class-issues",
      actionText: "View Issues",
      icon: "📂",
      badge: "History",
    },
    {
      title: "Leave / OD",
      description: "Apply for official leave or on-duty permissions with instant approval tracking.",
      link: "/student/leave-od",
      actionText: "Apply Now",
      icon: "📝",
      badge: "Attendance",
    },
    {
      title: "Campus Events",
      description: "Discover upcoming workshops, hackathons, and symposiums happening on campus.",
      link: "/student/events",
      actionText: "Browse Events",
      icon: "🎉",
      badge: "Activities",
    },
    {
      title: "Certificate Upload",
      description: "Submit external course completions, achievements, and MOOC certificates for verification.",
      link: "/student/certificate-upload",
      actionText: "Upload Document",
      icon: "📤",
      badge: "Verification",
    },
    {
      title: "Certificate Request",
      description: "Request bonafide, conduct, or official institutional certificates online.",
      link: "/student/certificate-request",
      actionText: "Request Now",
      icon: "📋",
      badge: "Official",
    },
  ];

  return (
    <Sidebar role="student">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        {/* ================= GREETING HERO ================= */}
        <div className="mb-10 bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                  Student Academic Portal
                </span>
                <span className="text-xs text-[#555555]">•</span>
                <span className="text-xs text-[#888888]">{todayFormatted}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Welcome back, {studentName}
              </h1>

              <p className="text-sm text-[#888888] mt-2 max-w-2xl leading-relaxed">
                Access your campus services, submit administrative requests, and track real-time faculty approvals from your central student desk.
              </p>

              {(studentId || department) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#1F1F1F]">
                  {studentId && (
                    <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#292929] text-xs text-[#B8B8B8] font-mono">
                      Reg No: <strong className="text-white font-semibold">{studentId}</strong>
                    </span>
                  )}
                  {department && (
                    <span className="px-2.5 py-1 rounded-md bg-[#141414] border border-[#292929] text-xs text-[#B8B8B8]">
                      Dept: <strong className="text-white font-semibold">{department}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* QUICK ACTIONS BANNER BUTTON */}
            <div className="shrink-0 flex sm:flex-col gap-2.5">
              <Link
                to="/student/requests"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm text-center"
              >
                Track All Requests →
              </Link>
              <Link
                to="/student/my-class-issues"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] text-[#B8B8B8] hover:text-white border border-[#292929] text-xs font-medium transition text-center"
              >
                Track Issues →
              </Link>
            </div>
          </div>
        </div>

        {/* ================= SECTION TITLE ================= */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Student Modules & Workflows
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">
              Select a module below to initiate a request or report
            </p>
          </div>
          <span className="text-xs text-[#D4AF37] font-semibold bg-[#17130A] border border-[#3D3318] px-2.5 py-1 rounded-full">
            6 Services
          </span>
        </div>

        {/* ================= FEATURE CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className="group bg-[#0D0D0D] p-6 rounded-2xl border border-[#292929] hover:border-[#D4AF37]/70 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#141414] text-[#888888] border border-[#222222]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#888888] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                <span className="text-xs text-[#D4AF37] font-semibold group-hover:underline">
                  {item.actionText}
                </span>
                <span className="text-xs text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= TRACKING CARDS ROW ================= */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Leave & OD tracking */}
          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                  Leave & OD Status
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Leave & OD Request History
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Monitor teacher approvals, timestamps, and request logs.
              </p>
            </div>
            <Link
              to="/student/requests"
              className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] px-4 py-2.5 rounded-xl font-bold text-xs transition shrink-0"
            >
              View Requests →
            </Link>
          </div>

          {/* Class Issues tracking */}
          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                  Grievance Tracker
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                My Class Issue Reports
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Check whether your reported classroom issues have been resolved.
              </p>
            </div>
            <Link
              to="/student/my-class-issues"
              className="inline-flex items-center justify-center bg-[#17130A] hover:bg-[#241E10] border border-[#3D3318] text-[#D4AF37] px-4 py-2.5 rounded-xl font-bold text-xs transition shrink-0"
            >
              View Issues →
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </Sidebar>
  );
}

export default StudentDashboard;