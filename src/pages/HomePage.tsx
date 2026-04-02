import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import heroBg from '@/assets/hero-bg.jpg';
import bookCover from '@/assets/book-cover.jpg';
import QuizShell from '@/components/QuizShell';

const manifestItems = [
  'можно начать заново',
  'можно сомневаться',
  'можно менять путь',
  'можно не соответствовать ожиданиям',
  'можно искать себя долго',
  'можно выбрать жизнь заново',
  'не нужно быть «правильной», чтобы быть живой',
];

const scenarios = [
  { title: 'я в точке перемен', text: 'Ты чувствуешь, что прежнее больше не подходит. Это не конец — это начало.' },
  { title: 'я после разрыва', text: 'Мир раскололся. Но именно в трещинах пробивается новый свет.' },
  { title: 'я потеряла себя', text: 'Та, кем ты была, ушла. Та, кем ты станешь, ещё формируется. И это нормально.' },
  { title: 'я боюсь, что опоздала', text: 'После 40 не поздно. Ни для любви, ни для смысла, ни для себя.' },
  { title: 'я хочу новую жизнь', text: 'Желание перемен — это не каприз. Это голос настоящей тебя.' },
  { title: 'я ищу смысл', text: 'Смысл не теряется. Он ждёт, пока ты остановишься и прислушаешься.' },
];

const timeline = [
  { year: '22', label: 'МГУ', desc: 'Красный диплом МГУ — и выбор, который никто не ожидал' },
  { year: '22', label: 'Монастырь', desc: 'Уход в монастырь — 16 лет тишины, молитвы и внутренней работы' },
  { year: '38', label: 'Возвращение', desc: 'Возвращение в мир накануне сорокалетия' },
  { year: '40', label: 'Замужество', desc: 'Замужество — когда всё говорили «уже поздно»' },
  { year: '41', label: 'Первый ребёнок', desc: 'Рождение первого ребёнка почти в 41 год' },
  { year: '48', label: '4 детей', desc: 'Четверо детей за семь лет — каждый стал чудом' },
  { year: '50', label: 'Книга', desc: 'Книга и новый путь — помощь женщинам в переходе' },
];

const voices = [
  '«Я думала, что после развода моя жизнь закончилась. Но она только начиналась»',
  '«Мне 43, и я впервые чувствую, что живу для себя»',
  '«Эта книга дала мне разрешение быть несовершенной»',
  '«Я перестала бояться своего возраста»',
  '«После 40 я нашла свой голос»',
  '«Впервые за 20 лет я задала себе вопрос: а чего хочу я?»',
];

