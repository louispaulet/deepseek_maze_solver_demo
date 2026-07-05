export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/60">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DeepSeek Maze Solver Demo &mdash; testing DeepSeek V4 Pro capabilities
        </p>
      </div>
    </footer>
  );
}
