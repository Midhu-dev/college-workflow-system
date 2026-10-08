import { Link } from "react-router-dom";

function TeacherDashboard() {
  const summaryCards = [
    {
      title: "Class Issues",
      value: "4",
      icon: "⚠️",
      link: "/teacher/class-issues",
    },
    {
      title: "Leave / OD",
      value: "6",
      icon: "📋",
      link: "/teacher/leave-od",
    },
    {
      title: "Certificates",
      value: "3",
      icon: "📜",
      link: "/teacher/certificates",
    },
    {
      title: "Events",
      value: "2",
      icon: "📅",
      link: "/teacher/events",
    },
  ];

  const pendingRequests = [
    {
      student: "Midhun K",
      type: "Leave",
      reason: "Medical leave",
      status: "Pending",
    },
    {
      student: "Arun Kumar",
      type: "OD",
      reason: "Hackathon participation",
      status: "Pending",
    },
    {
      student: "Rahul S",
      type: "Certificate",
      reason: "Bonafide Certificate",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Teacher Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage student requests and college activities
            </p>
          </div>

          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-7 text-white mb-8">
          <h2 className="text-2xl font-bold">
            Welcome, Teacher 👋
          </h2>

          <p className="mt-2 text-blue-100">
            Review student requests, manage certificates, and publish
            college events.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {summaryCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {card.value}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
              </div>

              <p className="text-sm text-blue-600 mt-5 font-medium">
                Manage →
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Frequently used teacher actions
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/teacher/class-issues"
              className="border rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <div className="text-2xl mb-3">⚠️</div>

              <h3 className="font-semibold text-slate-800">
                Review Class Issues
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                View and resolve student class issues
              </p>
            </Link>

            <Link
              to="/teacher/leave-od"
              className="border rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <div className="text-2xl mb-3">📋</div>

              <h3 className="font-semibold text-slate-800">
                Leave / OD Requests
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Approve or reject student requests
              </p>
            </Link>

            <Link
              to="/teacher/certificates"
              className="border rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <div className="text-2xl mb-3">📜</div>

              <h3 className="font-semibold text-slate-800">
                Certificates
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Review certificate submissions
              </p>
            </Link>

            <Link
              to="/teacher/events"
              className="border rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <div className="text-2xl mb-3">📅</div>

              <h3 className="font-semibold text-slate-800">
                Create Event
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Publish events and upload posters
              </p>
            </Link>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Pending Requests
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Requests waiting for your review
              </p>
            </div>

            <Link
              to="/teacher/leave-od"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-semibold text-slate-600">
                    Student
                  </th>

                  <th className="pb-3 text-sm font-semibold text-slate-600">
                    Request Type
                  </th>

                  <th className="pb-3 text-sm font-semibold text-slate-600">
                    Reason
                  </th>

                  <th className="pb-3 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="pb-3 text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {pendingRequests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-4 text-sm font-medium text-slate-800">
                      {request.student}
                    </td>

                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                        {request.type}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-slate-600">
                      {request.reason}
                    </td>

                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium">
                        {request.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <Link
                        to="/teacher/leave-od"
                        className="text-sm text-blue-600 font-medium hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;