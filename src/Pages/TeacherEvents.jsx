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
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white border-b px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Event Management
          </h1>
          <p className="text-slate-500">
            Create and publish college events
          </p>
        </div>

        <Link
          to="/teacher"
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Create New Event
          </h2>

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700">
              {message}
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Venue
              </label>

              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Example: Seminar Hall"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows="5"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Poster
              </label>

              <input
                id="poster"
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {preview && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  Poster Preview
                </p>

                <img
                  src={preview}
                  alt="Event poster preview"
                  className="w-full max-w-md h-72 object-cover rounded-xl border"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Publish Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherEvents;