import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function StudentDashboard() {
  let user = null;

  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch {
    user = null;
  }

  const studentName = user?.name || user?.username || "Student";
  const studentId = user?.userId || user?.studentId || "";
  const department = user?.department || "";

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const modules = [
    {
      title: "Class Issue",
      description: "Report maintenance, timetable, or classroom issues directly to faculty.",
      link: "/student/class-issue",
      actionText: "Report an issue",
      icon: "🏫",
      badge: "Grievance",
      number: "01",
      tone: "yellow",
    },
    {
      title: "My Class Issues",
      description: "Track status updates and faculty resolution comments on your reported issues.",
      link: "/student/my-class-issues",
      actionText: "View issue history",
      icon: "📂",
      badge: "History",
      number: "02",
      tone: "blue",
    },
    {
      title: "Leave / OD",
      description: "Apply for official leave or on-duty permissions and track approval status.",
      link: "/student/leave-od",
      actionText: "Create a request",
      icon: "📝",
      badge: "Attendance",
      number: "03",
      tone: "green",
    },
    {
      title: "Campus Events",
      description: "Discover upcoming workshops, hackathons, and symposiums on campus.",
      link: "/student/events",
      actionText: "Explore events",
      icon: "🎉",
      badge: "Activities",
      number: "04",
      tone: "peach",
    },
    {
      title: "Certificate Upload",
      description: "Submit course completions, achievements, and external certificates for verification.",
      link: "/student/certificate-upload",
      actionText: "Upload a certificate",
      icon: "📤",
      badge: "Verification",
      number: "05",
      tone: "lavender",
    },
    {
      title: "Certificate Request",
      description: "Request bonafide, conduct, or other official institutional certificates.",
      link: "/student/certificate-request",
      actionText: "Request a certificate",
      icon: "📋",
      badge: "Official",
      number: "06",
      tone: "pink",
    },
  ];

  return (
    <Sidebar role="student">
      <style>{`
        .student-dashboard {
          --sd-background: oklch(1 0 0);
          --sd-foreground: oklch(0.2 0.005 160);
          --sd-muted: oklch(0.48 0.008 160);
          --sd-border: oklch(0.86 0.005 160);
          --sd-yellow: oklch(0.94 0.11 100);
          --sd-blue: oklch(0.91 0.054 235);
          --sd-green: oklch(0.91 0.075 160);
          --sd-peach: oklch(0.92 0.066 55);
          --sd-lavender: oklch(0.91 0.048 300);
          --sd-pink: oklch(0.92 0.053 355);
          --sd-shadow: 3px 3px 0 var(--sd-foreground);
          width: 100%;
          flex: 1;
          background: var(--sd-background);
          color: var(--sd-foreground);
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0;
        }
        .student-dashboard * { box-sizing: border-box; }
        .student-dashboard a { color: inherit; text-decoration: none; }
        .student-dashboard h1,
        .student-dashboard h2,
        .student-dashboard h3,
        .student-dashboard p { margin: 0; }
        .sd-container { max-width: 1280px; margin: auto; padding: 34px 36px; }
        .sd-header { border-bottom: 1px solid var(--sd-border); padding-bottom: 28px; }
        .sd-header-row { display: flex; align-items: center; justify-content: space-between; gap: 28px; }
        .sd-intro { min-width: 0; max-width: 640px; }
        .sd-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 11px; }
        .sd-label { font-weight: 700; }
        .sd-date { color: var(--sd-muted); }
        .sd-divider { height: 11px; width: 1px; background: var(--sd-border); }
        .sd-title { margin-top: 16px !important; font-size: 30px; line-height: 1.35; font-weight: 700; overflow-wrap: anywhere; }
        .sd-name { background: var(--sd-yellow); padding: 0 5px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .sd-description { max-width: 550px; margin-top: 13px !important; color: var(--sd-muted); font-size: 13px; line-height: 1.9; }
        .sd-details { display: flex; flex-wrap: wrap; gap: 16px 32px; margin: 20px 0 0; }
        .sd-details dt { font-size: 10px; color: var(--sd-muted); }
        .sd-details dd { margin: 5px 0 0; font-size: 12px; font-weight: 600; overflow-wrap: anywhere; }
        .sd-actions { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; width: 210px; }
        .sd-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 15px; min-height: 40px; border: 1.5px solid var(--sd-foreground); border-radius: 5px; padding: 10px 14px; background: var(--sd-background); box-shadow: 2px 2px 0 var(--sd-foreground); font-size: 12px; font-weight: 600; transition: transform 160ms ease, box-shadow 160ms ease; }
        .sd-button-primary { background: var(--sd-yellow); }
        .sd-button:hover { transform: translate(-1px, -1px); box-shadow: var(--sd-shadow); }
        .sd-section { padding-top: 30px; }
        .sd-section-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 15px; margin-bottom: 19px; }
        .sd-eyebrow { color: var(--sd-muted); font-size: 10px; font-weight: 600; margin-bottom: 7px !important; }
        .sd-section-title { font-size: 20px; font-weight: 700; line-height: 1.4; }
        .sd-section-description { margin-top: 5px !important; color: var(--sd-muted); font-size: 12px; line-height: 1.8; }
        .sd-count { flex-shrink: 0; color: var(--sd-muted); border: 1px solid var(--sd-border); border-radius: 4px; padding: 5px 8px; font-size: 10px; }
        .sd-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 19px; }
        .sd-card { display: flex; flex-direction: column; min-width: 0; border: 1.5px solid var(--sd-foreground); border-radius: 6px; background: var(--sd-background); box-shadow: var(--sd-shadow); overflow: hidden; transition: transform 160ms ease, box-shadow 160ms ease; }
        .sd-card:hover { transform: translate(-1px, -2px); box-shadow: 4px 5px 0 var(--sd-foreground); }
        .sd-card-top { display: flex; align-items: center; justify-content: space-between; height: 64px; padding: 13px 18px; border-bottom: 1.5px solid var(--sd-foreground); }
        .sd-tone-yellow { background: var(--sd-yellow); }
        .sd-tone-blue { background: var(--sd-blue); }
        .sd-tone-green { background: var(--sd-green); }
        .sd-tone-peach { background: var(--sd-peach); }
        .sd-tone-lavender { background: var(--sd-lavender); }
        .sd-tone-pink { background: var(--sd-pink); }
        .sd-icon { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--sd-foreground); border-radius: 5px; font-size: 18px; }
        .sd-number { font-size: 11px; font-family: monospace; color: var(--sd-muted); }
        .sd-card-body { display: flex; flex: 1; flex-direction: column; padding: 17px 18px 0; }
        .sd-card-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; }
        .sd-card-title { font-size: 14px; font-weight: 700; line-height: 1.5; }
        .sd-badge { border: 1px solid var(--sd-border); border-radius: 3px; padding: 2px 5px; font-size: 9px; color: var(--sd-muted); }
        .sd-card-description { flex: 1; margin-top: 9px !important; margin-bottom: 16px !important; color: var(--sd-muted); font-size: 12px; line-height: 1.85; }
        .sd-card-action { display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid var(--sd-border); min-height: 43px; font-size: 11px; font-weight: 600; }
        .sd-arrow { font-size: 16px; transition: transform 160ms ease; }
        .sd-card:hover .sd-arrow { transform: translate(2px, -2px); }
        .sd-tracking-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 19px; }
        .sd-tracking-card { display: flex; align-items: flex-start; gap: 14px; border: 1.5px solid var(--sd-foreground); border-radius: 6px; box-shadow: 2px 2px 0 var(--sd-foreground); padding: 20px; }
        .sd-tracking-icon { flex-shrink: 0; }
        .sd-tracking-title { font-size: 14px; font-weight: 700; }
        .sd-tracking-copy { margin-top: 7px !important; color: var(--sd-muted); font-size: 12px; line-height: 1.85; }
        .sd-tracking-link { display: inline-flex; align-items: center; gap: 12px; margin-top: 13px; font-size: 11px; font-weight: 600; }
        .sd-tracking-link:hover { text-decoration: underline; text-underline-offset: 4px; }
        .student-dashboard a:focus-visible { outline: 2px solid var(--sd-foreground); outline-offset: 5px; }
        @media (max-width: 1100px) {
          .sd-header-row { align-items: flex-start; flex-direction: column; gap: 20px; }
          .sd-actions { flex-direction: row; width: auto; flex-wrap: wrap; }
          .sd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .sd-container { padding: 25px 18px 30px; }
          .sd-title { font-size: 25px; }
          .sd-section-title { font-size: 18px; }
          .sd-grid, .sd-tracking-grid { grid-template-columns: 1fr; }
          .sd-section-header { align-items: flex-start; flex-direction: column; gap: 10px; }
          .sd-actions { width: 100%; }
          .sd-actions .sd-button { flex: 1 1 180px; }
          .sd-tracking-card { padding: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .student-dashboard * { transition: none !important; }
        }
      `}</style>

      <main className="student-dashboard">
        <div className="sd-container">
          <header className="sd-header">
            <div className="sd-header-row">
              <div className="sd-intro">
                <div className="sd-meta">
                  <span className="sd-label">Student Portal</span>
                  <span aria-hidden="true" className="sd-divider" />
                  <span className="sd-date">{todayFormatted}</span>
                </div>

                <h1 className="sd-title">
                  Welcome back, <span className="sd-name">{studentName}</span>
                </h1>

                <p className="sd-description">
                  Your campus, your services, all in one place. Manage academic
                  requests, explore events, and stay updated on your submissions.
                </p>

                {(studentId || department) && (
                  <dl className="sd-details">
                    {studentId && (
                      <div>
                        <dt>Registration number</dt>
                        <dd>{studentId}</dd>
                      </div>
                    )}
                    {department && (
                      <div>
                        <dt>Department</dt>
                        <dd>{department}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              <div className="sd-actions">
                <Link to="/student/requests" className="sd-button sd-button-primary">
                  Track requests <span aria-hidden="true">→</span>
                </Link>
                <Link to="/student/leave-od" className="sd-button">
                  Apply for Leave / OD <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </header>

          <section className="sd-section" aria-labelledby="services-heading">
            <div className="sd-section-header">
              <div>
                <p className="sd-eyebrow">Your workspace</p>
                <h2 id="services-heading" className="sd-section-title">Student Services</h2>
                <p className="sd-section-description">
                  Everything you need to manage your campus activities.
                </p>
              </div>
              <span className="sd-count">{modules.length} available services</span>
            </div>

            <div className="sd-grid" aria-label="Student services">
              {modules.map((item) => (
                <Link key={item.link} to={item.link} className="sd-card">
                  <div className={`sd-card-top sd-tone-${item.tone}`}>
                    <span aria-hidden="true" className="sd-icon">{item.icon}</span>
                    <span className="sd-number">{item.number} /</span>
                  </div>
                  <div className="sd-card-body">
                    <div className="sd-card-heading">
                      <h3 className="sd-card-title">{item.title}</h3>
                      <span className="sd-badge">{item.badge}</span>
                    </div>
                    <p className="sd-card-description">{item.description}</p>
                    <div className="sd-card-action">
                      <span>{item.actionText}</span>
                      <span aria-hidden="true" className="sd-arrow">↗</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="sd-section" aria-labelledby="tracking-heading">
            <div className="sd-section-header">
              <div>
                <p className="sd-eyebrow">Stay informed</p>
                <h2 id="tracking-heading" className="sd-section-title">Request tracking</h2>
                <p className="sd-section-description">
                  Quickly access your submitted requests and reported issues.
                </p>
              </div>
            </div>

            <div className="sd-tracking-grid">
              <article className="sd-tracking-card">
                <span aria-hidden="true" className="sd-icon sd-tracking-icon sd-tone-green">📝</span>
                <div>
                  <p className="sd-eyebrow">Leave & OD</p>
                  <h3 className="sd-tracking-title">Request history</h3>
                  <p className="sd-tracking-copy">
                    Review your submitted requests and check their latest approval status.
                  </p>
                  <Link to="/student/requests" className="sd-tracking-link">
                    View requests <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              <article className="sd-tracking-card">
                <span aria-hidden="true" className="sd-icon sd-tracking-icon sd-tone-blue">📂</span>
                <div>
                  <p className="sd-eyebrow">Grievance tracker</p>
                  <h3 className="sd-tracking-title">My class issues</h3>
                  <p className="sd-tracking-copy">
                    Follow the progress of your reported classroom and maintenance issues.
                  </p>
                  <Link to="/student/my-class-issues" className="sd-tracking-link">
                    View issues <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default StudentDashboard;
