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

    // 1. Read locally stored requests first
    try {
      const stored =
        JSON.parse(localStorage.getItem("leaveODRequests")) || [];

      if (Array.isArray(stored)) {
        list = [...stored];
      }
    } catch {
      // Ignore invalid localStorage data
    }

    // 2. Fetch requests from the API if a token exists
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/leave-od/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
                ? new Date(r.created_at).toLocaleDateString("en-IN")
                : "-",
              reason: r.reason,
              reviewedAt: r.reviewed_at
                ? new Date(r.reviewed_at).toLocaleDateString("en-IN")
                : null,
            }));

            const existingIds = new Set(
              list.map((item) => String(item.id))
            );

            apiItems.forEach((item) => {
              if (!existingIds.has(String(item.id))) {
                list.push(item);
                existingIds.add(String(item.id));
              }
            });
          }
        }
      } catch {
        // Fall back to localStorage requests
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

  // Same pastel card colors as StudentDashboard.
  const tones = [
    "yellow",
    "blue",
    "green",
    "peach",
    "lavender",
    "pink",
  ];

  return (
    <Sidebar role="student">
      <style>{`
        .my-requests-page {
          --mr-text: #292a27;
          --mr-muted: #595b53;
          --mr-border: #e2e0d7;

          --mr-yellow: oklch(0.94 0.11 100);
          --mr-blue: oklch(0.91 0.054 235);
          --mr-green: oklch(0.91 0.075 160);
          --mr-peach: oklch(0.92 0.066 55);
          --mr-lavender: oklch(0.91 0.048 300);
          --mr-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--mr-text);
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0;
        }

        .my-requests-page *,
        .my-requests-page *::before,
        .my-requests-page *::after {
          box-sizing: border-box;
        }

        .mr-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Toolbar */
        .mr-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }

        .mr-toolbar-description {
          margin: 0;
          color: var(--mr-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .mr-new-button {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 14px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--mr-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .mr-new-button:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
        }

        .mr-plus {
          font-size: 17px;
          line-height: 1;
        }

        /* Requests list */
        .mr-list {
          display: grid;
          gap: 19px;
        }

        /* Same dark outline and offset shadow as StudentDashboard */
        .mr-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .mr-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel-colored request header */
        .mr-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          min-height: 82px;
          padding: 17px 19px;
          border-bottom: 1.5px solid #292a27;
        }

        .mr-tone-yellow {
          background: var(--mr-yellow);
        }

        .mr-tone-blue {
          background: var(--mr-blue);
        }

        .mr-tone-green {
          background: var(--mr-green);
        }

        .mr-tone-peach {
          background: var(--mr-peach);
        }

        .mr-tone-lavender {
          background: var(--mr-lavender);
        }

        .mr-tone-pink {
          background: var(--mr-pink);
        }

        .mr-card-heading {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          min-width: 0;
        }

        .mr-type {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px solid rgba(41, 42, 39, 0.55);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #383930;
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
        }

        .mr-title {
          margin: 0;
          color: #292a27;
          font-size: 14px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .mr-id {
          flex-shrink: 0;
          padding: 5px 8px;
          border: 1px solid rgba(41, 42, 39, 0.5);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #383930;
          font-family: monospace;
          font-size: 11px;
          overflow-wrap: anywhere;
        }

        /* White request details area */
        .mr-card-body {
          padding: 17px 19px 19px;
          background: #ffffff;
        }

        .mr-details-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .mr-detail {
          min-width: 0;
          padding: 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .mr-detail-icon {
          display: inline-grid;
          width: 27px;
          height: 27px;
          margin-bottom: 9px;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          color: #292a27;
          font-size: 13px;
        }

        .mr-icon-yellow {
          background: var(--mr-yellow);
        }

        .mr-icon-blue {
          background: var(--mr-blue);
        }

        .mr-icon-green {
          background: var(--mr-green);
        }

        .mr-detail-label {
          margin: 0;
          color: #595b53;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .mr-detail-value {
          margin: 7px 0 0;
          color: #292a27;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        /* Reason */
        .mr-reason {
          margin-top: 14px;
          padding: 13px 14px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .mr-reason-label {
          margin: 0 0 7px;
          color: #454640;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        .mr-reason-text {
          margin: 0;
          color: #454640;
          font-size: 12px;
          line-height: 1.85;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        /* Approval / rejection notices */
        .mr-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 14px;
          padding: 12px 14px;
          border: 1px solid;
          border-radius: 5px;
        }

        .mr-notice.approved {
          border-color: #b9d0ae;
          background: #edf5e8;
        }

        .mr-notice.rejected {
          border-color: #e4bcb5;
          background: #fff0ed;
        }

        .mr-notice-icon {
          display: grid;
          width: 26px;
          height: 26px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 800;
        }

        .mr-notice.approved .mr-notice-icon {
          background: #dcebd3;
          color: #365d38;
        }

        .mr-notice.rejected .mr-notice-icon {
          background: #f7ded9;
          color: #923e35;
        }

        .mr-notice-content {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 5px 14px;
          flex: 1;
          min-width: 0;
        }

        .mr-notice-text {
          margin: 0;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .mr-notice.approved .mr-notice-text {
          color: #365d38;
        }

        .mr-notice.rejected .mr-notice-text {
          color: #923e35;
        }

        .mr-notice-date {
          color: #595b53;
          font-size: 11px;
          line-height: 1.8;
        }

        .my-requests-page a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 4px;
        }

        /* Responsive layout */
        @media (max-width: 760px) {
          .mr-container {
            padding: 25px 18px 32px;
          }

          .mr-details-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .mr-detail:last-child {
            grid-column: 1 / -1;
          }

          .mr-card-header {
            align-items: flex-start;
          }

          .mr-card-heading {
            align-items: flex-start;
          }

          .mr-card-body {
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .mr-container {
            padding: 20px 12px 28px;
          }

          .mr-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .mr-new-button {
            width: 100%;
          }

          .mr-card-header {
            flex-direction: column;
            gap: 10px;
            padding: 14px;
          }

          .mr-card-body {
            padding: 12px;
          }

          .mr-details-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 9px;
          }

          .mr-detail:last-child {
            grid-column: auto;
          }

          .mr-detail {
            padding: 11px;
          }

          .mr-detail-icon {
            margin-bottom: 6px;
          }

          .mr-reason {
            padding: 11px;
          }

          .mr-notice {
            padding: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .my-requests-page *,
          .my-requests-page *::before,
          .my-requests-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="my-requests-page">
        <div className="mr-container">
          <PageHeader
            badge="Student Services"
            title="My Requests"
            description="Track Leave and On-Duty applications, faculty decisions, and request history."
            backTo="/student"
          />

          <div className="mr-toolbar">
            <p className="mr-toolbar-description">
              View your application details and approval status.
            </p>

            <Link to="/student/leave-od" className="mr-new-button">
              <span className="mr-plus" aria-hidden="true">
                +
              </span>
              New Request
            </Link>
          </div>

          {/* Loading State */}
          {loading && (
            <LoadingState message="Loading your request history..." />
          )}

          {/* Empty State */}
          {!loading && requests.length === 0 && (
            <EmptyState
              icon="📋"
              title="No Requests Yet"
              message="You haven't submitted any Leave or On-Duty applications yet. Apply easily using the form."
              actionText="Apply for Leave / OD"
              actionLink="/student/leave-od"
            />
          )}

          {/* Requests List */}
          {!loading && requests.length > 0 && (
            <section
              className="mr-list"
              aria-label="My leave and OD requests"
            >
              {requests.map((request, index) => {
                const tone = tones[index % tones.length];

                return (
                  <article key={request.id} className="mr-card">
                    {/* Pastel-colored card header */}
                    <div className={`mr-card-header mr-tone-${tone}`}>
                      <div className="mr-card-heading">
                        <span className="mr-type">
                          {request.type || "Leave"}
                        </span>

                        <h2 className="mr-title">
                          {request.type || "Leave"} Application
                        </h2>

                        <StatusBadge status={request.status} />
                      </div>

                      <span className="mr-id">#{request.id}</span>
                    </div>

                    {/* White card body */}
                    <div className="mr-card-body">
                      <div className="mr-details-grid">
                        <div className="mr-detail">
                          <span
                            className="mr-detail-icon mr-icon-yellow"
                            aria-hidden="true"
                          >
                            ↗
                          </span>

                          <p className="mr-detail-label">
                            From Date &amp; Time
                          </p>

                          <p className="mr-detail-value">
                            {request.fromDate || "-"}
                            {request.fromTime
                              ? ` · ${request.fromTime}`
                              : ""}
                          </p>
                        </div>

                        <div className="mr-detail">
                          <span
                            className="mr-detail-icon mr-icon-blue"
                            aria-hidden="true"
                          >
                            ↘
                          </span>

                          <p className="mr-detail-label">
                            To Date &amp; Time
                          </p>

                          <p className="mr-detail-value">
                            {request.toDate || "-"}
                            {request.toTime
                              ? ` · ${request.toTime}`
                              : ""}
                          </p>
                        </div>

                        <div className="mr-detail">
                          <span
                            className="mr-detail-icon mr-icon-green"
                            aria-hidden="true"
                          >
                            ▦
                          </span>

                          <p className="mr-detail-label">
                            Date Submitted
                          </p>

                          <p className="mr-detail-value">
                            {request.submittedAt || "Recent"}
                          </p>
                        </div>
                      </div>

                      {/* Application Reason */}
                      <div className="mr-reason">
                        <p className="mr-reason-label">
                          Application Reason
                        </p>

                        <p className="mr-reason-text">
                          {request.reason || "No reason specified."}
                        </p>
                      </div>

                      {/* Approved Notice */}
                      {String(request.status).toUpperCase() ===
                        "APPROVED" && (
                        <div className="mr-notice approved">
                          <span
                            className="mr-notice-icon"
                            aria-hidden="true"
                          >
                            ✓
                          </span>

                          <div className="mr-notice-content">
                            <p className="mr-notice-text">
                              This request has been officially approved by
                              faculty.
                            </p>

                            {request.reviewedAt && (
                              <span className="mr-notice-date">
                                Approved on {request.reviewedAt}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Rejected Notice */}
                      {String(request.status).toUpperCase() ===
                        "REJECTED" && (
                        <div className="mr-notice rejected">
                          <span
                            className="mr-notice-icon"
                            aria-hidden="true"
                          >
                            ✕
                          </span>

                          <div className="mr-notice-content">
                            <p className="mr-notice-text">
                              This request was rejected by faculty.
                            </p>

                            {request.reviewedAt && (
                              <span className="mr-notice-date">
                                Reviewed on {request.reviewedAt}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default MyRequests;