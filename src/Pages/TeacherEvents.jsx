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

    // Validate that the selected file is an image.
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      e.target.value = "";
      setPoster(null);
      setPreview("");
      return;
    }

    // Limit image size to 5 MB.
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

    if (!title.trim() || !date || !time || !venue.trim() || !description.trim()) {
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

      // Send the image and event fields as multipart/form-data.
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

      setMessage("Event successfully published to the student portal!");

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

  return (
    <Sidebar role="teacher">
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
        <PageHeader
          badge="Faculty Portal"
          title="Event Management"
          description="Schedule, configure, and publish campus events, symposiums, guest lectures, and student competitions."
          backTo="/teacher"
        />

        {/* ALERTS */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-[#17130A] border border-[#3D3318] text-[#D4AF37] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
            <span className="leading-relaxed">{message}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#1C0D0D] border border-[#3D1B1B] text-[#F87171] text-xs flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] mt-1 shrink-0" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* CREATE EVENT FORM */}
        <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
            <div className="w-12 h-12 rounded-xl bg-[#17130A] border border-[#3D3318] flex items-center justify-center text-2xl shrink-0">
              📅
            </div>

            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Create & Publish Event
              </h2>

              <p className="text-xs text-[#888888] mt-0.5">
                Published events will instantly display across all student dashboards.
              </p>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            {/* EVENT TITLE */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Event Title <span className="text-[#D4AF37]">*</span>
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. National Level Technical Symposium 2026"
                disabled={loading}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                required
              />
            </div>

            {/* DATE, TIME AND VENUE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                  Event Date <span className="text-[#D4AF37]">*</span>
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onClick={openDatePicker}
                  onFocus={openDatePicker}
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-[#080808] text-white border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition cursor-pointer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                  Event Time <span className="text-[#D4AF37]">*</span>
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onClick={openTimePicker}
                  onFocus={openTimePicker}
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-[#080808] text-white border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition cursor-pointer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                  Venue / Location <span className="text-[#D4AF37]">*</span>
                </label>

                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Auditorium / Main Seminar Hall"
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2">
                Event Description & Registration Guidelines{" "}
                <span className="text-[#D4AF37]">*</span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Include agenda, target audience departments, team sizes, and registration deadlines..."
                disabled={loading}
                className="w-full px-4 py-3 bg-[#080808] text-white placeholder:text-[#555555] border border-[#292929] rounded-xl text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none leading-relaxed"
                required
              />
            </div>

            {/* POSTER UPLOAD */}
            <div>
              <label
                htmlFor="poster"
                className="block text-xs font-semibold text-[#CCCCCC] uppercase tracking-wider mb-2"
              >
                Event Poster / Banner Image (Optional)
              </label>

              <div className="bg-[#080808] border border-[#292929] hover:border-[#383838] rounded-xl p-4 transition">
                <input
                  id="poster"
                  name="poster"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  disabled={loading}
                  onChange={handlePosterChange}
                  className="w-full text-xs text-[#888888] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#1A160A] file:text-[#D4AF37] file:font-bold file:cursor-pointer hover:file:bg-[#241F0E] cursor-pointer"
                />

                <p className="text-[11px] text-[#777777] mt-2">
                  Supported: PNG, JPG, WEBP or GIF. Maximum size: 5 MB.
                </p>

                {poster && (
                  <p className="text-[11px] text-[#CCCCCC] mt-2 truncate">
                    Selected file:{" "}
                    <strong className="text-white">{poster.name}</strong>
                  </p>
                )}

                {preview && (
                  <div className="mt-4 pt-3 border-t border-[#1C1C1C]">
                    <p className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider mb-2">
                      Poster Preview
                    </p>

                    <img
                      src={preview}
                      alt="Selected event poster preview"
                      className="w-full max-w-sm h-48 object-cover rounded-xl border border-[#292929]"
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
                      className="mt-3 text-xs text-[#F87171] hover:text-red-300 transition"
                    >
                      Remove poster
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] py-3 rounded-xl text-sm font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                  <span>Publishing Event...</span>
                </>
              ) : (
                "Publish Event to Campus"
              )}
            </button>
          </form>
        </div>

        {/* PUBLISHED EVENTS */}
        <div className="bg-[#0D0D0D] border border-[#292929] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1F1F1F]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Published Campus Events
              </h2>

              <p className="text-xs text-[#888888] mt-0.5">
                Active activities currently visible to students
              </p>
            </div>

            <span className="text-xs font-semibold text-[#D4AF37] bg-[#17130A] border border-[#3D3318] px-3 py-1 rounded-full">
              {events.length} Published
            </span>
          </div>

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
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#080808] border border-[#222222] hover:border-[#383838] transition rounded-xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-[#888888]">
                        <span>
                          📅{" "}
                          {event.event_date
                            ? new Date(
                                event.event_date
                              ).toLocaleDateString()
                            : "TBA"}
                        </span>

                        <span>
                          🕐{" "}
                          {event.event_time
                            ? String(event.event_time).slice(0, 5)
                            : "TBA"}
                        </span>

                        <span>📍 {event.location || "Main Campus"}</span>
                      </div>

                      {event.poster_url && (
                        <img
                          src={
                            event.poster_url.startsWith("http")
                              ? event.poster_url
                              : `http://localhost:5000${event.poster_url}`
                          }
                          alt={`${event.title} poster`}
                          className="mt-4 w-full max-w-xs h-40 object-cover rounded-lg border border-[#292929]"
                        />
                      )}

                      {event.description && (
                        <p className="text-xs text-[#CCCCCC] mt-3 leading-relaxed bg-[#0D0D0D] p-3 rounded-lg border border-[#1A1A1A]">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default TeacherEvents;