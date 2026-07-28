import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const ToastContext = createContext(null);
const icons = {
  success: <FiCheckCircle />,
  danger: <FiXCircle />,
  info: <FiInfo />
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, variant = 'info') => {
    const id = Date.now();
    setToasts((items) => [...items, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((items) => items.filter((item) => item.id !== id));
    }, 3600);
  }, []);

  const value = useMemo(() => ({
    success: (message) => push(message, 'success'),
    error: (message) => push(message, 'danger'),
    info: (message) => push(message, 'info')
  }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div className={`toast-card border-${toast.variant}`} role="status" key={toast.id}>
            <span className={`text-${toast.variant}`}>{icons[toast.variant]}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
