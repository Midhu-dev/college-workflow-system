import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

function CertificateRequest() {
  const [certificateType, setCertificateType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateType || !purpose) {
      setError("Please select both the certificate type and the purpose.");
      setMessage("");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Session expired. Please login again.");
      setMessage("");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/certificate-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            certificateType,
            purpose,
            additionalDetails,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit certificate request."
        );
      }

      setRequestData(data);
      setSubmitted(true);
    } catch (err) {
      console.error("Certificate request error:", err);
      setError(err.message || "Failed to submit certificate request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewRequest = () => {
    setSubmitted(false);
    setCertificateType("");
    setPurpose("");
    setAdditionalDetails("");
    setRequestData(null);
    setMessage("");
    setError("");
  };

  /* =====================================================
     SUCCESS RECEIPT VIEW
  ===================================================== */
  if (submitted) {
    return (
      <Sidebar role="student">
        <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 flex-1">
          <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-8 text-center shadow-2xl">
            
            <div className="mx-auto w-16 h-16 bg-[#17130A] border border-[#3D3318] rounded-2xl flex items-center justify-center text-2xl text-[#D4AF37] font-bold mb-5">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Certificate Request Submitted
            </h2>

            <p className="text-xs text-[#888888] mt-2 max-w-sm mx-auto leading-relaxed">
              Your application has been received and registered with the academic administration.
            </p>

            {/* RECEIPT SUMMARY */}
            <div className="mt-8 bg-[#080808] rounded-xl p-5 text-left border border-[#222222] space-y-3.5 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1A1A]">
                <span className="text-[#888888]">Reference Request ID</span>
                <span className="font-mono font-bold text-white">
                  {requestData?.request_id || requestData?.requestId || "#CR-PENDING"}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1A1A]">
                <span className="text-[#888888]">Certificate Type</span>
                <span className="font-semibold text-white text-right">
                  {certificateType}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1A1A]">
                <span className="text-[#888888]">Purpose</span>
                <span className="font-semibold text-white text-right">
                  {purpose}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#888888]">Current Status</span>
                <StatusBadge status="PENDING" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/student"
                className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] px-6 py-2.5 rounded-xl font-bold text-xs transition"
              >
                ← Back to Dashboard
              </Link>

              <button
                type="button"
                onClick={handleNewRequest}
                className="inline-flex items-center justify-center border border-[#292929] hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#B8B8B8] bg-[#080808] px-6 py-2.5 rounded-xl font-semibold text-xs transition"
              >
                Submit Another Request
              </button>
            </div>

          </div>
        </main>

        <Footer />
      </Sidebar>
    );
  }

  /* =====================================================
     REQUEST FORM VIEW
  ===================================================== */
  return (
    <Sidebar role="student">
      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Official Certificates"
          title="Certificate Request"
          description="Apply for institutional bonafide, conduct, or course certificates directly from the college administration."
          backTo="/student"
        />

        {/* ERROR / SUCCESS ALERTS */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-6 sm:p-8 shadow-xl">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
            <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl shrink-0">
              📋
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Request Specifications
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Select your required certificate format and mention your application intent.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CERTIFICATE TYPE */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Certificate Type <span className="text-[#D4AF37]">*</span>
              </label>

              <select
                value={certificateType}
                onChange={(e) => setCertificateType(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3 bg-[#080808] text-white border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition cursor-pointer"
              >
                <option value="" className="bg-[#0D0D0D]">Select required certificate</option>
                <option value="Bonafide Certificate" className="bg-[#0D0D0D]">Bonafide Certificate</option>
                <option value="Course Completion Certificate" className="bg-[#0D0D0D]">Course Completion Certificate</option>
                <option value="Conduct Certificate" className="bg-[#0D0D0D]">Conduct Certificate</option>
                <option value="Study Certificate" className="bg-[#0D0D0D]">Study Certificate</option>
                <option value="Internship Permission Certificate" className="bg-[#0D0D0D]">Internship Permission Certificate</option>
                <option value="Other" className="bg-[#0D0D0D]">Other</option>
              </select>
            </div>

            {/* PURPOSE */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Purpose <span className="text-[#D4AF37]">*</span>
              </label>

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                disabled={submitting}
                className="w-full px-4 py-3 bg-[#080808] text-white border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition cursor-pointer"
              >
                <option value="" className="bg-[#0D0D0D]">Select application purpose</option>
                <option value="Internship" className="bg-[#0D0D0D]">Internship</option>
                <option value="Higher Studies" className="bg-[#0D0D0D]">Higher Studies</option>
                <option value="Placement" className="bg-[#0D0D0D]">Placement</option>
                <option value="Government Purpose" className="bg-[#0D0D0D]">Government Purpose / Scholarship</option>
                <option value="Personal" className="bg-[#0D0D0D]">Personal</option>
                <option value="Other" className="bg-[#0D0D0D]">Other</option>
              </select>
            </div>

            {/* ADDITIONAL DETAILS */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Additional Remarks / Specific Clauses
              </label>

              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Include company name, designated recipient, or special inclusions requested by authority..."
                rows={4}
                disabled={submitting}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none leading-relaxed"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  "Submit Certificate Request"
                )}
              </button>
            </div>

          </form>

        </div>

      </main>

      <Footer />
    </Sidebar>
  );
}

export default CertificateRequest;