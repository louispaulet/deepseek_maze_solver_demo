import PropTypes from 'prop-types';

function IconWrapper({ children, label }) {
  return (
    <div className="flex flex-col items-center gap-2" title={label}>
      {children}
    </div>
  );
}
IconWrapper.propTypes = { children: PropTypes.node, label: PropTypes.string };

export function GenerateIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#818cf8" strokeWidth="1.5" />
      <path d="M3 9h5M14 3v5M9 9v4M5 15h5M15 15h5M9 19h5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="1.5" fill="#a78bfa" />
    </svg>
  );
}

export function PathfindIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="2.5" fill="#818cf8" />
      <circle cx="19" cy="19" r="2.5" fill="#a78bfa" />
      <path d="M6 6L10 8L14 14L17 17" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#4b5563" strokeWidth="1" />
    </svg>
  );
}

export function FeaturesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function SpeedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#4b5563" strokeWidth="1.5" />
      <path d="M12 12l4-4M12 6v6" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#818cf8" opacity="0.3" />
    </svg>
  );
}

export function SeedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="5" stroke="#818cf8" strokeWidth="1.5" />
      <path d="M12 13v6M9 17l3 3 3-3" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CompareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="7" height="16" rx="1" stroke="#818cf8" strokeWidth="1.5" />
      <rect x="14" y="8" width="7" height="12" rx="1" stroke="#a78bfa" strokeWidth="1.5" />
      <path d="M5.5 8h2M5.5 12h2M16.5 12h2M16.5 16h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
