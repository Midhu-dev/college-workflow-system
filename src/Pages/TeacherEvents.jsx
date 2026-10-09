import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

function TeacherEvents() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "http://localhost:5000/api/events";

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      setErrorMessage("");

      const token = getToken();

      if (!token) {
        setErrorMessage("Session expired. Please login again.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load events");
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Event fetch error:", error);
      setErrorMessage(error.message || "Failed to load events.");
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openDatePicker = (event) => {
    const input = event.currentTarget;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        // The browser handles unsupported picker behavior.
      }
    }
  };

  const openTimePicker = (event) => {
    const input = event.currentTarget;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        // The browser handles unsupported picker behavior.
      }
    }
  };

  const handlePosterChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPoster(null);
      setPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      e.target.value = "";
      setPoster(null);
      setPreview("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("The image must be smaller than 5 MB.");
      e.target.value = "";
      setPoster(null);
      setPreview("");
      return;
    }

    setErrorMessage("");
    setPoster(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(
        typeof reader.result === "string" ? reader.result : ""
      );
    };

    reader.onerror = () => {
      setErrorMessage("Could not preview the selected image.");
      setPoster(null);
      setPreview("");
    };

    reader.readAsDataURL(file);
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (
      !title.trim() ||
      !date ||
      !time ||
      !venue.trim() ||
      !description.trim()
    ) {
      setErrorMessage(
        "Please complete all required event information fields."
      );
      return;
    }

    const token = getToken();

    if (!token) {
      setErrorMessage("Session expired. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("eventDate", date);
      formData.append("eventTime", time);
      formData.append("location", venue.trim());

      if (poster) {
        formData.append("poster", poster);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to publish event"
        );
      }

      setMessage(
        "Event successfully published to the student portal!"
      );

      setTitle("");
      setDate("");
      setTime("");
      setVenue("");
      setDescription("");
      setPoster(null);
      setPreview("");

      const posterInput = document.getElementById("poster");

      if (posterInput) {
        posterInput.value = "";
      }

      await fetchEvents();
    } catch (error) {
      console.error("Event publish error:", error);

      setErrorMessage(
        error.message || "Failed to publish event."
      );
    } finally {
      setLoading(false);
    }
  };

  const tones = [
    "yellow",
    "blue",
    "green",
    "peach",
    "lavender",
    "pink",
  ];

  const inputClass =
    "te-input";

  const labelClass =
    "te-label";

  return (
    <Sidebar role="teacher">
      <style>{`
        .teacher-events-page {
          --te-text: #292a27;
          --te-muted: #595b53;
          --te-border: #e2e0d7;

          width: 100%;
          flex: 1;
          background: #ffffff;
          color: var(--te-text);
          font-family: inherit;
          font-size: 13px;
        }

        .teacher-events-page *,
        .teacher-events-page *::before,
        .teacher-events-page *::after {
          box-sizing: border-box;
        }

        .te-container {
          width: 100%;
          max-width: 1152px;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        /* Alerts */
        .te-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          padding: 13px 15px;
          border: 1px solid;
          border-radius: 6px;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .te-alert.success {
          border-color: #b9d0ae;
          background: #edf5e8;
          color: #365d38;
        }

        .te-alert.error {
          border-color: #e4bcb5;
          background: #fff0ed;
          color: #923e35;
        }

        .te-alert-icon {
          display: grid;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          font-weight: 800;
        }

        /* Common section card */
        .te-panel {
          margin-top: 25px;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
        }

        /* Create form header: same pastel yellow as StudentDashboard */
        .te-panel-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          border-bottom: 1.5px solid #292a27;
          background: #f5edc9;
        }

        .te-panel-icon {
          display: grid;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.4);
          font-size: 20px;
        }

        .te-panel-title {
          margin: 0;
          color: #292a27;
          font-size: 16px;
          font-weight: 750;
          line-height: 1.5;
        }

        .te-panel-subtitle {
          margin: 4px 0 0;
          color: #494a42;
          font-size: 12px;
          line-height: 1.8;
        }

        .te-panel-body {
          padding: 24px;
          background: #ffffff;
        }

        /* Form fields */
        .te-form {
          display: grid;
          gap: 20px;
        }

        .te-field {
          min-width: 0;
        }

        .te-label {
          display: block;
          margin-bottom: 8px;
          color: #33342d;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.6;
        }

        .te-required {
          margin-left: 3px;
          color: #80651e;
        }

        .te-input {
          display: block;
          width: 100%;
          min-width: 0;
          min-height: 44px;
          padding: 10px 12px;
          border: 1px solid #bfc2b7;
          border-radius: 5px;
          background: #ffffff;
          color: #292a27;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.7;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .te-input::placeholder {
          color: #777970;
          opacity: 1;
        }

        .te-input:focus {
          border-color: #a88a34;
          box-shadow: 0 0 0 3px rgba(168, 138, 52, 0.18);
        }

        .te-input:disabled {
          background: #f3f3ef;
          color: #777970;
          cursor: not-allowed;
        }

        .te-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .te-field-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        /* Poster upload */
        .te-upload-box {
          padding: 17px;
          border: 1px dashed #aaa99e;
          border-radius: 5px;
          background: #fcfbf6;
          transition: border-color 150ms ease;
        }

        .te-upload-box:hover {
          border-color: #a88a34;
        }

        .te-file-input {
          display: block;
          width: 100%;
          min-width: 0;
          color: #494a42;
          font-family: inherit;
          font-size: 12px;
        }

        .te-file-input::file-selector-button {
          margin-right: 12px;
          padding: 9px 12px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: #f5edc9;
          color: #292a27;
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .te-upload-help {
          margin: 9px 0 0;
          color: #595b53;
          font-size: 11px;
          line-height: 1.7;
        }

        .te-selected-file {
          margin-top: 12px;
          padding: 10px 12px;
          border: 1px solid #e2e0d7;
          border-radius: 4px;
          background: #ffffff;
          color: #454640;
          font-size: 12px;
          overflow-wrap: anywhere;
        }

        .te-preview {
          margin-top: 16px;
          padding-top: 15px;
          border-top: 1px solid #e2e0d7;
        }

        .te-preview-label {
          margin: 0 0 9px;
          color: #33342d;
          font-size: 11px;
          font-weight: 750;
        }

        .te-preview-image {
          display: block;
          width: 100%;
          max-width: 400px;
          max-height: 220px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: #ffffff;
          object-fit: contain;
        }

        .te-remove-poster {
          margin-top: 11px;
          padding: 5px 0;
          border: none;
          background: transparent;
          color: #923e35;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .te-remove-poster:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Yellow submit button */
        .te-publish-button {
          display: inline-flex;
          min-height: 43px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 11px 17px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: #f5edc9;
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-family: inherit;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .te-publish-button:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: #eadb9e;
        }

        .te-publish-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .te-spinner {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          border: 2px solid #66551e;
          border-top-color: transparent;
          border-radius: 50%;
          animation: te-spin 700ms linear infinite;
        }

        @keyframes te-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Published events section heading */
        .te-events-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 24px;
          border-bottom: 1.5px solid #292a27;
          background: #ffffff;
        }

        .te-published-count {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 6px 9px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: #f5edc9;
          color: #292a27;
          font-size: 11px;
          font-weight: 750;
        }

        .te-count-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #8b752f;
        }

        .te-events-body {
          padding: 22px 24px 25px;
          background: #ffffff;
        }

        .te-event-list {
          display: grid;
          gap: 19px;
        }

        /* Event cards with visibly colored headers */
        .te-event-card {
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 3px 3px 0 #292a27;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .te-event-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        .te-tone-yellow {
          background: #f5edc9;
        }

        .te-tone-blue {
          background: #dcebf5;
        }

        .te-tone-green {
          background: #dcefe5;
        }

        .te-tone-peach {
          background: #f6e4d6;
        }

        .te-tone-lavender {
          background: #e9e0f3;
        }

        .te-tone-pink {
          background: #f5e0e7;
        }

        .te-event-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 76px;
          padding: 16px 18px;
          border-bottom: 1.5px solid #292a27;
        }

        .te-event-header-main {
          display: flex;
          align-items: center;
          min-width: 0;
          gap: 12px;
        }

        .te-event-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.45);
          font-size: 19px;
        }

        .te-event-title {
          margin: 0;
          color: #292a27;
          font-size: 14px;
          font-weight: 750;
          line-height: 1.65;
          overflow-wrap: anywhere;
        }

        .te-event-index {
          margin-top: 3px;
          color: #494a42;
          font-family: monospace;
          font-size: 10px;
        }

        .te-published-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          padding: 5px 8px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.5);
          color: #292a27;
          font-size: 10px;
          font-weight: 750;
        }

        .te-published-badge span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4c7546;
        }

        /* Event details remain white */
        .te-event-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
          gap: 20px;
          padding: 18px;
          background: #ffffff;
        }

        .te-event-poster-wrap {
          min-width: 0;
        }

        .te-event-poster {
          display: block;
          width: 100%;
          max-height: 250px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
          object-fit: contain;
        }

        .te-event-poster-placeholder {
          display: grid;
          min-height: 125px;
          place-items: center;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
          color: #595b53;
          font-size: 12px;
        }

        .te-event-details {
          display: grid;
          align-content: start;
          gap: 10px;
          min-width: 0;
        }

        .te-event-detail {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #fcfbf6;
          color: #454640;
          font-size: 12px;
          line-height: 1.7;
        }

        .te-detail-icon {
          display: grid;
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: #f5edc9;
          color: #292a27;
        }

        .te-detail-icon.blue {
          background: #dcebf5;
        }

        .te-detail-icon.green {
          background: #dcefe5;
        }

        .te-event-detail-text {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .te-event-description {
          margin: 2px 0 0;
          padding: 12px 13px;
          border: 1px solid #e2e0d7;
          border-radius: 5px;
          background: #ffffff;
          color: #454640;
          font-size: 12px;
          line-height: 1.85;
          white-space: pre-line;
          overflow-wrap: anywhere;
        }

        .teacher-events-page button:focus-visible,
        .teacher-events-page input:focus-visible,
        .teacher-events-page textarea:focus-visible,
        .teacher-events-page a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 3px;
        }

        /* Responsive layout */
        @media (max-width: 900px) {
          .te-container {
            padding: 28px 24px 36px;
          }

          .te-event-body {
            grid-template-columns: minmax(0, 1fr);
          }

          .te-event-poster {
            max-width: 460px;
            max-height: 260px;
          }
        }

        @media (max-width: 640px) {
          .te-container {
            padding: 24px 16px 30px;
          }

          .te-panel {
            margin-top: 21px;
          }

          .te-panel-header {
            padding: 17px;
          }

          .te-panel-body,
          .te-events-body {
            padding: 18px;
          }

          .te-field-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .te-events-heading {
            align-items: flex-start;
            flex-direction: column;
            padding: 17px;
          }

          .te-event-header {
            align-items: flex-start;
            padding: 14px;
          }

          .te-event-body {
            padding: 13px;
            gap: 14px;
          }

          .te-event-title {
            font-size: 13px;
          }

          .te-publish-button {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .te-container {
            padding-right: 12px;
            padding-left: 12px;
          }

          .te-panel-body,
          .te-events-body {
            padding: 12px;
          }

          .te-event-header-main {
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-events-page *,
          .teacher-events-page *::before,
          .teacher-events-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="teacher-events-page">
        <div className="te-container">
          <PageHeader
            badge="Faculty Portal"
            title="Event Management"
            description="Schedule and publish campus events, symposiums, guest lectures, and student competitions."
            backTo="/teacher"
          />

          {/* Alerts */}
          {message && (
            <div className="te-alert success" role="status">
              <span className="te-alert-icon" aria-hidden="true">
                ✓
              </span>
              <p>{message}</p>
            </div>
          )}

          {errorMessage && (
            <div className="te-alert error" role="alert">
              <span className="te-alert-icon" aria-hidden="true">
                !
              </span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Create Event Form */}
          <section className="te-panel">
            <div className="te-panel-header">
              <div className="te-panel-icon" aria-hidden="true">
                📅
              </div>

              <div>
                <h2 className="te-panel-title">
                  Create & Publish Event
                </h2>

                <p className="te-panel-subtitle">
                  Share upcoming campus activities with students.
                </p>
              </div>
            </div>

            <div className="te-panel-body">
              <form onSubmit={handlePublish} className="te-form">
                {/* Event Title */}
                <div className="te-field">
                  <label htmlFor="eventTitle" className={labelClass}>
                    Event Title <span className="te-required">*</span>
                  </label>

                  <input
                    id="eventTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. National Level Technical Symposium 2026"
                    disabled={loading}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Date, Time and Venue */}
                <div className="te-field-grid">
                  <div className="te-field">
                    <label htmlFor="eventDate" className={labelClass}>
                      Event Date <span className="te-required">*</span>
                    </label>

                    <input
                      id="eventDate"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      onClick={openDatePicker}
                      onFocus={openDatePicker}
                      disabled={loading}
                      className={`${inputClass} cursor-pointer`}
                      required
                    />
                  </div>

                  <div className="te-field">
                    <label htmlFor="eventTime" className={labelClass}>
                      Event Time <span className="te-required">*</span>
                    </label>

                    <input
                      id="eventTime"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      onClick={openTimePicker}
                      onFocus={openTimePicker}
                      disabled={loading}
                      className={`${inputClass} cursor-pointer`}
                      required
                    />
                  </div>

                  <div className="te-field">
                    <label htmlFor="eventVenue" className={labelClass}>
                      Venue / Location{" "}
                      <span className="te-required">*</span>
                    </label>

                    <input
                      id="eventVenue"
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. Main Seminar Hall"
                      disabled={loading}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="te-field">
                  <label
                    htmlFor="eventDescription"
                    className={labelClass}
                  >
                    Event Description & Registration Guidelines{" "}
                    <span className="te-required">*</span>
                  </label>

                  <textarea
                    id="eventDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Include the agenda, target departments, team sizes, and registration deadlines..."
                    disabled={loading}
                    className={`${inputClass} te-textarea`}
                    required
                  />
                </div>

                {/* Poster Upload */}
                <div className="te-field">
                  <label htmlFor="poster" className={labelClass}>
                    Event Poster / Banner{" "}
                    <span style={{ fontWeight: 400, color: "#696b62" }}>
                      (Optional)
                    </span>
                  </label>

                  <div className="te-upload-box">
                    <input
                      id="poster"
                      name="poster"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      disabled={loading}
                      onChange={handlePosterChange}
                      className="te-file-input"
                    />

                    <p className="te-upload-help">
                      PNG, JPG, WEBP or GIF. Maximum file size: 5 MB.
                    </p>

                    {poster && (
                      <div className="te-selected-file">
                        Selected file:{" "}
                        <strong>{poster.name}</strong>
                      </div>
                    )}

                    {preview && (
                      <div className="te-preview">
                        <p className="te-preview-label">
                          Poster Preview
                        </p>

                        <img
                          src={preview}
                          alt="Selected event poster preview"
                          className="te-preview-image"
                        />

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => {
                            setPoster(null);
                            setPreview("");

                            const posterInput =
                              document.getElementById("poster");

                            if (posterInput) {
                              posterInput.value = "";
                            }
                          }}
                          className="te-remove-poster"
                        >
                          Remove poster
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Publish Button */}
                <div
                  style={{
                    paddingTop: "18px",
                    borderTop: "1px solid #e2e0d7",
                  }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="te-publish-button"
                  >
                    {loading ? (
                      <>
                        <span
                          className="te-spinner"
                          aria-hidden="true"
                        />
                        Publishing Event...
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">↗</span>
                        Publish Event to Campus
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Published Events */}
          <section className="te-panel">
            <div className="te-events-heading">
              <div>
                <h2 className="te-panel-title">
                  Published Campus Events
                </h2>

                <p className="te-panel-subtitle">
                  Events currently available on student dashboards.
                </p>
              </div>

              <span className="te-published-count">
                <span className="te-count-dot" aria-hidden="true" />
                {events.length} Published
              </span>
            </div>

            <div className="te-events-body">
              {loadingEvents && (
                <LoadingState message="Loading campus events..." />
              )}

              {!loadingEvents && events.length === 0 && (
                <EmptyState
                  icon="🎉"
                  title="No Events Published"
                  message="No events have been published yet. Use the form above to announce a new campus activity."
                />
              )}

              {!loadingEvents && events.length > 0 && (
                <div className="te-event-list">
                  {events.map((event, index) => {
                    const tone = tones[index % tones.length];

                    const posterUrl = event.poster_url
                      ? event.poster_url.startsWith("http")
                        ? event.poster_url
                        : `http://localhost:5000${event.poster_url}`
                      : "";

                    return (
                      <article
                        key={event.id}
                        className="te-event-card"
                      >
                        {/* Clearly visible pastel-colored card header */}
                        <div className={`te-event-header te-tone-${tone}`}>
                          <div className="te-event-header-main">
                            <span
                              className="te-event-icon"
                              aria-hidden="true"
                            >
                              🎉
                            </span>

                            <div style={{ minWidth: 0 }}>
                              <h3 className="te-event-title">
                                {event.title}
                              </h3>

                              <p className="te-event-index">
                                CAMPUS EVENT {String(index + 1).padStart(2, "0")}
                              </p>
                            </div>
                          </div>

                          <span className="te-published-badge">
                            <span aria-hidden="true" />
                            Published
                          </span>
                        </div>

                        {/* Event details */}
                        <div className="te-event-body">
                          <div className="te-event-poster-wrap">
                            {posterUrl ? (
                              <img
                                src={posterUrl}
                                alt={`${event.title} poster`}
                                loading="lazy"
                                className="te-event-poster"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="te-event-poster-placeholder">
                                No poster uploaded
                              </div>
                            )}
                          </div>

                          <div className="te-event-details">
                            <div className="te-event-detail">
                              <span
                                className="te-detail-icon"
                                aria-hidden="true"
                              >
                                📅
                              </span>

                              <span className="te-event-detail-text">
                                <strong>Event date:</strong>{" "}
                                {event.event_date
                                  ? new Date(
                                      event.event_date
                                    ).toLocaleDateString("en-IN")
                                  : "TBA"}
                              </span>
                            </div>

                            <div className="te-event-detail">
                              <span
                                className="te-detail-icon blue"
                                aria-hidden="true"
                              >
                                🕐
                              </span>

                              <span className="te-event-detail-text">
                                <strong>Event time:</strong>{" "}
                                {event.event_time
                                  ? String(event.event_time).slice(0, 5)
                                  : "TBA"}
                              </span>
                            </div>

                            <div className="te-event-detail">
                              <span
                                className="te-detail-icon green"
                                aria-hidden="true"
                              >
                                📍
                              </span>

                              <span className="te-event-detail-text">
                                <strong>Venue:</strong>{" "}
                                {event.location || "Main Campus"}
                              </span>
                            </div>

                            {event.description && (
                              <p className="te-event-description">
                                {event.description}
                              </p>
                            )}
                          </div>
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

export default TeacherEvents;