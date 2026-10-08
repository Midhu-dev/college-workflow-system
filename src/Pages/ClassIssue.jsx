import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function ClassIssue() {
  const [category, setCategory] = useState("Classroom");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      setError("Please fill in both the issue title and description.");
      setMessage("");
      return;
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!token) {
      setError("Session expired. Please login again.");
      setMessage("");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/class-issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            issueType: category,
            title: subject.trim(),
            description: description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit issue");
      }

      setSubject("");
      setDescription("");
      setMessage("Class issue submitted successfully! Faculty will review it shortly.");
    } catch (err) {
      console.error("Class issue submission error:", err);
      setError(err.message || "Failed to submit class issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sidebar role="student">
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Student Services"
          title="Report Class Issue"
          description="Submit an infrastructure, timetable, or classroom concern for immediate faculty review."
          backTo="/student"
        />

        {/* ================= FORM CARD ================= */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-[#292929] p-6 sm:p-8 shadow-xl">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
            <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl shrink-0">
              ⚠️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Issue Details
              </h2>
              <p className="text-xs text-[#888888] mt-0.5">
                Please provide specific details so department faculty can take swift action.
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

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* CATEGORY */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Issue Category <span className="text-[#D4AF37]">*</span>
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#080808] text-white border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors cursor-pointer"
              >
                <option value="Classroom" className="bg-[#0D0D0D]">Classroom</option>
                <option value="Faculty" className="bg-[#0D0D0D]">Faculty</option>
                <option value="Timetable" className="bg-[#0D0D0D]">Timetable</option>
                <option value="Infrastructure" className="bg-[#0D0D0D]">Infrastructure</option>
                <option value="Other" className="bg-[#0D0D0D]">Other</option>
              </select>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Issue Title / Subject <span className="text-[#D4AF37]">*</span>
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Projector HDMI port damaged in Lab 302"
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Detailed Description <span className="text-[#D4AF37]">*</span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the issue clearly, mentioning classroom number, equipment involved, and any urgency..."
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors resize-none leading-relaxed"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition duration-150 shadow-md flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                    <span>Submitting Issue...</span>
                  </>
                ) : (
                  "Submit Class Issue"
                )}
              </button>
            </div>

          </form>

        </div>

        {/* INFO FOOTNOTE CARD */}
        <div className="mt-5 bg-[#0D0D0D] border border-[#292929] rounded-xl p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-[#D4AF37] text-xs font-bold shrink-0 mt-0.5">
            i
          </div>
          <div>
            <p className="text-xs font-semibold text-white">
              What happens next?
            </p>
            <p className="text-xs text-[#888888] mt-0.5 leading-relaxed">
              Your grievance will be queued in the Faculty Portal under Pending Class Issues. You can check teacher resolution status anytime under{" "}
              <a href="/student/my-class-issues" className="text-[#D4AF37] hover:underline">
                My Class Issues
              </a>.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </Sidebar>
  );
}

export default ClassIssue;