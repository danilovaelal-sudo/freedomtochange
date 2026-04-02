import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-[3px] border-foreground/20">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl tracking-tighter uppercase text-foreground hover:text-primary transition-colors">
          ПОСЛЕ 40
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-xs font-bold tracking-widest uppercase transition-colors ${pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Меню">
          {open ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-background border-t-[3px] border-foreground/20 px-6 py-8 space-y-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-black text-3xl uppercase tracking-tighter ${pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
