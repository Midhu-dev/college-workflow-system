import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>

          <button className="text-sm text-red-600 font-medium hover:text-red-700">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Student Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Manage your college services and requests from one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Class Issue */}
          <Link
            to="/student/class-issue"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              🏫
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Class Issue
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Report problems related to your class or classroom.
            </p>
          </Link>

          {/* Leave / OD */}
          <Link
            to="/student/leave-od"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              📝
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Leave / OD
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Apply for leave or On Duty and track your request status.
            </p>
          </Link>

          {/* Events */}
          <Link
            to="/student/events"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              🎉
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Events
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View upcoming college events and register.
            </p>
          </Link>

          {/* Certificate Upload */}
          <Link
            to="/student/certificate-upload"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              📤
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Certificate Upload
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Upload certificates for verification.
            </p>
          </Link>

          {/* Certificate Request */}
          <Link
            to="/student/certificate-request"
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              📋
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Certificate Request
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Request certificates from the college.
            </p>
          </Link>

        </div>

        {/* My Requests */}
        <div className="mt-8">
          <Link
            to="/student/requests"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            View My Requests
          </Link>
        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;