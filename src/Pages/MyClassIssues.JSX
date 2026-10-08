import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function MyClassIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  const loadIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/class-issues/my",
        {
          method: "GET",
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
    } catch (err) {
      console.error("Load class issues error:", err);
      setError(err.message || "Failed to load class issues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(date);
    }
  };

  return (
    <Sidebar role="student">
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        
        <PageHeader
          badge="Student Services"
          title="My Class Issues"
          description="View submitted grievances, track live review statuses, and read teacher resolution notes."
          backTo="/student"
        >
          <Link
            to="/student/class-issue"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm"
          >
            + Report New Issue
          </Link>
        </PageHeader>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* LOADING */}
        {loading && <LoadingState message="Fetching your submitted class issues..." />}

        {/* EMPTY STATE */}
        {!loading && !error && issues.length === 0 && (
          <EmptyState
            icon="⚠️"
            title="No Class Issues Reported"
            message="You haven't submitted any classroom or infrastructure issues yet. Everything looks good!"
            actionText="Report an Issue"
            actionLink="/student/class-issue"
          />
        )}

        {/* ISSUES LIST */}
        {!loading && issues.length > 0 && (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-[#0D0D0D] rounded-2xl border border-[#292929] hover:border-[#383838] transition p-6 shadow-sm"
              >
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-[#1A1A1A]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17130A] border border-[#3D3318] text-[#D4AF37]">
                        {issue.issue_type || "General"}
                      </span>
                      <StatusBadge status={issue.status} />
                    </div>

                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {issue.title}
                    </h2>
                  </div>

                  <span className="text-xs text-[#666666] shrink-0 font-mono">
                    Submitted: {formatDate(issue.created_at)}
                  </span>
                </div>

                {/* LOCATION IF APPLICABLE */}
                {issue.location && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#888888]">
                    <span className="text-[#D4AF37]">📍</span>
                    <span>Location: <strong className="text-white font-medium">{issue.location}</strong></span>
                  </div>
                )}

                {/* DESCRIPTION */}
                <div className="mt-4 bg-[#080808] border border-[#222222] rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] mb-1.5">
                    Description
                  </p>
                  <p className="text-xs text-[#CCCCCC] leading-relaxed whitespace-pre-wrap">
                    {issue.description}
                  </p>
                </div>

                {/* RESOLUTION STATUS NOTES */}
                {issue.status === "RESOLVED" && (
                  <div className="mt-4 bg-[#0B1B10] border border-[#1B3B24] rounded-xl p-4 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                      <span className="font-semibold text-[#4ADE80] uppercase tracking-wider">
                        Issue Resolved
                      </span>
                    </div>
                    <p className="text-[#A3E6B8] mt-1 leading-relaxed">
                      This grievance was marked resolved by the department faculty.
                    </p>
                    {issue.handled_at && (
                      <p className="text-[11px] text-[#6E9E7B] mt-2">
                        Resolved on {formatDate(issue.handled_at)}
                      </p>
                    )}
                  </div>
                )}

                {issue.status === "REJECTED" && (
                  <div className="mt-4 bg-[#1C0D0D] border border-[#3D1B1B] rounded-xl p-4 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
                      <span className="font-semibold text-[#F87171] uppercase tracking-wider">
                        Issue Closed / Rejected
                      </span>
                    </div>
                    <p className="text-[#E0A8A8] mt-1 leading-relaxed">
                      This issue could not be accepted for resolution at this time.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </Sidebar>
  );
}

export default MyClassIssues;