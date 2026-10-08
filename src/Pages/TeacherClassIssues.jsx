import { useState } from "react";
import { Link } from "react-router-dom";

function TeacherClassIssues() {
  const [issues, setIssues] = useState([
    {
      id: "#CI-001",
      student: "Midhun K",
      issueType: "Classroom",
      title: "Projector not working",
      location: "Room A-204",
      description:
        "The projector is not working during class and the faculty is unable to display the presentation.",
      date: "Oct 8, 2026",
      status: "Pending",
    },
    {
      id: "#CI-002",
      student: "Arun Kumar",
      issueType: "Lab",
      title: "Computer system not working",
      location: "AI Lab",
      description:
        "One of the systems in the lab is not turning on.",
      date: "Oct 7, 2026",
      status: "Pending",
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleStatusChange = (id, status) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? { ...issue, status }
          : issue
      )
    );

    setSelectedIssue(null);
  };

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
              Teacher Portal
            </p>
          </div>

          <Link
            to="/teacher"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            ← Dashboard
          </Link>

        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Class Issues
          </h2>

          <p className="text-slate-500 mt-2">
            Review and resolve problems reported by students.
          </p>
        </div>

        {/* Issue List */}
        <div className="space-y-4">

          {issues.map((issue) => (

            <div
              key={issue.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                    🏫
                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="text-lg font-semibold text-slate-800">
                        {issue.title}
                      </h3>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          issue.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : issue.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {issue.status}
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-2">
                      {issue.issueType} • {issue.student}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      📍 {issue.location} • {issue.date}
                    </p>

                  </div>

                </div>

                {issue.status === "Pending" && (
                  <button
                    onClick={() => setSelectedIssue(issue)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    Review Issue
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* Review Modal */}
      {selectedIssue && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-7">

            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-sm text-slate-400">
                  {selectedIssue.id}
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {selectedIssue.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedIssue(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Reported By
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {selectedIssue.student}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Issue Type
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {selectedIssue.issueType}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {selectedIssue.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Description
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mt-2">
                  <p className="text-slate-700 text-sm leading-6">
                    {selectedIssue.description}
                  </p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-7 pt-5 border-t border-slate-200">

              <p className="text-sm font-semibold text-slate-700 mb-3">
                Update Issue Status
              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedIssue.id,
                      "Resolved"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  ✓ Mark Resolved
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedIssue.id,
                      "Rejected"
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  ✕ Reject Issue
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TeacherClassIssues;