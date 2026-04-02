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
    }, 100);
    return () => clearTimeout(t);
  }, [location.key]);

  return (
    <div
      key={displayKey}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) skewY(0)' : 'translateY(30px) skewY(1deg)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
