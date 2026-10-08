import { useState } from "react";
import { Link } from "react-router-dom";

function ClassIssue() {
  const [issueType, setIssueType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100">
        <nav className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>
            <p className="text-xs text-slate-500">Student Portal</p>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              Issue Submitted Successfully
            </h2>

            <p className="text-slate-500 mt-2">
              Your class issue has been submitted to the responsible authority.
            </p>

            <div className="mt-6 bg-slate-50 rounded-xl p-5 text-left">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-slate-500">Request ID</span>
                <span className="font-semibold text-slate-800">
                  #CI-001
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className="text-sm font-semibold text-yellow-600">
                  Pending
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-center">
              <Link
                to="/student"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Back to Dashboard
              </Link>

              <button
                onClick={() => setSubmitted(false)}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Report Another Issue
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              College Workflow
            </h1>
            <p className="text-xs text-slate-500">Student Portal</p>
          </div>

          <Link
            to="/student"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-slate-800">
            Report Class Issue
          </h2>
          <p className="text-slate-500 mt-2">
            Report a problem related to your classroom or class activities.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Issue Type
            </label>

            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select issue type</option>
              <option value="Classroom">Classroom</option>
              <option value="Faculty">Faculty / Class Handling</option>
              <option value="Timetable">Timetable</option>
              <option value="Lab">Lab / Equipment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Issue Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Projector not working"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Classroom / Lab number"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue clearly..."
              rows="5"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Issue
          </button>
        </form>
      </main>
    </div>
  );
}

export default ClassIssue;