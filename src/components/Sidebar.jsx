import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ role = "student", children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar whenever location changes and handle anchor scrolling
  useEffect(() => {
    setMobileOpen(false);
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.pathname, location.hash]);

  // Retrieve user data from localStorage
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

  const userName = user?.name || user?.username || (role === "teacher" ? "Faculty" : "Student");
  const userIdentifier = user?.userId || user?.studentId || user?.teacherId || "";
  const department = user?.department || "";
  const avatarLetter = (userName || "U").charAt(0).toUpperCase();

  // Navigation items strictly according to requirements
  const studentNavItems = [
    {
      label: "Dashboard",
      path: "/student",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      label: "Class Issue",
      path: "/student/class-issue",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
    },
    {
      label: "My Class Issues",
      path: "/student/my-class-issues",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Leave / OD",
      path: "/student/leave-od",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Events",
      path: "/student/events",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Certificate Upload",
      path: "/student/certificate-upload",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      label: "Certificate Request",
      path: "/student/certificate-request",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "My Requests",
      path: "/student/requests",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  const teacherNavItems = [
    {
      label: "Dashboard",
      path: "/teacher",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      label: "Class Issues",
      path: "/teacher/class-issues",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
    },
    {
      label: "Leave / OD",
      path: "/teacher/leave-od",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Certificate Uploads",
      path: "/teacher/certificates",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      label: "Certificate Requests",
      path: "/teacher/certificate-requests",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Events",
      path: "/teacher/events",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Student Status",
      path: "/teacher#student-status",
      isAnchor: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const items = role === "teacher" ? teacherNavItems : studentNavItems;

  const isItemActive = (item) => {
    if (item.isAnchor) {
      return location.pathname === "/teacher" && location.hash === "#student-status";
    }
    if (item.path === "/teacher") {
      return location.pathname === "/teacher" && location.hash !== "#student-status";
    }
    if (item.path === "/student") {
      return location.pathname === "/student";
    }
    return location.pathname === item.path;
  };

  const handleNavClick = (item) => {
    setMobileOpen(false);
    if (item.isAnchor && location.pathname === "/teacher") {
      const el = document.getElementById("student-status");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      
      {/* ================= MOBILE / TABLET TOP BAR (lg:hidden) ================= */}
      <header className="lg:hidden sticky top-0 z-30 h-14 bg-[#080808]/95 backdrop-blur border-b border-[#292929] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="p-1.5 rounded-lg bg-[#0D0D0D] border border-[#292929] text-[#CCCCCC] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#050505] font-bold text-xs flex items-center justify-center">
              CW
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              Campus Connect
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#17130A] border border-[#3D3318] text-[#D4AF37]">
            {role === "teacher" ? "Faculty" : "Student"}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#1A160A] border border-[#3D3318] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
            {avatarLetter}
          </div>
        </div>
      </header>

      {/* ================= MOBILE BACKDROP OVERLAY ================= */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* ================= SIDEBAR (Desktop Fixed + Mobile Drawer) ================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#0D0D0D] border-r border-[#292929] z-50 flex flex-col transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BRAND HEADER */}
        <div className="p-5 border-b border-[#292929] flex items-center justify-between">
          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] flex items-center justify-center font-bold text-[#050505] text-sm shrink-0 shadow-md group-hover:bg-[#E5C158] transition-colors">
              CW
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-white tracking-tight block truncate group-hover:text-[#D4AF37] transition-colors">
                Campus Connect
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#1A160A] border border-[#3D3318] text-[#D4AF37] inline-block mt-0.5">
                {role === "teacher" ? "Faculty Portal" : "Student Portal"}
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#171717] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* USER INFORMATION AT TOP */}
        <div className="p-4 border-b border-[#292929]">
          <div className="p-3 rounded-xl bg-[#080808] border border-[#222222] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A160A] border border-[#3D3318] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
              {avatarLetter}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {userName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {userIdentifier && (
                  <p className="text-[10px] text-[#888888] font-mono truncate">
                    {userIdentifier}
                  </p>
                )}
                {department && (
                  <span className="text-[10px] text-[#666666] truncate">
                    • {department}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 text-[10px] font-semibold text-[#666666] uppercase tracking-wider mb-2">
            Navigation
          </p>

          {items.map((item) => {
            const active = isItemActive(item);

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 ${
                  active
                    ? "bg-[#17130A] text-[#D4AF37] border border-[#3D3318] font-semibold shadow-sm"
                    : "text-[#888888] border border-transparent hover:text-white hover:bg-[#121212] font-medium"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#D4AF37]" />
                )}

                <span className={active ? "text-[#D4AF37]" : "text-[#888888]"}>
                  {item.icon}
                </span>

                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON AT BOTTOM */}
        <div className="p-4 border-t border-[#292929] mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#888888] hover:text-[#F87171] hover:bg-[#1C0D0D] border border-transparent hover:border-[#3D1B1B] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      {/* lg:pl-64 provides persistent 256px spacing on desktop so content never overlaps sidebar */}
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen w-full">
        {children}
      </div>

    </div>
  );
}
