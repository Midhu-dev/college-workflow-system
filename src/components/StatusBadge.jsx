export default function StatusBadge({ status, className = "" }) {
  const norm = String(status || "").trim().toUpperCase();

  let styles;
  let dotColor;

  switch (norm) {
    case "PENDING":
      styles = "bg-[#17130A] text-[#F2D675] border-[#3D3318]";
      dotColor = "bg-[#D4AF37]";
      break;

    case "APPROVED":
    case "RESOLVED":
    case "VERIFIED":
    case "COMPLETED":
    case "PRESENT":
      styles = "bg-[#0B1B10] text-[#4ADE80] border-[#1B3B24]";
      dotColor = "bg-[#4ADE80]";
      break;

    case "REJECTED":
    case "ABSENT":
      styles = "bg-[#1C0D0D] text-[#F87171] border-[#3D1B1B]";
      dotColor = "bg-[#F87171]";
      break;

    case "OD":
      styles = "bg-[#0C1824] text-[#60A5FA] border-[#18334D]";
      dotColor = "bg-[#60A5FA]";
      break;

    case "LEAVE":
      styles = "bg-[#1C1508] text-[#FBBF24] border-[#3B2C10]";
      dotColor = "bg-[#FBBF24]";
      break;

    default:
      styles = "bg-[#141414] text-[#B8B8B8] border-[#292929]";
      dotColor = "bg-[#888888]";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{norm || "UNKNOWN"}</span>
    </span>
  );
}
