import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherLeaveOD() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    setRequests(storedRequests);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = (id, status) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? {
            ...request,
            status,
            reviewedAt: new Date().toLocaleString(),
          }
        : request
    );

    localStorage.setItem(
      "leaveODRequests",
      JSON.stringify(updatedRequests)
    );

    setRequests(updatedRequests);
  };

  const pending = requests.filter(
    (request) => request.status === "Pending"
  );

  const approved = requests.filter(
    (request) => request.status === "Approved"
  );

  const rejected = requests.filter(
    (request) => request.status === "Rejected"
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Leave / OD Requests
          </h1>

          <p className="text-slate-500">
            Review and manage student requests
          </p>
        </div>

        <Link
          to="/teacher"
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border rounded-2xl p-6">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {pending.length}
            </h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-sm text-slate-500">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {approved.length}
            </h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-sm text-slate-500">
              Rejected
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {rejected.length}
            </h2>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Student Requests
          </h2>

          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">
                📋
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No Requests
              </h3>

              <p className="text-slate-500 mt-1">
                Student Leave / OD requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                    {/* Request Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-lg text-slate-800">
                          {request.student}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.type === "Leave"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {request.type}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : request.status === "Approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-600">
                        <p>
                          <strong>Register No:</strong>{" "}
                          {request.registerNo}
                        </p>

                        <p>
                          <strong>From:</strong>{" "}
                          {request.fromDate}
                        </p>

                        <p>
                          <strong>To:</strong>{" "}
                          {request.toDate}
                        </p>

                        <p>
                          <strong>Submitted:</strong>{" "}
                          {request.submittedAt}
                        </p>
                      </div>

                      <div className="mt-4 bg-slate-50 rounded-lg p-4">
                        <p className="text-xs font-semibold text-slate-500 mb-1">
                          REASON
                        </p>

                        <p className="text-sm text-slate-700">
                          {request.reason}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {request.status === "Pending" && (
                      <div className="flex lg:flex-col gap-3 justify-center">
                        <button
                          onClick={() =>
                            updateStatus(request.id, "Approved")
                          }
                          className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                        >
                          ✓ Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(request.id, "Rejected")
                          }
                          className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherLeaveOD;  