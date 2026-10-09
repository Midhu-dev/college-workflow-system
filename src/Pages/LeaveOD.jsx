import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function LeaveOD() {
  const [type, setType] = useState("Leave");

  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");

  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");

  const [reason, setReason] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  const openDatePicker = (event) => {
    if (event.currentTarget.showPicker) {
      try {
        event.currentTarget.showPicker();
      } catch {
        // Handled by browser
      }
    }
  };

  const openTimePicker = (event) => {
    if (event.currentTarget.showPicker) {
      try {
        event.currentTarget.showPicker();
      } catch {
        // Handled by browser
      }
    }
  };

  const fetchRequests = async () => {
    try {
      const token = getToken();

      if (!token) {
        setError("Session expired. Please login again.");
        setRequestsLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/leave-od/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests(data.requests || []);
    } catch (err) {
      console.error("Fetch requests error:", err);
      setError(err.message || "Failed to load request history.");
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!fromDate || !fromTime || !toDate || !toTime || !reason.trim()) {
      setError("Please fill all date, time, and reason fields.");
      return;
    }

    const fromDateTime = new Date(`${fromDate}T${fromTime}`);
    const toDateTime = new Date(`${toDate}T${toTime}`);

    if (toDateTime < fromDateTime) {
      setError(
        "The 'To' date and time cannot precede the 'From' date and time."
      );
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/leave-od", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestType: type === "Leave" ? "LEAVE" : "OD",
          fromDate,
          fromTime,
          toDate,
          toTime,
          reason: reason.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setFromDate("");
      setFromTime("");
      setToDate("");
      setToTime("");
      setReason("");

      setMessage(
        `${type} request submitted successfully and queued for faculty review!`
      );

      await fetchRequests();
    } catch (err) {
      console.error("Submit request error:", err);
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const value = String(date).split("T")[0];
    const parts = value.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatTime = (time) => {
    if (!time) return "-";

    const value = String(time).substring(0, 5);
    const parts = value.split(":");

    if (parts.length < 2) return time;

    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  // Same pastel palette as StudentDashboard.
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
        .leave-od-page {
          --lo-text: #292a27;
          --lo-muted: #595b53;
          --lo-border: #e2e0d7;

          --lo-yellow: oklch(0.94 0.11 100);
          --lo-blue: oklch(0.91 0.054 235);
          --lo-green: oklch(0.91 0.075 160);
          --lo-peach: oklch(0.92 0.066 55);
          --lo-lavender: oklch(0.91 0.048 300);
          --lo-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--lo-text);
          font-family: inherit;
          font-size: 13px;
        }

        .leave-od-page *,
        .leave-od-page *::before,
        .leave-od-page *::after {
          box-sizing: border-box;
        }

        .lo-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Main outlined panels */
        .lo-panel {
          margin-bottom: 26px;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
        }

        /* Yellow header, matching StudentDashboard cards */
        .lo-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 19px 22px;
          border-bottom: 1.5px solid #292a27;
          background: var(--lo-yellow);
        }

        .lo-heading-group {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .lo-heading-icon {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.4);
          color: #292a27;
        }

        .lo-heading-icon svg {
          width: 19px;
          height: 19px;
        }

        .lo-title {
          margin: 0;
          color: #292a27;
          font-size: 15px;
          line-height: 1.5;
          font-weight: 750;
        }

        .lo-subtitle {
          margin: 4px 0 0;
          color: #494a42;
          font-size: 11px;
          line-height: 1.8;
        }

        .lo-panel-body {
          padding: 22px;
          background: #ffffff;
        }

        /* Labels */
        .lo-field-label {
          display: block;
          margin-bottom: 9px;
          color: #33342d;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.6;
        }

        .lo-required {
          color: #80651e;
        }

        /* Leave / OD selector */
        .lo-type-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-width: 550px;
        }

        .lo-type-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 45px;
          padding: 10px 12px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: #ffffff;
          color: #414239;
          box-shadow: 2px 2px 0 #292a27;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .lo-type-button:hover:not(.active) {
          background: #fcfbf6;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
        }

        .lo-type-button.active {
          background: var(--lo-yellow);
          color: #292a27;
          border-color: #292a27;
        }

        .lo-type-indicator {
          display: grid;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #8c8b7f;
          border-radius: 50%;
          background: #ffffff;
          color: #292a27;
          font-size: 10px;
        }

        .lo-type-button.active .lo-type-indicator {
          border-color: #292a27;
          background: #292a27;
          color: #ffffff;
        }

        /* From / To cards */
        .lo-date-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
          margin-top: 25px;
        }

        .lo-date-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 2px 2px 0 #292a27;
        }

        .lo-date-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          padding: 12px 14px;
          border-bottom: 1.5px solid #292a27;
        }

        .lo-date-from .lo-date-card-header {
          background: var(--lo-blue);
        }

        .lo-date-to .lo-date-card-header {
          background: var(--lo-green);
        }

        .lo-date-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border: 1px solid #292a27;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
        }

        .lo-date-card-title {
          margin: 0;
          color: #292a27;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .lo-date-fields {
          display: grid;
          gap: 15px;
          padding: 16px;
          background: #ffffff;
        }

        .lo-input-label {
          display: block;
          margin-bottom: 7px;
          color: #454640;
          font-size: 11px;
          font-weight: 700;
        }

        .lo-input,
        .lo-textarea {
          display: block;
          width: 100%;
          min-width: 0;
          border: 1px solid #bfc2b7;
          border-radius: 5px;
          background: #ffffff;
          color: #292a27;
          caret-color: #80651e;
          font-family: inherit;
          font-size: 13px;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .lo-input {
          min-height: 43px;
          padding: 10px 11px;
        }

        .lo-textarea {
          min-height: 115px;
          padding: 12px;
          resize: vertical;
          line-height: 1.8;
        }

        .lo-input:focus,
        .lo-textarea:focus {
          outline: none;
          border-color: #80651e;
          box-shadow: 0 0 0 3px rgba(199, 166, 71, 0.2);
        }

        .lo-textarea::placeholder {
          color: #777970;
          opacity: 1;
          font-size: 12px;
        }

        .lo-input:disabled,
        .lo-textarea:disabled {
          background: #f2f2ee;
          color: #696b62;
          cursor: not-allowed;
        }

        /* Reason */
        .lo-reason-section {
          margin-top: 24px;
        }

        .lo-reason-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
        }

        .lo-reason-mark {
          display: grid;
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: var(--lo-peach);
          color: #292a27;
          font-size: 12px;
          font-weight: 750;
        }

        .lo-reason-header .lo-field-label {
          margin: 0;
        }

        /* Alerts */
        .lo-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid;
          border-radius: 5px;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .lo-alert-icon {
          display: grid;
          width: 21px;
          height: 21px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          font-weight: 800;
        }

        .lo-alert.success {
          border-color: #a9c89d;
          background: #edf5e8;
          color: #365d38;
        }

        .lo-alert.error {
          border-color: #e4bcb5;
          background: #fff0ed;
          color: #923e35;
        }

        /* Submit button */
        .lo-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 44px;
          margin-top: 21px;
          padding: 11px 15px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--lo-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font: inherit;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .lo-submit:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: #eadb9e;
        }

        .lo-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .lo-spinner {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          border: 2px solid #66551e;
          border-top-color: transparent;
          border-radius: 50%;
          animation: lo-spin 0.7s linear infinite;
        }

        @keyframes lo-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* History section header */
        .lo-history-header {
          background: var(--lo-lavender);
        }

        .lo-history-count {
          flex-shrink: 0;
          padding: 5px 9px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #292a27;
          box-shadow: 1px 1px 0 #292a27;
          font-size: 11px;
          font-weight: 750;
          white-space: nowrap;
        }

        .lo-request-list {
          display: grid;
          gap: 17px;
        }

        /* Request cards follow the StudentDashboard card treatment */
        .lo-request-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 2px 2px 0 #292a27;
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .lo-request-card:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
        }

        .lo-tone-yellow {
          background: var(--lo-yellow);
        }

        .lo-tone-blue {
          background: var(--lo-blue);
        }

        .lo-tone-green {
          background: var(--lo-green);
        }

        .lo-tone-peach {
          background: var(--lo-peach);
        }

        .lo-tone-lavender {
          background: var(--lo-lavender);
        }

        .lo-tone-pink {
          background: var(--lo-pink);
        }

        .lo-request-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1.5px solid #292a27;
        }

        .lo-request-identifiers {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          min-width: 0;
        }

        .lo-request-type {
          padding: 5px 9px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.45);
          color: #292a27;
          font-size: 11px;
          font-weight: 750;
        }

        .lo-request-id {
          color: #414239;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          overflow-wrap: anywhere;
        }

        .lo-request-body {
          padding: 15px 16px 16px;
          background: #ffffff;
        }

        .lo-request-dates {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .lo-request-date-box {
          min-width: 0;
          padding: 11px 12px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
        }

        .lo-request-date-label {
          margin: 0 0 6px;
          color: #595b53;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        .lo-request-date-value {
          margin: 0;
          color: #292a27;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .lo-request-reason {
          margin: 12px 0 0;
          padding: 11px 12px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #ffffff;
          color: #454640;
          font-size: 12px;
          line-height: 1.8;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .lo-request-reason-label {
          display: block;
          margin-bottom: 5px;
          color: #595b53;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.035em;
          text-transform: uppercase;
        }

        /* Keyboard accessibility */
        .leave-od-page button:focus-visible,
        .leave-od-page input:focus-visible,
        .leave-od-page textarea:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 3px;
        }

        @media (max-width: 760px) {
          .lo-container {
            padding: 27px 22px 34px;
          }

          .lo-date-grid {
            gap: 12px;
          }

          .lo-date-fields {
            padding: 13px;
          }
        }

        @media (max-width: 640px) {
          .lo-container {
            padding: 24px 18px 30px;
          }

          .lo-panel-header {
            padding: 15px;
          }

          .lo-panel-body {
            padding: 16px;
          }

          .lo-heading-icon {
            width: 35px;
            height: 35px;
          }

          .lo-title {
            font-size: 14px;
          }

          .lo-subtitle {
            font-size: 11px;
          }

          .lo-date-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
            margin-top: 21px;
          }

          .lo-date-fields {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .lo-request-header {
            align-items: flex-start;
          }

          .lo-request-dates {
            gap: 8px;
          }
        }

        @media (max-width: 440px) {
          .lo-container {
            padding: 20px 12px 28px;
          }

          .lo-panel-header {
            align-items: flex-start;
            gap: 8px;
          }

          .lo-heading-group {
            gap: 9px;
          }

          .lo-panel-body {
            padding: 13px;
          }

          .lo-type-options {
            gap: 8px;
          }

          .lo-type-button {
            padding: 9px 7px;
            font-size: 11px;
          }

          .lo-date-fields {
            grid-template-columns: minmax(0, 1fr);
          }

          .lo-history-header {
            flex-direction: column;
          }

          .lo-request-header {
            flex-direction: column;
          }

          .lo-request-body {
            padding: 12px;
          }

          .lo-request-dates {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .leave-od-page *,
          .leave-od-page *::before,
          .leave-od-page *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="leave-od-page">
        <div className="lo-container">
          <PageHeader
            badge="Attendance & Permissions"
            title="Leave / OD Application"
            description="Submit formal applications for leave of absence or approved on-duty participation with real-time faculty approval status."
            backTo="/student"
          />

          {/* Application Form */}
          <section className="lo-panel">
            <div className="lo-panel-header">
              <div className="lo-heading-group">
                <div className="lo-heading-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  >
                    <rect x="5" y="3" width="14" height="18" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3.5h6v3H9zM8 12h8M8 16h6"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="lo-title">New Application</h2>
                  <p className="lo-subtitle">
                    Provide accurate departure and return timings for
                    attendance records.
                  </p>
                </div>
              </div>
            </div>

            <div className="lo-panel-body">
              {message && (
                <div className="lo-alert success" role="status">
                  <span className="lo-alert-icon" aria-hidden="true">
                    ✓
                  </span>
                  <span>{message}</span>
                </div>
              )}

              {error && (
                <div className="lo-alert error" role="alert">
                  <span className="lo-alert-icon" aria-hidden="true">
                    !
                  </span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Permission Type */}
                <div>
                  <label className="lo-field-label">
                    Permission Type <span className="lo-required">*</span>
                  </label>

                  <div className="lo-type-options">
                    <button
                      type="button"
                      onClick={() => setType("Leave")}
                      aria-pressed={type === "Leave"}
                      className={`lo-type-button ${
                        type === "Leave" ? "active" : ""
                      }`}
                    >
                      <span className="lo-type-indicator" aria-hidden="true">
                        {type === "Leave" ? "✓" : ""}
                      </span>
                      Leave of Absence
                    </button>

                    <button
                      type="button"
                      onClick={() => setType("OD")}
                      aria-pressed={type === "OD"}
                      className={`lo-type-button ${
                        type === "OD" ? "active" : ""
                      }`}
                    >
                      <span className="lo-type-indicator" aria-hidden="true">
                        {type === "OD" ? "✓" : ""}
                      </span>
                      On Duty (OD)
                    </button>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="lo-date-grid">
                  {/* From: Pastel Blue */}
                  <section className="lo-date-card lo-date-from">
                    <div className="lo-date-card-header">
                      <span className="lo-date-dot" aria-hidden="true" />
                      <h3 className="lo-date-card-title">
                        Departure / From
                      </h3>
                    </div>

                    <div className="lo-date-fields">
                      <div>
                        <label
                          className="lo-input-label"
                          htmlFor="leave-from-date"
                        >
                          Date <span className="lo-required">*</span>
                        </label>

                        <input
                          id="leave-from-date"
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          onClick={openDatePicker}
                          onFocus={openDatePicker}
                          className="lo-input"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="lo-input-label"
                          htmlFor="leave-from-time"
                        >
                          Time <span className="lo-required">*</span>
                        </label>

                        <input
                          id="leave-from-time"
                          type="time"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          onClick={openTimePicker}
                          onFocus={openTimePicker}
                          className="lo-input"
                          required
                        />
                      </div>
                    </div>
                  </section>

                  {/* To: Pastel Green */}
                  <section className="lo-date-card lo-date-to">
                    <div className="lo-date-card-header">
                      <span className="lo-date-dot" aria-hidden="true" />
                      <h3 className="lo-date-card-title">Return / To</h3>
                    </div>

                    <div className="lo-date-fields">
                      <div>
                        <label
                          className="lo-input-label"
                          htmlFor="leave-to-date"
                        >
                          Date <span className="lo-required">*</span>
                        </label>

                        <input
                          id="leave-to-date"
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          onClick={openDatePicker}
                          onFocus={openDatePicker}
                          className="lo-input"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="lo-input-label"
                          htmlFor="leave-to-time"
                        >
                          Time <span className="lo-required">*</span>
                        </label>

                        <input
                          id="leave-to-time"
                          type="time"
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                          onClick={openTimePicker}
                          onFocus={openTimePicker}
                          className="lo-input"
                          required
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Reason */}
                <div className="lo-reason-section">
                  <div className="lo-reason-header">
                    <span className="lo-reason-mark" aria-hidden="true">
                      ✎
                    </span>

                    <label
                      className="lo-field-label"
                      htmlFor="leave-reason"
                    >
                      Reason / Activity Details{" "}
                      <span className="lo-required">*</span>
                    </label>
                  </div>

                  <textarea
                    id="leave-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    placeholder={
                      type === "Leave"
                        ? "Specify the reason for leave (e.g. Medical emergency, family function, health recovery)..."
                        : "Specify the on-duty activity (e.g. Inter-college Hackathon at PSG Tech, IEEE Conference paper presentation)..."
                    }
                    className="lo-textarea"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="lo-submit"
                >
                  {loading ? (
                    <>
                      <span className="lo-spinner" aria-hidden="true" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit {type} Application
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Request History */}
          <section className="lo-panel">
            <div className="lo-panel-header lo-history-header">
              <div>
                <h2 className="lo-title">
                  My Recent Leave / OD Applications
                </h2>

                <p className="lo-subtitle">
                  View previous requests and their faculty approval status.
                </p>
              </div>

              <span className="lo-history-count">
                {requests.length} Total
              </span>
            </div>

            <div className="lo-panel-body">
              {requestsLoading && (
                <LoadingState message="Fetching application records..." />
              )}

              {!requestsLoading && requests.length === 0 && (
                <EmptyState
                  icon="📝"
                  title="No Applications Submitted"
                  message="You haven't submitted any Leave or OD applications yet. Submit your first request above."
                />
              )}

              {!requestsLoading && requests.length > 0 && (
                <div className="lo-request-list">
                  {requests.map((req, index) => {
                    const tone = tones[index % tones.length];

                    return (
                      <article
                        key={req.id}
                        className="lo-request-card"
                      >
                        {/* Pastel-colored request header */}
                        <div className={`lo-request-header lo-tone-${tone}`}>
                          <div className="lo-request-identifiers">
                            <span className="lo-request-type">
                              {req.request_type === "LEAVE" ? "Leave" : "OD"}
                            </span>

                            {req.request_id && (
                              <span className="lo-request-id">
                                {req.request_id}
                              </span>
                            )}
                          </div>

                          <StatusBadge status={req.status} />
                        </div>

                        {/* White request details */}
                        <div className="lo-request-body">
                          <div className="lo-request-dates">
                            <div className="lo-request-date-box">
                              <p className="lo-request-date-label">
                                From Date &amp; Time
                              </p>

                              <p className="lo-request-date-value">
                                {formatDate(req.from_date)}
                                <br />
                                {formatTime(req.from_time)}
                              </p>
                            </div>

                            <div className="lo-request-date-box">
                              <p className="lo-request-date-label">
                                To Date &amp; Time
                              </p>

                              <p className="lo-request-date-value">
                                {formatDate(req.to_date)}
                                <br />
                                {formatTime(req.to_time)}
                              </p>
                            </div>
                          </div>

                          <p className="lo-request-reason">
                            <span className="lo-request-reason-label">
                              Application Reason
                            </span>

                            {req.reason || "No reason provided."}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default LeaveOD;