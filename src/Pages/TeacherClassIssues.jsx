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
        throw new Error(data.message || "Failed to load class issues.");
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
        throw new Error(data.message || "Failed to resolve issue.");
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

  const closeModal = () => {
    if (updating) return;

    setSelectedIssue(null);
    setResolution("");
  };

  const pendingIssues = issues.filter(
    (issue) => issue.status === "PENDING"
  );

  return (
    <Sidebar role="teacher">
      <style>{`
        .teacher-class-issues {
          --tci-text: #292a27;
          --tci-muted: #777971;
          --tci-border: #e5e5df;
          --tci-gold: #f5edc9;
          --tci-gold-border: #e5d99e;
          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--tci-text);
          font-family: inherit;
          font-size: 13px;
        }

        .teacher-class-issues *,
        .teacher-class-issues *::before,
        .teacher-class-issues *::after {
          box-sizing: border-box;
        }

        .tci-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 30px 32px 42px;
        }

        .tci-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }

        .tci-toolbar-text {
          margin: 0;
          color: var(--tci-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .tci-count {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border: 1px solid var(--tci-gold-border);
          border-radius: 5px;
          background: #fbf8eb;
          color: #76662f;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .tci-count-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c4a64a;
        }

        .tci-feedback {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid #d8e6d1;
          border-radius: 5px;
          background: #f5f9f2;
          color: #477049;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .tci-feedback.error {
          border-color: #eed4d0;
          background: #fff6f4;
          color: #9b4540;
        }

        .tci-feedback-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          margin-top: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .tci-list {
          display: grid;
          gap: 14px;
        }

        .tci-card {
          min-width: 0;
          padding: 19px;
          border: 1px solid var(--tci-border);
          border-radius: 6px;
          background: #ffffff;
          transition: border-color 150ms ease;
        }

        .tci-card:hover {
          border-color: #d8d2b9;
        }

        .tci-card-layout {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;
        }

        .tci-card-content {
          min-width: 0;
          flex: 1;
        }

        .tci-card-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 9px;
        }

        .tci-category {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px solid var(--tci-gold-border);
          border-radius: 4px;
          background: #fbf8eb;
          color: #76662f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.035em;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .tci-title {
          margin: 0;
          color: var(--tci-text);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .tci-metadata-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-top: 15px;
        }

        .tci-metadata-item {
          min-width: 0;
          padding: 11px;
          border: 1px solid #edede7;
          border-radius: 5px;
          background: #fdfdfb;
        }

        .tci-metadata-label {
          display: block;
          margin-bottom: 6px;
          color: #777971;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .tci-metadata-value {
          display: block;
          color: #41423c;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tci-date {
          color: #777971;
          font-weight: 500;
        }

        .tci-location {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          margin: 13px 0 0;
          color: #777971;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .tci-location strong {
          color: #41423c;
          font-weight: 600;
          overflow-wrap: anywhere;
        }

        .tci-location-icon {
          flex-shrink: 0;
        }

        .tci-description {
          margin-top: 14px;
          padding: 13px;
          border: 1px solid #edede7;
          border-radius: 5px;
          background: #fdfdfb;
        }

        .tci-description-label {
          display: block;
          margin-bottom: 7px;
          color: #777971;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        .tci-description-text {
          margin: 0;
          color: #555750;
          font-size: 12px;
          line-height: 1.8;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tci-action-area {
          flex-shrink: 0;
          padding-top: 1px;
        }

        .tci-resolve-button {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid var(--tci-gold-border);
          border-radius: 5px;
          background: var(--tci-gold);
          color: #554823;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .tci-resolve-button:hover {
          border-color: #d2bf75;
          background: #eee2ad;
        }

        /* Resolution modal */

        .tci-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(35, 35, 29, 0.42);
          backdrop-filter: blur(3px);
          overflow-y: auto;
        }

        .tci-modal {
          width: 100%;
          max-width: 540px;
          max-height: calc(100vh - 36px);
          overflow-y: auto;
          padding: 23px;
          border: 1px solid #e5e1d2;
          border-radius: 7px;
          background: #ffffff;
          box-shadow: 0 16px 48px rgba(35, 35, 29, 0.16);
        }

        .tci-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #edede7;
        }

        .tci-modal-heading {
          min-width: 0;
        }

        .tci-modal-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 7px;
          color: #806d30;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.045em;
          text-transform: uppercase;
        }

        .tci-modal-eyebrow-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #c4a64a;
        }

        .tci-modal-title {
          margin: 0;
          color: var(--tci-text);
          font-size: 16px;
          font-weight: 700;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .tci-close-button {
          display: grid;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--tci-border);
          border-radius: 5px;
          background: #fafaf7;
          color: #777971;
          font-size: 15px;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
        }

        .tci-close-button:hover:not(:disabled) {
          background: #f2efdf;
          color: #454640;
        }

        .tci-close-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .tci-report {
          margin-top: 16px;
          padding: 13px;
          border: 1px solid #edede7;
          border-radius: 5px;
          background: #fdfdfb;
        }

        .tci-report-label {
          display: block;
          margin-bottom: 8px;
          color: #777971;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.7;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .tci-report-description {
          margin: 0;
          color: #555750;
          font-size: 12px;
          line-height: 1.8;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tci-resolution-section {
          margin-top: 16px;
        }

        .tci-resolution-label {
          display: block;
          margin-bottom: 8px;
          color: #555750;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.7;
        }

        .tci-required {
          color: #a17e22;
        }

        .tci-resolution-hint {
          margin: 0 0 8px;
          color: #85877e;
          font-size: 11px;
          line-height: 1.7;
        }

        .tci-resolution-input {
          display: block;
          width: 100%;
          min-height: 110px;
          padding: 11px 12px;
          border: 1px solid var(--tci-border);
          border-radius: 5px;
          background: #fdfdfb;
          color: #41423c;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.8;
          resize: vertical;
          outline: none;
          transition: border-color 150ms ease;
        }

        .tci-resolution-input::placeholder {
          color: #999a91;
        }

        .tci-resolution-input:focus {
          border-color: #c4a64a;
          box-shadow: 0 0 0 2px rgba(196, 166, 74, 0.12);
        }

        .tci-resolution-input:disabled {
          background: #f4f4f0;
          cursor: not-allowed;
        }

        .tci-modal-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 21px;
        }

        .tci-modal-button {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          border: 1px solid transparent;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease;
        }

        .tci-modal-button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }

        .tci-cancel-button {
          border-color: var(--tci-border);
          background: #ffffff;
          color: #66685f;
        }

        .tci-cancel-button:hover:not(:disabled) {
          background: #f7f7f2;
        }

        .tci-submit-button {
          border-color: var(--tci-gold-border);
          background: var(--tci-gold);
          color: #554823;
        }

        .tci-submit-button:hover:not(:disabled) {
          border-color: #d2bf75;
          background: #eee2ad;
        }

        .teacher-class-issues button:focus-visible {
          outline: 2px solid #b9a04c;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .tci-container {
            padding: 24px 20px 34px;
          }

          .tci-card-layout {
            flex-direction: column;
            gap: 16px;
          }

          .tci-action-area {
            width: 100%;
          }

          .tci-resolve-button {
            width: 100%;
          }

          .tci-metadata-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          .tci-container {
            padding: 20px 12px 28px;
          }

          .tci-card {
            padding: 14px;
          }

          .tci-metadata-grid {
            gap: 8px;
          }

          .tci-metadata-item {
            padding: 10px;
          }

          .tci-modal-overlay {
            align-items: flex-start;
            padding: 12px;
          }

          .tci-modal {
            max-height: calc(100vh - 24px);
            padding: 16px;
          }

          .tci-modal-actions {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
          }

          .tci-modal-button {
            width: 100%;
          }
        }

        @media (max-width: 340px) {
          .tci-metadata-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-class-issues *,
          .teacher-class-issues *::before,
          .teacher-class-issues *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="teacher-class-issues">
        <div className="tci-container">
          <PageHeader
            badge="Faculty Portal"
            title="Class Issues"
            description="Review classroom, laboratory, and infrastructure reports, then record the corrective action taken."
            backTo="/teacher"
          />

          <div className="tci-toolbar">
            <p className="tci-toolbar-text">
              Review student reports and document resolutions for pending issues.
            </p>

            <span className="tci-count">
              <span className="tci-count-dot" aria-hidden="true" />
              {pendingIssues.length} Pending
            </span>
          </div>

          {/* Feedback */}
          {message && (
            <div
              className={`tci-feedback ${
                message.toLowerCase().includes("failed") ||
                message.toLowerCase().includes("error") ||
                message.toLowerCase().includes("expired")
                  ? "error"
                  : ""
              }`}
              role="status"
              aria-live="polite"
            >
              <span className="tci-feedback-dot" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <LoadingState message="Fetching pending class issues..." />
          )}

          {/* Empty State */}
          {!loading && pendingIssues.length === 0 && (
            <EmptyState
              icon="✓"
              title="All Clear — No Pending Issues"
              message="There are currently no unresolved classroom issues or grievances reported by students."
            />
          )}

          {/* Issues List */}
          {!loading && pendingIssues.length > 0 && (
            <section className="tci-list" aria-label="Pending class issues">
              {pendingIssues.map((issue) => (
                <article key={issue.id} className="tci-card">
                  <div className="tci-card-layout">
                    <div className="tci-card-content">
                      <div className="tci-card-meta">
                        <span className="tci-category">
                          {issue.issue_type || "General"}
                        </span>

                        <StatusBadge status={issue.status} />
                      </div>

                      <h2 className="tci-title">
                        {issue.title || "Untitled issue"}
                      </h2>

                      {/* Student Metadata */}
                      <div className="tci-metadata-grid">
                        <div className="tci-metadata-item">
                          <span className="tci-metadata-label">
                            Student
                          </span>

                          <span className="tci-metadata-value">
                            {issue.student_name || "N/A"}
                          </span>
                        </div>

                        <div className="tci-metadata-item">
                          <span className="tci-metadata-label">
                            Register No
                          </span>

                          <span className="tci-metadata-value">
                            {issue.student_user_id || "N/A"}
                          </span>
                        </div>

                        <div className="tci-metadata-item">
                          <span className="tci-metadata-label">
                            Department
                          </span>

                          <span className="tci-metadata-value">
                            {issue.department || "General"}
                          </span>
                        </div>

                        <div className="tci-metadata-item">
                          <span className="tci-metadata-label">
                            Date Logged
                          </span>

                          <span className="tci-metadata-value tci-date">
                            {issue.created_at
                              ? new Date(
                                  issue.created_at
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "-"}
                          </span>
                        </div>
                      </div>

                      {/* Location */}
                      {issue.location && (
                        <p className="tci-location">
                          <span
                            className="tci-location-icon"
                            aria-hidden="true"
                          >
                            📍
                          </span>

                          <span>
                            Location: <strong>{issue.location}</strong>
                          </span>
                        </p>
                      )}

                      {/* Description */}
                      <div className="tci-description">
                        <span className="tci-description-label">
                          Reported Details
                        </span>

                        <p className="tci-description-text">
                          {issue.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Resolve Action */}
                    <div className="tci-action-area">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIssue(issue);
                          setResolution("");
                        }}
                        className="tci-resolve-button"
                      >
                        Resolve Issue
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>

      {/* Resolution Modal */}
      {selectedIssue && (
        <div
          className="tci-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="tci-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tci-modal-title"
          >
            {/* Modal Header */}
            <div className="tci-modal-header">
              <div className="tci-modal-heading">
                <p className="tci-modal-eyebrow">
                  <span className="tci-modal-eyebrow-dot" />
                  Issue Resolution
                </p>

                <h2 id="tci-modal-title" className="tci-modal-title">
                  {selectedIssue.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="tci-close-button"
                aria-label="Close resolution dialog"
              >
                ✕
              </button>
            </div>

            {/* Student Report */}
            <div className="tci-report">
              <span className="tci-report-label">
                Student Report (
                {selectedIssue.student_name || "N/A"} —{" "}
                {selectedIssue.student_user_id || "N/A"})
              </span>

              <p className="tci-report-description">
                {selectedIssue.description || "No description provided."}
              </p>
            </div>

            {/* Resolution Input */}
            <div className="tci-resolution-section">
              <label
                htmlFor="tci-resolution"
                className="tci-resolution-label"
              >
                Faculty Resolution Remarks{" "}
                <span className="tci-required">*</span>
              </label>

              <p className="tci-resolution-hint">
                Describe the corrective action taken to address this issue.
              </p>

              <textarea
                id="tci-resolution"
                value={resolution}
                onChange={(event) => setResolution(event.target.value)}
                rows={4}
                placeholder="Example: Projector replacement scheduled with the IT department..."
                disabled={updating}
                required
                className="tci-resolution-input"
              />
            </div>

            {/* Modal Actions */}
            <div className="tci-modal-actions">
              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="tci-modal-button tci-cancel-button"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={resolveIssue}
                disabled={updating || !resolution.trim()}
                className="tci-modal-button tci-submit-button"
              >
                {updating ? "Saving..." : "✓ Mark Resolved"}
              </button>
            </div>
          </section>
        </div>
      )}

      <Footer />
    </Sidebar>
  );
}

export default TeacherClassIssues;