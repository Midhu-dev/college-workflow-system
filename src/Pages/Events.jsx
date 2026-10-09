import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

function Events() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const defaultEvents = [
    {
      id: "default-1",
      title: "Hackathon 2026",
      type: "Technical",
      date: "October 20, 2026",
      time: "9:00 AM - 6:00 PM",
      venue: "Innovation Lab",
      description:
        "Build innovative solutions for real-world problems and compete with other teams across diverse domains.",
      poster:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "default-2",
      title: "Tech Talk - AI & Future",
      type: "Seminar",
      date: "October 24, 2026",
      time: "10:00 AM - 12:00 PM",
      venue: "Seminar Hall",
      description:
        "An interactive session covering artificial intelligence and emerging machine learning paradigms.",
      poster:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "default-3",
      title: "Inter College Sports Meet",
      type: "Sports",
      date: "October 28, 2026",
      time: "8:00 AM - 5:00 PM",
      venue: "College Ground",
      description:
        "Participate in various sports competitions, athletic tournaments, and represent your department.",
      poster:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [eventsList, setEventsList] = useState(defaultEvents);

  useEffect(() => {
    const fetchApiEvents = async () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();

          if (data?.events && data.events.length > 0) {
            const mapped = data.events.map((event) => ({
              id: event.id,
              title: event.title,
              type: "Campus Event",
              date: event.event_date
                ? new Date(event.event_date).toLocaleDateString()
                : "TBA",
              time: event.event_time
                ? String(event.event_time).slice(0, 5)
                : "TBA",
              venue: event.location || "Campus Venue",
              description: event.description,
              poster: event.poster_url
                ? event.poster_url.startsWith("http")
                  ? event.poster_url
                  : `http://localhost:5000${event.poster_url}`
                : defaultEvents[0].poster,
            }));

            setEventsList([...mapped, ...defaultEvents]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // Keep default events if the API request fails.
      }
    };

    fetchApiEvents();
  }, []);

  const handleRegister = (eventId) => {
    setRegisteredEvents((previous) =>
      previous.includes(eventId)
        ? previous
        : [...previous, eventId]
    );
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
        .events-page {
          --ev-background: #ffffff;
          --ev-foreground: #292a27;
          --ev-muted: #595b53;
          --ev-border: #e2e0d7;

          --ev-yellow: oklch(0.94 0.11 100);
          --ev-blue: oklch(0.91 0.054 235);
          --ev-green: oklch(0.91 0.075 160);
          --ev-peach: oklch(0.92 0.066 55);
          --ev-lavender: oklch(0.91 0.048 300);
          --ev-pink: oklch(0.92 0.053 355);

          width: 100%;
          flex: 1;
          background: var(--ev-background);
          color: var(--ev-foreground);
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0;
        }

        .events-page *,
        .events-page *::before,
        .events-page *::after {
          box-sizing: border-box;
        }

        .ev-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 34px 36px 42px;
        }

        .ev-header {
          margin-bottom: 27px;
        }

        .ev-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 19px;
        }

        .ev-eyebrow {
          margin: 0 0 6px;
          color: var(--ev-muted);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ev-section-title {
          margin: 0;
          color: var(--ev-foreground);
          font-size: 20px;
          line-height: 1.45;
          font-weight: 700;
        }

        .ev-section-description {
          margin: 5px 0 0;
          color: var(--ev-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .ev-count {
          flex-shrink: 0;
          padding: 6px 10px;
          border: 1.5px solid #292a27;
          border-radius: 4px;
          background: var(--ev-yellow);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          font-size: 11px;
          font-weight: 700;
        }

        /* Event grid */
        .ev-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 20px;
        }

        /* Cards match the outlined StudentDashboard cards */
        .ev-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border: 1.5px solid #292a27;
          border-radius: 6px;
          background: #ffffff;
          color: #292a27;
          box-shadow: 3px 3px 0 #292a27;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .ev-card:hover {
          transform: translate(-1px, -2px);
          box-shadow: 4px 5px 0 #292a27;
        }

        /* Pastel-colored card headers */
        .ev-card-top {
          display: flex;
          height: 56px;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 16px;
          border-bottom: 1.5px solid #292a27;
        }

        .ev-tone-yellow {
          background: var(--ev-yellow);
        }

        .ev-tone-blue {
          background: var(--ev-blue);
        }

        .ev-tone-green {
          background: var(--ev-green);
        }

        .ev-tone-peach {
          background: var(--ev-peach);
        }

        .ev-tone-lavender {
          background: var(--ev-lavender);
        }

        .ev-tone-pink {
          background: var(--ev-pink);
        }

        .ev-card-top-icon {
          display: grid;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.4);
          color: #292a27;
          font-size: 18px;
        }

        .ev-card-top-label {
          color: #414239;
          font-size: 10px;
          font-family: monospace;
          font-weight: 600;
        }

        /* Poster */
        .ev-poster {
          position: relative;
          height: 178px;
          overflow: hidden;
          background: #f5f5f0;
          border-bottom: 1px solid var(--ev-border);
        }

        .ev-poster img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 220ms ease;
        }

        .ev-card:hover .ev-poster img {
          transform: scale(1.025);
        }

        .ev-poster-placeholder {
          display: grid;
          width: 100%;
          height: 100%;
          place-items: center;
          color: #595b53;
          background: #fcfbf6;
          font-size: 28px;
        }

        .ev-type {
          position: absolute;
          top: 11px;
          left: 11px;
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.96);
          color: #292a27;
          font-size: 10px;
          font-weight: 700;
        }

        /* Event details */
        .ev-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 0;
          padding: 17px 17px 0;
        }

        .ev-card-title {
          margin: 0;
          color: #292a27;
          font-size: 15px;
          line-height: 1.55;
          font-weight: 750;
          overflow-wrap: anywhere;
          transition: color 150ms ease;
        }

        .ev-card:hover .ev-card-title {
          color: #66511b;
        }

        .ev-details {
          display: grid;
          gap: 10px;
          margin-top: 15px;
        }

        .ev-detail {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-width: 0;
          color: #454640;
          font-size: 12px;
          line-height: 1.7;
        }

        .ev-detail-icon {
          display: grid;
          width: 27px;
          height: 27px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid #292a27;
          border-radius: 4px;
          background: #fbf7e9;
          color: #292a27;
        }

        .ev-detail:nth-child(2) .ev-detail-icon {
          background: var(--ev-blue);
        }

        .ev-detail:nth-child(3) .ev-detail-icon {
          background: var(--ev-green);
        }

        .ev-detail-icon svg {
          width: 13px;
          height: 13px;
        }

        .ev-detail-text {
          min-width: 0;
          padding-top: 3px;
          color: #454640;
          overflow-wrap: anywhere;
        }

        .ev-description {
          display: -webkit-box;
          overflow: hidden;
          margin: 15px 0 17px;
          color: #595b53;
          font-size: 12px;
          line-height: 1.85;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        /* Register button */
        .ev-card-footer {
          margin-top: auto;
          padding: 0 17px 17px;
        }

        .ev-register {
          display: flex;
          width: 100%;
          min-height: 41px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 12px;
          border: 1.5px solid #292a27;
          border-radius: 5px;
          background: var(--ev-yellow);
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

        .ev-register:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #292a27;
          background: #eadb9e;
        }

        .ev-register.is-registered {
          border-color: #292a27;
          background: var(--ev-green);
          color: #292a27;
          box-shadow: 2px 2px 0 #292a27;
          cursor: default;
        }

        .events-page button:focus-visible,
        .events-page a:focus-visible {
          outline: 2px solid #292a27;
          outline-offset: 4px;
        }

        @media (max-width: 1050px) {
          .ev-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .ev-poster {
            height: 185px;
          }
        }

        @media (max-width: 640px) {
          .ev-container {
            padding: 25px 18px 30px;
          }

          .ev-header {
            margin-bottom: 23px;
          }

          .ev-section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .ev-section-title {
            font-size: 18px;
          }

          .ev-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 19px;
          }

          .ev-poster {
            height: 200px;
          }

          .ev-card-content {
            padding: 16px 16px 0;
          }

          .ev-card-footer {
            padding: 0 16px 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .events-page *,
          .events-page *::before,
          .events-page *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="events-page">
        <div className="ev-container">
          <header className="ev-header">
            <PageHeader
              badge="Campus Life"
              title="College Events"
              description="Explore upcoming academic symposiums, technical hackathons, guest lectures, and sports tournaments."
              backTo="/student"
            />
          </header>

          <section aria-label="Available campus events">
            <div className="ev-section-heading">
              <div>
                <p className="ev-eyebrow">Discover and participate</p>

                <h2 className="ev-section-title">Upcoming Events</h2>

                <p className="ev-section-description">
                  Find activities and opportunities happening around campus.
                </p>
              </div>

              <span className="ev-count">
                {eventsList.length} Active Events
              </span>
            </div>

            <div className="ev-grid">
              {eventsList.map((event, index) => {
                const isRegistered = registeredEvents.includes(event.id);
                const tone = tones[index % tones.length];

                return (
                  <article key={event.id} className="ev-card">
                    {/* Pastel-colored card header */}
                    <div className={`ev-card-top ev-tone-${tone}`}>
                      <span className="ev-card-top-icon" aria-hidden="true">
                        {event.type === "Sports"
                          ? "🏆"
                          : event.type === "Seminar"
                            ? "🎤"
                            : "🎉"}
                      </span>

                      <span className="ev-card-top-label">
                        EVENT {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Event poster */}
                    <div className="ev-poster">
                      <img
                        src={event.poster}
                        alt={event.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      <span className="ev-type">{event.type}</span>
                    </div>

                    {/* Event details */}
                    <div className="ev-card-content">
                      <h3 className="ev-card-title">{event.title}</h3>

                      <div className="ev-details">
                        <div className="ev-detail">
                          <span
                            className="ev-detail-icon"
                            aria-hidden="true"
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.7}
                            >
                              <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                              />

                              <path
                                strokeLinecap="round"
                                d="M16 3v4M8 3v4M3 10h18"
                              />
                            </svg>
                          </span>

                          <span className="ev-detail-text">
                            {event.date}
                          </span>
                        </div>

                        <div className="ev-detail">
                          <span
                            className="ev-detail-icon"
                            aria-hidden="true"
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.7}
                            >
                              <circle cx="12" cy="12" r="9" />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 7v5l3 2"
                              />
                            </svg>
                          </span>

                          <span className="ev-detail-text">
                            {event.time}
                          </span>
                        </div>

                        <div className="ev-detail">
                          <span
                            className="ev-detail-icon"
                            aria-hidden="true"
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.7}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                              />

                              <circle cx="12" cy="10" r="2.5" />
                            </svg>
                          </span>

                          <span className="ev-detail-text">
                            {event.venue}
                          </span>
                        </div>
                      </div>

                      <p className="ev-description">
                        {event.description}
                      </p>
                    </div>

                    {/* Registration */}
                    <div className="ev-card-footer">
                      <button
                        type="button"
                        onClick={() => handleRegister(event.id)}
                        disabled={isRegistered}
                        className={`ev-register ${
                          isRegistered ? "is-registered" : ""
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <span aria-hidden="true">✓</span>
                            Registered
                          </>
                        ) : (
                          <>
                            Register for Event
                            <span aria-hidden="true">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default Events;