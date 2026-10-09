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

  // Exact pastel palette used by StudentDashboard.
  const tones = ["yellow", "blue", "green", "peach", "lavender", "pink"];

  return (
    <Sidebar role="student">
      <style>{`
        .my-issues-page {
          --mi-text: #292a27;
          --mi-muted: #595b53;
          --mi-border: #e2e0d7;
          --mi-shadow: 3px 3px 0 #292a27;

          --mi-yellow: oklch(0.94 0.11 100);
          --mi-blue: oklch(0.91 0.054 235);
          --mi-green: oklch(0.91 0.075 160);
          --mi-peach: oklch(0.92 0.066 55);
          --mi-lavender: oklch(0.91 0.048 300);
          --mi-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--mi-text);
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0;
        }

        .my-issues-page *,
        .my-issues-page *::before,
        .my-issues-page *::after {
          box-sizing: border-box;
        }

        .my-issues-page h1,
        .my-issues-page h2,
        .my-issues-page h3,
        .my-issues-page h4,
        .my-issues-page p {
          overflow-wrap: anywhere;
        }

        .mi-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Page actions */
        .mi-header-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }

        .mi-header-copy {
          margin: 0;
          color: var(--mi-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .mi-report-button {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 14px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--mi-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            background 160ms ease;
        }

        .mi-report-button:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: oklch(0.91 0.10 100);
        }

        .mi-report-icon {
          font-size: 17px;
          line-height: 1;
        }

        /* Error message */
        .mi-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          padding: 13px 14px;
          border: 1px solid #e8c5bf;
          border-radius: 6px;
          background: #fff3f1;
          color: #873c34;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .mi-alert-icon {
          display: grid;
          width: 19px;
          height: 19px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 50%;
          background: #f8e2de;
          color: #873c34;
          font-size: 11px;
          font-weight: 800;
        }

        /* Issues list */
        .mi-section {
          display: grid;
          gap: 19px;
        }

        /* Card treatment matches StudentDashboard */
        .mi-issue-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: var(--mi-shadow);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .mi-issue-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel-colored issue header */
        .mi-issue-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          padding: 17px 19px;
          border-bottom: 1.5px solid #292a27;
        }

        .mi-tone-yellow {
          background: var(--mi-yellow);
        }

        .mi-tone-blue {
          background: var(--mi-blue);
        }

        .mi-tone-green {
          background: var(--mi-green);
        }

        .mi-tone-peach {
          background: var(--mi-peach);
        }

        .mi-tone-lavender {
          background: var(--mi-lavender);
        }

        .mi-tone-pink {
          background: var(--mi-pink);
        }

        .mi-issue-main {
          min-width: 0;
          flex: 1;
        }

        .mi-issue-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .mi-type-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px solid rgba(41, 42, 39, 0.55);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #383930;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .mi-issue-title {
          margin: 0;
          color: #292a27;
          font-size: 15px;
          line-height: 1.6;
          font-weight: 750;
          overflow-wrap: anywhere;
        }

        .mi-submitted-date {
          flex-shrink: 0;
          max-width: 180px;
          padding-top: 2px;
          color: #41423c;
          font-size: 11px;
          line-height: 1.8;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .mi-submitted-label {
          color: #595b53;
          font-size: 10px;
          font-weight: 600;
        }

        /* Card content */
        .mi-issue-content {
          padding: 17px 19px 19px;
          background: #ffffff;
        }

        .mi-location {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #454640;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .mi-location-icon {
          display: grid;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: var(--mi-peach);
          color: #292a27;
        }

        .mi-location-icon svg {
          width: 14px;
          height: 14px;
        }

        .mi-location strong {
          color: #292a27;
          font-weight: 700;
        }

        /* Description panel */
        .mi-description {
          margin-top: 15px;
          padding: 13px 14px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .mi-description-label {
          margin: 0 0 7px;
          color: #454640;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.045em;
          text-transform: uppercase;
        }

        .mi-description-text {
          margin: 0;
          color: #454640;
          font-size: 12px;
          line-height: 1.85;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        /* Resolution panels */
        .mi-resolution {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-top: 14px;
          padding: 13px 14px;
          border: 1px solid;
          border-radius: 5px;
        }

        .mi-resolution.resolved {
          border-color: #b9d0ae;
          background: #edf5e8;
        }

        .mi-resolution.rejected {
          border-color: #e4bcb5;
          background: #fff0ed;
        }

        .mi-resolution-icon {
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

        .mi-resolution.resolved .mi-resolution-icon {
          background: #dcebd3;
          color: #3f6640;
        }

        .mi-resolution.rejected .mi-resolution-icon {
          background: #f7ded9;
          color: #923e35;
        }

        .mi-resolution-content {
          min-width: 0;
        }

        .mi-resolution-title {
          margin: 0;
          font-size: 11px;
          line-height: 1.7;
          font-weight: 750;
          letter-spacing: 0.025em;
        }

        .mi-resolution.resolved .mi-resolution-title {
          color: #365d38;
        }

        .mi-resolution.rejected .mi-resolution-title {
          color: #923e35;
        }

        .mi-resolution-text {
          margin: 4px 0 0;
          font-size: 12px;
          line-height: 1.8;
        }

        .mi-resolution.resolved .mi-resolution-text {
          color: #405f3e;
        }

        .mi-resolution.rejected .mi-resolution-text {
          color: #87463e;
        }

        .mi-resolution-date {
          margin: 7px 0 0;
          font-size: 11px;
          line-height: 1.6;
          color: #595b53;
        }

        .my-issues-page a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 4px;
        }

        /* Responsive layout */
        @media (max-width: 1100px) {
          .mi-container {
            padding: 28px 25px 36px;
          }
        }

        @media (max-width: 700px) {
          .mi-container {
            padding: 25px 18px 32px;
          }

          .mi-issue-header {
            flex-direction: column;
            gap: 10px;
          }

          .mi-submitted-date {
            max-width: 100%;
            text-align: left;
          }

          .mi-issue-content {
            padding: 15px;
          }
        }

        @media (max-width: 420px) {
          .mi-container {
            padding: 20px 12px 28px;
          }

          .mi-header-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .mi-report-button {
            width: 100%;
          }

          .mi-issue-header {
            padding: 14px;
          }

          .mi-issue-content {
            padding: 12px;
          }

          .mi-description {
            padding: 11px;
          }

          .mi-resolution {
            padding: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .my-issues-page *,
          .my-issues-page *::before,
          .my-issues-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="my-issues-page">
        <div className="mi-container">
          <PageHeader
            badge="Student Services"
            title="My Class Issues"
            description="View submitted grievances, track review statuses, and read teacher resolution notes."
            backTo="/student"
          />

          <div className="mi-header-actions">
            <p className="mi-header-copy">
              Track the progress of issues you've reported.
            </p>

            <Link to="/student/class-issue" className="mi-report-button">
              <span className="mi-report-icon" aria-hidden="true">
                +
              </span>
              Report New Issue
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mi-alert" role="alert">
              <span className="mi-alert-icon" aria-hidden="true">
                !
              </span>
              <span>{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <LoadingState message="Fetching your submitted class issues..." />
          )}

          {/* Empty State */}
          {!loading && !error && issues.length === 0 && (
            <EmptyState
              icon="⚠️"
              title="No Class Issues Reported"
              message="You haven't submitted any classroom or infrastructure issues yet. Everything looks good!"
              actionText="Report an Issue"
              actionLink="/student/class-issue"
            />
          )}

          {/* Issues List */}
          {!loading && issues.length > 0 && (
            <section
              className="mi-section"
              aria-label="Reported class issues"
            >
              {issues.map((issue, index) => {
                const tone = tones[index % tones.length];

                return (
                  <article key={issue.id} className="mi-issue-card">
                    {/* Pastel header */}
                    <div className={`mi-issue-header mi-tone-${tone}`}>
                      <div className="mi-issue-main">
                        <div className="mi-issue-meta">
                          <span className="mi-type-badge">
                            {issue.issue_type || "General"}
                          </span>

                          <StatusBadge status={issue.status} />
                        </div>

                        <h2 className="mi-issue-title">
                          {issue.title}
                        </h2>
                      </div>

                      <time
                        className="mi-submitted-date"
                        dateTime={issue.created_at || undefined}
                      >
                        <span className="mi-submitted-label">
                          Submitted
                        </span>
                        <br />
                        {formatDate(issue.created_at)}
                      </time>
                    </div>

                    <div className="mi-issue-content">
                      {/* Location */}
                      {issue.location && (
                        <div className="mi-location">
                          <span
                            className="mi-location-icon"
                            aria-hidden="true"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.7}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                              />
                              <circle cx="12" cy="10" r="2.5" />
                            </svg>
                          </span>

                          <span>
                            Location: <strong>{issue.location}</strong>
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      <div className="mi-description">
                        <p className="mi-description-label">
                          Description
                        </p>

                        <p className="mi-description-text">
                          {issue.description}
                        </p>
                      </div>

                      {/* Resolved Information */}
                      {issue.status === "RESOLVED" && (
                        <div className="mi-resolution resolved">
                          <span
                            className="mi-resolution-icon"
                            aria-hidden="true"
                          >
                            ✓
                          </span>

                          <div className="mi-resolution-content">
                            <h3 className="mi-resolution-title">
                              Issue Resolved
                            </h3>

                            <p className="mi-resolution-text">
                              This grievance was marked resolved by the
                              department faculty.
                            </p>

                            {issue.handled_at && (
                              <p className="mi-resolution-date">
                                Resolved on {formatDate(issue.handled_at)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Rejected Information */}
                      {issue.status === "REJECTED" && (
                        <div className="mi-resolution rejected">
                          <span
                            className="mi-resolution-icon"
                            aria-hidden="true"
                          >
                            !
                          </span>

                          <div className="mi-resolution-content">
                            <h3 className="mi-resolution-title">
                              Issue Closed / Rejected
                            </h3>

                            <p className="mi-resolution-text">
                              This issue could not be accepted for resolution
                              at this time.
                            </p>
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

export default MyClassIssues;