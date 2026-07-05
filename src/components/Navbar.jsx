import { Link, useLocation } from 'react-router-dom';
import { Grid3x3 } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/maze-solver', label: 'Maze Solver' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-indigo-400 hover:text-indigo-300 transition-colors">
          <Grid3x3 size={22} />
          MazeSolver
        </Link>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'text-indigo-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
