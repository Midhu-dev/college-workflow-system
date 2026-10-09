import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/certificate-uploads/pending",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load certificates.");
      }

      setCertificates(data.uploads || []);
    } catch (error) {
      console.error("Load certificates error:", error);
      setMessage(error.message || "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const updateCertificate = async (status) => {
    if (!selectedCertificate) return;

    try {
      setUpdating(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/certificate-uploads/${selectedCertificate.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update certificate.");
      }

      setSelectedCertificate(null);
      setRemarks("");

      await loadCertificates();

      setMessage(
        status === "VERIFIED"
          ? "Certificate marked as verified successfully."
          : "Certificate rejected."
      );
    } catch (error) {
      console.error("Certificate update error:", error);
      setMessage(error.message || "Failed to update certificate.");
    } finally {
      setUpdating(false);
    }
  };

  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "PENDING"
  );

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
        .teacher-certificates-page {
          --tvc-text: #292a27;
          --tvc-muted: #595b53;
          --tvc-border: #e2e0d7;

          --tvc-yellow: oklch(0.94 0.11 100);
          --tvc-blue: oklch(0.91 0.054 235);
          --tvc-green: oklch(0.91 0.075 160);
          --tvc-peach: oklch(0.92 0.066 55);
          --tvc-lavender: oklch(0.91 0.048 300);
          --tvc-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--tvc-text);
          font-family: inherit;
          font-size: 13px;
        }

        .teacher-certificates-page *,
        .teacher-certificates-page *::before,
        .teacher-certificates-page *::after {
          box-sizing: border-box;
        }

        .tvc-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Toolbar */
        .tvc-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }

        .tvc-toolbar-text {
          margin: 0;
          color: var(--tvc-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .tvc-count {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border: 1.5px solid #292a27;
          border-radius: 4px;
          background: var(--tvc-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .tvc-count-dot {
          width: 7px;
          height: 7px;
          border: 1px solid #292a27;
          border-radius: 50%;
          background: #c4a64a;
        }

        /* Feedback */
        .tvc-feedback {
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

        .tvc-feedback.error {
          border-color: #e4bcb5;
          background: #fff0ed;
          color: #923e35;
        }

        .tvc-feedback-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          margin-top: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Certificate list */
        .tvc-list {
          display: grid;
          gap: 19px;
        }

        /* Dark outline and offset shadow like StudentDashboard */
        .tvc-card {
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

        .tvc-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel certificate header */
        .tvc-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 85px;
          padding: 16px 19px;
          border-bottom: 1.5px solid #292a27;
        }

        .tvc-tone-yellow {
          background: var(--tvc-yellow);
        }

        .tvc-tone-blue {
          background: var(--tvc-blue);
        }

        .tvc-tone-green {
          background: var(--tvc-green);
        }

        .tvc-tone-peach {
          background: var(--tvc-peach);
        }

        .tvc-tone-lavender {
          background: var(--tvc-lavender);
        }

        .tvc-tone-pink {
          background: var(--tvc-pink);
        }

        .tvc-card-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .tvc-card-icon {
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

        .tvc-card-heading-content {
          min-width: 0;
        }

        .tvc-card-index {
          margin: 0 0 4px;
          color: #494a42;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
        }

        .tvc-title {
          margin: 0;
          color: #292a27;
          font-size: 14px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tvc-credential-badge {
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

        /* White card body */
        .tvc-card-body {
          padding: 18px 19px 19px;
          background: #ffffff;
        }

        .tvc-metadata-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .tvc-metadata-item {
          min-width: 0;
          padding: 12px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .tvc-metadata-label {
          display: block;
          margin-bottom: 6px;
          color: #595b53;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .tvc-metadata-value {
          display: block;
          color: #292a27;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tvc-uploaded-date {
          color: #41423c;
          font-weight: 500;
        }

        /* Uploaded file row */
        .tvc-file-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
          padding: 11px 12px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #ffffff;
        }

        .tvc-file-info {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
          flex: 1;
        }

        .tvc-file-icon {
          display: grid;
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: var(--tvc-yellow);
          color: #292a27;
        }

        .tvc-file-icon svg {
          width: 15px;
          height: 15px;
        }

        .tvc-file-name {
          min-width: 0;
          color: #41423c;
          font-size: 11px;
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tvc-upload-id {
          flex-shrink: 0;
          color: #595b53;
          font-size: 10px;
        }

        /* Review action */
        .tvc-action-area {
          flex-shrink: 0;
          padding-top: 1px;
        }

        .tvc-review-button {
          display: inline-flex;
          min-height: 39px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--tvc-yellow);
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

        .tvc-review-button:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: #eadb9e;
        }

        /* Review modal */
        .tvc-modal-overlay {
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

        .tvc-modal {
          width: 100%;
          max-width: 540px;
          max-height: calc(100vh - 36px);
          overflow-y: auto;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 4px 4px 0 #292a27;
        }

        .tvc-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 22px;
          border-bottom: 1.5px solid #292a27;
          background: var(--tvc-yellow);
        }

        .tvc-modal-heading {
          min-width: 0;
        }

        .tvc-modal-eyebrow {
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

        .tvc-modal-eyebrow-dot {
          width: 7px;
          height: 7px;
          border: 1px solid #292a27;
          border-radius: 50%;
          background: #c4a64a;
        }

        .tvc-modal-title {
          margin: 0;
          color: #292a27;
          font-size: 16px;
          font-weight: 750;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .tvc-close-button {
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

        .tvc-close-button:hover:not(:disabled) {
          background: #ffffff;
        }

        .tvc-close-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .tvc-modal-body {
          padding: 20px 22px 22px;
          background: #ffffff;
        }

        .tvc-student-details {
          display: grid;
          gap: 0;
          padding: 4px 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .tvc-student-detail {
          display: grid;
          grid-template-columns: minmax(110px, 0.8fr) minmax(0, 1.2fr);
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #e2e0d7;
          font-size: 12px;
          line-height: 1.7;
        }

        .tvc-student-detail:last-child {
          border-bottom: none;
        }

        .tvc-student-label {
          color: #595b53;
        }

        .tvc-student-value {
          min-width: 0;
          color: #292a27;
          font-weight: 650;
          text-align: right;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .tvc-student-value.filename {
          color: #66511b;
          font-weight: 600;
        }

        .tvc-remarks-section {
          margin-top: 18px;
        }

        .tvc-remarks-label {
          display: block;
          margin-bottom: 8px;
          color: #33342d;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.7;
        }

        .tvc-remarks-hint {
          color: #696b62;
          font-size: 10px;
          font-weight: 400;
        }

        .tvc-remarks-input {
          display: block;
          width: 100%;
          min-height: 95px;
          padding: 11px 12px;
          border: 1px solid #bfc2b7;
          border-radius: 5px;
          background: #ffffff;
          color: #292a27;
          caret-color: #80651e;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.8;
          resize: vertical;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .tvc-remarks-input::placeholder {
          color: #777970;
          opacity: 1;
        }

        .tvc-remarks-input:focus {
          border-color: #80651e;
          box-shadow: 0 0 0 3px rgba(199, 166, 71, 0.2);
        }

        .tvc-remarks-input:disabled {
          background: #f3f3ef;
          cursor: not-allowed;
        }

        .tvc-modal-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 22px;
        }

        .tvc-modal-button {
          display: inline-flex;
          min-height: 39px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 13px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 750;
          box-shadow: 2px 2px 0 #292a27;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .tvc-modal-button:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
        }

        .tvc-modal-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .tvc-cancel-button {
          background: #ffffff;
          color: #41423c;
        }

        .tvc-cancel-button:hover:not(:disabled) {
          background: #f2f1ec;
        }

        .tvc-reject-button {
          background: #f5e0e7;
          color: #642e32;
        }

        .tvc-reject-button:hover:not(:disabled) {
          background: #edcbd6;
        }

        .tvc-verify-button {
          background: var(--tvc-green);
          color: #292a27;
        }

        .tvc-verify-button:hover:not(:disabled) {
          background: #c6e4d4;
        }

        .teacher-certificates-page button:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 3px;
        }

        /* Responsive layout */
        @media (max-width: 900px) {
          .tvc-container {
            padding: 28px 24px 36px;
          }

          .tvc-card-header {
            align-items: flex-start;
          }

          .tvc-metadata-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tvc-action-area {
            padding: 0 19px 18px;
          }

          .tvc-review-button {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .tvc-container {
            padding: 24px 16px 30px;
          }

          .tvc-card-header {
            padding: 14px;
          }

          .tvc-card-heading {
            gap: 9px;
          }

          .tvc-card-body {
            padding: 13px;
          }

          .tvc-metadata-grid {
            gap: 8px;
          }

          .tvc-metadata-item {
            padding: 10px;
          }

          .tvc-file-row {
            align-items: flex-start;
          }

          .tvc-upload-id {
            width: 100%;
            padding-left: 40px;
          }

          .tvc-modal-overlay {
            align-items: flex-start;
            padding: 12px;
          }

          .tvc-modal {
            max-height: calc(100vh - 24px);
          }

          .tvc-modal-header {
            padding: 16px;
          }

          .tvc-modal-body {
            padding: 16px;
          }

          .tvc-student-detail {
            grid-template-columns: minmax(0, 1fr);
            gap: 3px;
            padding: 10px 0;
          }

          .tvc-student-value {
            text-align: left;
          }

          .tvc-modal-actions {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
          }

          .tvc-modal-button {
            width: 100%;
          }
        }

        @media (max-width: 340px) {
          .tvc-metadata-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .tvc-card-heading {
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-certificates-page *,
          .teacher-certificates-page *::before,
          .teacher-certificates-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="teacher-certificates-page">
        <div className="tvc-container">
          <PageHeader
            badge="Faculty Portal"
            title="Certificate Verification"
            description="Review student-uploaded documents and verify academic and external course credentials."
            backTo="/teacher"
          />

          <div className="tvc-toolbar">
            <p className="tvc-toolbar-text">
              Review uploaded documents before confirming their authenticity.
            </p>

            <span className="tvc-count">
              <span className="tvc-count-dot" aria-hidden="true" />
              {pendingCertificates.length} Pending
            </span>
          </div>

          {/* Feedback */}
          {message && (
            <div
              className={`tvc-feedback ${
                message.toLowerCase().includes("failed") ||
                message.toLowerCase().includes("error") ||
                message.toLowerCase().includes("expired")
                  ? "error"
                  : ""
              }`}
              role="status"
              aria-live="polite"
            >
              <span className="tvc-feedback-dot" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <LoadingState message="Loading certificate uploads..." />
          )}

          {/* Empty State */}
          {!loading && pendingCertificates.length === 0 && (
            <EmptyState
              icon="📜"
              title="All Clear — No Pending Certificates"
              message="There are currently no student certificates awaiting verification."
            />
          )}

          {/* Certificate Cards */}
          {!loading && pendingCertificates.length > 0 && (
            <section
              className="tvc-list"
              aria-label="Pending certificate uploads"
            >
              {pendingCertificates.map((cert, index) => {
                const tone = tones[index % tones.length];

                return (
                  <article key={cert.id} className="tvc-card">
                    {/* Pastel-colored header */}
                    <div className={`tvc-card-header tvc-tone-${tone}`}>
                      <div className="tvc-card-heading">
                        <span className="tvc-card-icon" aria-hidden="true">
                          📜
                        </span>

                        <div className="tvc-card-heading-content">
                          <p className="tvc-card-index">
                            CERTIFICATE {String(index + 1).padStart(2, "0")}
                          </p>

                          <h2 className="tvc-title">
                            {cert.certificate_type}
                          </h2>
                        </div>
                      </div>

                      <span className="tvc-credential-badge">
                        Pending Verification
                      </span>
                    </div>

                    {/* White card body */}
                    <div className="tvc-card-body">
                      <div className="tvc-metadata-grid">
                        <div className="tvc-metadata-item">
                          <span className="tvc-metadata-label">
                            Student
                          </span>

                          <span className="tvc-metadata-value">
                            {cert.student_name || "N/A"}
                          </span>
                        </div>

                        <div className="tvc-metadata-item">
                          <span className="tvc-metadata-label">
                            Register No
                          </span>

                          <span className="tvc-metadata-value">
                            {cert.student_user_id || "N/A"}
                          </span>
                        </div>

                        <div className="tvc-metadata-item">
                          <span className="tvc-metadata-label">
                            Department
                          </span>

                          <span className="tvc-metadata-value">
                            {cert.department || "General"}
                          </span>
                        </div>

                        <div className="tvc-metadata-item">
                          <span className="tvc-metadata-label">
                            Uploaded
                          </span>

                          <span className="tvc-metadata-value tvc-uploaded-date">
                            {cert.created_at
                              ? new Date(cert.created_at).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}
                          </span>
                        </div>
                      </div>

                      {/* Uploaded Document */}
                      <div className="tvc-file-row">
                        <div className="tvc-file-info">
                          <span
                            className="tvc-file-icon"
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
                                d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10Z"
                              />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 3v7h7M8 15h8M8 18h6"
                              />
                            </svg>
                          </span>

                          <span className="tvc-file-name">
                            {cert.file_name || "certificate-document.pdf"}
                          </span>
                        </div>

                        {cert.upload_id && (
                          <span className="tvc-upload-id">
                            ID: {cert.upload_id}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review action */}
                    <div className="tvc-action-area">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCertificate(cert);
                          setRemarks("");
                        }}
                        className="tvc-review-button"
                      >
                        Review Certificate
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
      {selectedCertificate && (
        <div
          className="tvc-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !updating
            ) {
              setSelectedCertificate(null);
              setRemarks("");
            }
          }}
        >
          <section
            className="tvc-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tvc-modal-title"
          >
            {/* Modal Header */}
            <div className="tvc-modal-header">
              <div className="tvc-modal-heading">
                <p className="tvc-modal-eyebrow">
                  <span className="tvc-modal-eyebrow-dot" />
                  Document Verification
                </p>

                <h2 id="tvc-modal-title" className="tvc-modal-title">
                  {selectedCertificate.certificate_type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCertificate(null);
                  setRemarks("");
                }}
                disabled={updating}
                className="tvc-close-button"
                aria-label="Close verification dialog"
              >
                ✕
              </button>
            </div>

            <div className="tvc-modal-body">
              {/* Student Details */}
              <div className="tvc-student-details">
                <div className="tvc-student-detail">
                  <span className="tvc-student-label">
                    Student Name
                  </span>

                  <span className="tvc-student-value">
                    {selectedCertificate.student_name || "N/A"}
                  </span>
                </div>

                <div className="tvc-student-detail">
                  <span className="tvc-student-label">
                    Register Number
                  </span>

                  <span className="tvc-student-value">
                    {selectedCertificate.student_user_id || "N/A"}
                  </span>
                </div>

                <div className="tvc-student-detail">
                  <span className="tvc-student-label">
                    Department
                  </span>

                  <span className="tvc-student-value">
                    {selectedCertificate.department || "N/A"}
                  </span>
                </div>

                <div className="tvc-student-detail">
                  <span className="tvc-student-label">
                    Uploaded File
                  </span>

                  <span className="tvc-student-value filename">
                    {selectedCertificate.file_name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Faculty Remarks */}
              <div className="tvc-remarks-section">
                <label
                  htmlFor="tvc-remarks"
                  className="tvc-remarks-label"
                >
                  Faculty Verification Remarks{" "}
                  <span className="tvc-remarks-hint">(Optional)</span>
                </label>

                <textarea
                  id="tvc-remarks"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  rows={3}
                  placeholder="Notes regarding authenticity, course credits, or rejection reason..."
                  disabled={updating}
                  className="tvc-remarks-input"
                />
              </div>

              {/* Actions */}
              <div className="tvc-modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertificate(null);
                    setRemarks("");
                  }}
                  disabled={updating}
                  className="tvc-modal-button tvc-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => updateCertificate("REJECTED")}
                  disabled={updating}
                  className="tvc-modal-button tvc-reject-button"
                >
                  {updating ? "Processing..." : "✕ Reject"}
                </button>

                <button
                  type="button"
                  onClick={() => updateCertificate("VERIFIED")}
                  disabled={updating}
                  className="tvc-modal-button tvc-verify-button"
                >
                  {updating ? "Processing..." : "✓ Verify"}
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

export default TeacherCertificates;