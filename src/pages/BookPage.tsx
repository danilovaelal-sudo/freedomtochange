import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import bookCover from '@/assets/book-cover.jpg';

const quotes = [
  'Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре.',
  'Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.',
  'Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление.',
];

export default function BookPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
          <ScrollReveal className="lg:col-span-2">
            <div className="border-[3px] border-foreground/20 p-4 bg-card h-full flex items-center justify-center group overflow-hidden">
              <img src={bookCover} alt="Книга Не поздно" className="w-full max-w-md grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" width={640} height={960} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="lg:col-span-3">
            <div className="border-[3px] border-foreground/20 -ml-0 lg:-ml-[3px] -mt-[3px] lg:mt-0 p-8 md:p-12 h-full flex flex-col justify-center">
              <p className="text-mono text-primary mb-6">книга</p>
              <h1 className="heading-display mb-8">ПОЧЕМУ<br /><span className="text-primary">НЕ ПОЗДНО</span></h1>
              <p className="text-mono text-primary/60 mb-4">Елена Данилова</p>
              <p className="body-editorial text-muted-foreground mb-8">
                Личная история, ставшая книгой. Путь от монастыря к материнству, от потери себя — к обретению нового смысла.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#fragment" className="brutal-btn text-center">Прочитать фрагмент</a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline text-center">
                  Электронная версия →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About the book */}
      <section className="py-20 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-3xl mx-auto border-[3px] border-foreground/10 p-8 md:p-12">
          <ScrollReveal>
            <h2 className="heading-section mb-8">О ЧЁМ<br />ЭТА КНИГА</h2>
            <div className="body-editorial text-muted-foreground space-y-6">
              <p>Речь пойдет не о том, зачем уходят в монастырь и почему возвращаются из него, не только о женщине, неожиданно ставшей многодетной мамой.</p>
              <p>Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-20 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-4xl mx-auto space-y-8">
          {quotes.map((q, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <blockquote className="border-l-[6px] border-primary pl-8 py-4 bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                <p className="font-black text-xl md:text-2xl uppercase tracking-tight text-foreground leading-tight">«{q}»</p>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Fragment */}
      <section id="fragment" className="py-20 px-6 border-t-[3px] border-primary/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">фрагмент книги</p>
            <h2 className="heading-section mb-12">ВВЕДЕНИЕ</h2>
            <div className="body-editorial text-muted-foreground space-y-6 border-[3px] border-foreground/10 p-8 md:p-12">
              <p>Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре, проводит в стенах обители 16 лет, возвращается в «мир» накануне своего сорокалетия, выходит замуж, рожает своего первого ребенка почти в 41 год, и в течение 7 лет успевает родить еще троих детей.</p>
              <p>Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.</p>
              <p>Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни. Я не могла говорить об этом даже с мужем.</p>
              <p>Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление и захватывают необычными почти нереальными приключениями.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="heading-section mb-8">КОМУ<br />ПОДОЙДЁТ</h2>
            <div className="space-y-0">
              {[
                'Женщинам, которые чувствуют, что их время проходит',
                'Тем, кто переживает внутренний кризис',
                'Тем, кто боится перемен, но чувствует их неизбежность',
                'Женщинам, потерявшим опору после разрыва или потери',
                'Тем, кто ищет вдохновение в реальной истории',
                'Всем, кто хочет разрешить себе жить по-другому',
              ].map((item, i) => (
                <p key={i} className="pl-6 border-l-[4px] border-primary text-muted-foreground py-3 border-b border-foreground/5 hover:text-foreground hover:bg-primary/5 transition-all duration-200">{item}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t-[3px] border-foreground/10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <p className="body-editorial text-muted-foreground mb-8">Книга — это только начало. За ней стоит целое пространство для исследования себя.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/interactives" className="brutal-btn-outline text-center">Перейти к интерактивам</Link>
              <Link to="/author" className="text-mono text-muted-foreground hover:text-primary transition-colors py-4">Узнать об авторе →</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteLayout>
  );
}
