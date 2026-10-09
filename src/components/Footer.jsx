export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-5 sm:py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        {/* Brand */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:justify-start sm:text-xs">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C7A647]"
            aria-hidden="true"
          />

          <span className="font-semibold text-gray-700">
            Campus Connect
          </span>

          <span className="text-gray-300" aria-hidden="true">
            —
          </span>

          <span className="text-gray-500">
            Integrated College Workflow System
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[10px] leading-5 text-gray-500 sm:text-xs">
          Designed for faculty and student collaboration
        </p>
      </div>
    </footer>
  );
}