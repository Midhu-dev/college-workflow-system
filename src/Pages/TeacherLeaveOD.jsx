import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Footer from "../components/Footer";

const tones = ["yellow", "blue", "green", "peach", "lavender", "pink"];

function TeacherLeaveOD() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const loadRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/leave-od/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load requests");
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Load Leave/OD error:", error);
      setMessage(error.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(true);
      setMessage("");

      const token = getToken();

      if (!token) {
        setMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/leave-od/${id}/status`,
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
        throw new Error(data.message || "Failed to update request");
      }

      await loadRequests();

      setMessage(
        status === "APPROVED"
          ? "Request approved successfully."
          : "Request rejected successfully."
      );
    } catch (error) {
      console.error("Update Leave/OD error:", error);
      setMessage(error.message || "Failed to update request.");
    } finally {
      setUpdating(false);
    }
  };

  const pending = requests.filter((r) => r.status === "PENDING");
  const approved = requests.filter((r) => r.status === "APPROVED");
  const rejected = requests.filter((r) => r.status === "REJECTED");

  const metrics = [
    {
      label: "Pending Approval",
      count: pending.length,
      icon: "◷",
      tone: "yellow",
    },
    {
      label: "Approved",
      count: approved.length,
      icon: "✓",
      tone: "green",
    },
    {
      label: "Rejected",
      count: rejected.length,
      icon: "✕",
      tone: "pink",
    },
  ];

  const formatDate = (value) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) return "";
    return String(value).slice(0, 5);
  };

  const formatSubmittedDate = (value) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatSubmittedTime = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isSuccess = message.toLowerCase().includes("successfully");

  return (
    <Sidebar role="teacher">
      <style>{`
        .teacher-leave-page {
          --tl-ink: #292a27;
          --tl-text: #454640;
          --tl-muted: #595b53;
          --tl-border: #292a27;
          --tl-yellow: oklch(0.94 0.11 100);
          --tl-blue: oklch(0.91 0.054 235);
          --tl-green: oklch(0.91 0.075 160);
          --tl-peach: oklch(0.92 0.066 55);
          --tl-lavender: oklch(0.91 0.048 300);
          --tl-pink: oklch(0.92 0.053 355);
          color: var(--tl-ink);
        }

        .teacher-leave-page .tl-card {
          border: 1.5px solid var(--tl-border);
          border-radius: 7px;
          background: #ffffff;
          box-shadow: 3px 3px 0 var(--tl-border);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .teacher-leave-page .tl-card:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 5px 0 var(--tl-border);
        }

        .teacher-leave-page .tl-tone-yellow {
          background: var(--tl-yellow);
        }

        .teacher-leave-page .tl-tone-blue {
          background: var(--tl-blue);
        }

        .teacher-leave-page .tl-tone-green {
          background: var(--tl-green);
        }

        .teacher-leave-page .tl-tone-peach {
          background: var(--tl-peach);
        }

        .teacher-leave-page .tl-tone-lavender {
          background: var(--tl-lavender);
        }

        .teacher-leave-page .tl-tone-pink {
          background: var(--tl-pink);
        }

        .teacher-leave-page .tl-metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1.5px solid var(--tl-border);
          padding: 14px 16px;
          border-radius: 5px 5px 0 0;
        }

        .teacher-leave-page .tl-metric-label {
          color: var(--tl-ink);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.025em;
        }

        .teacher-leave-page .tl-metric-icon {
          display: flex;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--tl-border);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.55);
          color: var(--tl-ink);
          font-size: 18px;
          font-weight: 700;
        }

        .teacher-leave-page .tl-metric-body {
          padding: 13px 16px 16px;
        }

        .teacher-leave-page .tl-metric-count {
          color: var(--tl-ink);
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
        }

        .teacher-leave-page .tl-section-header {
          border-bottom: 1.5px solid var(--tl-border);
          border-radius: 5px 5px 0 0;
          padding: 18px 20px;
        }

        .teacher-leave-page .tl-request-card {
          overflow: hidden;
          border: 1.5px solid var(--tl-border);
          border-radius: 7px;
          background: #ffffff;
          box-shadow: 3px 3px 0 var(--tl-border);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .teacher-leave-page .tl-request-card:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 5px 0 var(--tl-border);
        }

        .teacher-leave-page .tl-request-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1.5px solid var(--tl-border);
          padding: 17px 18px;
        }

        .teacher-leave-page .tl-detail-box {
          min-width: 0;
          border: 1px solid #d6d7cf;
          border-radius: 5px;
          background: #fffefb;
          padding: 12px;
        }

        .teacher-leave-page .tl-detail-label {
          color: #595b53;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .teacher-leave-page .tl-detail-value {
          overflow-wrap: anywhere;
          color: #292a27;
          font-size: 13px;
          font-weight: 650;
        }

        .teacher-leave-page .tl-reason-box {
          border: 1.5px solid #d6d7cf;
          border-radius: 6px;
          background: #ffffff;
          padding: 15px;
        }

        .teacher-leave-page .tl-reason-title {
          margin-bottom: 8px;
          color: #595b53;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .teacher-leave-page .tl-action-btn {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1.5px solid var(--tl-border);
          border-radius: 5px;
          padding: 10px 20px;
          color: var(--tl-ink);
          font-size: 12px;
          font-weight: 750;
          box-shadow: 2px 2px 0 var(--tl-border);
          transition:
            transform 150ms ease,
            box-shadow 150ms ease,
            opacity 150ms ease;
        }

        .teacher-leave-page .tl-action-btn:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--tl-border);
        }

        .teacher-leave-page .tl-action-btn:active:not(:disabled) {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 var(--tl-border);
        }

        .teacher-leave-page .tl-action-btn:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 3px;
        }

        .teacher-leave-page .tl-action-btn:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          box-shadow: none;
        }

        .teacher-leave-page .tl-approve-btn {
          background: var(--tl-green);
        }

        .teacher-leave-page .tl-reject-btn {
          background: var(--tl-pink);
        }

        .teacher-leave-page .tl-status-pill {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 7px;
          border: 1px solid var(--tl-border);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.55);
          padding: 6px 9px;
          color: var(--tl-ink);
          font-size: 10px;
          font-weight: 800;
        }

        .teacher-leave-page .tl-status-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border: 1px solid var(--tl-border);
          border-radius: 50%;
          background: #d9a934;
        }

        .teacher-leave-page .tl-feedback {
          border: 1.5px solid var(--tl-border);
          border-radius: 6px;
          background: #ffffff;
          padding: 13px 16px;
          color: var(--tl-ink);
          box-shadow: 2px 2px 0 var(--tl-border);
        }

        .teacher-leave-page .tl-feedback-success {
          background: var(--tl-green);
        }

        .teacher-leave-page .tl-feedback-error {
          background: var(--tl-peach);
        }

        .teacher-leave-page .tl-pending-count {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 8px;
          border: 1.5px solid var(--tl-border);
          border-radius: 5px;
          background: var(--tl-yellow);
          padding: 7px 10px;
          color: var(--tl-ink);
          font-size: 11px;
          font-weight: 800;
        }

        @media (min-width: 640px) {
          .teacher-leave-page .tl-request-header {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-leave-page .tl-card,
          .teacher-leave-page .tl-request-card,
          .teacher-leave-page .tl-action-btn {
            transition: none;
          }
        }
      `}</style>

      <main className="teacher-leave-page mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          badge="Faculty Portal"
          title="Leave / OD Requests"
          description="Review student applications for leave of absence and official on-duty attendance."
          backTo="/teacher"
        />

        {/* Feedback Notification */}
        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`tl-feedback mb-6 flex items-start gap-3 ${
              isSuccess
                ? "tl-feedback-success"
                : "tl-feedback-error"
            }`}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#292a27] bg-white/70 text-xs font-extrabold"
              aria-hidden="true"
            >
              {isSuccess ? "✓" : "!"}
            </span>

            <p className="text-sm font-semibold leading-6">
              {message}
            </p>
          </div>
        )}

        {/* Metrics */}
        <section
          aria-label="Request statistics"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="tl-card overflow-hidden"
            >
              <div
                className={`tl-metric-header tl-tone-${metric.tone}`}
              >
                <p className="tl-metric-label">
                  {metric.label}
                </p>

                <span className="tl-metric-icon" aria-hidden="true">
                  {metric.icon}
                </span>
              </div>

              <div className="tl-metric-body">
                <p className="tl-metric-count">
                  {metric.count}
                </p>
                <p className="mt-1 text-xs font-medium text-[#595b53]">
                  {metric.label === "Pending Approval"
                    ? "Awaiting review"
                    : metric.label === "Approved"
                    ? "Approved applications"
                    : "Rejected applications"}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Student Applications */}
        <section className="tl-card mb-2 overflow-hidden">
          <div className="tl-section-header tl-tone-yellow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-[#292a27]">
                  Student Applications
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#454640]">
                  Review application details and update pending requests.
                </p>
              </div>

              <span className="tl-pending-count">
                <span
                  className="tl-status-dot"
                  aria-hidden="true"
                />
                {pending.length} Pending
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Loading */}
            {loading && (
              <LoadingState message="Fetching student Leave/OD requests..." />
            )}

            {/* Empty State */}
            {!loading && requests.length === 0 && (
              <EmptyState
                icon="📋"
                title="No Applications Found"
                message="There are currently no Leave or OD requests awaiting your review."
              />
            )}

            {/* Request Cards */}
            {!loading && requests.length > 0 && (
              <div className="space-y-5">
                {requests.map((request, index) => {
                  const tone = tones[index % tones.length];

                  return (
                    <article
                      key={request.id}
                      className="tl-request-card"
                    >
                      {/* Pastel Student Header */}
                      <div
                        className={`tl-request-header tl-tone-${tone}`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded border border-[#292a27] bg-white/60 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#292a27]">
                              {request.request_type}
                            </span>

                            <StatusBadge status={request.status} />
                          </div>

                          <h3 className="break-words text-lg font-extrabold text-[#292a27]">
                            {request.student_name}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-[#454640]">
                            Register No:{" "}
                            <span className="font-bold text-[#292a27]">
                              {request.student_user_id || "N/A"}
                            </span>
                          </p>
                        </div>

                        {request.status === "PENDING" && (
                          <span className="tl-status-pill">
                            <span
                              className="tl-status-dot"
                              aria-hidden="true"
                            />
                            Action Required
                          </span>
                        )}
                      </div>

                      {/* White Request Body */}
                      <div className="p-4 sm:p-5">
                        {/* Request Details */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="tl-detail-box">
                            <p className="tl-detail-label">
                              Department
                            </p>

                            <p className="tl-detail-value mt-2">
                              {request.department || "General"}
                            </p>
                          </div>

                          <div className="tl-detail-box">
                            <p className="tl-detail-label">
                              From
                            </p>

                            <p className="tl-detail-value mt-2">
                              {formatDate(request.from_date)}
                            </p>

                            {request.from_time && (
                              <p className="mt-1 text-xs font-medium text-[#595b53]">
                                {formatTime(request.from_time)}
                              </p>
                            )}
                          </div>

                          <div className="tl-detail-box">
                            <p className="tl-detail-label">
                              To
                            </p>

                            <p className="tl-detail-value mt-2">
                              {formatDate(request.to_date)}
                            </p>

                            {request.to_time && (
                              <p className="mt-1 text-xs font-medium text-[#595b53]">
                                {formatTime(request.to_time)}
                              </p>
                            )}
                          </div>

                          <div className="tl-detail-box">
                            <p className="tl-detail-label">
                              Submitted On
                            </p>

                            <p className="tl-detail-value mt-2">
                              {formatSubmittedDate(request.created_at)}
                            </p>

                            {request.created_at && (
                              <p className="mt-1 text-xs font-medium text-[#595b53]">
                                {formatSubmittedTime(request.created_at)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Additional Details */}
                        {(request.leave_type ||
                          request.od_type ||
                          request.activity_name) && (
                          <div className="mt-5">
                            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#595b53]">
                              Additional Details
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {request.leave_type && (
                                <div className="rounded border border-[#d6d7cf] bg-[#fffefb] px-3 py-2.5 text-xs text-[#454640]">
                                  <span className="font-medium">
                                    Leave Type:{" "}
                                  </span>
                                  <strong className="font-extrabold text-[#292a27]">
                                    {request.leave_type}
                                  </strong>
                                </div>
                              )}

                              {request.od_type && (
                                <div className="rounded border border-[#d6d7cf] bg-[#fffefb] px-3 py-2.5 text-xs text-[#454640]">
                                  <span className="font-medium">
                                    OD Category:{" "}
                                  </span>
                                  <strong className="font-extrabold text-[#292a27]">
                                    {request.od_type}
                                  </strong>
                                </div>
                              )}

                              {request.activity_name && (
                                <div className="rounded border border-[#d6d7cf] bg-[#fffefb] px-3 py-2.5 text-xs text-[#454640]">
                                  <span className="font-medium">
                                    Activity:{" "}
                                  </span>
                                  <strong className="font-extrabold text-[#292a27]">
                                    {request.activity_name}
                                  </strong>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Application Reason */}
                        <div className="tl-reason-box mt-5">
                          <p className="tl-reason-title">
                            Application Reason
                          </p>

                          <p className="whitespace-pre-wrap break-words text-sm font-medium leading-6 text-[#454640]">
                            {request.reason || "No reason provided."}
                          </p>
                        </div>

                        {/* Actions */}
                        {request.status === "PENDING" && (
                          <div className="mt-5 flex flex-col gap-3 border-t border-[#d6d7cf] pt-5 sm:flex-row sm:justify-end">
                            <button
                              type="button"
                              disabled={updating}
                              onClick={() =>
                                updateStatus(request.id, "APPROVED")
                              }
                              className="tl-action-btn tl-approve-btn sm:min-w-36"
                            >
                              ✓ Approve
                            </button>

                            <button
                              type="button"
                              disabled={updating}
                              onClick={() =>
                                updateStatus(request.id, "REJECTED")
                              }
                              className="tl-action-btn tl-reject-btn sm:min-w-36"
                            >
                              ✕ Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default TeacherLeaveOD;