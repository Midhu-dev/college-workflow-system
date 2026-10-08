import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    setRequests(storedRequests);
  };

  useEffect(() => {
    loadRequests();

    const handleStorage = () => {
      loadRequests();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-50 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700";
    }

    return "bg-yellow-50 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Requests
          </h1>

          <p className="text-slate-500">
            Track your Leave and OD requests
          </p>
        </div>

        <Link
          to="/student"
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">
              📋
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              No Requests Yet
            </h2>

            <p className="text-slate-500 mt-2">
              Your Leave and OD requests will appear here.
            </p>

            <Link
              to="/student/leave-od"
              className="inline-block mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Apply for Leave / OD
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl border shadow-sm p-6"
              >
                {/* Top */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800">
                      {request.type} Request
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400">
                    #{request.id}
                  </p>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-3 gap-5 mt-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      From Date
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {request.fromDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      To Date
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {request.toDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Submitted
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {request.submittedAt}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <div className="mt-6 bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                    Reason
                  </p>

                  <p className="text-sm text-slate-700">
                    {request.reason}
                  </p>
                </div>

                {/* Review information */}
                {request.status !== "Pending" && (
                  <div
                    className={`mt-4 rounded-xl p-4 ${
                      request.status === "Approved"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        request.status === "Approved"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {request.status === "Approved"
                        ? "✓ Your request has been approved."
                        : "✕ Your request has been rejected."}
                    </p>

                    {request.reviewedAt && (
                      <p className="text-xs text-slate-500 mt-1">
                        Reviewed: {request.reviewedAt}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRequests;