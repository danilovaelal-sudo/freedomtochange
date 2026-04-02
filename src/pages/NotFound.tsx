import SiteLayout from '@/components/SiteLayout';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <SiteLayout>
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div>
        <span className="font-black text-[12rem] md:text-[20rem] text-primary/20 leading-none block tracking-tighter">404</span>
        <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tighter mt-[-2rem] md:mt-[-4rem] relative z-10">Страница<br />не найдена</h2>
        <p className="text-muted-foreground mt-6 mb-8">Но ты всегда можешь вернуться.</p>
        <Link to="/" className="brutal-btn inline-block">На главную</Link>
      </div>
    </section>
  </SiteLayout>
);

export default NotFound;
