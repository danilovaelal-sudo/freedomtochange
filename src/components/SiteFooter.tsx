import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl mb-4">после 40</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Пространство поддержки, пробуждения и самопознания для женщин, переживающих внутренний кризис и поиск новой идентичности.
            </p>
          </div>
          <div>
            <p className="text-mono text-muted-foreground mb-4">Навигация</p>
            <div className="space-y-3">
              {[
                { label: 'О проекте', path: '/about' },
                { label: 'Обо мне', path: '/author' },
                { label: 'Книга', path: '/book' },
                { label: 'Интерактивы', path: '/interactives' },
                { label: 'Дневник', path: '/journal' },
              ].map(item => (
                <Link key={item.path} to={item.path} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-mono text-muted-foreground mb-4">Связь</p>
            <div className="space-y-3">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Telegram</a>
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">ВКонтакте</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Елена Данилова. Все права защищены.</p>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
