import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherCertificateRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/certificate-requests/pending",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch certificate requests"
        );
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Certificate requests error:", error);
      setMessage(
        error.message || "Failed to load certificate requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      setUpdating(true);
      setMessage("");

      const response = await fetch(
        `http://localhost:5000/api/certificate-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update certificate request"
        );
      }

      setMessage(
        status === "COMPLETED"
          ? "Certificate request marked as completed."
          : "Certificate request rejected."
      );

      setSelectedRequest(null);
      await fetchRequests();
    } catch (error) {
      console.error("Update request error:", error);
      setMessage(error.message || "Failed to update request.");
    } finally {
      setUpdating(false);
    }
  };

  // Same pastel palette used by StudentDashboard.
  const tones = [
    "yellow",
    "blue",
    "green",
    "peach",
    "lavender",
    "pink",
  ];

  return (
    <Sidebar role="teacher">
      <style>{`
        .teacher-cert-page {
          --tc-text: #292a27;
          --tc-muted: #595b53;
          --tc-border: #e2e0d7;

          --tc-yellow: oklch(0.94 0.11 100);
          --tc-blue: oklch(0.91 0.054 235);
          --tc-green: oklch(0.91 0.075 160);
          --tc-peach: oklch(0.92 0.066 55);
          --tc-lavender: oklch(0.91 0.048 300);
          --tc-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--tc-text);
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0;
        }

        .teacher-cert-page *,
        .teacher-cert-page *::before,
        .teacher-cert-page *::after {
          box-sizing: border-box;
        }

        .tc-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Toolbar */
        .tc-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }

        .tc-toolbar-text {
          margin: 0;
          color: var(--tc-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .tc-pending-count {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border: 1.5px solid #292a27;
          border-radius: 4px;
          background: var(--tc-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .tc-count-dot {
          width: 7px;
          height: 7px;
          border: 1px solid #292a27;
          border-radius: 50%;
          background: #c4a64a;
        }

        /* Feedback */
        .tc-feedback {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 19px;
          padding: 12px 14px;
          border: 1px solid #b9d0ae;
          border-radius: 5px;
          background: #edf5e8;
          color: #365d38;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .tc-feedback.error {
          border-color: #e4bcb5;
          background: #fff0ed;
          color: #923e35;
        }

        .tc-feedback-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          margin-top: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Request list */
        .tc-request-list {
          display: grid;
          gap: 19px;
        }

        /* Card: same dark outline and offset shadow as StudentDashboard */
        .tc-request-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .tc-request-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel request header */
        .tc-request-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 83px;
          padding: 16px 19px;
          border-bottom: 1.5px solid #292a27;
        }

        .tc-tone-yellow {
          background: var(--tc-yellow);
        }

        .tc-tone-blue {
          background: var(--tc-blue);
        }

        .tc-tone-green {
          background: var(--tc-green);
        }

        .tc-tone-peach {
          background: var(--tc-peach);
        }

        .tc-tone-lavender {
          background: var(--tc-lavender);
        }

        .tc-tone-pink {
          background: var(--tc-pink);
        }

        .tc-request-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .tc-request-icon {
          display: grid;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.45);
          font-size: 19px;
        }

        .tc-request-heading-content {
          min-width: 0;
        }

        .tc-request-index {
          margin: 0 0 4px;
          color: #494a42;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
        }

        .tc-certificate-title {
          margin: 0;
          color: #292a27;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tc-requisition-badge {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          padding: 5px 8px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #292a27;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        /* White request body */
        .tc-request-body {
          padding: 18px 19px 19px;
          background: #ffffff;
        }

        .tc-metadata-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .tc-metadata-item {
          min-width: 0;
          padding: 12px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .tc-metadata-label {
          display: block;
          margin-bottom: 6px;
          color: #595b53;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .tc-metadata-value {
          display: block;
          color: #292a27;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tc-metadata-value.purpose {
          color: #66511b;
        }

        .tc-requested-date {
          margin: 12px 0 0;
          color: #595b53;
          font-size: 11px;
          line-height: 1.8;
        }

        /* Applicant remarks */
        .tc-remarks {
          margin-top: 14px;
          padding: 12px 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .tc-remarks-label {
          margin: 0 0 7px;
          color: #454640;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        .tc-remarks-text {
          margin: 0;
          color: #454640;
          font-size: 12px;
          line-height: 1.85;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        /* Process action */
        .tc-action-area {
          padding: 0 19px 18px;
          background: #ffffff;
        }

        .tc-process-button {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--tc-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 12px;
          font-weight: 750;
          white-space: nowrap;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .tc-process-button:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: #eadb9e;
        }

        .tc-process-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Review modal */
        .tc-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(35, 35, 29, 0.48);
          backdrop-filter: blur(3px);
          overflow-y: auto;
        }

        .tc-modal {
          width: 100%;
          max-width: 540px;
          max-height: calc(100vh - 36px);
          overflow-y: auto;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 4px 4px 0 #292a27;
        }

        .tc-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 22px;
          border-bottom: 1.5px solid #292a27;
          background: var(--tc-yellow);
        }

        .tc-modal-heading {
          min-width: 0;
        }

        .tc-modal-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 7px;
          color: #49412b;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.045em;
          text-transform: uppercase;
        }

        .tc-modal-eyebrow-dot {
          width: 7px;
          height: 7px;
          border: 1px solid #292a27;
          border-radius: 50%;
          background: #c4a64a;
        }

        .tc-modal-title {
          margin: 0;
          color: #292a27;
          font-size: 16px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .tc-close-button {
          display: grid;
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.5);
          color: #292a27;
          font-size: 15px;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .tc-close-button:hover:not(:disabled) {
          background: #ffffff;
        }

        .tc-close-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .tc-modal-body {
          padding: 20px 22px 22px;
          background: #ffffff;
        }

        .tc-modal-details {
          display: grid;
          gap: 0;
          padding: 4px 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .tc-modal-detail {
          display: grid;
          grid-template-columns: minmax(110px, 0.8fr) minmax(0, 1.2fr);
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #e2e0d7;
          font-size: 12px;
          line-height: 1.7;
        }

        .tc-modal-detail:last-child {
          border-bottom: none;
        }

        .tc-modal-detail-label {
          color: #595b53;
        }

        .tc-modal-detail-value {
          min-width: 0;
          color: #292a27;
          font-weight: 650;
          text-align: right;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tc-modal-detail-value.purpose {
          color: #66511b;
        }

        .tc-modal-remarks {
          margin-top: 13px;
          padding: 12px 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #ffffff;
        }

        .tc-modal-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 21px;
        }

        .tc-modal-button {
          display: inline-flex;
          min-height: 39px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 13px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .tc-modal-button:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
        }

        .tc-modal-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .tc-cancel-button {
          background: #ffffff;
          color: #41423c;
        }

        .tc-cancel-button:hover:not(:disabled) {
          background: #f2f1ec;
        }

        .tc-reject-button {
          background: var(--tc-pink);
          color: #493038;
        }

        .tc-reject-button:hover:not(:disabled) {
          background: #edcbd6;
        }

        .tc-complete-button {
          background: var(--tc-green);
          color: #292a27;
        }

        .tc-complete-button:hover:not(:disabled) {
          background: #c6e4d4;
        }

        .teacher-cert-page button:focus-visible,
        .teacher-cert-page a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 3px;
        }

        /* Responsive layout */
        @media (max-width: 900px) {
          .tc-container {
            padding: 28px 24px 36px;
          }

          .tc-metadata-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tc-process-button {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .tc-container {
            padding: 24px 16px 30px;
          }

          .tc-toolbar {
            align-items: flex-start;
          }

          .tc-request-card-header {
            align-items: flex-start;
            padding: 14px;
          }

          .tc-request-heading {
            gap: 9px;
          }

          .tc-request-body {
            padding: 13px;
          }

          .tc-metadata-grid {
            gap: 8px;
          }

          .tc-metadata-item {
            padding: 10px;
          }

          .tc-action-area {
            padding: 0 13px 14px;
          }

          .tc-modal-overlay {
            align-items: flex-start;
            padding: 12px;
          }

          .tc-modal {
            max-height: calc(100vh - 24px);
          }

          .tc-modal-header {
            padding: 16px;
          }

          .tc-modal-body {
            padding: 16px;
          }

          .tc-modal-detail {
            grid-template-columns: minmax(0, 1fr);
            gap: 3px;
            padding: 10px 0;
          }

          .tc-modal-detail-value {
            text-align: left;
          }

          .tc-modal-actions {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
          }

          .tc-modal-button {
            width: 100%;
          }
        }

        @media (max-width: 340px) {
          .tc-metadata-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .tc-request-heading {
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-cert-page *,
          .teacher-cert-page *::before,
          .teacher-cert-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="teacher-cert-page">
        <div className="tc-container">
          <PageHeader
            badge="Faculty Portal"
            title="Certificate Requests"
            description="Review and process student certificate applications for internships, admissions, and scholarships."
            backTo="/teacher"
          />

          <div className="tc-toolbar">
            <p className="tc-toolbar-text">
              Review each application before updating its status.
            </p>

            <span className="tc-pending-count">
              <span className="tc-count-dot" aria-hidden="true" />
              {requests.length} Pending
            </span>
          </div>

          {/* Feedback */}
          {message && (
            <div
              className={`tc-feedback ${
                message.toLowerCase().includes("failed") ||
                message.toLowerCase().includes("error")
                  ? "error"
                  : ""
              }`}
              role="status"
              aria-live="polite"
            >
              <span className="tc-feedback-dot" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <LoadingState message="Fetching pending certificate requests..." />
          )}

          {/* Empty State */}
          {!loading && requests.length === 0 && (
            <EmptyState
              icon="📄"
              title="All Clear — No Pending Requests"
              message="There are currently no certificate requests waiting for processing."
            />
          )}

          {/* Request Cards */}
          {!loading && requests.length > 0 && (
            <section
              className="tc-request-list"
              aria-label="Pending certificate requests"
            >
              {requests.map((request, index) => {
                const tone = tones[index % tones.length];

                return (
                  <article key={request.id} className="tc-request-card">
                    {/* Colored card header */}
                    <div className={`tc-request-card-header tc-tone-${tone}`}>
                      <div className="tc-request-heading">
                        <span className="tc-request-icon" aria-hidden="true">
                          📄
                        </span>

                        <div className="tc-request-heading-content">
                          <p className="tc-request-index">
                            CERTIFICATE REQUEST{" "}
                            {String(index + 1).padStart(2, "0")}
                          </p>

                          <h2 className="tc-certificate-title">
                            {request.certificate_type}
                          </h2>
                        </div>
                      </div>

                      <span className="tc-requisition-badge">
                        Requisition
                      </span>
                    </div>

                    {/* White card body */}
                    <div className="tc-request-body">
                      <div className="tc-request-meta">
                        <StatusBadge status={request.status || "PENDING"} />
                      </div>

                      {/* Student Metadata */}
                      <div className="tc-metadata-grid">
                        <div className="tc-metadata-item">
                          <span className="tc-metadata-label">
                            Student
                          </span>

                          <span className="tc-metadata-value">
                            {request.student_name || "N/A"}
                          </span>
                        </div>

                        <div className="tc-metadata-item">
                          <span className="tc-metadata-label">
                            Register No
                          </span>

                          <span className="tc-metadata-value">
                            {request.student_user_id || "N/A"}
                          </span>
                        </div>

                        <div className="tc-metadata-item">
                          <span className="tc-metadata-label">
                            Department
                          </span>

                          <span className="tc-metadata-value">
                            {request.department || "General"}
                          </span>
                        </div>

                        <div className="tc-metadata-item">
                          <span className="tc-metadata-label">
                            Purpose
                          </span>

                          <span className="tc-metadata-value purpose">
                            {request.purpose || "General"}
                          </span>
                        </div>
                      </div>

                      {/* Applicant Remarks */}
                      {request.additional_details && (
                        <div className="tc-remarks">
                          <p className="tc-remarks-label">
                            Applicant Remarks
                          </p>

                          <p className="tc-remarks-text">
                            {request.additional_details}
                          </p>
                        </div>
                      )}

                      <p className="tc-requested-date">
                        Requested on:{" "}
                        {request.created_at
                          ? new Date(
                              request.created_at
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </p>
                    </div>

                    {/* Process Action */}
                    <div className="tc-action-area">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="tc-process-button"
                      >
                        Process Request
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {selectedRequest && (
        <div
          className="tc-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !updating
            ) {
              setSelectedRequest(null);
            }
          }}
        >
          <section
            className="tc-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tc-modal-title"
          >
            {/* Pastel-yellow modal header */}
            <div className="tc-modal-header">
              <div className="tc-modal-heading">
                <p className="tc-modal-eyebrow">
                  <span className="tc-modal-eyebrow-dot" />
                  Certificate Requisition
                </p>

                <h2 id="tc-modal-title" className="tc-modal-title">
                  {selectedRequest.certificate_type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                disabled={updating}
                className="tc-close-button"
                aria-label="Close review dialog"
              >
                ✕
              </button>
            </div>

            <div className="tc-modal-body">
              {/* Request Details */}
              <div className="tc-modal-details">
                <div className="tc-modal-detail">
                  <span className="tc-modal-detail-label">
                    Student Name
                  </span>

                  <span className="tc-modal-detail-value">
                    {selectedRequest.student_name || "N/A"}
                  </span>
                </div>

                <div className="tc-modal-detail">
                  <span className="tc-modal-detail-label">
                    Student ID
                  </span>

                  <span className="tc-modal-detail-value">
                    {selectedRequest.student_user_id || "N/A"}
                  </span>
                </div>

                <div className="tc-modal-detail">
                  <span className="tc-modal-detail-label">
                    Department
                  </span>

                  <span className="tc-modal-detail-value">
                    {selectedRequest.department || "—"}
                  </span>
                </div>

                <div className="tc-modal-detail">
                  <span className="tc-modal-detail-label">
                    Certificate Type
                  </span>

                  <span className="tc-modal-detail-value">
                    {selectedRequest.certificate_type}
                  </span>
                </div>

                <div className="tc-modal-detail">
                  <span className="tc-modal-detail-label">
                    Application Purpose
                  </span>

                  <span className="tc-modal-detail-value purpose">
                    {selectedRequest.purpose || "General"}
                  </span>
                </div>
              </div>

              {/* Additional Notes */}
              {selectedRequest.additional_details && (
                <div className="tc-modal-remarks">
                  <p className="tc-remarks-label">
                    Additional Notes
                  </p>

                  <p className="tc-remarks-text">
                    {selectedRequest.additional_details}
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="tc-modal-actions">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  disabled={updating}
                  className="tc-modal-button tc-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={updating}
                  onClick={() =>
                    updateRequestStatus(
                      selectedRequest.id,
                      "REJECTED"
                    )
                  }
                  className="tc-modal-button tc-reject-button"
                >
                  {updating ? "Processing..." : "✕ Reject"}
                </button>

                <button
                  type="button"
                  disabled={updating}
                  onClick={() =>
                    updateRequestStatus(
                      selectedRequest.id,
                      "COMPLETED"
                    )
                  }
                  className="tc-modal-button tc-complete-button"
                >
                  {updating ? "Processing..." : "✓ Mark Completed"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      <Footer />
    </Sidebar>
  );
}

export default TeacherCertificateRequests;