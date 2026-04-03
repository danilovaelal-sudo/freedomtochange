import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'О проекте', path: '/about' },
  { label: 'Обо мне', path: '/author' },
  { label: 'Книга', path: '/book' },
  { label: 'Интерактивы', path: '/interactives' },
  { label: 'Дневник', path: '/journal' },
  { label: 'Поддержка', path: '/support' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[3px] border-primary/40 ${
        scrolled ? 'bg-background/98 backdrop-blur-md' : 'bg-background/80 backdrop-blur-sm'
      }`}
      style={{ boxShadow: scrolled ? 'var(--md-elevation-3)' : 'none' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl tracking-tighter uppercase text-primary hover:text-foreground transition-colors relative group">
          НЕ ПОЗДНО
          <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-foreground transition-all duration-300 group-hover:w-full" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 relative ${
                pathname === item.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              {item.label}
              {pathname === item.path && <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-primary" />}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary p-2 hover:bg-primary/10 transition-colors" aria-label="Меню">
          {open ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-background border-t-[3px] border-primary/40 px-6 py-8 space-y-4" style={{ boxShadow: 'var(--md-elevation-4)' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-black text-3xl uppercase tracking-tighter transition-colors ${pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
