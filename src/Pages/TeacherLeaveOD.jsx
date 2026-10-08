import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherLeaveOD() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/leave-od/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load requests");
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Load Leave/OD error:", error);
      setMessage(error.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/leave-od/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update request");
      }

      await loadRequests();

      setMessage(
        status === "APPROVED"
          ? "Request approved successfully."
          : "Request rejected successfully."
      );
    } catch (error) {
      console.error("Update Leave/OD error:", error);
      setMessage(error.message || "Failed to update request.");
    } finally {
      setUpdating(false);
    }
  };

  const pending = requests.filter((r) => r.status === "PENDING");
  const approved = requests.filter((r) => r.status === "APPROVED");
  const rejected = requests.filter((r) => r.status === "REJECTED");

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar role="teacher" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Faculty Portal"
          title="Leave / OD Requests"
          description="Process incoming student applications for official leave of absence and external on-duty attendance."
          backTo="/teacher"
        />

        {/* FEEDBACK NOTIFICATION */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                Pending Approval
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#D4AF37] mt-1">
                {pending.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-lg text-[#D4AF37]">
              ⏳
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                Approved
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#4ADE80] mt-1">
                {approved.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B1B10] border border-[#1B3B24] flex items-center justify-center text-lg text-[#4ADE80]">
              ✓
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                Rejected
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#F87171] mt-1">
                {rejected.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] flex items-center justify-center text-lg text-[#F87171]">
              ✕
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && <LoadingState message="Fetching student Leave/OD requests..." />}

        {/* EMPTY STATE */}
        {!loading && requests.length === 0 && (
          <EmptyState
            icon="📋"
            title="No Pending Applications"
            message="There are currently no Leave or OD requests awaiting your review."
          />
        )}

        {/* REQUESTS LIST */}
        {!loading && requests.length > 0 && (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-[#0D0D0D] border border-[#292929] hover:border-[#383838] transition rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  
                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17130A] border border-[#3D3318] text-[#D4AF37]">
                        {request.request_type}
                      </span>
                      <StatusBadge status={request.status} />
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {request.student_name}
                    </h2>

                    {/* METADATA GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Register No</span>
                        <span className="font-mono text-white truncate block">
                          {request.student_user_id || "N/A"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Department</span>
                        <span className="text-white truncate block">
                          {request.department || "General"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">From</span>
                        <span className="text-[#CCCCCC] truncate block">
                          {request.from_date} {request.from_time ? `(${request.from_time})` : ""}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">To</span>
                        <span className="text-[#CCCCCC] truncate block">
                          {request.to_date} {request.to_time ? `(${request.to_time})` : ""}
                        </span>
                      </div>
                    </div>

                    {(request.leave_type || request.od_type || request.activity_name) && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {request.leave_type && (
                          <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222] text-[#B8B8B8]">
                            Type: <strong className="text-white">{request.leave_type}</strong>
                          </span>
                        )}
                        {request.od_type && (
                          <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222] text-[#B8B8B8]">
                            OD Category: <strong className="text-white">{request.od_type}</strong>
                          </span>
                        )}
                        {request.activity_name && (
                          <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222] text-[#B8B8B8]">
                            Activity: <strong className="text-white">{request.activity_name}</strong>
                          </span>
                        )}
                      </div>
                    )}

                    {/* REASON */}
                    <div className="mt-3.5 bg-[#080808] border border-[#222222] rounded-xl p-3.5">
                      <p className="text-[10px] font-semibold text-[#777777] uppercase tracking-wider mb-1">
                        Application Reason
                      </p>
                      <p className="text-xs text-[#CCCCCC] leading-relaxed whitespace-pre-wrap">
                        {request.reason || "No reason provided."}
                      </p>
                    </div>

                    <p className="text-[10px] text-[#666666] mt-2 font-mono">
                      Submitted on: {request.created_at ? new Date(request.created_at).toLocaleString() : "-"}
                    </p>
                  </div>

                  {/* ACTION BUTTONS (DISTINCT APPROVE & REJECT) */}
                  {request.status === "PENDING" && (
                    <div className="shrink-0 flex sm:flex-row lg:flex-col gap-2.5 pt-2 lg:pt-0 w-full sm:w-auto lg:w-36">
                      <button
                        type="button"
                        disabled={updating}
                        onClick={() => updateStatus(request.id, "APPROVED")}
                        className="flex-1 lg:flex-none py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] text-xs font-bold transition shadow-sm text-center"
                      >
                        ✓ Approve
                      </button>

                      <button
                        type="button"
                        disabled={updating}
                        onClick={() => updateStatus(request.id, "REJECTED")}
                        className="flex-1 lg:flex-none py-2.5 px-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] hover:bg-[#2B1313] hover:border-[#5A2525] disabled:opacity-50 disabled:cursor-not-allowed text-[#F87171] text-xs font-semibold transition text-center"
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

      </main>

      <Footer />
    </div>
  );
}

export default TeacherLeaveOD;