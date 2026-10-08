import { useState } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const events = [
    {
      id: 1,
      title: "Hackathon 2026",
      type: "Technical",
      date: "October 20, 2026",
      time: "9:00 AM - 6:00 PM",
      venue: "Innovation Lab",
      description:
        "Build innovative solutions for real-world problems and compete with other teams.",
      poster:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Tech Talk - AI & Future",
      type: "Seminar",
      date: "October 24, 2026",
      time: "10:00 AM - 12:00 PM",
      venue: "Seminar Hall",
      description:
        "An interactive session covering artificial intelligence and emerging technologies.",
      poster:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Inter College Sports Meet",
      type: "Sports",
      date: "October 28, 2026",
      time: "8:00 AM - 5:00 PM",
      venue: "College Ground",
      description:
        "Participate in various sports competitions and represent your department.",
      poster:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>

            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>

          <Link
            to="/student"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            ← Dashboard
          </Link>

        </div>
      </nav>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            College Events
          </h2>

          <p className="text-slate-500 mt-2">
            View upcoming college events and register for activities.
          </p>
        </div>

        {/* Events */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => {

            const isRegistered = registeredEvents.includes(event.id);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >

                {/* Poster */}

                <div className="h-52 bg-slate-200 overflow-hidden">

                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Event Details */}

                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {event.type}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-4">
                    {event.title}
                  </h3>

                  <div className="space-y-3 text-sm mt-4">

                    <div className="flex gap-3">
                      <span>📅</span>
                      <span className="text-slate-600">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span>⏰</span>
                      <span className="text-slate-600">
                        {event.time}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span>📍</span>
                      <span className="text-slate-600">
                        {event.venue}
                      </span>
                    </div>

                  </div>

                  <p className="text-sm text-slate-500 mt-5">
                    {event.description}
                  </p>

                  <button
                    onClick={() => handleRegister(event.id)}
                    disabled={isRegistered}
                    className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                      isRegistered
                        ? "bg-green-100 text-green-700 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isRegistered
                      ? "✓ Registered"
                      : "Register Now"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </main>

    </div>
  );
}

export default Events;