import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function CertificateUpload() {
  const [certificateName, setCertificateName] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateName.trim() || !certificateFile) {
      setError("Please enter the certificate name and choose a file to upload.");
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
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();
      formData.append("certificateType", certificateName.trim());
      formData.append("certificate", certificateFile);

      const response = await fetch(
        "http://localhost:5000/api/certificate-uploads",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload certificate.");
      }

      setCertificateName("");
      setCertificateFile(null);

      const fileInput = document.getElementById("certificateFile");
      if (fileInput) {
        fileInput.value = "";
      }

      setMessage("Certificate uploaded successfully! It is now pending faculty verification.");
    } catch (err) {
      console.error("Certificate upload error:", err);
      setError(err.message || "Failed to upload certificate.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Sidebar role="student">
      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Credentials & Verification"
          title="Upload Certificate"
          description="Submit external courses, MOOC credentials, or competition awards for department verification."
          backTo="/student"
        />

        {/* ================= UPLOAD CARD ================= */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-6 sm:p-8 shadow-xl">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
            <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl shrink-0">
              📜
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Certificate Information
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Upload clear scans or official PDF credentials.
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
            
            {/* NAME */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Certificate Title / Type <span className="text-[#D4AF37]">*</span>
              </label>

              <input
                type="text"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
                placeholder="e.g. AWS Cloud Practitioner, NPTEL Machine Learning"
                disabled={uploading}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition disabled:opacity-50"
                required
              />
            </div>

            {/* FILE INPUT */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Attach Document File <span className="text-[#D4AF37]">*</span>
              </label>

              <div className="bg-[#080808] border border-[#292929] hover:border-[#383838] rounded-xl p-4 transition">
                <input
                  id="certificateFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setCertificateFile(file);
                  }}
                  className="w-full text-xs text-[#888888] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#1A160A] file:text-[#D4AF37] file:font-bold file:border file:border-[#3D3318] file:cursor-pointer hover:file:bg-[#241F0E] file:transition cursor-pointer"
                  required
                />

                {certificateFile && (
                  <div className="mt-3 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
                    <span className="text-[#CCCCCC] truncate max-w-xs font-medium">
                      📎 {certificateFile.name}
                    </span>
                    <span className="text-[#888888] shrink-0 font-mono">
                      {(certificateFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-[#666666] mt-2">
                Accepted formats: PDF, JPG, JPEG, PNG (Max 10MB)
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                    <span>Uploading Certificate...</span>
                  </>
                ) : (
                  "Upload Certificate for Verification"
                )}
              </button>
            </div>

          </form>

        </div>

        {/* INFO CALLOUT */}
        <div className="mt-5 bg-[#0D0D0D] border border-[#292929] rounded-xl p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-[#D4AF37] text-xs font-bold shrink-0 mt-0.5">
            i
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              Faculty Verification Workflow
            </p>
            <p className="text-xs text-[#888888] mt-0.5 leading-relaxed">
              Once uploaded, your submission will be routed to your department tutor / mentor for validation against college academic records.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </Sidebar>
  );
}

export default CertificateUpload;