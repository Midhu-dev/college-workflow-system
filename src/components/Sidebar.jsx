import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ role = "student", children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const userName =
    user?.name ||
    user?.username ||
    (role === "teacher" ? "Faculty" : "Student");

  const userIdentifier =
    user?.userId || user?.studentId || user?.teacherId || "";

  const department = user?.department || "";
  const avatarLetter = (userName || "U").charAt(0).toUpperCase();

  const DashboardIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );

  const IssueIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      />
    </svg>
  );

  const ChecklistIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const EventIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM9 14l2 2 4-4"
      />
    </svg>
  );

  const UploadIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  );

  const DocumentIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const StudentStatusIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const LogoutIcon = () => (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const studentNavItems = [
    { label: "Dashboard", path: "/student", icon: <DashboardIcon /> },
    { label: "Class Issue", path: "/student/class-issue", icon: <IssueIcon /> },
    {
      label: "My Class Issues",
      path: "/student/my-class-issues",
      icon: <ChecklistIcon />,
    },
    { label: "Leave / OD", path: "/student/leave-od", icon: <CalendarIcon /> },
    { label: "Events", path: "/student/events", icon: <EventIcon /> },
    {
      label: "Certificate Upload",
      path: "/student/certificate-upload",
      icon: <UploadIcon />,
    },
    {
      label: "Certificate Request",
      path: "/student/certificate-request",
      icon: <DocumentIcon />,
    },
    {
      label: "My Requests",
      path: "/student/requests",
      icon: <ChecklistIcon />,
    },
  ];

  const teacherNavItems = [
    { label: "Dashboard", path: "/teacher", icon: <DashboardIcon /> },
    {
      label: "Class Issues",
      path: "/teacher/class-issues",
      icon: <IssueIcon />,
    },
    {
      label: "Leave / OD",
      path: "/teacher/leave-od",
      icon: <CalendarIcon />,
    },
    {
      label: "Certificate Uploads",
      path: "/teacher/certificates",
      icon: <UploadIcon />,
    },
    {
      label: "Certificate Requests",
      path: "/teacher/certificate-requests",
      icon: <DocumentIcon />,
    },
    { label: "Events", path: "/teacher/events", icon: <EventIcon /> },
    {
      label: "Student Status",
      path: "/teacher#student-status",
      isAnchor: true,
      icon: <StudentStatusIcon />,
    },
  ];

  const items = role === "teacher" ? teacherNavItems : studentNavItems;

  const isItemActive = (item) => {
    if (item.isAnchor) {
      return (
        location.pathname === "/teacher" &&
        location.hash === "#student-status"
      );
    }

    if (item.path === "/teacher") {
      return (
        location.pathname === "/teacher" &&
        location.hash !== "#student-status"
      );
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
    <div className="cc-layout">
      <style>{`
        .cc-layout {
          --cc-white: #ffffff;
          --cc-foreground: #202020;
          --cc-muted: #777777;
          --cc-border: #dedede;
          --cc-yellow: #fff09a;
          --cc-yellow-soft: #fff9dc;
          --cc-hover: #f7f7f5;

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--cc-white);
          color: var(--cc-foreground);
          font-family: inherit;
          font-size: 13px;
        }

        .cc-layout * {
          box-sizing: border-box;
        }

        .cc-layout a {
          color: inherit;
          text-decoration: none;
        }

        .cc-mobile-bar {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          height: 56px;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 16px;
          border-bottom: 1px solid var(--cc-border);
          background: #ffffff;
        }

        .cc-brand {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 10px;
        }

        .cc-logo {
          display: flex;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--cc-foreground);
          border-radius: 4px;
          background: var(--cc-yellow);
          color: var(--cc-foreground);
          font-size: 11px;
          font-weight: 800;
        }

        .cc-brand-name {
          overflow: hidden;
          font-size: 13px;
          font-weight: 750;
          letter-spacing: -0.25px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cc-brand-subtitle {
          margin-top: 2px;
          color: var(--cc-muted);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .cc-role-badge {
          padding: 5px 7px;
          border: 1px solid var(--cc-border);
          border-radius: 3px;
          background: #ffffff;
          color: var(--cc-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .cc-avatar {
          display: flex;
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cc-foreground);
          border-radius: 50%;
          background: var(--cc-yellow);
          color: var(--cc-foreground);
          font-size: 11px;
          font-weight: 700;
        }

        .cc-icon-button {
          display: inline-flex;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--cc-border);
          border-radius: 4px;
          background: #ffffff;
          color: var(--cc-foreground);
          cursor: pointer;
          transition: background 150ms ease;
        }

        .cc-icon-button:hover {
          background: var(--cc-yellow);
        }

        .cc-sidebar {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          display: flex;
          width: 248px;
          flex-direction: column;
          border-right: 1px solid var(--cc-foreground);
          background: #ffffff;
          transform: translateX(-100%);
          transition: transform 200ms ease;
        }

        .cc-sidebar-open {
          transform: translateX(0);
        }

        .cc-sidebar-brand {
          display: flex;
          min-height: 76px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 15px 17px;
          border-bottom: 1px solid var(--cc-border);
        }

        .cc-sidebar-brand .cc-logo {
          width: 36px;
          height: 36px;
          font-size: 12px;
        }

        .cc-close-button {
          display: inline-flex;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          border-radius: 4px;
          background: #ffffff;
          color: var(--cc-muted);
          cursor: pointer;
        }

        .cc-close-button:hover {
          border-color: var(--cc-border);
          color: var(--cc-foreground);
        }

        .cc-user-section {
          padding: 15px;
          border-bottom: 1px solid var(--cc-border);
        }

        .cc-user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          padding: 11px;
          border: 1px solid var(--cc-border);
          border-radius: 4px;
          background: #ffffff;
        }

        .cc-user-name {
          overflow: hidden;
          font-size: 12px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cc-user-meta {
          display: flex;
          min-width: 0;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
          color: var(--cc-muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .cc-user-meta span {
          overflow-wrap: anywhere;
        }

        .cc-nav {
          flex: 1;
          overflow-y: auto;
          padding: 18px 11px;
        }

        .cc-nav-label {
          padding: 0 10px;
          margin-bottom: 10px;
          color: var(--cc-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cc-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cc-nav-link {
          position: relative;
          display: flex;
          min-height: 38px;
          align-items: center;
          gap: 11px;
          padding: 9px 11px;
          border: 1px solid transparent;
          border-radius: 4px;
          color: #666666;
          font-size: 11px;
          font-weight: 500;
          transition:
            background 150ms ease,
            color 150ms ease,
            border-color 150ms ease;
        }

        .cc-nav-link:hover {
          border-color: var(--cc-border);
          background: var(--cc-hover);
          color: var(--cc-foreground);
        }

        .cc-nav-link-active {
          border-color: var(--cc-foreground);
          background: var(--cc-yellow);
          color: var(--cc-foreground);
          font-weight: 700;
        }

        .cc-nav-link-active:hover {
          border-color: var(--cc-foreground);
          background: var(--cc-yellow);
        }

        .cc-nav-icon {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }

        .cc-nav-text {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cc-logout-section {
          padding: 13px 12px;
          margin-top: auto;
          border-top: 1px solid var(--cc-border);
          background: #ffffff;
        }

        .cc-logout-button {
          display: flex;
          width: 100%;
          min-height: 39px;
          align-items: center;
          gap: 11px;
          padding: 9px 11px;
          border: 1px solid transparent;
          border-radius: 4px;
          background: #ffffff;
          color: #666666;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .cc-logout-button:hover {
          border-color: #e6b5b5;
          background: #fff3f3;
          color: #a32929;
        }

        .cc-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgb(0 0 0 / 30%);
          backdrop-filter: blur(2px);
        }

        .cc-main {
          display: flex;
          width: 100%;
          min-width: 0;
          min-height: calc(100vh - 56px);
          flex: 1;
          flex-direction: column;
          background: #ffffff;
        }

        .cc-layout a:focus-visible,
        .cc-layout button:focus-visible {
          outline: 2px solid var(--cc-foreground);
          outline-offset: 3px;
        }

        @media (min-width: 1024px) {
          .cc-mobile-bar {
            display: none;
          }

          .cc-sidebar {
            transform: translateX(0);
          }

          .cc-sidebar-brand {
            min-height: 76px;
          }

          .cc-close-button {
            display: none;
          }

          .cc-main {
            width: calc(100% - 248px);
            min-height: 100vh;
            margin-left: 248px;
          }
        }

        @media (max-width: 420px) {
          .cc-mobile-bar {
            padding: 0 10px;
          }

          .cc-brand-name {
            max-width: 145px;
          }

          .cc-role-badge {
            display: none;
          }

          .cc-sidebar {
            width: min(280px, 86vw);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-layout *,
          .cc-layout *::before,
          .cc-layout *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Mobile top bar */}
      <header className="cc-mobile-bar">
        <div className="cc-brand">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className="cc-icon-button"
          >
            <MenuIcon />
          </button>

          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            onClick={() => setMobileOpen(false)}
            className="cc-brand"
          >
            <span className="cc-logo">CW</span>

            <span>
              <span className="cc-brand-name">Campus Connect</span>
              <span className="cc-brand-subtitle">Student Portal</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="cc-role-badge">
            {role === "teacher" ? "Faculty" : "Student"}
          </span>

          <span className="cc-avatar" aria-label={userName}>
            {avatarLetter}
          </span>
        </div>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="cc-backdrop lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="campus-connect-sidebar"
        className={`cc-sidebar ${mobileOpen ? "cc-sidebar-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="cc-sidebar-brand">
          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            onClick={() => setMobileOpen(false)}
            className="cc-brand"
          >
            <span className="cc-logo">CW</span>

            <span className="min-w-0">
              <span className="cc-brand-name">Campus Connect</span>
              <span className="cc-brand-subtitle">
                {role === "teacher" ? "Faculty Portal" : "Student Portal"}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="cc-close-button lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* User information */}
        <div className="cc-user-section">
          <div className="cc-user-card">
            <span className="cc-avatar" aria-hidden="true">
              {avatarLetter}
            </span>

            <div className="min-w-0 flex-1">
              <p className="cc-user-name">{userName}</p>

              {(userIdentifier || department) && (
                <div className="cc-user-meta">
                  {userIdentifier && <span>{userIdentifier}</span>}

                  {department && (
                    <span>
                      {userIdentifier ? "· " : ""}
                      {department}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="cc-nav">
          <p className="cc-nav-label">Navigation</p>

          <div className="cc-nav-list">
            {items.map((item) => {
              const active = isItemActive(item);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => handleNavClick(item)}
                  aria-current={active ? "page" : undefined}
                  className={`cc-nav-link ${
                    active ? "cc-nav-link-active" : ""
                  }`}
                >
                  <span className="cc-nav-icon">{item.icon}</span>
                  <span className="cc-nav-text">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="cc-logout-section">
          <button
            type="button"
            onClick={handleLogout}
            className="cc-logout-button"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="cc-main">{children}</div>
    </div>
  );
}