export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/60">
      {/* Decorative maze divider */}
      <div className="max-w-6xl mx-auto px-4 pt-4 flex justify-center">
        <svg width="200" height="4" viewBox="0 0 200 4" fill="none" aria-hidden="true">
          <rect width="200" height="4" rx="2" fill="#1f2937" />
          {[20,50,80,110,140,170].map((x, i) => (
            <rect key={i} x={x} y="0" width={8 + (i % 3) * 6} height="4" rx="2" fill="#4338ca" opacity="0.5" />
          ))}
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DeepSeek Maze Solver Demo &mdash; testing DeepSeek V4 Pro capabilities
        </p>
      </div>
    </footer>
  );
}
