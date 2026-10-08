import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#050505] border-b border-[#292929] px-6 py-4">
        <div className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-[#D4AF37]
              flex
              items-center
              justify-center
            ">
              <span className="
                text-sm
                font-bold
                text-[#050505]
              ">
                CW
              </span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                College Workflow
              </h1>

              <p className="text-xs text-[#888888]">
                Student Portal
              </p>
            </div>

          </div>

          <button
            className="
              text-sm
              text-[#B8B8B8]
              font-medium
              px-4
              py-2
              rounded-lg
              border
              border-[#292929]
              hover:text-[#D4AF37]
              hover:border-[#D4AF37]
              transition
            "
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ================= WELCOME SECTION ================= */}
        <div className="mb-9">

          <div className="flex items-center gap-2 mb-3">

            <span className="
              w-2
              h-2
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="
              text-xs
              font-semibold
              tracking-widest
              text-[#D4AF37]
              uppercase
            ">
              Student Portal
            </p>

          </div>

          <h2 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-white
          ">
            Student Dashboard
          </h2>

          <p className="
            text-[#B8B8B8]
            mt-2
            max-w-2xl
          ">
            Manage your college services and requests from one place.
          </p>

        </div>

        {/* ================= FEATURE CARDS ================= */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        ">

          {/* Class Issue */}
          <Link
            to="/student/class-issue"
            className="
              group
              bg-[#0D0D0D]
              p-6
              rounded-2xl
              border
              border-[#292929]
              hover:border-[#D4AF37]
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            <div className="
              w-12
              h-12
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
              group-hover:bg-[#D4AF37]
              group-hover:border-[#D4AF37]
              transition
            ">
              🏫
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              Class Issue
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-2
              leading-6
            ">
              Report problems related to your class or classroom.
            </p>

            <p className="
              text-xs
              text-[#D4AF37]
              font-semibold
              mt-5
            ">
              Report Issue →
            </p>
          </Link>

          {/* Leave / OD */}
          <Link
            to="/student/leave-od"
            className="
              group
              bg-[#0D0D0D]
              p-6
              rounded-2xl
              border
              border-[#292929]
              hover:border-[#D4AF37]
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            <div className="
              w-12
              h-12
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
              group-hover:bg-[#D4AF37]
              group-hover:border-[#D4AF37]
              transition
            ">
              📝
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              Leave / OD
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-2
              leading-6
            ">
              Apply for leave or On Duty and track your request status.
            </p>

            <p className="
              text-xs
              text-[#D4AF37]
              font-semibold
              mt-5
            ">
              Apply Now →
            </p>
          </Link>

          {/* Events */}
          <Link
            to="/student/events"
            className="
              group
              bg-[#0D0D0D]
              p-6
              rounded-2xl
              border
              border-[#292929]
              hover:border-[#D4AF37]
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            <div className="
              w-12
              h-12
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
              group-hover:bg-[#D4AF37]
              group-hover:border-[#D4AF37]
              transition
            ">
              🎉
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              Events
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-2
              leading-6
            ">
              View upcoming college events and register.
            </p>

            <p className="
              text-xs
              text-[#D4AF37]
              font-semibold
              mt-5
            ">
              View Events →
            </p>
          </Link>

          {/* Certificate Upload */}
          <Link
            to="/student/certificate-upload"
            className="
              group
              bg-[#0D0D0D]
              p-6
              rounded-2xl
              border
              border-[#292929]
              hover:border-[#D4AF37]
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            <div className="
              w-12
              h-12
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
              group-hover:bg-[#D4AF37]
              group-hover:border-[#D4AF37]
              transition
            ">
              📤
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              Certificate Upload
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-2
              leading-6
            ">
              Upload certificates for verification.
            </p>

            <p className="
              text-xs
              text-[#D4AF37]
              font-semibold
              mt-5
            ">
              Upload Certificate →
            </p>
          </Link>

          {/* Certificate Request */}
          <Link
            to="/student/certificate-request"
            className="
              group
              bg-[#0D0D0D]
              p-6
              rounded-2xl
              border
              border-[#292929]
              hover:border-[#D4AF37]
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            <div className="
              w-12
              h-12
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
              group-hover:bg-[#D4AF37]
              group-hover:border-[#D4AF37]
              transition
            ">
              📋
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              Certificate Request
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-2
              leading-6
            ">
              Request certificates from the college.
            </p>

            <p className="
              text-xs
              text-[#D4AF37]
              font-semibold
              mt-5
            ">
              Request Certificate →
            </p>
          </Link>

        </div>

        {/* ================= MY REQUESTS ================= */}
        <div className="
          mt-8
          bg-[#0D0D0D]
          border
          border-[#292929]
          rounded-2xl
          p-6
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
        ">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <span className="
                w-2
                h-2
                rounded-full
                bg-[#D4AF37]
              "></span>

              <p className="
                text-xs
                font-semibold
                tracking-wider
                text-[#D4AF37]
                uppercase
              ">
                Request Tracking
              </p>

            </div>

            <h3 className="
              text-lg
              font-semibold
              text-white
            ">
              View Your Requests
            </h3>

            <p className="
              text-sm
              text-[#888888]
              mt-1
            ">
              Track the status of your Leave and OD applications.
            </p>

          </div>

          <Link
            to="/student/requests"
            className="
              inline-flex
              items-center
              justify-center
              bg-[#D4AF37]
              hover:bg-[#F2D675]
              text-[#050505]
              px-6
              py-3
              rounded-lg
              font-semibold
              text-sm
              transition
              whitespace-nowrap
            "
          >
            View My Requests →
          </Link>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="
        mt-8
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

          <p className="text-xs text-[#666666]">
            College Workflow System
          </p>

          <div className="flex items-center gap-2">

            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#D4AF37]
            "></span>

            <p className="text-xs text-[#777777]">
              Smart College Service Platform
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}

export default StudentDashboard;