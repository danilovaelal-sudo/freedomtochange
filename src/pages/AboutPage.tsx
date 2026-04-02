import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-6">о проекте</p>
            <h1 className="heading-display mb-12">Пространство,<br />где <span className="italic">можно</span><br />не спешить</h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="body-editorial text-muted-foreground space-y-8 mb-20">
              <p>Этот проект — не про успех после 40. Не про мотивацию. Не про «ты всё можешь, просто поверь».</p>
              <p>Это пространство для женщин, которые переживают внутренний кризис. Которые потеряли опору. Которые чувствуют, что жизнь проходит мимо — или идёт не так, как они хотели.</p>
              <p>Здесь можно остановиться. Прислушаться к себе. Пройти тест. Прочитать историю, которая отзовётся. Почувствовать, что ты не одна.</p>
              <p>Проект вырос из книги «Почему после 40 не поздно» и личного опыта автора — Елены Даниловой, женщины, которая начинала заново не один раз.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="border-t border-border/20 pt-16">
              <h2 className="heading-section mb-8">Что здесь можно делать</h2>
              <div className="space-y-6">
                {[
                  'Читать — книгу, дневник, размышления',
                  'Проходить тесты — без регистрации, без сохранения данных',
                  'Исследовать себя — через интерактивные маршруты и практики',
                  'Получать поддержку — через историю автора и женские голоса',
                  'Найти свой следующий шаг — если будешь к этому готова',
                ].map((item, i) => (
                  <p key={i} className="text-muted-foreground text-lg pl-6 border-l border-primary/30">{item}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="border-t border-border/20 pt-16 mt-16">
              <h2 className="heading-section mb-8">Почему тема «не поздно» важна</h2>
              <p className="body-editorial text-muted-foreground mb-8">
                Потому что миллионы женщин живут с ощущением, что их время прошло. Что они уже не могут начать заново. Что менять жизнь после 40 — страшно, стыдно, поздно.
              </p>
              <p className="body-editorial text-muted-foreground">
                Этот проект говорит: нет. Не поздно. И ты не одна.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="mt-20 flex flex-col sm:flex-row gap-4">
              <Link to="/author" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors text-center">
                Узнать об авторе
              </Link>
              <Link to="/book" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
                Открыть книгу
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