/* Kinetic manifesto line */
function KineticLine({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const vh = window.innerHeight;
            const p = 1 - Math.max(0, Math.min(1, (rect.top - vh * 0.3) / (vh * 0.5)));
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sizeClass = index % 3 === 0
    ? 'text-5xl md:text-7xl'
    : index % 3 === 1
    ? 'text-4xl md:text-6xl'
    : 'text-3xl md:text-5xl';

  const xShift = (index % 2 === 0 ? -1 : 1) * (1 - progress) * 60;

  return (
    <p
      ref={ref}
      className={`font-serif leading-none mb-6 ${sizeClass} ${index % 2 === 0 ? '' : 'md:text-right'} transition-none`}
      style={{
        opacity: 0.15 + progress * 0.85,
        transform: `translateX(${xShift}px) scale(${0.95 + progress * 0.05})`,
        color: `hsl(40 15% ${50 + progress * 43}%)`,
        willChange: 'transform, opacity',
      }}
    >
      {text}
    </p>
  );
}

export default function HomePage() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref: heroRef, offset: heroOffset } = useParallax(0.25);

  return (
    <SiteLayout>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{ transform: `translateY(${heroOffset}px) scale(1.1)`, willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
          <p className="text-mono text-muted-foreground mb-8 animate-fade-up">пространство для тех, кто ищет себя</p>
          <h1 className="heading-display mb-8 animate-fade-up animation-delay-200">
            ты не опоздала.<br />
            <span className="text-gradient-gold">твоя история</span><br />
            ещё продолжается.
          </h1>
          <p className="body-editorial text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-up animation-delay-400">
            Книга, интерактивное пространство и поддержка для женщин, которые ищут новый путь после 40.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-600">
            <button onClick={() => setShowQuiz(true)} className="px-10 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/80 transition-colors">
              Начать путь
            </button>
            <Link to="/book" className="px-10 py-4 border border-border text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
              Открыть книгу
            </Link>
          </div>
        </div>
      </section>

      {/* Kinetic Manifesto */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {manifestItems.map((item, i) => (
            <KineticLine key={i} text={item} index={i} />
          ))}
        </div>
      </section>

      {/* Who are you now? */}
      <section className="py-32 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-4">выбери своё состояние</p>
            <h2 className="heading-large mb-16">Кто ты сейчас?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <button
                  onClick={() => setActiveScenario(activeScenario === i ? null : i)}
                  className={`w-full text-left p-8 border transition-all duration-500 group ${activeScenario === i ? 'border-primary bg-card' : 'border-border/30 hover:border-primary/30 hover:bg-card/30'}`}
                >
                  <h3 className="font-serif text-2xl mb-4 group-hover:text-foreground transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ${activeScenario === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                    <Link to="/interactives" className="inline-block mt-4 text-xs text-accent hover:text-accent/80 transition-colors">
                      Исследовать →
                    </Link>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Author Timeline */}
      <section className="py-32 px-6 border-t border-border/20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-4">история автора</p>
            <h2 className="heading-large mb-20">Путь, который нельзя <span className="italic">запланировать</span></h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/30" />
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className={`relative flex items-start gap-8 mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-20 md:pl-0`}>
                    <span className="font-serif text-6xl md:text-8xl text-primary/30 leading-none block mb-2">{item.year}</span>
                    <h3 className="font-serif text-2xl mb-2">{item.label}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link to="/author" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Читать полную историю →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Quiz */}
      {showQuiz && (
        <section className="py-16 px-6 border-t border-border/20" id="quiz">
          <div className="max-w-4xl mx-auto">
            <p className="text-mono text-muted-foreground mb-4 text-center">интерактив</p>
            <h2 className="heading-large text-center mb-8">Где я сейчас на своём пути?</h2>
            <QuizShell />
          </div>
        </section>
      )}

      {!showQuiz && (
        <section className="py-32 px-6 border-t border-border/20">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-mono text-muted-foreground mb-4">интерактив</p>
              <h2 className="heading-large mb-8">Где я сейчас на своём пути?</h2>
              <p className="body-editorial text-muted-foreground mb-12">
                Пять вопросов, которые помогут остановиться и прислушаться к себе. Без регистрации, без сохранения данных.
              </p>
              <button onClick={() => setShowQuiz(true)} className="px-10 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/80 transition-colors">
                Начать тест
              </button>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Book Preview */}
      <section className="py-32 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <img src={bookCover} alt="Почему после 40 не поздно" className="w-full max-w-sm mx-auto shadow-2xl" loading="lazy" width={640} height={960} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <p className="text-mono text-muted-foreground mb-4">книга</p>
                <h2 className="heading-large mb-8">Почему после 40<br /><span className="italic">не поздно</span></h2>
                <blockquote className="border-l-2 border-wine pl-6 mb-8">
                  <p className="font-serif text-xl italic text-muted-foreground leading-relaxed">
                    «Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре...»
                  </p>
                </blockquote>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Книга о том, как жизнь может развернуться самым неожиданным образом, если слушать себя и не бояться перемен. Личная история, ставшая опорой для тысяч женщин.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/book" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors text-center">
                    Читать о книге
                  </Link>
                  <Link to="/book#fragment" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
                    Прочитать фрагмент
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Voices Ticker */}
      <section className="py-16 border-t border-b border-border/20 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap flex gap-16">
          {[...voices, ...voices].map((v, i) => (
            <span key={i} className="font-serif text-xl text-muted-foreground/60 inline-block">{v}</span>
          ))}
        </div>
      </section>

      {/* Self-discovery block */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-4">пространство для себя</p>
            <h2 className="heading-large mb-16">Исследуй себя</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Тесты', desc: 'Узнай, где ты сейчас', link: '/interactives' },
              { title: 'Карта перехода', desc: 'Визуализируй свой путь', link: '/interactives' },
              { title: 'Письмо из будущего', desc: 'Напиши себе через 5 лет', link: '/interactives' },
              { title: 'Дневник', desc: 'Размышления и поддержка', link: '/journal' },
              { title: 'История автора', desc: 'Путь, который вдохновляет', link: '/author' },
              { title: 'Книга', desc: 'Главное произведение проекта', link: '/book' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <Link to={item.link} className="block p-8 border border-border/30 hover:border-primary/30 hover:bg-card/30 transition-all duration-300 group">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="py-32 px-6 border-t border-border/20">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-section mb-8">
              Если тебе нужен не только внутренний отклик, но и <span className="italic">личный маршрут</span>
            </h2>
            <p className="text-muted-foreground mb-12">
              У меня есть формат глубокой индивидуальной работы. Без давления, без обещаний волшебства. Просто — рядом.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                Узнать о сопровождении
              </Link>
              <Link to="/support#form" className="px-8 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Оставить запрос →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteLayout>
  );
}
