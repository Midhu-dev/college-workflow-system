import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    setLoading(true);
    let list = [];

    // 1. Check localStorage first
    try {
      const stored = JSON.parse(localStorage.getItem("leaveODRequests")) || [];
      if (Array.isArray(stored)) {
        list = [...stored];
      }
    } catch {
      // ignore
    }

    // 2. Fetch from API if token exists
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/leave-od/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data?.requests && Array.isArray(data.requests)) {
            const apiItems = data.requests.map((r) => ({
              id: r.request_id || r.id,
              type: r.request_type === "LEAVE" ? "Leave" : "OD",
              status: r.status,
              fromDate: r.from_date
                ? String(r.from_date).split("T")[0]
                : "-",
              fromTime: r.from_time || "",
              toDate: r.to_date
                ? String(r.to_date).split("T")[0]
                : "-",
              toTime: r.to_time || "",
              submittedAt: r.created_at
                ? new Date(r.created_at).toLocaleDateString()
                : "-",
              reason: r.reason,
              reviewedAt: r.reviewed_at
                ? new Date(r.reviewed_at).toLocaleDateString()
                : null,
            }));

            const existingIds = new Set(
              list.map((x) => String(x.id))
            );

            apiItems.forEach((item) => {
              if (!existingIds.has(String(item.id))) {
                list.push(item);
              }
            });
          }
        }
      } catch {
        // Fall back to localStorage
      }
    }

    setRequests(list);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();

    const handleStorage = () => {
      loadRequests();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <Sidebar role="student">
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        <PageHeader
          badge="Student Services"
          title="My Requests"
          description="Track active Leave of Absence and On-Duty permission requests, faculty decisions, and verification records."
          backTo="/student"
        >
          <Link
            to="/student/leave-od"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505] text-xs font-bold transition shadow-sm"
          >
            + New Request
          </Link>
        </PageHeader>

        {loading && (
          <LoadingState message="Loading your request history..." />
        )}

        {!loading && requests.length === 0 && (
          <EmptyState
            icon="📋"
            title="No Requests Yet"
            message="You haven't submitted any Leave or On-Duty applications yet. Apply easily using the form."
            actionText="Apply for Leave / OD"
            actionLink="/student/leave-od"
          />
        )}

        {!loading && requests.length > 0 && (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-[#0D0D0D] rounded-2xl border border-[#292929] hover:border-[#383838] transition p-6 shadow-sm"
              >
                {/* CARD HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#1A1A1A]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#17130A] text-[#D4AF37] border border-[#3D3318]">
                      {request.type || "Leave"}
                    </span>

                    <h2 className="text-base font-bold text-white tracking-tight">
                      {request.type || "Leave"} Application
                    </h2>

                    <StatusBadge status={request.status} />
                  </div>

                  <span className="text-xs text-[#666666] font-mono">
                    #{request.id}
                  </span>
                </div>

                {/* TIMINGS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="bg-[#080808] border border-[#222222] rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider">
                      From Date & Time
                    </p>

                    <p className="text-sm font-bold text-white mt-1">
                      {request.fromDate}
                      {request.fromTime
                        ? ` • ${request.fromTime}`
                        : ""}
                    </p>
                  </div>

                  <div className="bg-[#080808] border border-[#222222] rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider">
                      To Date & Time
                    </p>

                    <p className="text-sm font-bold text-white mt-1">
                      {request.toDate}
                      {request.toTime
                        ? ` • ${request.toTime}`
                        : ""}
                    </p>
                  </div>

                  <div className="bg-[#080808] border border-[#222222] rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider">
                      Date Submitted
                    </p>

                    <p className="text-sm font-medium text-[#CCCCCC] mt-1">
                      {request.submittedAt || "Recent"}
                    </p>
                  </div>
                </div>

                {/* REASON BOX */}
                <div className="mt-4 bg-[#080808] border border-[#222222] rounded-xl p-3.5">
                  <p className="text-[10px] font-semibold text-[#888888] uppercase tracking-wider mb-1">
                    Application Reason
                  </p>

                  <p className="text-xs text-[#CCCCCC] leading-relaxed">
                    {request.reason || "No reason specified."}
                  </p>
                </div>

                {/* REVIEW STATUS NOTICE */}
                {String(request.status).toUpperCase() === "APPROVED" && (
                  <div className="mt-4 p-3 rounded-xl bg-[#0B1B10] border border-[#1B3B24] text-xs text-[#4ADE80] flex items-center justify-between">
                    <span>
                      ✓ This request has been officially approved by faculty.
                    </span>

                    {request.reviewedAt && (
                      <span className="text-[11px] text-[#6E9E7B]">
                        Approved on {request.reviewedAt}
                      </span>
                    )}
                  </div>
                )}

                {String(request.status).toUpperCase() === "REJECTED" && (
                  <div className="mt-4 p-3 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-xs text-[#F87171] flex items-center justify-between">
                    <span>
                      ✕ This request was rejected by faculty.
                    </span>

                    {request.reviewedAt && (
                      <span className="text-[11px] text-[#A66E6E]">
                        Reviewed on {request.reviewedAt}
                      </span>
                    )}
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

export default MyRequests;