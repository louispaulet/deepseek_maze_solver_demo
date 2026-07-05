import PropTypes from 'prop-types';

export default function InfoCard({ icon, title, children, small }) {
  return (
    <div className={`rounded-xl border border-gray-800 bg-gray-900/50 ${small ? 'p-4' : 'p-6'}`}>
      <div className={`flex items-center gap-2.5 ${small ? 'mb-1.5' : 'mb-2'}`}>
        {icon}
        <h3 className={`${small ? 'text-white text-sm' : 'text-indigo-400'} font-semibold`}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
InfoCard.propTypes = {
  icon: PropTypes.node.isRequired, title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, small: PropTypes.bool,
};
