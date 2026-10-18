import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  FileText,
  FolderOpen,
  PartyPopper,
  School,
  Upload,
} from "lucide-react";
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

  const moduleIcons = [School, FolderOpen, FileText, PartyPopper, Upload, ClipboardList];
  const prefersReducedMotion = useReducedMotion();
  const easing = [0.22, 1, 0.36, 1];

  return (
    <Sidebar role="student">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@600;700&display=swap');

        #root .premium-theme .student-dashboard {
          --sd-bg: #0A0908;
          --sd-surface: #131110;
          --sd-surface-2: #1C1917;
          --sd-border: rgba(212,175,55,0.14);
          --sd-border-hover: rgba(212,175,55,0.45);
          --sd-text: #F5F1E8;
          --sd-muted: #A39E93;
          --sd-gold: #D4AF37;
          --sd-gold-light: #F0D78C;
          --sd-gold-deep: #9C7A1F;
          --sd-gold-gradient: linear-gradient(135deg, #F0D78C 0%, #D4AF37 50%, #9C7A1F 100%);
          --sd-glow: rgba(212,175,55,0.25);
          --sd-tone-yellow: #E8D5A3;
          --sd-tone-blue: #C8B88A;
          --sd-tone-green: #EDE6D6;
          --sd-tone-peach: #B87333;
          --sd-tone-lavender: #CD7F32;
          --sd-tone-pink: #D9A38F;
          isolation: isolate;
          position: relative;
          width: 100%;
          flex: 1;
          overflow: hidden;
          background:
            radial-gradient(ellipse 68% 38% at 50% -8%, rgba(212,175,55,0.09), transparent 72%),
            radial-gradient(ellipse 38% 60% at 100% 50%, rgba(212,175,55,0.025), transparent 75%),
            radial-gradient(ellipse 38% 60% at 0% 50%, rgba(212,175,55,0.025), transparent 75%),
            var(--sd-bg) !important;
          color: var(--sd-text) !important;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.7;
        }

        #root .premium-theme .student-dashboard,
        #root .premium-theme .student-dashboard * { box-sizing: border-box; }
        #root .premium-theme .student-dashboard a { color: inherit; text-decoration: none; }
        #root .premium-theme .student-dashboard h1,
        #root .premium-theme .student-dashboard h2,
        #root .premium-theme .student-dashboard h3,
        #root .premium-theme .student-dashboard p { margin: 0; }

        #root .premium-theme .student-dashboard .sd-container {
          width: min(100%, 1440px);
          margin: 0 auto;
          padding: 44px clamp(24px, 4.2vw, 68px) 72px;
        }
        #root .premium-theme .student-dashboard .sd-header {
          position: relative;
          isolation: isolate;
          padding: 18px 0 38px;
          border-bottom: 1px solid var(--sd-border);
        }
        #root .premium-theme .student-dashboard .sd-header::before {
          position: absolute;
          z-index: -1;
          top: -92px;
          left: 17%;
          width: min(700px, 72vw);
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(212,175,55,0.10), rgba(212,175,55,0.025) 42%, transparent 72%);
          content: "";
          filter: blur(15px);
          animation: sd-light-drift 25s ease-in-out infinite alternate;
          pointer-events: none;
        }
        #root .premium-theme .student-dashboard .sd-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }
        #root .premium-theme .student-dashboard .sd-intro { min-width: 0; max-width: 760px; }
        #root .premium-theme .student-dashboard .sd-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 13px;
          color: var(--sd-muted);
          font-size: 12px;
        }
        #root .premium-theme .student-dashboard .sd-label,
        #root .premium-theme .student-dashboard .sd-eyebrow {
          color: var(--sd-gold-light) !important;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .12em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        #root .premium-theme .student-dashboard .sd-divider { width: 1px; height: 13px; background: var(--sd-border-hover); }
        #root .premium-theme .student-dashboard .sd-date { color: var(--sd-muted) !important; }
        #root .premium-theme .student-dashboard .sd-title {
          margin-top: 18px !important;
          color: var(--sd-text) !important;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(30px, 4.5vw, 48px);
          font-weight: 600;
          letter-spacing: -.01em;
          line-height: 1.15;
          overflow-wrap: anywhere;
        }
        #root .premium-theme .student-dashboard .sd-name {
          padding: 0 !important;
          background: var(--sd-gold-gradient) !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
          color: transparent !important;
          -webkit-text-fill-color: transparent;
          box-decoration-break: initial;
        }
        #root .premium-theme .student-dashboard .sd-description {
          max-width: 620px;
          margin-top: 16px !important;
          color: var(--sd-muted) !important;
          font-size: 15px;
          line-height: 1.75;
        }
        #root .premium-theme .student-dashboard .sd-details {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 36px;
          margin: 24px 0 0;
        }
        #root .premium-theme .student-dashboard .sd-details dt {
          color: var(--sd-muted) !important;
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        #root .premium-theme .student-dashboard .sd-details dd {
          margin: 4px 0 0;
          color: var(--sd-text) !important;
          font-size: 14px;
          font-weight: 500;
          overflow-wrap: anywhere;
        }
        #root .premium-theme .student-dashboard .sd-actions {
          display: flex;
          width: 226px;
          flex-shrink: 0;
          flex-direction: column;
          gap: 12px;
        }
        #root .premium-theme .student-dashboard .sd-button {
          position: relative;
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          overflow: hidden;
          padding: 12px 16px;
          border: 1px solid var(--sd-border-hover) !important;
          border-radius: 10px !important;
          background: transparent !important;
          color: var(--sd-text) !important;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
          transition: transform 500ms cubic-bezier(.22,1,.36,1) !important;
        }
        #root .premium-theme .student-dashboard .sd-button-primary {
          border-color: transparent !important;
          background: var(--sd-gold-gradient) !important;
          color: #0A0908 !important;
          box-shadow: 0 5px 22px rgba(212,175,55,0.12);
        }
        #root .premium-theme .student-dashboard .sd-button-primary::after {
          position: absolute;
          top: -40%;
          bottom: -40%;
          left: -45%;
          width: 28%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.46), transparent);
          content: "";
          transform: skewX(-20deg);
          transition: transform 700ms cubic-bezier(.22,1,.36,1);
        }
        #root .premium-theme .student-dashboard .sd-button-primary:hover::after { transform: translateX(560%) skewX(-20deg); }
        #root .premium-theme .student-dashboard .sd-button:hover { transform: translateY(-2px); }
        #root .premium-theme .student-dashboard .sd-button-primary:hover { box-shadow: 0 7px 28px rgba(212,175,55,0.25); }

        #root .premium-theme .student-dashboard .sd-section { padding-top: 34px; }
        #root .premium-theme .student-dashboard .sd-section + .sd-section {
          margin-top: 44px;
          border-top: 1px solid var(--sd-border);
          padding-top: 42px;
        }
        #root .premium-theme .student-dashboard .sd-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 22px;
        }
        #root .premium-theme .student-dashboard .sd-eyebrow { margin-bottom: 8px !important; color: var(--sd-muted) !important; }
        #root .premium-theme .student-dashboard .sd-section-title {
          color: var(--sd-text) !important;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(23px, 2.5vw, 29px);
          font-weight: 600;
          letter-spacing: -.01em;
          line-height: 1.3;
        }
        #root .premium-theme .student-dashboard .sd-section-description {
          margin-top: 6px !important;
          color: var(--sd-muted) !important;
          font-size: 14px;
          line-height: 1.7;
        }
        #root .premium-theme .student-dashboard .sd-count {
          flex-shrink: 0;
          padding: 5px 0 5px 16px;
          border: 0 !important;
          border-left: 1px solid var(--sd-border-hover) !important;
          border-radius: 0 !important;
          background: transparent !important;
          color: var(--sd-muted) !important;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: .04em;
        }
        #root .premium-theme .student-dashboard .sd-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        #root .premium-theme .student-dashboard .sd-grid > div { min-width: 0; height: 100%; }
        #root .premium-theme .student-dashboard .sd-card {
          --sd-card-tone: var(--sd-gold);
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          min-width: 0;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--sd-border) !important;
          border-radius: 16px !important;
          background: var(--sd-surface) !important;
          color: var(--sd-text) !important;
          box-shadow: 0 12px 34px rgba(0,0,0,.24) !important;
          transition: transform 600ms cubic-bezier(.22,1,.36,1) !important;
        }
        #root .premium-theme .student-dashboard .sd-card-tone-yellow { --sd-card-tone: var(--sd-tone-yellow); }
        #root .premium-theme .student-dashboard .sd-card-tone-blue { --sd-card-tone: var(--sd-tone-blue); }
        #root .premium-theme .student-dashboard .sd-card-tone-green { --sd-card-tone: var(--sd-tone-green); }
        #root .premium-theme .student-dashboard .sd-card-tone-peach { --sd-card-tone: var(--sd-tone-peach); }
        #root .premium-theme .student-dashboard .sd-card-tone-lavender { --sd-card-tone: var(--sd-tone-lavender); }
        #root .premium-theme .student-dashboard .sd-card-tone-pink { --sd-card-tone: var(--sd-tone-pink); }
        #root .premium-theme .student-dashboard .sd-card::after {
          position: absolute;
          z-index: 2;
          inset: 0;
          border: 1px solid var(--sd-card-tone);
          border-radius: inherit;
          box-shadow: 0 0 28px color-mix(in srgb, var(--sd-card-tone) 13%, transparent);
          content: "";
          opacity: 0;
          pointer-events: none;
          transition: opacity 500ms cubic-bezier(.22,1,.36,1);
        }
        #root .premium-theme .student-dashboard .sd-card:hover {
          border-color: var(--sd-card-tone) !important;
          transform: translateY(-6px);
        }
        #root .premium-theme .student-dashboard .sd-card:hover::after { opacity: 1; }
        #root .premium-theme .student-dashboard .sd-card-top {
          position: relative;
          display: flex;
          height: 76px;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          padding: 17px 20px;
          border: 0 !important;
          border-bottom: 1px solid var(--sd-border) !important;
          background: var(--sd-surface) !important;
        }
        #root .premium-theme .student-dashboard .sd-card-top::before {
          position: absolute;
          inset: 0 0 auto;
          height: 2px;
          background: var(--sd-card-tone);
          content: "";
          opacity: .75;
        }
        #root .premium-theme .student-dashboard .sd-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--sd-card-tone, var(--sd-gold)) 22%, transparent) !important;
          border-radius: 12px !important;
          background: color-mix(in srgb, var(--sd-card-tone, var(--sd-gold)) 10%, transparent) !important;
          color: var(--sd-card-tone, var(--sd-gold-light)) !important;
        }
        #root .premium-theme .student-dashboard .sd-number {
          color: var(--sd-muted) !important;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: .02em;
        }
        #root .premium-theme .student-dashboard .sd-card-body { display: flex; flex: 1; flex-direction: column; padding: 19px 20px 0; }
        #root .premium-theme .student-dashboard .sd-card-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; }
        #root .premium-theme .student-dashboard .sd-card-title {
          color: var(--sd-text) !important;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
        }
        #root .premium-theme .student-dashboard .sd-badge {
          padding: 3px 8px;
          border: 1px solid var(--sd-border) !important;
          border-radius: 999px !important;
          background: transparent !important;
          color: var(--sd-muted) !important;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .12em;
          line-height: 1.4;
          text-transform: uppercase;
        }
        #root .premium-theme .student-dashboard .sd-card-description {
          flex: 1;
          margin: 12px 0 18px !important;
          color: var(--sd-muted) !important;
          font-size: 14px;
          line-height: 1.7;
        }
        #root .premium-theme .student-dashboard .sd-card-action {
          display: flex;
          min-height: 50px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid var(--sd-border) !important;
          color: var(--sd-gold-light) !important;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .01em;
        }
        #root .premium-theme .student-dashboard .sd-arrow { display: inline-flex; color: var(--sd-gold); transition: transform 500ms cubic-bezier(.22,1,.36,1); }
        #root .premium-theme .student-dashboard .sd-card:hover .sd-arrow { transform: translate(3px, -3px); }
        #root .premium-theme .student-dashboard .sd-tracking-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        #root .premium-theme .student-dashboard .sd-tracking-card {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          gap: 17px;
          padding: 22px;
          border: 1px solid var(--sd-border) !important;
          border-radius: 16px !important;
          background: color-mix(in srgb, var(--sd-surface) 76%, transparent) !important;
          color: var(--sd-text) !important;
          box-shadow: 0 12px 34px rgba(0,0,0,.18) !important;
          backdrop-filter: blur(12px);
        }
        #root .premium-theme .student-dashboard .sd-tracking-icon { flex-shrink: 0; }
        #root .premium-theme .student-dashboard .sd-tracking-title { color: var(--sd-text) !important; font-size: 16px; font-weight: 500; line-height: 1.45; }
        #root .premium-theme .student-dashboard .sd-tracking-copy { margin-top: 7px !important; color: var(--sd-muted) !important; font-size: 14px; line-height: 1.7; }
        #root .premium-theme .student-dashboard .sd-tracking-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 13px;
          color: var(--sd-gold-light) !important;
          font-size: 12px;
          font-weight: 500;
        }
        #root .premium-theme .student-dashboard .sd-tracking-link::after {
          position: absolute;
          right: 18px;
          bottom: -3px;
          left: 0;
          height: 1px;
          background: var(--sd-gold);
          content: "";
          opacity: .8;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 500ms cubic-bezier(.22,1,.36,1);
        }
        #root .premium-theme .student-dashboard .sd-tracking-link:hover::after { transform: scaleX(1); }
        #root .premium-theme .student-dashboard a:focus-visible { outline: 2px solid var(--sd-gold) !important; outline-offset: 4px; }
        #root .premium-theme .student-dashboard .sd-button:focus-visible { outline-offset: 4px; }

        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-sidebar,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-sidebar-brand,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-logout-section,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-mobile-bar {
          border-color: rgba(212,175,55,0.14) !important;
          background: #131110 !important;
          color: #F5F1E8 !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-brand-name,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-user-name { color: #F5F1E8 !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-brand-subtitle,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-label,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-user-meta,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-logout-button { color: #A39E93 !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-logo {
          border: 1px solid rgba(212,175,55,0.36) !important;
          background: linear-gradient(135deg, #F0D78C, #D4AF37 55%, #9C7A1F) !important;
          color: #0A0908 !important;
          box-shadow: 0 0 22px rgba(212,175,55,0.12) !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-avatar {
          border-color: rgba(212,175,55,0.25) !important;
          background: #1C1917 !important;
          color: #F0D78C !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-user-card {
          border-color: rgba(212,175,55,0.14) !important;
          background: #1C1917 !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-link { color: #A39E93 !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-link:hover,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-link-active,
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-link-active:hover {
          border-color: rgba(212,175,55,0.24) !important;
          background: rgba(212,175,55,0.08) !important;
          color: #F0D78C !important;
          box-shadow: inset 2px 0 0 #D4AF37 !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-icon { color: #A39E93 !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-nav-link-active .cc-nav-icon { color: #F0D78C !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) .cc-logout-button {
          border-color: rgba(212,175,55,0.14) !important;
          border-radius: 9px !important;
          background: #1C1917 !important;
        }
        #root .premium-theme:has(.student-dashboard) .theme-switcher { display: none !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) footer {
          border-color: rgba(212,175,55,0.14) !important;
          background: #0A0908 !important;
          color: #A39E93 !important;
        }
        #root .premium-theme .cc-layout:has(.student-dashboard) footer [class*="text-gray-700"] { color: #F5F1E8 !important; }
        #root .premium-theme .cc-layout:has(.student-dashboard) footer [class*="text-gray-300"],
        #root .premium-theme .cc-layout:has(.student-dashboard) footer [class*="text-gray-500"] { color: #A39E93 !important; }
        @keyframes sd-light-drift {
          from { opacity: .62; transform: translate3d(-2%, -2%, 0) scale(.96); }
          to { opacity: .9; transform: translate3d(3%, 3%, 0) scale(1.04); }
        }
        @media (max-width: 1100px) {
          #root .premium-theme .student-dashboard .sd-header-row { align-items: flex-start; flex-direction: column; gap: 26px; }
          #root .premium-theme .student-dashboard .sd-actions { width: auto; flex-direction: row; flex-wrap: wrap; }
          #root .premium-theme .student-dashboard .sd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          #root .premium-theme .student-dashboard .sd-container { padding: 30px 18px 48px; }
          #root .premium-theme .student-dashboard .sd-header { padding-top: 8px; padding-bottom: 28px; }
          #root .premium-theme .student-dashboard .sd-actions { width: 100%; }
          #root .premium-theme .student-dashboard .sd-actions .sd-button { flex: 1 1 180px; }
          #root .premium-theme .student-dashboard .sd-section + .sd-section { margin-top: 32px; padding-top: 32px; }
          #root .premium-theme .student-dashboard .sd-section-header { align-items: flex-start; flex-direction: column; gap: 10px; }
          #root .premium-theme .student-dashboard .sd-grid,
          #root .premium-theme .student-dashboard .sd-tracking-grid { grid-template-columns: 1fr; }
          #root .premium-theme .student-dashboard .sd-card-top { height: 68px; }
          #root .premium-theme .student-dashboard .sd-tracking-card { padding: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          #root .premium-theme .student-dashboard *,
          #root .premium-theme .student-dashboard *::before,
          #root .premium-theme .student-dashboard *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <main className="student-dashboard">
        <div className="sd-container">
          <motion.header
            className="sd-header"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, ease: easing }}
          >
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
                  Track requests <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                </Link>
                <Link to="/student/leave-od" className="sd-button">
                  Apply for Leave / OD <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </motion.header>

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
              {modules.map((item, index) => {
                const Icon = moduleIcons[index];

                return (
                  <motion.div
                    key={item.link}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : index * 0.09, ease: easing }}
                  >
                    <Link to={item.link} className={`sd-card sd-card-tone-${item.tone}`}>
                      <div className={`sd-card-top sd-tone-${item.tone}`}>
                        <span aria-hidden="true" className="sd-icon">
                          <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                        </span>
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
                          <span aria-hidden="true" className="sd-arrow">
                            <ArrowUpRight size={16} strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
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
              <motion.article
                className="sd-tracking-card"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: easing }}
              >
                <span aria-hidden="true" className="sd-icon sd-tracking-icon sd-tone-green">
                  <FileText aria-hidden="true" size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="sd-eyebrow">Leave &amp; OD</p>
                  <h3 className="sd-tracking-title">Request history</h3>
                  <p className="sd-tracking-copy">
                    Review your submitted requests and check their latest approval status.
                  </p>
                  <Link to="/student/requests" className="sd-tracking-link">
                    View requests <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.article>

              <motion.article
                className="sd-tracking-card"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.09, ease: easing }}
              >
                <span aria-hidden="true" className="sd-icon sd-tracking-icon sd-tone-blue">
                  <FolderOpen aria-hidden="true" size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="sd-eyebrow">Grievance tracker</p>
                  <h3 className="sd-tracking-title">My class issues</h3>
                  <p className="sd-tracking-copy">
                    Follow the progress of your reported classroom and maintenance issues.
                  </p>
                  <Link to="/student/my-class-issues" className="sd-tracking-link">
                    View issues <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.article>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </Sidebar>
  );
}

export default StudentDashboard;
