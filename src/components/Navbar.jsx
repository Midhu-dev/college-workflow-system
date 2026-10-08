import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ role = "student" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Retrieve user data safely
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const studentLinks = [
    { label: "Dashboard", path: "/student" },
    { label: "Class Issue", path: "/student/class-issue" },
    { label: "My Issues", path: "/student/my-class-issues" },
    { label: "Leave / OD", path: "/student/leave-od" },
    { label: "Events", path: "/student/events" },
    { label: "Upload Cert", path: "/student/certificate-upload" },
    { label: "Request Cert", path: "/student/certificate-request" },
    { label: "My Requests", path: "/student/requests" },
  ];

  const teacherLinks = [
    { label: "Dashboard", path: "/teacher" },
    { label: "Class Issues", path: "/teacher/class-issues" },
    { label: "Leave / OD", path: "/teacher/leave-od" },
    { label: "Certificates", path: "/teacher/certificates" },
    { label: "Cert Requests", path: "/teacher/certificate-requests" },
    { label: "Events", path: "/teacher/events" },
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;

  const isLinkActive = (path) => {
    if (path === "/student" || path === "/teacher") {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const userName = user?.name || user?.username || (role === "teacher" ? "Faculty" : "Student");
  const userIdentifier = user?.userId || user?.studentId || user?.teacherId || "";
  const avatarLetter = (userName || "U").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur border-b border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* BRAND */}
          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] flex items-center justify-center font-bold text-[#050505] text-sm shadow-md group-hover:bg-[#E5C158] transition-colors">
              CW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight leading-none group-hover:text-[#D4AF37] transition-colors">
                  Campus Connect
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#1A160A] border border-[#3D3318] text-[#D4AF37]">
                  {role === "teacher" ? "Faculty" : "Student"}
                </span>
              </div>
              <p className="text-[11px] text-[#888888] leading-none mt-1">
                College Workflow System
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {links.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                    active
                      ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318] shadow-sm font-semibold"
                      : "text-[#888888] border-transparent hover:text-white hover:bg-[#121212]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* USER INFO + LOGOUT */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 px-2.5 py-1 rounded-lg bg-[#0D0D0D] border border-[#292929]">
              <div className="w-7 h-7 rounded-full bg-[#1A160A] border border-[#3D3318] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
                {avatarLetter}
              </div>
              <div className="text-left leading-tight pr-1">
                <p className="text-xs font-medium text-white max-w-[120px] truncate">
                  {userName}
                </p>
                {userIdentifier && (
                  <p className="text-[10px] text-[#888888] truncate max-w-[120px]">
                    {userIdentifier}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs text-[#888888] font-medium px-3 py-1.5 rounded-lg border border-[#292929] hover:text-[#D4AF37] hover:border-[#D4AF37] bg-[#0D0D0D] transition-colors"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleLogout}
              className="sm:hidden text-xs text-[#888888] px-2.5 py-1 rounded-lg border border-[#292929] hover:text-[#D4AF37] bg-[#0D0D0D]"
            >
              Logout
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-[#888888] hover:text-white hover:bg-[#121212] border border-[#292929]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE COLLAPSIBLE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#292929] py-3 space-y-1">
            <div className="px-3 py-2 mb-2 rounded-lg bg-[#0D0D0D] border border-[#292929] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1A160A] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                  {avatarLetter}
                </div>
                <span className="text-xs font-medium text-white">{userName}</span>
              </div>
              <span className="text-[10px] text-[#888888]">{userIdentifier}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {links.map((item) => {
                const active = isLinkActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition border text-center ${
                      active
                        ? "bg-[#17130A] text-[#D4AF37] border-[#3D3318] font-semibold"
                        : "text-[#888888] border-[#1F1F1F] bg-[#0D0D0D] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
