import SiteLayout from '@/components/SiteLayout';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <SiteLayout>
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-9xl text-primary/20 mb-8">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Страница не найдена</h2>
        <p className="text-muted-foreground mb-12">Но ты всегда можешь вернуться.</p>
        <Link to="/" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors">
          На главную
        </Link>
      </div>
    </section>
  </SiteLayout>
);

export default NotFound;
