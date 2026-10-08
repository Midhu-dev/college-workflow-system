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
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="
        bg-[#080808]
        border-b
        border-[#292929]
        px-6
        py-4
      ">

        <div className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
        ">

          {/* BRAND */}
          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-lg
              bg-[#D4AF37]
              text-[#050505]
              flex
              items-center
              justify-center
              font-bold
            ">
              CW
            </div>

            <div>

              <h1 className="text-xl font-bold text-white">
                College Workflow
              </h1>

              <p className="text-xs text-[#B8B8B8]">
                Student Portal
              </p>

            </div>

          </div>

          {/* DASHBOARD */}
          <Link
            to="/student"
            className="
              text-sm
              text-[#D4AF37]
              font-medium
              hover:text-[#F2D675]
              transition
            "
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <div className="flex items-center gap-2 mb-3">

            <span className="
              w-2
              h-2
              rounded-full
              bg-[#D4AF37]
            "></span>

            <span className="
              text-sm
              font-medium
              text-[#D4AF37]
              uppercase
              tracking-wide
            ">
              Student Activities
            </span>

          </div>

          <h2 className="text-3xl font-bold text-white">
            College Events
          </h2>

          <p className="text-[#B8B8B8] mt-2">
            View upcoming college events and register for activities.
          </p>

        </div>

        {/* ================= EVENTS ================= */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {events.map((event) => {

            const isRegistered = registeredEvents.includes(event.id);

            return (
              <div
                key={event.id}
                className="
                  group
                  bg-[#0D0D0D]
                  rounded-2xl
                  border
                  border-[#292929]
                  shadow-xl
                  overflow-hidden
                  hover:border-[#D4AF37]
                  transition-all
                  duration-200
                "
              >

                {/* POSTER */}
                <div className="
                  h-52
                  bg-[#111111]
                  overflow-hidden
                  relative
                ">

                  <img
                    src={event.poster}
                    alt={event.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      opacity-85
                      group-hover:opacity-100
                      group-hover:scale-105
                      transition-all
                      duration-500
                    "
                  />

                  {/* IMAGE OVERLAY */}
                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#050505]/70
                    via-transparent
                    to-transparent
                    pointer-events-none
                  "></div>

                  {/* EVENT TYPE */}
                  <div className="absolute top-4 left-4">

                    <span className="
                      inline-flex
                      items-center
                      px-3
                      py-1.5
                      rounded-full
                      bg-[#050505]/90
                      border
                      border-[#D4AF37]/40
                      text-[#D4AF37]
                      text-xs
                      font-semibold
                      backdrop-blur-sm
                    ">
                      {event.type}
                    </span>

                  </div>

                </div>

                {/* EVENT DETAILS */}
                <div className="p-6">

                  <h3 className="
                    text-xl
                    font-bold
                    text-white
                    leading-tight
                  ">
                    {event.title}
                  </h3>

                  {/* EVENT INFO */}
                  <div className="space-y-3 text-sm mt-5">

                    {/* DATE */}
                    <div className="flex items-center gap-3">

                      <div className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#17130A]
                        border
                        border-[#3D3318]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      ">
                        📅
                      </div>

                      <span className="text-[#B8B8B8]">
                        {event.date}
                      </span>

                    </div>

                    {/* TIME */}
                    <div className="flex items-center gap-3">

                      <div className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#17130A]
                        border
                        border-[#3D3318]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      ">
                        ⏰
                      </div>

                      <span className="text-[#B8B8B8]">
                        {event.time}
                      </span>

                    </div>

                    {/* VENUE */}
                    <div className="flex items-center gap-3">

                      <div className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#17130A]
                        border
                        border-[#3D3318]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      ">
                        📍
                      </div>

                      <span className="text-[#B8B8B8]">
                        {event.venue}
                      </span>

                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="
                    text-sm
                    text-[#888888]
                    mt-5
                    leading-relaxed
                  ">
                    {event.description}
                  </p>

                  {/* REGISTER BUTTON */}
                  <button
                    onClick={() => handleRegister(event.id)}
                    disabled={isRegistered}
                    className={`
                      w-full
                      mt-6
                      py-3
                      rounded-lg
                      font-semibold
                      transition
                      duration-200
                      ${
                        isRegistered
                          ? "bg-[#17130A] text-[#D4AF37] border border-[#3D3318] cursor-default"
                          : "bg-[#D4AF37] hover:bg-[#F2D675] text-[#050505]"
                      }
                    `}
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

      {/* ================= FOOTER ================= */}
      <footer className="
        mt-10
        border-t
        border-[#292929]
        bg-[#080808]
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-2
        ">

          <p className="text-sm text-[#B8B8B8]">
            © 2026 College Management Portal
          </p>

          <div className="flex items-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="text-sm text-[#B8B8B8]">
              Student Portal
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Events;