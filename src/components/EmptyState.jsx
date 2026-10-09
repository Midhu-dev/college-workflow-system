import { Link } from "react-router-dom";

export default function EmptyState({
  icon = "📭",
  title = "No records found",
  message = "There are no items to display right now.",
  actionText,
  actionLink,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`mx-auto my-6 w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-12 ${className}`}
    >
      {/* Icon */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#EDE2BD] bg-[#FBF7E9] text-2xl">
        <span aria-hidden="true">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="break-words text-base font-bold tracking-tight text-gray-800 sm:text-lg">
        {title}
      </h3>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-sm break-words text-xs leading-6 text-gray-500 sm:text-sm">
        {message}
      </p>

      {/* Navigation Action */}
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg border border-[#E3CE8D] bg-[#F8F0D8] px-5 py-2.5 text-xs font-semibold text-[#80651E] transition-colors hover:bg-[#F1E5BE] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/40"
        >
          {actionText}
        </Link>
      )}

      {/* Button Action */}
      {actionText && onAction && !actionLink && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg border border-[#E3CE8D] bg-[#F8F0D8] px-5 py-2.5 text-xs font-semibold text-[#80651E] transition-colors hover:bg-[#F1E5BE] focus:outline-none focus:ring-2 focus:ring-[#D8B65C]/40"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}