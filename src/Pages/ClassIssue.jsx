import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function ClassIssue() {
  const [category, setCategory] = useState("Classroom");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      setError("Please fill in both the issue title and description.");
      setMessage("");
      return;
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!token) {
      setError("Session expired. Please login again.");
      setMessage("");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/class-issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            issueType: category,
            title: subject.trim(),
            description: description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit issue");
      }

      setSubject("");
      setDescription("");
      setMessage(
        "Class issue submitted successfully! Faculty will review it shortly."
      );
    } catch (err) {
      console.error("Class issue submission error:", err);
      setError(err.message || "Failed to submit class issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sidebar role="student">
      <style>{`
        .class-issue-page {
          --ci-text: #292a27;
          --ci-muted: #595b53;
          --ci-border: #e2e0d7;

          --ci-yellow: oklch(0.94 0.11 100);
          --ci-blue: oklch(0.91 0.054 235);
          --ci-green: oklch(0.91 0.075 160);
          --ci-peach: oklch(0.92 0.066 55);
          --ci-lavender: oklch(0.91 0.048 300);
          --ci-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--ci-text);
          font-family: inherit;
          font-size: 13px;
        }

        .class-issue-page *,
        .class-issue-page *::before,
        .class-issue-page *::after {
          box-sizing: border-box;
        }

        .ci-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Main form card */
        .ci-form-card {
          margin-top: 26px;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .ci-form-card:hover {
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel-yellow header, matching StudentDashboard */
        .ci-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 21px 24px;
          border-bottom: 1.5px solid #292a27;
          background: var(--ci-yellow);
        }

        .ci-icon {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.4);
          color: #292a27;
        }

        .ci-icon svg {
          width: 21px;
          height: 21px;
        }

        .ci-card-title {
          margin: 0;
          color: #292a27;
          font-size: 15px;
          font-weight: 750;
          line-height: 1.5;
        }

        .ci-card-subtitle {
          margin: 4px 0 0;
          color: #494a42;
          font-size: 12px;
          line-height: 1.8;
        }

        /* Form */
        .ci-form {
          padding: 25px 24px;
          background: #ffffff;
        }

        .ci-field {
          margin-bottom: 23px;
        }

        .ci-label {
          display: block;
          margin-bottom: 9px;
          color: #33342d;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
        }

        .ci-required {
          margin-left: 3px;
          color: #8a6d20;
        }

        .ci-control {
          display: block;
          width: 100%;
          min-width: 0;
          min-height: 44px;
          padding: 11px 13px;
          border: 1px solid #bfc2b7;
          border-radius: 5px;
          outline: none;
          background: #ffffff;
          color: #292a27;
          caret-color: #80651e;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.7;
          opacity: 1;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease;
        }

        .ci-control::placeholder {
          color: #777970;
          opacity: 1;
        }

        .ci-control:focus {
          border-color: #a88a34;
          box-shadow: 0 0 0 3px rgba(168, 138, 52, 0.17);
        }

        .ci-control:disabled {
          background: #f2f2ee;
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ci-select {
          cursor: pointer;
        }

        .ci-textarea {
          min-height: 132px;
          resize: vertical;
        }

        /* Success and error messages */
        .ci-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 20px 24px 0;
          padding: 12px 14px;
          border: 1px solid;
          border-radius: 5px;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .ci-alert-success {
          color: #365d38;
          background: #edf5e8;
          border-color: #b9d0ae;
        }

        .ci-alert-error {
          color: #923e35;
          background: #fff0ed;
          border-color: #e4bcb5;
        }

        .ci-alert-dot {
          width: 8px;
          height: 8px;
          margin-top: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: currentColor;
        }

        /* Submit button in the same outlined-card style */
        .ci-submit {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          width: 100%;
          min-height: 44px;
          padding: 11px 16px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--ci-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-family: inherit;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .ci-submit:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: oklch(0.91 0.10 100);
        }

        .ci-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
          box-shadow: 2px 2px 0 #292a27;
        }

        .ci-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid #66551e;
          border-top-color: transparent;
          border-radius: 50%;
          animation: ci-spin 700ms linear infinite;
        }

        @keyframes ci-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Information card: pastel blue */
        .ci-info {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 23px;
          padding: 17px 18px;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: var(--ci-blue);
          box-shadow: 2px 2px 0 #292a27;
        }

        .ci-info-icon {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.45);
          color: #292a27;
          font-size: 13px;
          font-weight: 800;
        }

        .ci-info-content {
          min-width: 0;
        }

        .ci-info-title {
          margin: 0;
          color: #292a27;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.7;
        }

        .ci-info-copy {
          margin: 5px 0 0;
          color: #41423c;
          font-size: 12px;
          line-height: 1.85;
        }

        .ci-info-copy a {
          color: #292a27;
          font-weight: 750;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .ci-info-copy a:hover {
          color: #66511b;
        }

        .class-issue-page a:focus-visible,
        .class-issue-page button:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 4px;
        }

        @media (max-width: 640px) {
          .ci-container {
            padding: 25px 18px 32px;
          }

          .ci-form-card {
            margin-top: 21px;
          }

          .ci-card-header {
            padding: 18px;
            gap: 12px;
          }

          .ci-icon {
            width: 39px;
            height: 39px;
          }

          .ci-form {
            padding: 21px 18px;
          }

          .ci-field {
            margin-bottom: 20px;
          }

          .ci-alert {
            margin-left: 18px;
            margin-right: 18px;
          }

          .ci-info {
            padding: 15px;
          }
        }

        @media (max-width: 400px) {
          .ci-container {
            padding: 20px 12px 28px;
          }

          .ci-card-header {
            align-items: flex-start;
            padding: 15px;
          }

          .ci-form {
            padding: 18px 14px;
          }

          .ci-alert {
            margin-right: 14px;
            margin-left: 14px;
          }

          .ci-info {
            gap: 10px;
            padding: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .class-issue-page *,
          .class-issue-page *::before,
          .class-issue-page *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ===== FORCE STUDENT DASHBOARD CARD COLORS ===== */

/* Main form card: dark outline and offset shadow */
.class-issue-page .ci-form-card {
  background: #ffffff !important;
  border: 1.5px solid #292a27 !important;
  border-radius: 6px !important;
  box-shadow: 3px 3px 0 #292a27 !important;
}

/* Pastel yellow header */
.class-issue-page .ci-card-header {
  background: #f5edc9 !important;
  border-bottom: 1.5px solid #292a27 !important;
}

/* Icon inside the yellow header */
.class-issue-page .ci-icon {
  background: #fff9df !important;
  border: 1px solid #292a27 !important;
  color: #292a27 !important;
}

/* Dark header text */
.class-issue-page .ci-card-title {
  color: #292a27 !important;
}

.class-issue-page .ci-card-subtitle {
  color: #494a42 !important;
}

/* Form fields */
.class-issue-page .ci-control {
  background: #ffffff !important;
  border: 1px solid #aeb2a6 !important;
  color: #292a27 !important;
}

.class-issue-page .ci-control::placeholder {
  color: #696b62 !important;
  opacity: 1 !important;
}

.class-issue-page .ci-control:focus {
  border-color: #80651e !important;
  box-shadow: 0 0 0 3px rgba(199, 166, 71, 0.2) !important;
}

/* Pastel yellow submit button */
.class-issue-page .ci-submit {
  background: #f5edc9 !important;
  color: #292a27 !important;
  border: 1.5px solid #292a27 !important;
  box-shadow: 2px 2px 0 #292a27 !important;
}

.class-issue-page .ci-submit:hover:not(:disabled) {
  background: #eadb9e !important;
}

/* Pastel blue information card */
.class-issue-page .ci-info {
  background: #dcebf5 !important;
  border: 1.5px solid #292a27 !important;
  border-radius: 6px !important;
  box-shadow: 2px 2px 0 #292a27 !important;
}

.class-issue-page .ci-info-icon {
  background: #f0f7fc !important;
  border: 1px solid #292a27 !important;
  color: #292a27 !important;
}

.class-issue-page .ci-info-title,
.class-issue-page .ci-info-copy {
  color: #292a27 !important;
}

.class-issue-page .ci-info-copy a {
  color: #292a27 !important;
  font-weight: 750 !important;
  text-decoration: underline !important;
}
      `}</style>

      <main className="class-issue-page">
        <div className="ci-container">
          <PageHeader
            badge="Student Services"
            title="Report Class Issue"
            description="Submit an infrastructure, timetable, or classroom concern for faculty review."
            backTo="/student"
          />

          <section className="ci-form-card">
            {/* Pastel-yellow card header */}
            <div className="ci-card-header">
              <div className="ci-icon" aria-hidden="true">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="ci-card-title">Issue Details</h2>
                <p className="ci-card-subtitle">
                  Provide clear details so department faculty can take
                  appropriate action.
                </p>
              </div>
            </div>

            {message && (
              <div className="ci-alert ci-alert-success" role="status">
                <span className="ci-alert-dot" aria-hidden="true" />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="ci-alert ci-alert-error" role="alert">
                <span className="ci-alert-dot" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="ci-form">
              <div className="ci-field">
                <label className="ci-label" htmlFor="issueCategory">
                  Issue Category <span className="ci-required">*</span>
                </label>

                <select
                  id="issueCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="ci-control ci-select"
                  required
                >
                  <option value="Classroom">Classroom</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Timetable">Timetable</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ci-field">
                <label className="ci-label" htmlFor="issueSubject">
                  Issue Title / Subject{" "}
                  <span className="ci-required">*</span>
                </label>

                <input
                  id="issueSubject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Projector HDMI port damaged in Lab 302"
                  className="ci-control"
                  required
                />
              </div>

              <div className="ci-field">
                <label className="ci-label" htmlFor="issueDescription">
                  Detailed Description{" "}
                  <span className="ci-required">*</span>
                </label>

                <textarea
                  id="issueDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe the issue, including the classroom number, equipment involved, and urgency..."
                  className="ci-control ci-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="ci-submit"
              >
                {submitting ? (
                  <>
                    <span className="ci-spinner" aria-hidden="true" />
                    <span>Submitting Issue...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Class Issue</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Pastel-blue information card */}
          <aside className="ci-info">
            <div className="ci-info-icon" aria-hidden="true">
              i
            </div>

            <div className="ci-info-content">
              <p className="ci-info-title">What happens next?</p>

              <p className="ci-info-copy">
                Your report will appear in the Faculty Portal under Pending
                Class Issues. You can check the resolution status anytime under{" "}
                <Link to="/student/my-class-issues">My Class Issues</Link>.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default ClassIssue;