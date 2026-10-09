import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function CertificateUpload() {
  const [certificateName, setCertificateName] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateName.trim() || !certificateFile) {
      setError(
        "Please enter the certificate name and choose a file to upload."
      );
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
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();
      formData.append("certificateType", certificateName.trim());
      formData.append("certificate", certificateFile);

      const response = await fetch(
        "http://localhost:5000/api/certificate-uploads",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload certificate.");
      }

      setCertificateName("");
      setCertificateFile(null);

      const fileInput = document.getElementById("certificateFile");

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage(
        "Certificate uploaded successfully! It is now pending faculty verification."
      );
    } catch (err) {
      console.error("Certificate upload error:", err);
      setError(err.message || "Failed to upload certificate.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Sidebar role="student">
      <style>{`
        .certificate-upload-page {
          --cu-bg: #ffffff;
          --cu-text: #171717;
          --cu-muted: #737373;
          --cu-border: #d9d9d9;
          --cu-yellow: #fff0a6;
          --cu-green: #b8efd0;
          --cu-blue: #c4e8fa;
          --cu-red-bg: #fff0f0;
          --cu-red: #b42318;
          --cu-shadow: 3px 3px 0 #171717;

          flex: 1;
          width: 100%;
          min-width: 0;
          background: var(--cu-bg);
          color: var(--cu-text);
          font-family: inherit;
          font-size: 13px;
        }

        .certificate-upload-page *,
        .certificate-upload-page *::before,
        .certificate-upload-page *::after {
          box-sizing: border-box;
        }

        .certificate-upload-page h1,
        .certificate-upload-page h2,
        .certificate-upload-page h3,
        .certificate-upload-page p {
          margin: 0;
        }

        .certificate-upload-page a {
          color: inherit;
          text-decoration: none;
        }

        .cu-container {
          width: 100%;
          max-width: 1060px;
          margin: 0 auto;
          padding: 30px 32px 38px;
        }

        .cu-page-header {
          margin-bottom: 24px;
        }

        .cu-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 265px;
          align-items: start;
          gap: 22px;
        }

        .cu-form-card {
          min-width: 0;
          background: #ffffff;
          border: 1.5px solid var(--cu-text);
          box-shadow: var(--cu-shadow);
        }

        .cu-card-header {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 19px 22px;
          border-bottom: 1px solid var(--cu-border);
        }

        .cu-header-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border: 1px solid var(--cu-text);
          background: var(--cu-yellow);
          font-size: 20px;
        }

        .cu-card-heading {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: -0.3px;
        }

        .cu-card-subheading {
          margin-top: 3px !important;
          color: var(--cu-muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .cu-form {
          padding: 22px;
        }

        .cu-field {
          margin-bottom: 21px;
        }

        .cu-label {
          display: block;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--cu-text);
        }

        .cu-required {
          color: #b18a00;
        }

        .cu-input {
          display: block;
          width: 100%;
          min-width: 0;
          min-height: 42px;
          padding: 10px 12px;
          background: #ffffff;
          border: 1px solid #cfcfcf;
          border-radius: 0;
          color: var(--cu-text);
          font-family: inherit;
          font-size: 12px;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .cu-input::placeholder {
          color: #999999;
        }

        .cu-input:focus {
          border-color: var(--cu-text);
          box-shadow: 2px 2px 0 var(--cu-yellow);
        }

        .cu-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cu-file-box {
          padding: 14px;
          background: #fafafa;
          border: 1px dashed #bdbdbd;
          transition: border-color 150ms ease, background 150ms ease;
        }

        .cu-file-box:focus-within {
          border-color: var(--cu-text);
          background: #ffffff;
        }

        .cu-file-input {
          display: block;
          width: 100%;
          min-width: 0;
          color: var(--cu-muted);
          font-family: inherit;
          font-size: 11px;
        }

        .cu-file-input::file-selector-button {
          margin-right: 12px;
          padding: 9px 12px;
          border: 1px solid var(--cu-text);
          border-radius: 0;
          background: var(--cu-yellow);
          color: var(--cu-text);
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: background 150ms ease;
        }

        .cu-file-input::file-selector-button:hover {
          background: #ffe783;
        }

        .cu-file-input:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .cu-file-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 13px;
          padding-top: 12px;
          border-top: 1px solid var(--cu-border);
          font-size: 11px;
        }

        .cu-file-name {
          min-width: 0;
          overflow: hidden;
          color: var(--cu-text);
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cu-file-size {
          flex-shrink: 0;
          color: var(--cu-muted);
          font-family: monospace;
        }

        .cu-help-text {
          margin-top: 8px !important;
          color: var(--cu-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .cu-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 43px;
          padding: 11px 16px;
          border: 1.5px solid var(--cu-text);
          border-radius: 0;
          background: var(--cu-yellow);
          color: var(--cu-text);
          box-shadow: 2px 2px 0 var(--cu-text);
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 150ms ease, box-shadow 150ms ease,
            background 150ms ease;
        }

        .cu-submit:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--cu-text);
          background: #ffe783;
        }

        .cu-submit:active:not(:disabled) {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 var(--cu-text);
        }

        .cu-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .cu-spinner {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          border: 2px solid var(--cu-text);
          border-top-color: transparent;
          border-radius: 50%;
          animation: cu-spin 700ms linear infinite;
        }

        @keyframes cu-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .cu-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0 22px 18px;
          padding: 12px 13px;
          border: 1px solid;
          font-size: 11px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .cu-alert-success {
          border-color: #8ac9a6;
          background: #f0fbf4;
          color: #23613d;
        }

        .cu-alert-error {
          border-color: #edb0b0;
          background: var(--cu-red-bg);
          color: var(--cu-red);
        }

        .cu-alert-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          margin-top: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .cu-info-card {
          padding: 17px;
          border: 1.5px solid var(--cu-text);
          background: #ffffff;
          box-shadow: 2px 2px 0 var(--cu-text);
        }

        .cu-info-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 13px;
        }

        .cu-info-icon {
          display: grid;
          place-items: center;
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          border: 1px solid var(--cu-text);
          background: var(--cu-green);
          font-size: 13px;
          font-weight: 700;
        }

        .cu-info-title {
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
        }

        .cu-info-copy {
          color: var(--cu-muted);
          font-size: 11px;
          line-height: 1.9;
        }

        .cu-info-divider {
          height: 1px;
          margin: 16px 0;
          background: var(--cu-border);
        }

        .cu-info-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .cu-info-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: var(--cu-muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .cu-info-check {
          display: grid;
          place-items: center;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          margin-top: 1px;
          border: 1px solid #8ac9a6;
          background: #f0fbf4;
          color: #23613d;
          font-size: 10px;
          font-weight: 700;
        }

        .cu-status-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          padding: 6px 8px;
          border: 1px solid #e6d17a;
          background: #fff9d9;
          color: #6d5700;
          font-size: 10px;
          font-weight: 700;
        }

        .cu-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b18a00;
        }

        .certificate-upload-page a:focus-visible,
        .certificate-upload-page button:focus-visible,
        .certificate-upload-page input:focus-visible {
          outline: 2px solid var(--cu-text);
          outline-offset: 3px;
        }

        @media (max-width: 850px) {
          .cu-content {
            grid-template-columns: minmax(0, 1fr);
          }

          .cu-info-card {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            column-gap: 22px;
          }

          .cu-info-top {
            grid-column: 1 / -1;
          }

          .cu-info-divider {
            display: none;
          }

          .cu-info-list {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 15px;
          }

          .cu-status-label {
            align-self: start;
            justify-self: start;
          }
        }

        @media (max-width: 600px) {
          .cu-container {
            padding: 22px 16px 30px;
          }

          .cu-content {
            gap: 18px;
          }

          .cu-card-header {
            padding: 16px;
          }

          .cu-header-icon {
            width: 38px;
            height: 38px;
            font-size: 18px;
          }

          .cu-card-heading {
            font-size: 14px;
          }

          .cu-card-subheading {
            font-size: 10px;
          }

          .cu-form {
            padding: 17px;
          }

          .cu-field {
            margin-bottom: 19px;
          }

          .cu-info-card {
            display: block;
            padding: 15px;
          }

          .cu-info-divider {
            display: block;
          }

          .cu-info-list {
            display: flex;
          }

          .cu-alert {
            margin-right: 17px;
            margin-left: 17px;
          }

          .cu-file-details {
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .certificate-upload-page *,
          .certificate-upload-page *::before,
          .certificate-upload-page *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="certificate-upload-page">
        <div className="cu-container">
          <div className="cu-page-header">
            <PageHeader
              badge="Credentials & Verification"
              title="Upload Certificate"
              description="Submit external courses, MOOC credentials, or competition awards for department verification."
              backTo="/student"
            />
          </div>

          <div className="cu-content">
            {/* UPLOAD FORM */}
            <section className="cu-form-card">
              <div className="cu-card-header">
                <div className="cu-header-icon" aria-hidden="true">
                  📜
                </div>

                <div>
                  <h2 className="cu-card-heading">
                    Certificate Information
                  </h2>

                  <p className="cu-card-subheading">
                    Upload clear scans or official PDF credentials.
                  </p>
                </div>
              </div>

              {/* SUCCESS MESSAGE */}
              {message && (
                <div
                  className="cu-alert cu-alert-success"
                  role="status"
                  aria-live="polite"
                >
                  <span className="cu-alert-dot" aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  className="cu-alert cu-alert-error"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="cu-alert-dot" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="cu-form">
                {/* CERTIFICATE NAME */}
                <div className="cu-field">
                  <label htmlFor="certificateName" className="cu-label">
                    Certificate Title / Type{" "}
                    <span className="cu-required">*</span>
                  </label>

                  <input
                    id="certificateName"
                    type="text"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    placeholder="e.g. AWS Cloud Practitioner, NPTEL Machine Learning"
                    disabled={uploading}
                    className="cu-input"
                    required
                  />
                </div>

                {/* FILE INPUT */}
                <div className="cu-field">
                  <label htmlFor="certificateFile" className="cu-label">
                    Attach Document File{" "}
                    <span className="cu-required">*</span>
                  </label>

                  <div className="cu-file-box">
                    <input
                      id="certificateFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setCertificateFile(file);
                      }}
                      className="cu-file-input"
                      required
                    />

                    {certificateFile && (
                      <div className="cu-file-details">
                        <span className="cu-file-name" title={certificateFile.name}>
                          📎 {certificateFile.name}
                        </span>

                        <span className="cu-file-size">
                          {(certificateFile.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="cu-help-text">
                    Accepted formats: PDF, JPG, JPEG, PNG. Maximum size: 10 MB.
                  </p>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={uploading}
                  className="cu-submit"
                >
                  {uploading ? (
                    <>
                      <span className="cu-spinner" aria-hidden="true" />
                      <span>Uploading Certificate...</span>
                    </>
                  ) : (
                    <>
                      <span>Upload Certificate for Verification</span>
                      <span aria-hidden="true">↗</span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* INFORMATION PANEL */}
            <aside className="cu-info-card">
              <div className="cu-info-top">
                <div className="cu-info-icon" aria-hidden="true">
                  i
                </div>

                <div>
                  <h3 className="cu-info-title">
                    Faculty Verification
                  </h3>

                  <p className="cu-card-subheading">
                    What happens next?
                  </p>
                </div>
              </div>

              <p className="cu-info-copy">
                Your submission will be routed to your department tutor or
                mentor for validation against college academic records.
              </p>

              <div className="cu-info-divider" />

              <p className="cu-info-title">Before you upload</p>

              <ul className="cu-info-list">
                <li className="cu-info-item">
                  <span className="cu-info-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Ensure the certificate is clear and readable.</span>
                </li>

                <li className="cu-info-item">
                  <span className="cu-info-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Use PDF, JPG, JPEG, or PNG format.</span>
                </li>

                <li className="cu-info-item">
                  <span className="cu-info-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Enter the correct certificate title.</span>
                </li>

                <li className="cu-info-item">
                  <span className="cu-info-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Wait for faculty verification after submission.</span>
                </li>
              </ul>

              <div className="cu-status-label">
                <span className="cu-status-dot" aria-hidden="true" />
                Verification required
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default CertificateUpload;