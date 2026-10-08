import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/certificate-uploads/pending",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load certificates.");
      }

      setCertificates(data.uploads || []);
    } catch (error) {
      console.error("Load certificates error:", error);
      setMessage(error.message || "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const updateCertificate = async (status) => {
    if (!selectedCertificate) return;

    try {
      setUpdating(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/certificate-uploads/${selectedCertificate.id}/status`,
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
        throw new Error(data.message || "Failed to update certificate.");
      }

      setSelectedCertificate(null);
      setRemarks("");

      await loadCertificates();

      setMessage(
        status === "VERIFIED"
          ? "Certificate marked as verified successfully."
          : "Certificate rejected."
      );
    } catch (error) {
      console.error("Certificate update error:", error);
      setMessage(error.message || "Failed to update certificate.");
    } finally {
      setUpdating(false);
    }
  };

  const pendingCertificates = certificates.filter(
    (c) => c.status === "PENDING"
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Navbar role="teacher" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Faculty Portal"
          title="Certificate Verification"
          description="Review uploaded documents, external course certifications, and validate academic credentials."
          backTo="/teacher"
        >
          <span className="text-xs font-semibold text-[#D4AF37] bg-[#17130A] border border-[#3D3318] px-3 py-1.5 rounded-full">
            {pendingCertificates.length} Pending
          </span>
        </PageHeader>

        {/* FEEDBACK NOTIFICATION */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {/* LOADING */}
        {loading && <LoadingState message="Loading certificate uploads..." />}

        {/* EMPTY STATE */}
        {!loading && pendingCertificates.length === 0 && (
          <EmptyState
            icon="📜"
            title="All Clear — No Pending Certificates"
            message="There are currently no student certificates awaiting verification."
          />
        )}

        {/* CERTIFICATES LIST */}
        {!loading && pendingCertificates.length > 0 && (
          <div className="space-y-4">
            {pendingCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0D0D0D] border border-[#292929] hover:border-[#383838] transition rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  
                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17130A] border border-[#3D3318] text-[#D4AF37]">
                        Credential
                      </span>
                      <StatusBadge status={cert.status} />
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {cert.certificate_type}
                    </h2>

                    {/* METADATA GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Student</span>
                        <span className="font-semibold text-white truncate block">
                          {cert.student_name || "N/A"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Register No</span>
                        <span className="font-mono text-white truncate block">
                          {cert.student_user_id || "N/A"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Department</span>
                        <span className="text-white truncate block">
                          {cert.department || "General"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">Uploaded</span>
                        <span className="text-[#CCCCCC] truncate block">
                          {cert.created_at ? new Date(cert.created_at).toLocaleDateString() : "-"}
                        </span>
                      </div>
                    </div>

                    {/* DOCUMENT FILENAME CALLOUT */}
                    <div className="mt-3.5 bg-[#080808] border border-[#222222] rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#CCCCCC] truncate max-w-md">
                        <span className="text-[#D4AF37]">📎</span>
                        <span className="font-mono truncate">{cert.file_name || "certificate-document.pdf"}</span>
                      </div>
                      {cert.upload_id && (
                        <span className="text-[10px] text-[#666666] font-mono shrink-0">
                          ID: {cert.upload_id}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCertificate(cert);
                        setRemarks("");
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm whitespace-nowrap"
                    >
                      Review Certificate →
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ================= REVIEW MODAL ================= */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-7">
            
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-[#1F1F1F]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                    Document Verification
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {selectedCertificate.certificate_type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCertificate(null);
                  setRemarks("");
                }}
                disabled={updating}
                className="w-8 h-8 rounded-lg bg-[#080808] border border-[#292929] text-[#777777] hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* STUDENT DETAILS BOX */}
            <div className="mb-4 bg-[#080808] border border-[#222222] rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#888888]">Student Name</span>
                <span className="font-semibold text-white">{selectedCertificate.student_name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Register Number</span>
                <span className="font-mono text-white">{selectedCertificate.student_user_id || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Department</span>
                <span className="text-white">{selectedCertificate.department || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Uploaded File</span>
                <span className="text-[#D4AF37] font-mono truncate max-w-xs">{selectedCertificate.file_name || "N/A"}</span>
              </div>
            </div>

            {/* REMARKS */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Faculty Verification Remarks (Optional)
              </label>

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Optional notes regarding course credits, authenticity, or rejection reason..."
                disabled={updating}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-xs outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none transition"
              />
            </div>

            {/* BUTTONS (VERIFY & REJECT) */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedCertificate(null);
                  setRemarks("");
                }}
                disabled={updating}
                className="flex-1 py-2.5 rounded-xl border border-[#292929] text-[#888888] hover:text-white hover:border-[#444444] text-xs font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => updateCertificate("REJECTED")}
                disabled={updating}
                className="flex-1 py-2.5 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] hover:bg-[#2B1313] hover:border-[#5A2525] disabled:opacity-50 text-[#F87171] text-xs font-bold transition flex items-center justify-center gap-1"
              >
                {updating ? "Processing..." : "✕ Reject"}
              </button>

              <button
                type="button"
                onClick={() => updateCertificate("VERIFIED")}
                disabled={updating}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 text-[#050505] text-xs font-bold transition shadow-sm flex items-center justify-center gap-1"
              >
                {updating ? "Processing..." : "✓ Verify"}
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TeacherCertificates;