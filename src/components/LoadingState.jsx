export default function LoadingState({ message = "Loading details...", className = "" }) {
  return (
    <div
      className={`bg-[#0D0D0D] border border-[#292929] rounded-2xl p-12 text-center my-6 flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-8 h-8 rounded-full border-2 border-[#292929] border-t-[#D4AF37] animate-spin mb-4" />
      <p className="text-xs font-medium text-[#888888] tracking-wide">
        {message}
      </p>
    </div>
  );
}
