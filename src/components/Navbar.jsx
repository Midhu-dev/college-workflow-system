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

    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  const userName =
    user?.name ||
    user?.username ||
    (role === "teacher" ? "Faculty" : "Student");

  const userIdentifier =
    user?.userId || user?.studentId || user?.teacherId || "";

  const avatarLetter = (userName || "U").charAt(0).toUpperCase();

  const roleLabel = role === "teacher" ? "Faculty" : "Student";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleMobileLogout = () => {
    closeMobileMenu();
    handleLogout();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-2">
          {/* BRAND */}
          <Link
            to={role === "teacher" ? "/teacher" : "/student"}
            onClick={closeMobileMenu}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label="Campus Connect home"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E9D99F] bg-[#FBF7E9] text-sm font-bold text-[#80651E] transition-colors group-hover:bg-[#F5ECCB]">
              CW
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-sm font-bold tracking-tight text-gray-800 transition-colors group-hover:text-[#9A7926] sm:text-base">
                  Campus Connect
                </span>

                <span className="rounded-md border border-[#EDE2BD] bg-[#FBF7E9] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#80651E]">
                  {roleLabel}
                </span>
              </div>

              <p className="mt-0.5 hidden text-[10px] leading-4 text-gray-500 sm:block sm:text-[11px]">
                College Workflow System
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 overflow-x-auto py-1 lg:flex"
          >
            {links.map((item) => {
              const active = isLinkActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-lg border px-2.5 py-2 text-[11px] font-medium transition-colors xl:px-3 xl:text-xs ${
                    active
                      ? "border-[#E9D99F] bg-[#FBF7E9] font-semibold text-[#80651E]"
                      : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* USER INFO + LOGOUT */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <div className="flex max-w-[190px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E9D99F] bg-[#FBF7E9] text-xs font-bold text-[#80651E]">
                {avatarLetter}
              </div>

              <div className="min-w-0 pr-1 text-left leading-tight">
                <p className="max-w-[125px] truncate text-xs font-semibold text-gray-800">
                  {userName}
                </p>

                {userIdentifier && (
                  <p className="mt-1 max-w-[125px] truncate text-[10px] text-gray-500">
                    {userIdentifier}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition-colors hover:border-[#E9D99F] hover:bg-[#FBF7E9] hover:text-[#80651E] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/30"
            >
              Logout
            </button>
          </div>

          {/* TABLET + MOBILE ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleMobileLogout}
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 text-[11px] font-semibold text-gray-600 transition-colors hover:border-[#E9D99F] hover:bg-[#FBF7E9] hover:text-[#80651E] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/30 sm:px-3 sm:text-xs"
            >
              Logout
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#E9D99F] hover:bg-[#FBF7E9] hover:text-[#80651E] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/30"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* TABLET NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden gap-1 overflow-x-auto border-t border-gray-100 py-2 lg:hidden sm:flex"
        >
          {links.map((item) => {
            const active = isLinkActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "border-[#E9D99F] bg-[#FBF7E9] font-semibold text-[#80651E]"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* MOBILE COLLAPSIBLE MENU */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 py-3 sm:hidden"
          >
            {/* User information */}
            <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E9D99F] bg-[#FBF7E9] text-xs font-bold text-[#80651E]">
                  {avatarLetter}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-gray-800">
                    {userName}
                  </p>

                  {userIdentifier && (
                    <p className="mt-0.5 truncate text-[10px] text-gray-500">
                      {userIdentifier}
                    </p>
                  )}
                </div>
              </div>

              <span className="shrink-0 rounded-md border border-[#EDE2BD] bg-[#FBF7E9] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#80651E]">
                {roleLabel}
              </span>
            </div>

            {/* Navigation links */}
            <nav aria-label="Mobile navigation">
              <div className="grid grid-cols-2 gap-2">
                {links.map((item) => {
                  const active = isLinkActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center justify-center rounded-lg border px-3 py-2 text-center text-xs font-medium transition-colors ${
                        active
                          ? "border-[#E9D99F] bg-[#FBF7E9] font-semibold text-[#80651E]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#E9D99F] hover:bg-[#FBF7E9] hover:text-[#80651E]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}