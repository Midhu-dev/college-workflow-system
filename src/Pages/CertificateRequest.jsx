import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

function CertificateRequest() {
  const [certificateType, setCertificateType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateType || !purpose) {
      setError("Please select both the certificate type and the purpose.");
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
      setSubmitting(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/certificate-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            certificateType,
            purpose,
            additionalDetails,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit certificate request."
        );
      }

      setRequestData(data);
      setSubmitted(true);
    } catch (err) {
      console.error("Certificate request error:", err);
      setError(err.message || "Failed to submit certificate request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewRequest = () => {
    setSubmitted(false);
    setCertificateType("");
    setPurpose("");
    setAdditionalDetails("");
    setRequestData(null);
    setMessage("");
    setError("");
  };

  const styles = `
    .certificate-request-page {
      --cr-background: #ffffff;
      --cr-foreground: #202020;
      --cr-muted: #777777;
      --cr-border: #d8d8d8;
      --cr-yellow: #fff09a;
      --cr-blue: #bde7fa;
      --cr-green: #b7f0d0;
      --cr-red: #ffe2e2;

      width: 100%;
      min-height: 100%;
      flex: 1;
      background: var(--cr-background);
      color: var(--cr-foreground);
      font-family: inherit;
      font-size: 13px;
    }

    .certificate-request-page,
    .certificate-request-page * {
      box-sizing: border-box;
    }

    .certificate-request-page a {
      color: inherit;
      text-decoration: none;
    }

    .certificate-request-page h1,
    .certificate-request-page h2,
    .certificate-request-page h3,
    .certificate-request-page p {
      margin: 0;
    }

    .cr-container {
      width: 100%;
      max-width: 850px;
      margin: 0 auto;
      padding: 28px 32px 40px;
    }

    .cr-form-header {
      margin-bottom: 23px;
    }

    .cr-form-header > * {
      max-width: 100%;
    }

    .cr-alert {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 18px;
      padding: 13px 15px;
      border: 1px solid var(--cr-border);
      border-radius: 4px;
      background: #ffffff;
      font-size: 12px;
      line-height: 1.7;
    }

    .cr-alert-error {
      border-color: #e5aaaa;
      background: #fff5f5;
      color: #9f2929;
    }

    .cr-alert-success {
      border-color: #9ddbb9;
      background: #f1fff6;
      color: #216b43;
    }

    .cr-alert-dot {
      width: 7px;
      height: 7px;
      margin-top: 6px;
      flex-shrink: 0;
      border-radius: 50%;
      background: currentColor;
    }

    .cr-panel {
      border: 1.5px solid var(--cr-foreground);
      border-radius: 5px;
      background: #ffffff;
      box-shadow: 3px 3px 0 var(--cr-foreground);
      overflow: hidden;
    }

    .cr-panel-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 19px 21px;
      border-bottom: 1px solid var(--cr-border);
    }

    .cr-panel-icon {
      display: flex;
      width: 43px;
      height: 43px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--cr-foreground);
      border-radius: 4px;
      background: var(--cr-yellow);
      font-size: 21px;
    }

    .cr-panel-title {
      font-size: 17px;
      font-weight: 700;
      line-height: 1.5;
      letter-spacing: -0.2px;
    }

    .cr-panel-description {
      margin-top: 4px !important;
      color: var(--cr-muted);
      font-size: 11px;
      line-height: 1.7;
    }

    .cr-form {
      display: flex;
      flex-direction: column;
      gap: 21px;
      padding: 23px 21px 21px;
    }

    .cr-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    .cr-label {
      color: var(--cr-foreground);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.35px;
    }

    .cr-required {
      color: #b42318;
      margin-left: 3px;
    }

    .cr-control {
      width: 100%;
      min-height: 43px;
      padding: 10px 12px;
      border: 1px solid #cfcfcf;
      border-radius: 4px;
      background: #ffffff;
      color: var(--cr-foreground);
      font-family: inherit;
      font-size: 12px;
      line-height: 1.6;
      outline: none;
      transition: border-color 150ms ease, box-shadow 150ms ease;
    }

    .cr-control:focus {
      border-color: var(--cr-foreground);
      box-shadow: 2px 2px 0 var(--cr-yellow);
    }

    .cr-control:disabled {
      background: #f5f5f5;
      color: #777777;
      cursor: not-allowed;
    }

    .cr-control option {
      background: #ffffff;
      color: #202020;
    }

    .cr-textarea {
      min-height: 115px;
      resize: vertical;
    }

    .cr-control::placeholder {
      color: #929292;
      opacity: 1;
    }

    .cr-help-text {
      color: var(--cr-muted);
      font-size: 10px;
      line-height: 1.6;
    }

    .cr-form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 13px;
      padding-top: 17px;
      border-top: 1px solid var(--cr-border);
    }

    .cr-required-note {
      color: var(--cr-muted);
      font-size: 10px;
      line-height: 1.6;
    }

    .cr-submit-button {
      display: inline-flex;
      min-height: 41px;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 10px 16px;
      border: 1.5px solid var(--cr-foreground);
      border-radius: 4px;
      background: var(--cr-yellow);
      color: var(--cr-foreground);
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 2px 2px 0 var(--cr-foreground);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    .cr-submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    .cr-submit-button:focus-visible,
    .cr-secondary-button:focus-visible {
      outline: 2px solid var(--cr-foreground);
      outline-offset: 4px;
    }

    .cr-spinner {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: cr-spin 700ms linear infinite;
    }

    @keyframes cr-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .cr-success-container {
      max-width: 650px;
      margin: 0 auto;
      padding: 45px 32px;
    }

    .cr-success-panel {
      padding: 28px;
      text-align: center;
    }

    .cr-success-icon {
      display: flex;
      width: 56px;
      height: 56px;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
      border: 1.5px solid var(--cr-foreground);
      border-radius: 5px;
      background: var(--cr-green);
      font-size: 25px;
      font-weight: 700;
    }

    .cr-success-title {
      font-size: 22px;
      line-height: 1.4;
      font-weight: 700;
      letter-spacing: -0.4px;
    }

    .cr-success-description {
      max-width: 400px;
      margin: 9px auto 0 !important;
      color: var(--cr-muted);
      font-size: 12px;
      line-height: 1.8;
    }

    .cr-receipt {
      margin-top: 25px;
      padding: 17px;
      border: 1px solid var(--cr-border);
      border-radius: 4px;
      background: #ffffff;
      text-align: left;
    }

    .cr-receipt-title {
      margin-bottom: 13px !important;
      font-size: 12px;
      font-weight: 700;
    }

    .cr-receipt-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 15px;
      padding: 12px 0;
      border-bottom: 1px solid #e9e9e9;
      font-size: 11px;
      line-height: 1.7;
    }

    .cr-receipt-row:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .cr-receipt-label {
      flex-shrink: 0;
      color: var(--cr-muted);
    }

    .cr-receipt-value {
      max-width: 65%;
      font-weight: 600;
      text-align: right;
      overflow-wrap: anywhere;
    }

    .cr-receipt-id {
      font-family: monospace;
      font-size: 11px;
    }

    .cr-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border: 1px solid #eadb98;
      border-radius: 3px;
      background: #fff8d7;
      color: #735d13;
      font-size: 10px;
      font-weight: 700;
    }

    .cr-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #b18b19;
    }

    .cr-success-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .cr-primary-link,
    .cr-secondary-button {
      display: inline-flex;
      min-height: 40px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 14px;
      border: 1.5px solid var(--cr-foreground);
      border-radius: 4px;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    .cr-primary-link {
      background: var(--cr-yellow);
      box-shadow: 2px 2px 0 var(--cr-foreground);
    }

    .cr-secondary-button {
      background: #ffffff;
    }

    @media (hover: hover) and (pointer: fine) {
      .cr-submit-button:not(:disabled):hover,
      .cr-primary-link:hover {
        transform: translate(-1px, -1px);
        box-shadow: 4px 4px 0 var(--cr-foreground);
      }

      .cr-secondary-button:hover {
        background: #f6f6f6;
      }
    }

    @media (max-width: 640px) {
      .cr-container {
        padding: 23px 17px 30px;
      }

      .cr-panel-header {
        padding: 16px;
        gap: 12px;
      }

      .cr-panel-icon {
        width: 39px;
        height: 39px;
        font-size: 19px;
      }

      .cr-panel-title {
        font-size: 15px;
      }

      .cr-form {
        gap: 19px;
        padding: 19px 16px 17px;
      }

      .cr-form-footer {
        align-items: stretch;
        flex-direction: column;
      }

      .cr-submit-button {
        width: 100%;
      }

      .cr-success-container {
        padding: 28px 17px;
      }

      .cr-success-panel {
        padding: 21px 16px;
      }

      .cr-success-title {
        font-size: 19px;
      }

      .cr-receipt {
        padding: 13px;
      }

      .cr-success-actions {
        align-items: stretch;
        flex-direction: column;
      }

      .cr-primary-link,
      .cr-secondary-button {
        width: 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .certificate-request-page *,
      .certificate-request-page *::before,
      .certificate-request-page *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  /* SUCCESS RECEIPT VIEW */
  if (submitted) {
    return (
      <Sidebar role="student">
        <style>{styles}</style>

        <main className="certificate-request-page cr-success-container">
          <section className="cr-panel cr-success-panel">
            <div className="cr-success-icon" aria-hidden="true">
              ✓
            </div>

            <h2 className="cr-success-title">
              Certificate Request Submitted
            </h2>

            <p className="cr-success-description">
              Your application has been received and registered with the
              academic administration.
            </p>

            <div className="cr-receipt">
              <h3 className="cr-receipt-title">Request Summary</h3>

              <div className="cr-receipt-row">
                <span className="cr-receipt-label">Reference Request ID</span>
                <span className="cr-receipt-value cr-receipt-id">
                  {requestData?.request_id ||
                    requestData?.requestId ||
                    "#CR-PENDING"}
                </span>
              </div>

              <div className="cr-receipt-row">
                <span className="cr-receipt-label">Certificate Type</span>
                <span className="cr-receipt-value">{certificateType}</span>
              </div>

              <div className="cr-receipt-row">
                <span className="cr-receipt-label">Purpose</span>
                <span className="cr-receipt-value">{purpose}</span>
              </div>

              <div className="cr-receipt-row">
                <span className="cr-receipt-label">Current Status</span>
                <span className="cr-status">
                  <span className="cr-status-dot" />
                  PENDING
                </span>
              </div>
            </div>

            <div className="cr-success-actions">
              <Link to="/student" className="cr-primary-link">
                <span aria-hidden="true">←</span>
                Back to Dashboard
              </Link>

              <button
                type="button"
                onClick={handleNewRequest}
                className="cr-secondary-button"
              >
                Submit Another Request
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </Sidebar>
    );
  }

  /* REQUEST FORM VIEW */
  return (
    <Sidebar role="student">
      <style>{styles}</style>

      <main className="certificate-request-page">
        <div className="cr-container">
          <div className="cr-form-header">
            <PageHeader
              badge="Official Certificates"
              title="Certificate Request"
              description="Apply for institutional bonafide, conduct, or course certificates directly from the college administration."
              backTo="/student"
            />
          </div>

          {error && (
            <div className="cr-alert cr-alert-error" role="alert">
              <span className="cr-alert-dot" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="cr-alert cr-alert-success" role="status">
              <span className="cr-alert-dot" />
              <span>{message}</span>
            </div>
          )}

          <section className="cr-panel">
            <header className="cr-panel-header">
              <div className="cr-panel-icon" aria-hidden="true">
                📋
              </div>

              <div>
                <h2 className="cr-panel-title">Request Specifications</h2>
                <p className="cr-panel-description">
                  Select your required certificate and provide its intended
                  purpose.
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="cr-form">
              <div className="cr-field">
                <label htmlFor="certificateType" className="cr-label">
                  Certificate Type
                  <span className="cr-required">*</span>
                </label>

                <select
                  id="certificateType"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  required
                  disabled={submitting}
                  className="cr-control"
                >
                  <option value="">Select required certificate</option>
                  <option value="Bonafide Certificate">
                    Bonafide Certificate
                  </option>
                  <option value="Course Completion Certificate">
                    Course Completion Certificate
                  </option>
                  <option value="Conduct Certificate">Conduct Certificate</option>
                  <option value="Study Certificate">Study Certificate</option>
                  <option value="Internship Permission Certificate">
                    Internship Permission Certificate
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="cr-field">
                <label htmlFor="purpose" className="cr-label">
                  Purpose
                  <span className="cr-required">*</span>
                </label>

                <select
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                  disabled={submitting}
                  className="cr-control"
                >
                  <option value="">Select application purpose</option>
                  <option value="Internship">Internship</option>
                  <option value="Higher Studies">Higher Studies</option>
                  <option value="Placement">Placement</option>
                  <option value="Government Purpose">
                    Government Purpose / Scholarship
                  </option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="cr-field">
                <label htmlFor="additionalDetails" className="cr-label">
                  Additional Remarks / Specific Clauses
                </label>

                <textarea
                  id="additionalDetails"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Include company name, designated recipient, or special inclusions requested by authority..."
                  rows={4}
                  disabled={submitting}
                  className="cr-control cr-textarea"
                />

                <p className="cr-help-text">
                  Include any extra details that may help the administration
                  process your request.
                </p>
              </div>

              <div className="cr-form-footer">
                <p className="cr-required-note">
                  <span className="cr-required">*</span> Required fields
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="cr-submit-button"
                >
                  {submitting ? (
                    <>
                      <span className="cr-spinner" aria-hidden="true" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Certificate Request</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default CertificateRequest;