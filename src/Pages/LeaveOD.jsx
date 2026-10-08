import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function LeaveOD() {
  const [type, setType] = useState("Leave");

  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");

  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const [reason, setReason] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  const openDatePicker = (event) => {
    if (event.currentTarget.showPicker) {
      try {
        event.currentTarget.showPicker();
      } catch {
        // Handled by browser
      }
    }
  };

  const openTimePicker = (event) => {
    if (event.currentTarget.showPicker) {
      try {
        event.currentTarget.showPicker();
      } catch {
        // Handled by browser
      }
    }
  };

  const fetchRequests = async () => {
    try {
      const token = getToken();

      if (!token) {
        setError("Session expired. Please login again.");
        setRequestsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/leave-od/my", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests(data.requests || []);
    } catch (err) {
      console.error("Fetch requests error:", err);
      setError(err.message || "Failed to load request history.");
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!fromDate || !fromTime || !toDate || !toTime || !reason.trim()) {
      setError("Please fill all date, time, and reason fields.");
      return;
    }

    const fromDateTime = new Date(`${fromDate}T${fromTime}`);
    const toDateTime = new Date(`${toDate}T${toTime}`);

    if (toDateTime < fromDateTime) {
      setError("The 'To' date and time cannot precede the 'From' date and time.");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/leave-od", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestType: type === "Leave" ? "LEAVE" : "OD",
          fromDate,
          fromTime,
          toDate,
          toTime,
          reason: reason.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setFromDate("");
      setFromTime("");
      setToDate("");
      setToTime("");
      setReason("");

      setMessage(`${type} request submitted successfully and queued for faculty review!`);
      await fetchRequests();
    } catch (err) {
      console.error("Submit request error:", err);
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const value = String(date).split("T")[0];
    const parts = value.split("-");
    if (parts.length !== 3) return date;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatTime = (time) => {
    if (!time) return "-";
    const value = String(time).substring(0, 5);
    const parts = value.split(":");
    if (parts.length < 2) return time;

    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  return (
    <Sidebar role="student">
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Attendance & Permissions"
          title="Leave / OD Application"
          description="Submit formal applications for leave of absence or approved on-duty participation with real-time faculty approval status."
          backTo="/student"
        />

        {/* ================= FORM CARD ================= */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-6 sm:p-8 shadow-xl mb-10">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
            <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl shrink-0">
              📋
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                New Application
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Ensure accurate departure and return timings for department attendance records.
              </p>
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
              <span className="leading-relaxed">{message}</span>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* TYPE TOGGLE */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Permission Type <span className="text-[#D4AF37]">*</span>
              </label>

              <div className="grid grid-cols-2 gap-3 p-1 bg-[#080808] border border-[#292929] rounded-xl max-w-md">
                <button
                  type="button"
                  onClick={() => setType("Leave")}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                    type === "Leave"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  Leave of Absence
                </button>

                <button
                  type="button"
                  onClick={() => setType("OD")}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                    type === "OD"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  On Duty (OD)
                </button>
              </div>
            </div>

            {/* DATE & TIME FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* FROM SECTION */}
              <div className="p-4 rounded-xl bg-[#080808] border border-[#222222]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Departure / From
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#888888] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      onClick={openDatePicker}
                      onFocus={openDatePicker}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] text-white border border-[#292929] rounded-lg text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#888888] mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      onClick={openTimePicker}
                      onFocus={openTimePicker}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] text-white border border-[#292929] rounded-lg text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* TO SECTION */}
              <div className="p-4 rounded-xl bg-[#080808] border border-[#222222]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Return / To
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#888888] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      onClick={openDatePicker}
                      onFocus={openDatePicker}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] text-white border border-[#292929] rounded-lg text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#888888] mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      onClick={openTimePicker}
                      onFocus={openTimePicker}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] text-white border border-[#292929] rounded-lg text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                      required
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* REASON */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Reason / Activity Details <span className="text-[#D4AF37]">*</span>
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder={
                  type === "Leave"
                    ? "Specify the reason for leave (e.g. Medical emergency, family function, health recovery)..."
                    : "Specify the on-duty activity (e.g. Inter-college Hackathon at PSG Tech, IEEE Conference paper presentation)..."
                }
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none leading-relaxed"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  `Submit ${type} Application`
                )}
              </button>
            </div>

          </form>

        </div>

        {/* ================= REQUEST HISTORY SECTION ================= */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1F1F1F]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                My Recent Leave / OD Applications
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Past requests and real-time approval status from department faculty
              </p>
            </div>
            <span className="text-xs font-semibold text-[#D4AF37] bg-[#17130A] border border-[#3D3318] px-2.5 py-1 rounded-full">
              {requests.length} Total
            </span>
          </div>

          {requestsLoading && <LoadingState message="Fetching application records..." />}

          {!requestsLoading && requests.length === 0 && (
            <EmptyState
              icon="📝"
              title="No Applications Submitted"
              message="You haven't submitted any Leave or OD applications yet. Submit your first request above."
            />
          )}

          {!requestsLoading && requests.length > 0 && (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#080808] border border-[#222222] hover:border-[#333333] transition rounded-xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#171717]">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#17130A] text-[#D4AF37] border border-[#3D3318]">
                        {req.request_type === "LEAVE" ? "Leave" : "OD"}
                      </span>
                      {req.request_id && (
                        <span className="text-xs text-[#666666] font-mono">
                          {req.request_id}
                        </span>
                      )}
                    </div>
                    <StatusBadge status={req.status} />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#888888]">
                    <span>
                      📅 <strong className="text-white">{formatDate(req.from_date)}</strong> ({formatTime(req.from_time)})
                    </span>
                    <span>→</span>
                    <span>
                      📅 <strong className="text-white">{formatDate(req.to_date)}</strong> ({formatTime(req.to_time)})
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-[#CCCCCC] leading-relaxed bg-[#0D0D0D] p-3 rounded-lg border border-[#1A1A1A]">
                    {req.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </Sidebar>
  );
}

export default LeaveOD;