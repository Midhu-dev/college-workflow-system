import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherClassIssues() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolution, setResolution] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadIssues = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/class-issues/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load class issues");
      }

      setIssues(data.issues || []);
    } catch (error) {
      console.error("Load class issues error:", error);
      setMessage(error.message || "Failed to load class issues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const resolveIssue = async () => {
    if (!selectedIssue || !resolution.trim()) {
      return;
    }

    try {
      setUpdating(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/class-issues/${selectedIssue.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "RESOLVED",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resolve issue");
      }

      setSelectedIssue(null);
      setResolution("");

      await loadIssues();

      setMessage("Class issue marked as resolved successfully!");
    } catch (error) {
      console.error("Resolve issue error:", error);
      setMessage(error.message || "Failed to resolve issue.");
    } finally {
      setUpdating(false);
    }
  };

  const pendingIssues = issues.filter(
    (issue) => issue.status === "PENDING"
  );

  return (
    <Sidebar role="teacher">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Faculty Portal"
          title="Class Issues"
          description="Review reported grievances regarding classrooms, lab hardware, and infrastructure, then submit official resolutions."
          backTo="/teacher"
        >
          <span className="text-xs font-semibold text-[#D4AF37] bg-[#17130A] border border-[#3D3318] px-3 py-1.5 rounded-full">
            {pendingIssues.length} Pending
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
        {loading && (
          <LoadingState message="Fetching pending class issues..." />
        )}

        {/* EMPTY STATE */}
        {!loading && pendingIssues.length === 0 && (
          <EmptyState
            icon="✓"
            title="All Clear — No Pending Issues"
            message="There are currently no unresolved classroom issues or grievances reported by students."
          />
        )}

        {/* ISSUES LIST */}
        {!loading && pendingIssues.length > 0 && (
          <div className="space-y-4">
            {pendingIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-[#0D0D0D] border border-[#292929] hover:border-[#383838] transition rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  
                  {/* LEFT DETAILS */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17130A] border border-[#3D3318] text-[#D4AF37]">
                        {issue.issue_type || "General"}
                      </span>

                      <StatusBadge status={issue.status} />
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {issue.title}
                    </h2>

                    {/* METADATA CHIPS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs">
                      
                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">
                          Student
                        </span>

                        <span className="font-semibold text-white truncate block">
                          {issue.student_name || "N/A"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">
                          Register No
                        </span>

                        <span className="font-mono text-white truncate block">
                          {issue.student_user_id || "N/A"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">
                          Department
                        </span>

                        <span className="text-white truncate block">
                          {issue.department || "General"}
                        </span>
                      </div>

                      <div className="bg-[#080808] p-2.5 rounded-lg border border-[#1F1F1F]">
                        <span className="text-[10px] text-[#888888] uppercase block">
                          Date Logged
                        </span>

                        <span className="text-[#CCCCCC] truncate block">
                          {issue.created_at
                            ? new Date(
                                issue.created_at
                              ).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>

                    </div>

                    {issue.location && (
                      <p className="mt-3 text-xs text-[#CCCCCC]">
                        📍 Location:{" "}
                        <strong className="text-white">
                          {issue.location}
                        </strong>
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    <div className="mt-4 bg-[#080808] border border-[#222222] rounded-xl p-3.5">
                      <p className="text-[10px] font-semibold text-[#777777] uppercase tracking-wider mb-1">
                        Reported Details
                      </p>

                      <p className="text-xs text-[#CCCCCC] leading-relaxed whitespace-pre-wrap">
                        {issue.description}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="shrink-0 flex items-center lg:items-start pt-2 lg:pt-0">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setResolution("");
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm whitespace-nowrap"
                    >
                      Resolve Issue →
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ================= RESOLVE MODAL ================= */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-7">
            
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-[#1F1F1F]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />

                  <span className="text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                    Issue Resolution
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white tracking-tight">
                  {selectedIssue.title}
                </h2>
              </div>

              <button
                onClick={() => {
                  setSelectedIssue(null);
                  setResolution("");
                }}
                disabled={updating}
                className="w-8 h-8 rounded-lg bg-[#080808] border border-[#292929] text-[#777777] hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* STUDENT ISSUE RECAP */}
            <div className="mb-5 bg-[#080808] border border-[#222222] rounded-xl p-3.5 text-xs">
              <span className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider block mb-1">
                Student Report (
                {selectedIssue.student_name} -{" "}
                {selectedIssue.student_user_id})
              </span>

              <p className="text-[#CCCCCC] leading-relaxed">
                {selectedIssue.description}
              </p>
            </div>

            {/* RESOLUTION INPUT */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Faculty Resolution Remarks{" "}
                <span className="text-[#D4AF37]">*</span>
              </label>

              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                rows={4}
                placeholder="State the corrective action taken (e.g. Projector replacement scheduled with IT dept, Room 302 repaired)..."
                disabled={updating}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-xs outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none transition"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedIssue(null);
                  setResolution("");
                }}
                disabled={updating}
                className="flex-1 py-2.5 rounded-xl border border-[#292929] text-[#888888] hover:text-white hover:border-[#444444] text-xs font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={resolveIssue}
                disabled={updating || !resolution.trim()}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
              >
                {updating ? "Saving..." : "Mark Resolved"}
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </Sidebar>
  );
}

export default TeacherClassIssues;