export default function LoadingState({
  message = "Loading details...",
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`my-6 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:py-14 ${className}`}
    >
      {/* Loading Spinner */}
      <div
        className="mb-4 h-9 w-9 rounded-full border-[3px] border-[#F0E8D0] border-t-[#C7A647] motion-safe:animate-spin motion-reduce:animate-none"
        aria-hidden="true"
      />

      {/* Loading Message */}
      <p className="text-xs font-medium tracking-wide text-gray-500 sm:text-sm">
        {message}
      </p>
    </div>
  );
}