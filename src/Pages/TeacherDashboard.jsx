import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [classIssues, setClassIssues] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [certificateUploads, setCertificateUploads] = useState([]);
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const API = "http://localhost:5000/api";

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = getToken();

      if (!token) {
        navigate("/");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        classIssueResponse,
        leaveResponse,
        certificateUploadResponse,
        certificateRequestResponse,
        eventResponse,
        approvedResponse,
      ] = await Promise.all([
        fetch(`${API}/class-issues/pending`, { headers }),
        fetch(`${API}/leave-od/pending`, { headers }),
        fetch(`${API}/certificate-uploads/pending`, { headers }),
        fetch(`${API}/certificate-requests/pending`, { headers }),
        fetch(`${API}/events`, { headers }),
        fetch(`${API}/leave-od/approved/current`, { headers }),
      ]);

      if (
        !classIssueResponse.ok ||
        !leaveResponse.ok ||
        !certificateUploadResponse.ok ||
        !certificateRequestResponse.ok ||
        !eventResponse.ok ||
        !approvedResponse.ok
      ) {
        throw new Error("Failed to load dashboard data from server.");
      }

      const classIssueData = await classIssueResponse.json();
      const leaveData = await leaveResponse.json();
      const certificateUploadData =
        await certificateUploadResponse.json();
      const certificateRequestData =
        await certificateRequestResponse.json();
      const eventData = await eventResponse.json();
      const approvedData = await approvedResponse.json();

      setClassIssues(
        classIssueData.requests || classIssueData.issues || []
      );
      setLeaveRequests(leaveData.requests || []);
      setCertificateUploads(certificateUploadData.uploads || []);
      setCertificateRequests(certificateRequestData.requests || []);
      setEvents(eventData.events || []);
      setApprovedRequests(approvedData.requests || []);
    } catch (error) {
      console.error("Teacher dashboard error:", error);
      setErrorMessage(
        error.message || "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  let user = null;

  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch {
    user = null;
  }

  const teacherName = user?.name || user?.username || "Faculty";
  const department = user?.department || "";

  const pendingClassIssues = classIssues.length;
  const pendingLeaveRequests = leaveRequests.length;
  const pendingCertificateUploads = certificateUploads.length;
  const pendingCertificateRequests = certificateRequests.length;
  const eventCount = events.length;

  const totalPendingWork =
    pendingClassIssues +
    pendingLeaveRequests +
    pendingCertificateUploads +
    pendingCertificateRequests;

  const absentStudents = approvedRequests.filter(
    (request) => request.request_type === "LEAVE"
  );

  const odStudents = approvedRequests.filter(
    (request) => request.request_type === "OD"
  );

  const formatDate = (date) => {
    if (!date) return "-";

    const value = String(date).split("T")[0];
    const parts = value.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatTime = (time) => {
    if (!time) return "";

    const value = String(time).substring(0, 5);
    const parts = value.split(":");

    if (parts.length < 2) return time;

    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Card colors now match StudentDashboard.jsx
  const workflowCards = [
    {
      title: "Class Issues",
      count: pendingClassIssues,
      icon: "🏫",
      description: "Pending reports",
      action: "Review",
      to: "/teacher/class-issues",
      number: "01",
      tone: "yellow",
    },
    {
      title: "Leave / OD",
      count: pendingLeaveRequests,
      icon: "📝",
      description: "Applications",
      action: "Process",
      to: "/teacher/leave-od",
      number: "02",
      tone: "blue",
    },
    {
      title: "Certificate Uploads",
      count: pendingCertificateUploads,
      icon: "📜",
      description: "Awaiting verification",
      action: "Verify",
      to: "/teacher/certificates",
      number: "03",
      tone: "green",
    },
    {
      title: "Certificate Requests",
      count: pendingCertificateRequests,
      icon: "📋",
      description: "Awaiting processing",
      action: "Process",
      to: "/teacher/certificate-requests",
      number: "04",
      tone: "peach",
    },
    {
      title: "Campus Events",
      count: eventCount,
      icon: "🎉",
      description: "Published events",
      action: "Manage",
      to: "/teacher/events",
      number: "05",
      tone: "lavender",
    },
  ];

  const renderStudentList = (students, type) => {
    const isLeave = type === "LEAVE";

    if (loading) {
      return (
        <LoadingState
          message={
            isLeave
              ? "Loading absent student records..."
              : "Loading OD student records..."
          }
        />
      );
    }

    if (students.length === 0) {
      return (
        <div className="td-empty">
          <span className="td-empty-icon" aria-hidden="true">
            ✓
          </span>

          <p>
            {isLeave
              ? "No students are currently on approved leave."
              : "No students are currently on approved on-duty participation."}
          </p>
        </div>
      );
    }

    return (
      <div className="td-student-list">
        {students.map((student) => (
          <article key={student.id} className="td-student-row">
            <div className="td-student-main">
              <div className="td-student-info">
                <h4>{student.student_name || "Unknown Student"}</h4>

                <p className="td-student-id">
                  {student.student_user_id || "N/A"}
                  {student.department
                    ? ` · ${student.department}`
                    : ""}
                </p>
              </div>

              <div className="td-student-dates">
                <span>
                  {formatDate(student.from_date)} →{" "}
                  {formatDate(student.to_date)}
                </span>

                {(student.from_time || student.to_time) && (
                  <p>
                    {formatTime(student.from_time) || "—"} →{" "}
                    {formatTime(student.to_time) || "—"}
                  </p>
                )}
              </div>
            </div>

            {isLeave && student.reason && (
              <div className="td-student-note">
                <strong>Reason:</strong> {student.reason}
              </div>
            )}

            {!isLeave &&
              (student.activity_name || student.reason) && (
                <div className="td-student-note">
                  <strong>Activity:</strong>{" "}
                  {student.activity_name || student.reason}
                </div>
              )}
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="td-dashboard">
      <style>{`
        .td-dashboard {
          --td-text: #292a27;
          --td-muted: #595b53;
          --td-border: #e2e0d7;
          --td-yellow: oklch(0.94 0.11 100);
          --td-blue: oklch(0.91 0.054 235);
          --td-green: oklch(0.91 0.075 160);
          --td-peach: oklch(0.92 0.066 55);
          --td-lavender: oklch(0.91 0.048 300);
          --td-pink: oklch(0.92 0.053 355);

          min-height: 100vh;
          display: flex;
          background: #ffffff;
          color: var(--td-text);
          font-family: inherit;
          font-size: 13px;
        }

        .td-dashboard *,
        .td-dashboard *::before,
        .td-dashboard *::after {
          box-sizing: border-box;
        }

        .td-main {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          background: #ffffff;
        }

        .td-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 34px 36px 42px;
          flex: 1;
        }

        /* Welcome section */
        .td-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          overflow: hidden;
          padding: 25px;
          border: 1px solid #e5e2d7;
          border-radius: 6px;
          background: #fffdf5;
        }

        .td-hero-content {
          min-width: 0;
          flex: 1;
        }

        .td-hero-eyebrow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 12px;
          color: #58513c;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.055em;
          text-transform: uppercase;
        }

        .td-eyebrow-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #c4a64a;
        }

        .td-hero-date {
          color: #595b53;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: normal;
          text-transform: none;
        }

        .td-hero-title {
          margin: 0;
          color: var(--td-text);
          font-size: 30px;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.035em;
          overflow-wrap: anywhere;
        }

        .td-hero-description {
          max-width: 650px;
          margin: 13px 0 0;
          color: var(--td-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .td-department {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 14px;
          padding: 6px 9px;
          border: 1px solid #e2e0d7;
          border-radius: 4px;
          background: #ffffff;
          color: #595b53;
          font-size: 11px;
        }

        .td-department strong {
          color: #292a27;
          font-weight: 700;
        }

        /* Pending actions summary */
        .td-summary {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          min-width: 205px;
          padding: 15px;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: var(--td-yellow);
          box-shadow: 2px 2px 0 #292a27;
        }

        .td-summary-icon {
          display: grid;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.35);
          color: #292a27;
          font-size: 17px;
        }

        .td-summary-count {
          margin: 0;
          color: #292a27;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.6;
        }

        .td-summary-caption {
          margin: 3px 0 0;
          color: #494a42;
          font-size: 10px;
          line-height: 1.6;
        }

        /* Error message */
        .td-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 20px;
          padding: 12px 14px;
          border: 1px solid #e8c5bf;
          border-radius: 5px;
          background: #fff3f1;
          color: #873c34;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .td-error-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          margin-top: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Section headings */
        .td-section {
          margin-top: 30px;
        }

        .td-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 19px;
        }

        .td-section-title {
          margin: 0;
          color: var(--td-text);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.4;
        }

        .td-section-description {
          margin: 5px 0 0;
          color: var(--td-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .td-section-link {
          color: #292a27;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
        }

        .td-section-link:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* Workflow cards: same style and pastel colors as StudentDashboard */
        .td-workflow-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 19px;
        }

        .td-workflow-card {
          display: flex;
          min-width: 0;
          min-height: 174px;
          flex-direction: column;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          color: inherit;
          box-shadow: 3px 3px 0 #292a27;
          overflow: hidden;
          text-decoration: none;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .td-workflow-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        .td-workflow-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: 64px;
          padding: 13px 18px;
          border-bottom: 1.5px solid #292a27;
        }

        .td-tone-yellow {
          background: var(--td-yellow);
        }

        .td-tone-blue {
          background: var(--td-blue);
        }

        .td-tone-green {
          background: var(--td-green);
        }

        .td-tone-peach {
          background: var(--td-peach);
        }

        .td-tone-lavender {
          background: var(--td-lavender);
        }

        .td-tone-pink {
          background: var(--td-pink);
        }

        .td-workflow-icon {
          display: grid;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.35);
          font-size: 18px;
        }

        .td-workflow-index {
          color: #595b53;
          font-family: monospace;
          font-size: 11px;
        }

        .td-workflow-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 0;
          padding: 17px 18px 0;
        }

        .td-workflow-heading {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
        }

        .td-workflow-title {
          margin: 0;
          color: #292a27;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .td-workflow-description {
          flex: 1;
          margin: 9px 0 15px;
          color: #595b53;
          font-size: 12px;
          line-height: 1.8;
        }

        .td-workflow-number {
          margin-top: 6px;
          color: #292a27;
          font-size: 25px;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -0.04em;
        }

        .td-workflow-number.loading {
          color: #777970;
        }

        .td-workflow-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 43px;
          border-top: 1px solid #e2e0d7;
          font-size: 11px;
          font-weight: 600;
        }

        .td-workflow-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #292a27;
        }

        .td-workflow-arrow {
          font-size: 16px;
          transition: transform 160ms ease;
        }

        .td-workflow-card:hover .td-workflow-arrow {
          transform: translate(2px, -2px);
        }

        /* Student status panels */
        .td-student-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          gap: 19px;
        }

        .td-student-panel {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 2px 2px 0 #292a27;
        }

        .td-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1.5px solid #292a27;
          background: #fbf7e9;
        }

        .td-panel-heading {
          display: flex;
          align-items: center;
          min-width: 0;
          gap: 9px;
        }

        .td-panel-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
        }

        .td-panel-dot.leave {
          background: #c65f56;
        }

        .td-panel-dot.od {
          background: #5287b7;
        }

        .td-panel-title {
          margin: 0;
          color: #292a27;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.6;
        }

        .td-panel-body {
          min-width: 0;
          padding: 9px 14px;
          background: #ffffff;
        }

        .td-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 150px;
          padding: 24px 12px;
          color: #595b53;
          text-align: center;
        }

        .td-empty-icon {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: var(--td-green);
          color: #292a27;
          font-size: 14px;
        }

        .td-empty p {
          max-width: 270px;
          margin: 0;
          color: #595b53;
          font-size: 11px;
          line-height: 1.8;
        }

        .td-student-list {
          display: grid;
        }

        .td-student-row {
          min-width: 0;
          padding: 13px 3px;
          border-bottom: 1px solid #e2e0d7;
        }

        .td-student-row:last-child {
          border-bottom: none;
        }

        .td-student-main {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .td-student-info {
          min-width: 0;
          flex: 1;
        }

        .td-student-info h4 {
          margin: 0;
          color: #292a27;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .td-student-id {
          margin: 3px 0 0;
          color: #595b53;
          font-size: 10px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .td-student-dates {
          flex-shrink: 0;
          max-width: 48%;
          color: #41423c;
          font-size: 10px;
          line-height: 1.7;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .td-student-dates p {
          margin: 3px 0 0;
          color: #595b53;
          font-size: 10px;
        }

        .td-student-note {
          margin-top: 9px;
          padding: 8px 10px;
          border: 1px solid #e2e0d7;
          border-radius: 4px;
          background: #fcfbf6;
          color: #595b53;
          font-size: 11px;
          line-height: 1.7;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .td-student-note strong {
          color: #292a27;
          font-weight: 700;
        }

        .td-dashboard a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 4px;
        }

        @media (max-width: 1100px) {
          .td-container {
            padding: 28px 25px 36px;
          }

          .td-hero {
            align-items: flex-start;
            flex-direction: column;
          }

          .td-summary {
            width: 100%;
          }

          .td-workflow-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .td-container {
            padding: 25px 18px 30px;
          }

          .td-hero {
            padding: 20px;
          }

          .td-hero-title {
            font-size: 25px;
          }

          .td-section-title {
            font-size: 18px;
          }

          .td-workflow-grid,
          .td-student-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;
          }

          .td-section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .td-workflow-card {
            min-height: 165px;
          }

          .td-panel-header {
            padding: 12px;
          }

          .td-panel-body {
            padding: 8px 11px;
          }

          .td-student-main {
            flex-direction: column;
            gap: 8px;
          }

          .td-student-dates {
            max-width: 100%;
            text-align: left;
          }
        }

        @media (max-width: 350px) {
          .td-container {
            padding: 20px 12px 26px;
          }

          .td-hero {
            padding: 16px;
          }

          .td-workflow-body {
            padding: 15px 14px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .td-dashboard *,
          .td-dashboard *::before,
          .td-dashboard *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Sidebar role="teacher" />

      <div className="td-main">
        <main className="td-container">
          {/* Welcome Hero */}
          <section className="td-hero">
            <div className="td-hero-content">
              <div className="td-hero-eyebrow">
                <span className="td-eyebrow-dot" />
                Faculty Management Desk
                <span aria-hidden="true">·</span>
                <span className="td-hero-date">
                  {todayFormatted}
                </span>
              </div>

              <h1 className="td-hero-title">
                Welcome, {teacherName}
              </h1>

              <p className="td-hero-description">
                Review student grievances, verify credentials, process leave
                applications, and supervise departmental on-duty participation.
              </p>

              {department && (
                <div className="td-department">
                  Department:
                  <strong>{department}</strong>
                </div>
              )}
            </div>

            <div className="td-summary">
              <div className="td-summary-icon" aria-hidden="true">
                {totalPendingWork > 0 ? "⚡" : "✓"}
              </div>

              <div>
                <p className="td-summary-count">
                  {loading
                    ? "Loading dashboard..."
                    : totalPendingWork > 0
                      ? `${totalPendingWork} Pending Actions`
                      : "All Queues Clear"}
                </p>

                <p className="td-summary-caption">
                  {loading
                    ? "Fetching the latest records"
                    : totalPendingWork > 0
                      ? "Awaiting your review and decision"
                      : "No pending backlog"}
                </p>
              </div>
            </div>
          </section>

          {/* Error Message */}
          {errorMessage && (
            <div className="td-error" role="alert">
              <span className="td-error-dot" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Workflow Cards */}
          <section className="td-section">
            <div className="td-section-heading">
              <div>
                <h2 className="td-section-title">
                  Review Queues & Workflows
                </h2>

                <p className="td-section-description">
                  An overview of pending requests and campus activities.
                </p>
              </div>
            </div>

            <div className="td-workflow-grid">
              {workflowCards.map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="td-workflow-card"
                >
                  {/* Pastel-colored card header */}
                  <div className={`td-workflow-top td-tone-${card.tone}`}>
                    <span
                      className="td-workflow-icon"
                      aria-hidden="true"
                    >
                      {card.icon}
                    </span>

                    <span className="td-workflow-index">
                      {card.number} / 05
                    </span>
                  </div>

                  {/* Card details */}
                  <div className="td-workflow-body">
                    <h3 className="td-workflow-title">
                      {card.title}
                    </h3>

                    <div
                      className={`td-workflow-number ${
                        loading ? "loading" : ""
                      }`}
                    >
                      {loading ? "—" : card.count}
                    </div>

                    <p className="td-workflow-description">
                      {card.description}
                    </p>

                    <div className="td-workflow-footer">
                      <span>{card.action}</span>

                      <span className="td-workflow-action">
                        Open
                        <span
                          aria-hidden="true"
                          className="td-workflow-arrow"
                        >
                          ↗
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Live Student Status */}
          <section className="td-section">
            <div className="td-section-heading">
              <div>
                <h2 className="td-section-title">
                  Live Student Status
                </h2>

                <p className="td-section-description">
                  Students with approved Leave or On-Duty permissions.
                </p>
              </div>

              <Link
                to="/teacher/leave-od"
                className="td-section-link"
              >
                Manage Leave / OD →
              </Link>
            </div>

            <div className="td-student-grid">
              {/* Approved Leave */}
              <section className="td-student-panel">
                <div className="td-panel-header">
                  <div className="td-panel-heading">
                    <span
                      className="td-panel-dot leave"
                      aria-hidden="true"
                    />

                    <h3 className="td-panel-title">
                      Absent Students (Leave)
                    </h3>
                  </div>

                  <StatusBadge status="ABSENT" />
                </div>

                <div className="td-panel-body">
                  {renderStudentList(absentStudents, "LEAVE")}
                </div>
              </section>

              {/* Approved OD */}
              <section className="td-student-panel">
                <div className="td-panel-header">
                  <div className="td-panel-heading">
                    <span
                      className="td-panel-dot od"
                      aria-hidden="true"
                    />

                    <h3 className="td-panel-title">
                      On-Duty Students (OD)
                    </h3>
                  </div>

                  <StatusBadge status="OD" />
                </div>

                <div className="td-panel-body">
                  {renderStudentList(odStudents, "OD")}
                </div>
              </section>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default TeacherDashboard;