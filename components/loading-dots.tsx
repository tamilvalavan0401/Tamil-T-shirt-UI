export function LoadingDots() {
  return (
    <span className="flex items-center justify-center space-x-2">
      <span
        className="h-2.5 w-2.5 rounded-full bg-white animate-dot-wave"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full bg-white animate-dot-wave"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full bg-white animate-dot-wave"
        style={{ animationDelay: "0.4s" }}
      />
    </span>
  );
}
