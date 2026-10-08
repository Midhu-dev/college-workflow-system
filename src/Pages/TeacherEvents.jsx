import { useState } from "react";
import { Link } from "react-router-dom";

function TeacherEvents() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handlePosterChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPoster(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    if (!title || !date || !time || !venue || !description || !poster) {
      setMessage("Please fill all fields and upload a poster.");
      return;
    }

    const existingEvents =
      JSON.parse(localStorage.getItem("collegeEvents")) || [];

    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      venue,
      description,
      poster: preview,
    };

    localStorage.setItem(
      "collegeEvents",
      JSON.stringify([...existingEvents, newEvent])
    );

    setTitle("");
    setDate("");
    setTime("");
    setVenue("");
    setDescription("");
    setPoster(null);
    setPreview("");

    document.getElementById("poster").value = "";

    setMessage("Event published successfully!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-[#050505] border-b border-[#292929]">
        <div className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">

          <div>

            <div className="flex items-center gap-2 mb-1">

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
                Faculty Portal
              </p>

            </div>

            <h1 className="
              text-2xl
              font-bold
              text-white
            ">
              Event Management
            </h1>

            <p className="
              text-[#B8B8B8]
              text-sm
              mt-1
            ">
              Create and publish college events
            </p>

          </div>

          <Link
            to="/teacher"
            className="
              inline-flex
              items-center
              justify-center
              px-4
              py-2.5
              rounded-lg
              bg-[#0D0D0D]
              border
              border-[#333333]
              text-[#B8B8B8]
              text-sm
              font-semibold
              hover:border-[#D4AF37]
              hover:text-[#D4AF37]
              transition
            "
          >
            Back to Dashboard
          </Link>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="
        max-w-5xl
        mx-auto
        w-full
        px-6
        sm:px-8
        py-10
        flex-1
      ">

        {/* FORM CARD */}
        <div className="
          bg-[#0D0D0D]
          border
          border-[#292929]
          rounded-2xl
          shadow-xl
          p-6
          sm:p-8
        ">

          {/* CARD HEADER */}
          <div className="
            flex
            items-center
            gap-4
            mb-7
            pb-6
            border-b
            border-[#292929]
          ">

            <div className="
              w-12
              h-12
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
              📅
            </div>

            <div>

              <h2 className="
                text-xl
                font-bold
                text-white
              ">
                Create New Event
              </h2>

              <p className="
                text-sm
                text-[#888888]
                mt-1
              ">
                Add event details and publish it for students.
              </p>

            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="
              mb-6
              p-4
              rounded-xl
              bg-[#17130A]
              border
              border-[#3D3318]
              text-[#D4AF37]
              text-sm
              font-medium
            ">
              <div className="flex items-center gap-2">

                <span className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#D4AF37]
                "></span>

                <span>
                  {message}
                </span>

              </div>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handlePublish}
            className="space-y-6"
          >

            {/* EVENT TITLE */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#D0D0D0]
                mb-2
              ">
                Event Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                className="
                  w-full
                  bg-[#080808]
                  border
                  border-[#333333]
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  placeholder:text-[#666666]
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  transition
                "
              />

            </div>

            {/* DATE + TIME */}
            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              {/* DATE */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-[#D0D0D0]
                  mb-2
                ">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="
                    w-full
                    bg-[#080808]
                    border
                    border-[#333333]
                    rounded-lg
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-[#D4AF37]
                    focus:ring-1
                    focus:ring-[#D4AF37]
                    transition
                  "
                />

              </div>

              {/* TIME */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-[#D0D0D0]
                  mb-2
                ">
                  Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="
                    w-full
                    bg-[#080808]
                    border
                    border-[#333333]
                    rounded-lg
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-[#D4AF37]
                    focus:ring-1
                    focus:ring-[#D4AF37]
                    transition
                  "
                />

              </div>

            </div>

            {/* VENUE */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#D0D0D0]
                mb-2
              ">
                Venue
              </label>

              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Example: Seminar Hall"
                className="
                  w-full
                  bg-[#080808]
                  border
                  border-[#333333]
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  placeholder:text-[#666666]
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  transition
                "
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#D0D0D0]
                mb-2
              ">
                Event Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows="5"
                className="
                  w-full
                  bg-[#080808]
                  border
                  border-[#333333]
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  placeholder:text-[#666666]
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  resize-none
                  transition
                "
              />

            </div>

            {/* POSTER UPLOAD */}
            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#D0D0D0]
                mb-2
              ">
                Event Poster
              </label>

              <div className="
                bg-[#080808]
                border
                border-dashed
                border-[#3A3A3A]
                rounded-xl
                p-5
                hover:border-[#D4AF37]
                transition
              ">

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  gap-4
                ">

                  <div className="
                    w-11
                    h-11
                    shrink-0
                    rounded-lg
                    bg-[#17130A]
                    border
                    border-[#3D3318]
                    flex
                    items-center
                    justify-center
                    text-lg
                  ">
                    🖼️
                  </div>

                  <div className="flex-1">

                    <p className="
                      text-sm
                      font-medium
                      text-[#D0D0D0]
                    ">
                      Upload event poster
                    </p>

                    <p className="
                      text-xs
                      text-[#666666]
                      mt-1
                    ">
                      Select an image to use as the event poster.
                    </p>

                  </div>

                  <input
                    id="poster"
                    type="file"
                    accept="image/*"
                    onChange={handlePosterChange}
                    className="
                      w-full
                      sm:w-auto
                      text-sm
                      text-[#B8B8B8]
                      file:mr-4
                      file:py-2
                      file:px-4
                      file:rounded-lg
                      file:border-0
                      file:bg-[#D4AF37]
                      file:text-[#050505]
                      file:font-semibold
                      file:cursor-pointer
                      hover:file:bg-[#F2D675]
                    "
                  />

                </div>

              </div>

            </div>

            {/* POSTER PREVIEW */}
            {preview && (
              <div>

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-3
                ">

                  <p className="
                    text-sm
                    font-semibold
                    text-[#D0D0D0]
                  ">
                    Poster Preview
                  </p>

                  <span className="
                    text-xs
                    font-medium
                    text-[#D4AF37]
                  ">
                    Ready to publish
                  </span>

                </div>

                <div className="
                  bg-[#080808]
                  border
                  border-[#292929]
                  rounded-xl
                  p-3
                  inline-block
                ">

                  <img
                    src={preview}
                    alt="Event poster preview"
                    className="
                      w-full
                      max-w-md
                      h-72
                      object-cover
                      rounded-lg
                      border
                      border-[#292929]
                    "
                  />

                </div>

              </div>
            )}

            {/* PUBLISH BUTTON */}
            <div className="
              pt-2
              border-t
              border-[#292929]
            ">

              <button
                type="submit"
                className="
                  w-full
                  bg-[#D4AF37]
                  text-[#050505]
                  py-3.5
                  rounded-lg
                  font-semibold
                  hover:bg-[#F2D675]
                  transition
                  shadow-[0_0_20px_rgba(212,175,55,0.08)]
                "
              >
                Publish Event
              </button>

            </div>

          </form>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="
        bg-[#080808]
        border-t
        border-[#292929]
      ">

        <div className="
          max-w-5xl
          mx-auto
          px-6
          sm:px-8
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
              Faculty Services
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default TeacherEvents;