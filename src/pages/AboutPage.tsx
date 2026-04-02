import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">о проекте</p>
            <h1 className="heading-display mb-12 max-w-4xl">ПРОСТРАНСТВО,<br />ГДЕ <span className="text-primary">МОЖНО</span><br />НЕ СПЕШИТЬ</h1>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-16">
            <ScrollReveal delay={200}>
              <div className="border-[3px] border-foreground/20 p-8 md:p-12">
                <div className="body-editorial text-muted-foreground space-y-6">
                  <p>Этот проект — не про мотивацию. Не про «ты всё можешь, просто поверь».</p>
                  <p>Это пространство для женщин, которые переживают внутренний кризис. Которые потеряли опору. Которые чувствуют, что жизнь проходит мимо.</p>
                  <p>Здесь можно остановиться. Прислушаться к себе. Пройти тест. Прочитать историю, которая отзовётся. Почувствовать, что ты не одна.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="border-[3px] border-foreground/20 -ml-0 lg:-ml-[3px] -mt-[3px] lg:mt-0 p-8 md:p-12 bg-primary/5">
                <blockquote className="book-quote text-base md:text-lg mb-6">
                  «Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление.»
                </blockquote>
                <p className="body-editorial text-muted-foreground">
                  Проект вырос из книги и личного опыта автора — Елены Даниловой, женщины, которая начинала заново не один раз.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="border-[3px] border-foreground/10 p-8 md:p-12 mt-16">
              <h2 className="heading-section mb-8">ЧТО ЗДЕСЬ<br />МОЖНО ДЕЛАТЬ</h2>
              <div className="space-y-4">
                {[
                  'Читать — книгу, дневник, размышления',
                  'Проходить тесты — без регистрации, без сохранения',
                  'Исследовать себя — через интерактивные маршруты',
                  'Получать поддержку — через историю автора',
                  'Найти следующий шаг — если будешь готова',
                ].map((item, i) => (
                  <p key={i} className="text-muted-foreground text-lg pl-6 border-l-[4px] border-primary">{item}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="mt-16 p-8 md:p-12 bg-primary/5 border-[3px] border-primary/20">
              <h2 className="heading-section mb-8">ПОЧЕМУ ЭТА<br />ТЕМА ВАЖНА</h2>
              <p className="body-editorial text-muted-foreground mb-6">
                Потому что миллионы женщин живут с ощущением, что их время прошло. Что они уже не могут начать заново. Что менять жизнь — страшно, стыдно, поздно.
              </p>
              <p className="font-black text-2xl md:text-3xl uppercase tracking-tight text-primary">
                Этот проект говорит: нет. Не поздно. И ты не одна.
              </p>
            </div>
          </ScrollReveal>

          {/* Book excerpt interlude */}
          <ScrollReveal delay={450}>
            <div className="mt-16 border-l-[6px] border-primary pl-8 py-6">
              <p className="italic text-muted-foreground text-lg leading-relaxed">
                «Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.»
              </p>
              <p className="text-mono text-primary mt-4">— из книги</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link to="/author" className="brutal-btn text-center">
                Узнать об авторе
              </Link>
              <Link to="/book" className="brutal-btn-outline text-center">
                Открыть книгу
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
