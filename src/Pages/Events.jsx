import { useState, useEffect } from "react";
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
              : defaultEvents[0].poster
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

  return (
    <Sidebar role="student">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        <PageHeader
          badge="Campus Life"
          title="College Events"
          description="Explore upcoming academic symposiums, technical hackathons, guest lectures, and sports tournaments."
          backTo="/student"
        >
          <span className="text-xs text-[#D4AF37] font-semibold bg-[#17130A] border border-[#3D3318] px-3 py-1.5 rounded-full">
            {eventsList.length} Active Events
          </span>
        </PageHeader>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((event) => {
            const isRegistered = registeredEvents.includes(event.id);

            return (
              <div
                key={event.id}
                className="group bg-[#0D0D0D] rounded-2xl border border-[#292929] hover:border-[#D4AF37]/60 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* POSTER */}
                  <div className="h-48 bg-[#111111] overflow-hidden relative">
                    <img
                      src={event.poster}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#050505]/90 border border-[#3D3318] text-[#D4AF37] text-[11px] font-semibold tracking-wide backdrop-blur-sm">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* EVENT DETAILS */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors tracking-tight">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mt-4 text-xs text-[#888888]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 text-center text-[#D4AF37]">
                          📅
                        </span>
                        <span className="text-[#B8B8B8] font-medium">
                          {event.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="w-5 text-center text-[#D4AF37]">
                          ⏰
                        </span>
                        <span className="text-[#B8B8B8] font-medium">
                          {event.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="w-5 text-center text-[#D4AF37]">
                          📍
                        </span>
                        <span className="text-[#B8B8B8] font-medium">
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#888888] mt-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* REGISTER ACTION */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleRegister(event.id)}
                    disabled={isRegistered}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      isRegistered
                        ? "bg-[#17130A] text-[#D4AF37] border border-[#3D3318] cursor-default"
                        : "bg-[#D4AF37] hover:bg-[#E5C158] text-[#050505]"
                    }`}
                  >
                    {isRegistered ? "✓ Registered" : "Register for Event"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default Events;