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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/30">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight text-foreground hover:text-primary transition-colors">
          после 40
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-wide transition-colors ${pathname === item.path ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Меню">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/30 px-6 py-8 space-y-6">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-serif text-2xl ${pathname === item.path ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
