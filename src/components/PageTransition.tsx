import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [displayKey, setDisplayKey] = useState(location.key);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayKey(location.key);
      setVisible(true);
    }, 150);
    return () => clearTimeout(t);
  }, [location.key]);

  return (
    <div
      key={displayKey}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      {children}
    </div>
  );
}
