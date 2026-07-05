import PropTypes from 'prop-types';

export default function Section({ title, highlight, children, icon }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
        {icon}
        {title} <span className="text-indigo-400">{highlight}</span>
      </h2>
      {children}
    </section>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired, highlight: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, icon: PropTypes.node,
};
