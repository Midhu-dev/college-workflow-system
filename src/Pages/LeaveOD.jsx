import { useState } from "react";
import { Link } from "react-router-dom";

function LeaveOD() {
  const [type, setType] = useState("Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason) {
      setMessage("Please fill all the fields.");
      return;
    }

    const existingRequests =
      JSON.parse(localStorage.getItem("leaveODRequests")) || [];

    const newRequest = {
      id: Date.now(),
      student: "Midhun K",
      registerNo: "AI2025",
      type,
      fromDate,
      toDate,
      reason,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "leaveODRequests",
      JSON.stringify([...existingRequests, newRequest])
    );

    setFromDate("");
    setToDate("");
    setReason("");
    setMessage(`${type} request submitted successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Leave / OD Application
          </h1>

          <p className="text-slate-500">
            Submit your leave or on-duty request
          </p>
        </div>

        <Link
          to="/student"
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          {message && (
            <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Request Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Leave">Leave</option>
                <option value="OD">OD</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  From Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  To Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Reason
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                placeholder={
                  type === "Leave"
                    ? "Enter the reason for your leave..."
                    : "Enter the reason for your OD..."
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit {type} Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveOD;