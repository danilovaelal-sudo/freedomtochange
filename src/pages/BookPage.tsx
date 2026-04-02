import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import bookCover from '@/assets/book-cover.jpg';

const quotes = [
  'Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре.',
  'Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.',
];

export default function BookPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <img src={bookCover} alt="Почему после 40 не поздно" className="w-full max-w-md mx-auto shadow-2xl" width={640} height={960} />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div>
              <p className="text-mono text-muted-foreground mb-6">книга</p>
              <h1 className="heading-display mb-8">Почему после 40<br /><span className="italic">не поздно</span></h1>
              <p className="text-mono text-accent mb-4">Елена Данилова</p>
              <p className="body-editorial text-muted-foreground mb-8">
                Личная история, ставшая книгой. Путь от монастыря к материнству, от потери себя — к обретению нового смысла.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#fragment" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors text-center">
                  Прочитать фрагмент
                </a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
                  Электронная версия →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About the book */}
      <section className="py-20 px-6 border-t border-border/20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="heading-section mb-8">О чём эта книга</h2>
            <div className="body-editorial text-muted-foreground space-y-6">
              <p>Речь пойдет не о том, зачем уходят в монастырь и почему возвращаются из него, не только о женщине, неожиданно ставшей многодетной мамой после 40 лет, не только о поиске предназначения и своего места в жизни.</p>
              <p>Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять Богу. И, в конце концов, — это просто любопытная и весьма необычная история.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-20 px-6 border-t border-border/20">
        <div className="max-w-4xl mx-auto space-y-16">
          {quotes.map((q, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <blockquote className="border-l-2 border-wine pl-8">
                <p className="font-serif text-2xl md:text-3xl italic text-muted-foreground leading-relaxed">«{q}»</p>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Fragment */}
      <section id="fragment" className="py-20 px-6 border-t border-border/20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-6">фрагмент книги</p>
            <h2 className="heading-section mb-12">Введение</h2>
            <div className="body-editorial text-muted-foreground space-y-6">
              <p>Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре, проводит в стенах обители 16 лет, возвращается в «мир» накануне своего сорокалетия, выходит замуж, рожает своего первого ребенка почти в 41 год, и в течение 7 лет успевает родить еще троих детей, а будучи мамой четверых, находит себя в поддержке женщин как доула.</p>
              <p>Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.</p>
              <p>Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни. Я не могла говорить об этом даже с мужем. Очень злилась на него, когда он с гордостью говорил в компаниях, что его жена из монастыря. Наверное, мне казалось, что меня сочтут сумасшедшей или, как минимум, странной.</p>
              <p>Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление и захватывают необычными почти нереальными приключениями. Именно об одной такой жизненной истории и пойдет речь в этой небольшой книге.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 px-6 border-t border-border/20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="heading-section mb-8">Кому подойдёт</h2>
            <div className="space-y-4">
              {[
                'Женщинам, которые чувствуют, что их время прошло',
                'Тем, кто переживает кризис идентичности после 40',
                'Тем, кто боится перемен, но чувствует их неизбежность',
                'Женщинам, потерявшим опору после развода или потери',
                'Тем, кто ищет вдохновение в реальной истории, а не в формулах успеха',
                'Всем, кто хочет разрешить себе жить по-другому',
              ].map((item, i) => (
                <p key={i} className="pl-6 border-l border-primary/30 text-muted-foreground">{item}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border/20">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="body-editorial text-muted-foreground mb-8">Книга — это только начало. За ней стоит целое пространство для исследования себя.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/interactives" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                Перейти к интерактивам
              </Link>
              <Link to="/author" className="px-8 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Узнать об авторе →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteLayout>
  );
}
