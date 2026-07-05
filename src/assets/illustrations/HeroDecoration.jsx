/**
 * Abstract maze-inspired decorative SVG for the Home page hero section.
 */
export default function HeroDecoration() {
  return (
    <svg
      viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto h-auto opacity-40"
      aria-hidden="true"
    >
      {/* Outer border */}
      <rect x="10" y="10" width="380" height="100" rx="8" stroke="#4338ca" strokeWidth="1" opacity="0.5" />

      {/* Maze-like corridors */}
      <path d="M30 30h120M30 50h80M30 70h60M30 90h100" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M170 10v60M190 30v50M210 10v40M230 50v50M250 10v30" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M270 30h100M270 50h80M270 70h100M270 90h60" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M350 10v20" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* Start node */}
      <circle cx="30" cy="30" r="5" fill="#818cf8" opacity="0.9" />
      <circle cx="30" cy="30" r="8" stroke="#818cf8" strokeWidth="1" opacity="0.3" />

      {/* Goal node */}
      <circle cx="370" cy="90" r="5" fill="#a78bfa" opacity="0.9" />
      <circle cx="370" cy="90" r="8" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />

      {/* Dots along path */}
      {[[60,30],[90,30],[120,30],[120,50],[120,70],[150,70],[170,70],[170,90],[200,90],
        [230,90],[230,70],[250,70],[270,70],[300,70],[330,70],[330,90],[360,90]]
        .map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#6366f1" opacity="0.7" />
        ))}
    </svg>
  );
}
