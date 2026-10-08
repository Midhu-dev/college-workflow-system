import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherCertificateRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/certificate-requests/pending",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch certificate requests");
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Certificate requests error:", error);
      setMessage(error.message || "Failed to load certificate requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      setUpdating(true);
      setMessage("");

      const response = await fetch(
        `http://localhost:5000/api/certificate-requests/${id}/status`,
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
        throw new Error(data.message || "Failed to update certificate request");
      }

      setMessage(
        status === "COMPLETED"
          ? "Certificate request marked as completed."
          : "Certificate request rejected."
      );

      setSelectedRequest(null);
      await fetchRequests();
    } catch (error) {
      console.error("Update request error:", error);
      setMessage(error.message || "Failed to update request.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar role="teacher" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Faculty Portal"
          title="Certificate Requests"
          description="Process institutional certificate requisitions submitted by students for internships, admissions, or scholarships."
          backTo="/teacher"
        >
          <span className="text-xs font-semibold text-[#D4AF37] bg-[#17130A] border border-[#3D3318] px-3 py-1.5 rounded-full">
            {requests.length} Pending
          </span>
        </PageHeader>

        {/* FEEDBACK ALERT */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {/* LOADING */}
        {loading && <LoadingState message="Fetching pending certificate requests..." />}

        {/* EMPTY STATE */}
        {!loading && requests.length === 0 && (
          <EmptyState
            icon="📄"
            title="All Clear — No Pending Requests"
            message="There are currently no certificate requests waiting for processing."
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
                        Requisition
                      </span>
                      <StatusBadge status={request.status || "PENDING"} />
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {request.certificate_type}
                    </h2>

                    {/* METADATA GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Student</span>
                        <span className="font-semibold text-white truncate block">
                          {request.student_name || "N/A"}
                        </span>
                      </div>

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
                        <span className="text-[10px] text-[#888888] uppercase block">Purpose</span>
                        <span className="text-[#D4AF37] font-semibold truncate block">
                          {request.purpose || "General"}
                        </span>
                      </div>
                    </div>

                    {request.additional_details && (
                      <div className="mt-3.5 bg-[#080808] border border-[#222222] rounded-xl p-3.5">
                        <p className="text-[10px] font-semibold text-[#777777] uppercase tracking-wider mb-1">
                          Applicant Remarks
                        </p>
                        <p className="text-xs text-[#CCCCCC] leading-relaxed whitespace-pre-wrap">
                          {request.additional_details}
                        </p>
                      </div>
                    )}

                    <p className="text-[10px] text-[#666666] mt-2 font-mono">
                      Requested on: {request.created_at ? new Date(request.created_at).toLocaleDateString() : "-"}
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm whitespace-nowrap"
                    >
                      Process Request →
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ================= REVIEW MODAL ================= */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0D0D0D] border border-[#292929] rounded-2xl shadow-2xl p-6 sm:p-7">
            
            <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-[#1F1F1F]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[11px] tracking-wider text-[#D4AF37] font-semibold uppercase">
                    Certificate Requisition
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {selectedRequest.certificate_type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                disabled={updating}
                className="w-8 h-8 rounded-lg bg-[#080808] border border-[#292929] text-[#777777] hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* DETAILS LIST */}
            <div className="space-y-3 text-xs bg-[#080808] border border-[#222222] rounded-xl p-4">
              <div className="flex justify-between">
                <span className="text-[#888888]">Student Name</span>
                <span className="font-semibold text-white">{selectedRequest.student_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Student ID</span>
                <span className="font-mono text-white">{selectedRequest.student_user_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Department</span>
                <span className="text-white">{selectedRequest.department || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Certificate Type</span>
                <span className="font-semibold text-white">{selectedRequest.certificate_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Application Purpose</span>
                <span className="text-[#D4AF37] font-semibold">{selectedRequest.purpose}</span>
              </div>
            </div>

            {selectedRequest.additional_details && (
              <div className="mt-3.5 bg-[#080808] border border-[#222222] rounded-xl p-3 text-xs">
                <span className="text-[10px] text-[#888888] uppercase tracking-wider block mb-1">
                  Additional Notes
                </span>
                <p className="text-[#CCCCCC] leading-relaxed">
                  {selectedRequest.additional_details}
                </p>
              </div>
            )}

            {/* MODAL ACTIONS */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                disabled={updating}
                className="px-4 py-2.5 rounded-xl border border-[#292929] text-[#888888] hover:text-white text-xs font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => updateRequestStatus(selectedRequest.id, "REJECTED")}
                className="px-4 py-2.5 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] hover:bg-[#2B1313] hover:border-[#5A2525] text-xs font-bold text-[#F87171] transition"
              >
                {updating ? "Processing..." : "✕ Reject"}
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => updateRequestStatus(selectedRequest.id, "COMPLETED")}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm"
              >
                {updating ? "Processing..." : "✓ Mark Completed"}
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TeacherCertificateRequests;