export function LoadingDots() {
  return (
    <span className="flex items-center justify-center space-x-1">
      <span className="h-2 w-2 rounded-full bg-white animate-jump-dot" style={{ animationDelay: "0s" }} />
      <span className="h-2 w-2 rounded-full bg-white animate-jump-dot" style={{ animationDelay: "0.2s" }} />
      <span className="h-2 w-2 rounded-full bg-white animate-jump-dot" style={{ animationDelay: "0.4s" }} />
    </span>
  )
}
