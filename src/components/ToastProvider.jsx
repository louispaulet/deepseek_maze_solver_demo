import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ToastContext = createContext(null);

const TYPES = {
  error: { bg: 'bg-red-900/90 border-red-700', text: 'text-red-200', icon: '⚠' },
  success: { bg: 'bg-emerald-900/90 border-emerald-700', text: 'text-emerald-200', icon: '✓' },
  info: { bg: 'bg-indigo-900/90 border-indigo-700', text: 'text-indigo-200', icon: 'ℹ' },
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 4000);
  }, [remove]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

function ToastContainer({ toasts, onDismiss }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [toasts.length]);

  if (toasts.length === 0) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm"
    >
      {toasts.map(({ id, message, type }) => {
        const t = TYPES[type] || TYPES.info;
        return (
          <div
            key={id}
            className={`${t.bg} ${t.text} border rounded-lg px-4 py-3 text-sm shadow-lg
              animate-slide-in flex items-start gap-2`}
          >
            <span className="mt-px">{t.icon}</span>
            <span className="flex-1">{message}</span>
            <button onClick={() => onDismiss(id)} className="text-gray-400 hover:text-white ml-1">✕</button>
          </div>
        );
      })}
    </div>
  );
}

ToastContainer.propTypes = {
  toasts: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
