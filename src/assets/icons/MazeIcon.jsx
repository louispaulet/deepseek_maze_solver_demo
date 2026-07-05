import PropTypes from 'prop-types';

export default function MazeIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h6M16 2v6M10 8v4M4 14h6M16 14h4M10 18v2M16 18h4M8 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

MazeIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};
