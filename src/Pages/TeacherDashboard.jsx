import { Link } from "react-router-dom";

function TeacherDashboard({ darkMode, setDarkMode }) {
  const summaryCards = [
    {
      title: "Class Issues",
      count: 4,
      icon: "⚠️",
      link: "/teacher/class-issues",
    },
    {
      title: "Leave / OD",
      count: 6,
      icon: "📋",
      link: "/teacher/leave-od",
    },
    {
      title: "Certificates",
      count: 3,
      icon: "📜",
      link: "/teacher/certificates",
    },
    {
      title: "Events",
      count: 2,
      icon: "📅",
      link: "/teacher/events",
    },
  ];

  const pendingRequests = [
    {
      name: "Midhun K",
      type: "Leave",
      reason: "Medical leave",
      status: "Pending",
    },
    {
      name: "Arun Kumar",
      type: "OD",
      reason: "Hackathon participation",
      status: "Pending",
    },
    {
      name: "Rahul S",
      type: "Certificate",
      reason: "Bonafide Certificate",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-[#050505] border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          <div className="flex items-center justify-between gap-4">

            {/* BRAND */}
            <div className="flex items-center gap-3 min-w-0">

              <div className="
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-[#D4AF37]
                flex
                items-center
                justify-center
                text-[#050505]
                font-bold
                shadow-[0_0_18px_rgba(212,175,55,0.12)]
              ">
                SI
              </div>

              <div className="min-w-0">
                <h1 className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-white
                  truncate
                ">
                  College Management Portal
                </h1>

                <p className="
                  text-xs
                  sm:text-sm
                  text-[#B8B8B8]
                  truncate
                ">
                  Smart Infrastructure Dashboard
                </p>
              </div>

            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">

              <div className="hidden md:flex items-center gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#D4AF37]
                  flex
                  items-center
                  justify-center
                  text-[#050505]
                  font-bold
                ">
                  T
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Teacher
                  </p>

                  <p className="text-xs text-[#B8B8B8]">
                    Faculty
                  </p>
                </div>

              </div>

              <Link
                to="/"
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-[#0D0D0D]
                  border
                  border-[#292929]
                  text-[#B8B8B8]
                  text-sm
                  font-medium
                  hover:border-[#D4AF37]
                  hover:text-[#D4AF37]
                  transition
                  duration-200
                "
              >
                Logout
              </Link>

            </div>

          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1">

        {/* ================= WELCOME ================= */}
        <section className="mb-10">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-5
          ">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D4AF37]
                "></span>

                <span className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  tracking-widest
                  text-[#D4AF37]
                ">
                  FACULTY PORTAL
                </span>

              </div>

              <h2 className="
                text-3xl
                sm:text-4xl
                font-bold
                text-white
                tracking-tight
              ">
                Welcome back, Teacher
              </h2>

              <p className="
                mt-2
                text-[#B8B8B8]
                max-w-2xl
              ">
                Monitor and manage your college activities from one place.
              </p>

            </div>

            {/* SYSTEM STATUS */}
            <div className="
              inline-flex
              self-start
              lg:self-auto
              items-center
              gap-2
              px-4
              py-2.5
              bg-[#0D0D0D]
              border
              border-[#292929]
              rounded-lg
            ">

              <span className="
                w-2
                h-2
                rounded-full
                bg-[#D4AF37]
                shadow-[0_0_8px_rgba(212,175,55,0.5)]
              "></span>

              <span className="
                text-sm
                font-medium
                text-[#D0D0D0]
              ">
                System Operational
              </span>

            </div>

          </div>

        </section>

        {/* ================= OVERVIEW ================= */}
        <section className="mb-10">

          <div className="mb-5">

            <h2 className="
              text-xl
              font-bold
              text-white
            ">
              Overview
            </h2>

            <p className="
              text-sm
              text-[#888888]
              mt-1
            ">
              Current activity across your faculty portal
            </p>

          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          ">

            {summaryCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="
                  group
                  bg-[#0D0D0D]
                  border
                  border-[#292929]
                  rounded-2xl
                  p-5
                  shadow-lg
                  hover:border-[#D4AF37]
                  hover:shadow-[0_0_24px_rgba(212,175,55,0.07)]
                  transition-all
                  duration-200
                "
              >

                <div className="
                  flex
                  items-start
                  justify-between
                  gap-4
                ">

                  <div>

                    <p className="
                      text-sm
                      font-medium
                      text-[#B8B8B8]
                    ">
                      {card.title}
                    </p>

                    <p className="
                      text-3xl
                      font-bold
                      mt-2
                      text-white
                    ">
                      {card.count}
                    </p>

                    <p className="
                      text-sm
                      font-medium
                      mt-4
                      text-[#D4AF37]
                      group-hover:text-[#F2D675]
                      transition
                    ">
                      View details →
                    </p>

                  </div>

                  <div className="
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    bg-[#17130A]
                    border
                    border-[#3D3318]
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    {card.icon}
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mb-10">

          <div className="mb-5">

            <h2 className="
              text-xl
              font-bold
              text-white
            ">
              Quick Actions
            </h2>

            <p className="
              text-sm
              text-[#888888]
              mt-1
            ">
              Frequently used faculty operations
            </p>

          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          ">

            {/* CLASS ISSUES */}
            <Link
              to="/teacher/class-issues"
              className="
                group
                bg-[#0D0D0D]
                border
                border-[#292929]
                rounded-2xl
                p-5
                hover:border-[#D4AF37]
                shadow-lg
                transition
                duration-200
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#D4AF37]
                text-[#050505]
                flex
                items-center
                justify-center
                text-lg
                mb-4
              ">
                ⚠️
              </div>

              <h3 className="font-semibold text-white">
                Class Issues
              </h3>

              <p className="
                text-sm
                mt-1
                text-[#888888]
              ">
                Review student class issues
              </p>

              <div className="
                mt-4
                text-sm
                font-semibold
                text-[#D4AF37]
                group-hover:text-[#F2D675]
                transition
              ">
                Manage →
              </div>

            </Link>

            {/* LEAVE / OD */}
            <Link
              to="/teacher/leave-od"
              className="
                group
                bg-[#0D0D0D]
                border
                border-[#292929]
                rounded-2xl
                p-5
                hover:border-[#D4AF37]
                shadow-lg
                transition
                duration-200
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#D4AF37]
                text-[#050505]
                flex
                items-center
                justify-center
                text-lg
                mb-4
              ">
                📋
              </div>

              <h3 className="font-semibold text-white">
                Leave / OD
              </h3>

              <p className="
                text-sm
                mt-1
                text-[#888888]
              ">
                Manage leave and OD requests
              </p>

              <div className="
                mt-4
                text-sm
                font-semibold
                text-[#D4AF37]
                group-hover:text-[#F2D675]
                transition
              ">
                Manage →
              </div>

            </Link>

            {/* CERTIFICATES */}
            <Link
              to="/teacher/certificates"
              className="
                group
                bg-[#0D0D0D]
                border
                border-[#292929]
                rounded-2xl
                p-5
                hover:border-[#D4AF37]
                shadow-lg
                transition
                duration-200
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#D4AF37]
                text-[#050505]
                flex
                items-center
                justify-center
                text-lg
                mb-4
              ">
                📜
              </div>

              <h3 className="font-semibold text-white">
                Certificates
              </h3>

              <p className="
                text-sm
                mt-1
                text-[#888888]
              ">
                Review certificate requests
              </p>

              <div className="
                mt-4
                text-sm
                font-semibold
                text-[#D4AF37]
                group-hover:text-[#F2D675]
                transition
              ">
                Manage →
              </div>

            </Link>

            {/* EVENTS */}
            <Link
              to="/teacher/events"
              className="
                group
                bg-[#0D0D0D]
                border
                border-[#292929]
                rounded-2xl
                p-5
                hover:border-[#D4AF37]
                shadow-lg
                transition
                duration-200
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#D4AF37]
                text-[#050505]
                flex
                items-center
                justify-center
                text-lg
                mb-4
              ">
                📅
              </div>

              <h3 className="font-semibold text-white">
                Events
              </h3>

              <p className="
                text-sm
                mt-1
                text-[#888888]
              ">
                Manage college events
              </p>

              <div className="
                mt-4
                text-sm
                font-semibold
                text-[#D4AF37]
                group-hover:text-[#F2D675]
                transition
              ">
                Manage →
              </div>

            </Link>

          </div>

        </section>

        {/* ================= PENDING REQUESTS ================= */}
        <section>

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-3
            mb-5
          ">

            <div>

              <h2 className="
                text-xl
                font-bold
                text-white
              ">
                Pending Requests
              </h2>

              <p className="
                text-sm
                text-[#888888]
                mt-1
              ">
                Requests that require your attention
              </p>

            </div>

            <div className="
              inline-flex
              self-start
              sm:self-auto
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-[#17130A]
              border
              border-[#3D3318]
            ">

              <span className="
                w-2
                h-2
                rounded-full
                bg-[#D4AF37]
              "></span>

              <span className="
                text-sm
                font-semibold
                text-[#D4AF37]
              ">
                {pendingRequests.length} pending
              </span>

            </div>

          </div>

          {/* TABLE */}
          <div className="
            overflow-hidden
            rounded-2xl
            border
            border-[#292929]
            bg-[#0D0D0D]
            shadow-lg
          ">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="
                    bg-[#111111]
                    border-b
                    border-[#292929]
                  ">

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#D4AF37]
                    ">
                      Student
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#D4AF37]
                    ">
                      Type
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#D4AF37]
                    ">
                      Reason
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#D4AF37]
                    ">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {pendingRequests.map((request, index) => (

                    <tr
                      key={index}
                      className="
                        border-b
                        border-[#292929]
                        last:border-b-0
                        hover:bg-[#141414]
                        transition
                        duration-150
                      "
                    >

                      {/* STUDENT */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="
                            w-9
                            h-9
                            shrink-0
                            rounded-full
                            bg-[#D4AF37]
                            text-[#050505]
                            flex
                            items-center
                            justify-center
                            text-sm
                            font-bold
                          ">
                            {request.name.charAt(0)}
                          </div>

                          <span className="
                            font-medium
                            text-white
                            whitespace-nowrap
                          ">
                            {request.name}
                          </span>

                        </div>

                      </td>

                      {/* TYPE */}
                      <td className="
                        px-6
                        py-4
                        text-sm
                        text-[#B8B8B8]
                        whitespace-nowrap
                      ">
                        {request.type}
                      </td>

                      {/* REASON */}
                      <td className="
                        px-6
                        py-4
                        text-sm
                        text-[#B8B8B8]
                      ">
                        {request.reason}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">

                        <span className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-semibold
                          bg-[#17130A]
                          text-[#D4AF37]
                          border
                          border-[#3D3318]
                        ">

                          <span className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-[#D4AF37]
                          "></span>

                          {request.status}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="
        mt-12
        bg-[#080808]
        border-t
        border-[#292929]
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          py-5
        ">

          <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          ">

            <p className="text-sm text-[#777777]">
              © 2026 College Management Portal
            </p>

            <div className="flex items-center gap-2">

              <span className="
                w-1.5
                h-1.5
                rounded-full
                bg-[#D4AF37]
              "></span>

              <p className="text-sm text-[#777777]">
                Teacher Portal
              </p>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default TeacherDashboard;