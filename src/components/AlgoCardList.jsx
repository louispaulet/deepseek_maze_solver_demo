import PropTypes from 'prop-types';

export default function AlgoCardList({ items, icons }) {
  return items.map(({ name, desc }, i) => {
    const Icon = icons[i];
    return (
      <div key={name} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
        <div className="flex items-center gap-2.5 mb-1">
          <Icon size={16} className="text-indigo-400 shrink-0" />
          <h3 className="text-indigo-400 font-semibold">{name}</h3>
        </div>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    );
  });
}
AlgoCardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, desc: PropTypes.string })).isRequired,
  icons: PropTypes.array.isRequired,
};
