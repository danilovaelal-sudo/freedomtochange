import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import heroBg from '@/assets/hero-bg.jpg';
import bookCover from '@/assets/book-cover.png';
import QuizShell from '@/components/QuizShell';

const manifestItems = [
  'можно начать заново',
  'можно сомневаться',
  'можно менять путь',
  'можно не соответствовать',
  'можно искать себя долго',
  'можно выбрать жизнь заново',
  'не нужно быть «правильной»',
];

const scenarios = [
  {
    title: 'я в точке перемен',
    text: 'Ты чувствуешь, что прежнее больше не подходит. Это не конец — это начало.',
    quote: '«Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление.»'
  },
  {
    title: 'я после разрыва',
    text: 'Мир раскололся. Но именно в трещинах пробивается новый свет.',
    quote: '«Я никогда не была серой мышью. Да, серьезная и молчаливая, но не замкнутая и нелюдимая, какими представляют девушек, уходящих в монастырь.»'
  },
  {
    title: 'я потеряла себя',
    text: 'Та, кем ты была, ушла. Та, кем ты станешь, ещё формируется.',
    quote: '«Мне не хватило вот того времени беззаботности и свободы, когда можно все пробовать и не бояться ошибиться. Я не догуляла, не дотанцевала, не довлюблялась.»'
  },
  {
    title: 'я боюсь перемен',
    text: 'Страх — это не слабость. Это знак, что ты готова к чему-то большему.',
    quote: '«С появлением Бога в моей жизни просто появилась другая Любовь. Я постепенно внедряла в свою жизнь все, что приближало меня к Богу.»'
  },
  {
    title: 'я хочу новую жизнь',
    text: 'Желание перемен — это не каприз. Это голос настоящей тебя.',
    quote: '«Что так повлияло на мое решение вот так отважно и бесповоротно поменять свою жизнь?»'
  },
  {
    title: 'я ищу смысл',
    text: 'Смысл не теряется. Он ждёт, пока ты остановишься и прислушаешься.',
    quote: '«Было желание жить, как святые отцы пишут, отсекая все лишнее, мирское, все свое время посвящая молитве.»'
  },
];

const bookExcerpts = [
  '«Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление и захватывают необычными почти нереальными приключениями.»',
  '«Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни. Я не могла говорить об этом даже с мужем.»',
  '«Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.»',
  '«Мне не хватило вот того времени беззаботности и свободы, когда можно все пробовать и не бояться ошибиться.»',
  '«Я никогда не была серой мышью. Да, серьезная и молчаливая, но не замкнутая и нелюдимая.»',
];

const timeline = [
  { year: '22', label: 'МГУ', desc: 'Красный диплом — и выбор, который никто не ожидал' },
  { year: '22', label: 'Монастырь', desc: '16 лет тишины, молитвы и внутренней работы' },
  { year: '38', label: 'Возвращение', desc: 'Возвращение в мир — к себе настоящей' },
  { year: '40+', label: 'Семья', desc: 'Замужество и четверо детей' },
  { year: '50', label: 'Книга', desc: 'Книга и новый путь помощи женщинам' },
];

const voices = [
  '«Я думала, что после развода моя жизнь закончилась. Но она только начиналась»',
  '«Впервые за годы я чувствую, что живу для себя»',
  '«Эта книга дала мне разрешение быть несовершенной»',
  '«Я перестала бояться перемен»',
  '«Впервые за долгое время я задала себе вопрос: а чего хочу я?»',
  '«Не нужно ждать подходящего момента — он уже наступил»',
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

  const isLarge = index % 3 === 0;
  const isMed = index % 3 === 1;
  const sizeClass = isLarge
    ? 'text-5xl md:text-8xl lg:text-9xl'
    : isMed
    ? 'text-4xl md:text-7xl'
    : 'text-3xl md:text-6xl';

  const xShift = (index % 2 === 0 ? -1 : 1) * (1 - progress) * 100;

  return (
    <p
      ref={ref}
      className={`font-black leading-[0.85] mb-4 uppercase tracking-tighter ${sizeClass} ${index % 2 === 0 ? '' : 'md:text-right'}`}
      style={{
        opacity: 0.05 + progress * 0.95,
        transform: `translateX(${xShift}px) skewX(${(1 - progress) * -3}deg)`,
        color: progress > 0.6 ? `hsl(var(--primary))` : `hsl(var(--foreground) / ${0.08 + progress * 0.5})`,
        transition: 'color 0.3s',
        willChange: 'transform, opacity',
      }}
    >
      {text}
    </p>
  );
}

/* Animated counter */
function AnimatedNumber({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`font-black text-8xl md:text-[10rem] text-primary/20 leading-none block transition-all duration-700 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
    >
      {target}
    </span>
  );
}

export default function HomePage() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref: heroRef, offset: heroOffset } = useParallax(0.25);

  return (
    <SiteLayout>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-20 grayscale contrast-150"
            style={{ transform: `translateY(${heroOffset}px) scale(1.15)`, willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        <div className="absolute top-10 right-4 md:right-12 opacity-10">
          <span className="text-[10rem] md:text-[18rem] font-black leading-none tracking-tighter text-primary">/</span>
        </div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20 pt-40">
          <p className="text-mono text-primary mb-6 animate-fade-up">пространство для тех, кто в переходе</p>
          <h1 className="heading-display mb-6 animate-fade-up animation-delay-200 max-w-5xl">
            ТЫ НЕ<br />
            <span className="text-primary">ОПОЗДАЛА.</span><br />
            <span className="text-stroke">ТВОЯ ИСТОРИЯ</span><br />
            ЕЩЁ ПРОДОЛЖАЕТСЯ.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-12 animate-fade-up animation-delay-400 font-light">
            Книга, пространство и поддержка для женщин, которые ищут новый путь.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-600">
            <button onClick={() => setShowQuiz(true)} className="brutal-btn">
              Посмотреть внутрь
            </button>
            <Link to="/book" className="brutal-btn-outline">
              Открыть книгу
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 1 ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/30 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[0]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section className="py-24 md:py-40 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-mono text-primary mb-12">манифест</p>
          {manifestItems.map((item, i) => (
            <KineticLine key={i} text={item} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ WHO ARE YOU — first 3 scenarios ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-4">нажми и почувствуй</p>
            <h2 className="heading-large mb-16">КТО ТЫ<br />СЕЙЧАС?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {scenarios.slice(0, 3).map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <button
                  onClick={() => setActiveScenario(activeScenario === i ? null : i)}
                  className={`hover-brutal w-full text-left p-8 border-[3px] -mt-[3px] -ml-[3px] group ${activeScenario === i ? 'border-primary bg-primary/10 animate-shake' : 'border-foreground/10'}`}
                >
                  <span className="text-mono text-muted-foreground mb-3 block">0{i + 1}</span>
                  <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4 transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${activeScenario === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.text}</p>
                    <blockquote className="border-l-[4px] border-primary pl-4 mb-4">
                      <p className="text-xs italic text-primary/80">{s.quote}</p>
                    </blockquote>
                    <Link to="/interactives" className="text-mono text-primary hover:text-foreground transition-colors">Погрузиться глубже →</Link>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 2 — between scenario groups ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/30 border-b-[3px]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[1]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ QUIZ — interleaved after first scenarios ═══ */}
      {showQuiz ? (
        <section className="py-16 px-6 border-t-[3px] border-primary" id="quiz">
          <div className="max-w-4xl mx-auto">
            <p className="text-mono text-primary mb-4 text-center">заглянуть в себя</p>
            <h2 className="heading-large text-center mb-8">ГДЕ Я СЕЙЧАС?</h2>
            <QuizShell />
          </div>
        </section>
      ) : (
        <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-mono text-primary mb-4">заглянуть в себя</p>
              <h2 className="heading-large mb-8">ГДЕ Я СЕЙЧАС<br />НА СВОЁМ ПУТИ?</h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto whitespace-pre-line">
                Пять вопросов, которые помогут остановиться{"\n"}и прислушаться к себе.
              </p>
              <button onClick={() => setShowQuiz(true)} className="brutal-btn animate-pulse-border">
                Посмотреть внутрь
              </button>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ═══ REMAINING 3 scenarios ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-4">продолжение</p>
            <h2 className="heading-large mb-16">А МОЖЕТ<br /><span className="text-stroke">ТАК?</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {scenarios.slice(3).map((s, i) => (
              <ScrollReveal key={i + 3} delay={i * 80}>
                <button
                  onClick={() => setActiveScenario(activeScenario === i + 3 ? null : i + 3)}
                  className={`hover-brutal w-full text-left p-8 border-[3px] -mt-[3px] -ml-[3px] group ${activeScenario === i + 3 ? 'border-primary bg-primary/10 animate-shake' : 'border-foreground/10'}`}
                >
                  <span className="text-mono text-muted-foreground mb-3 block">0{i + 4}</span>
                  <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4 transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${activeScenario === i + 3 ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.text}</p>
                    <blockquote className="border-l-[4px] border-primary pl-4 mb-4">
                      <p className="text-xs italic text-primary/80">{s.quote}</p>
                    </blockquote>
                    <Link to="/interactives" className="text-mono text-primary hover:text-foreground transition-colors">Погрузиться глубже →</Link>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 3 ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/20 bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[2]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10 bg-card/30">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-4">история автора</p>
            <h2 className="heading-large mb-20">ПУТЬ, КОТОРЫЙ<br />НЕЛЬЗЯ<br /><span className="text-stroke-primary">ЗАПЛАНИРОВАТЬ</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="hover-timeline border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] p-8 group">
                  <AnimatedNumber target={item.year} />
                  <h3 className="font-black text-lg uppercase tracking-tight mb-2 transition-colors">{item.label}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="mt-12">
              <Link to="/author" className="brutal-btn-outline inline-block">Полная история →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ EXCERPT 4 — before book ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[3]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BOOK ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
            <ScrollReveal className="lg:col-span-2">
              <div className="border-[3px] border-foreground/20 p-4 bg-card h-full flex items-center justify-center group overflow-hidden hover-brutal">
                <img src={bookCover} alt="Почему после 40 не поздно. И есть ли жизнь после монастыря?" className="w-full max-w-sm group-hover:scale-105 transition-all duration-700" loading="lazy" width={640} height={960} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="lg:col-span-3">
              <div className="border-[3px] border-foreground/20 -ml-0 lg:-ml-[3px] p-8 md:p-12 h-full flex flex-col justify-center">
                <p className="text-mono text-primary mb-4">книга</p>
                <h2 className="heading-large mb-4">ПОЧЕМУ ПОСЛЕ 40<br /><span className="text-primary">НЕ ПОЗДНО</span></h2>
                <p className="text-muted-foreground text-sm mb-6">И есть ли жизнь после монастыря?</p>
                <blockquote className="border-l-[6px] border-primary pl-6 mb-8">
                  <p className="text-lg italic text-muted-foreground leading-relaxed">
                    «Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре...»
                  </p>
                </blockquote>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Книга о том, как жизнь может развернуться неожиданно, если слушать себя и не бояться перемен.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/book" className="brutal-btn text-center">Читать о книге</Link>
                  <a href="https://www.litres.ru/book/elena-danilova-32959/pochemu-posle-40-ka-ne-pozdno-i-est-li-zhizn-posle-mo-70398937/" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline text-center">Электронная версия →</a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ VOICES TICKER ═══ */}
      <section className="py-8 border-t-[3px] border-b-[3px] border-primary overflow-hidden bg-primary">
        <div className="animate-ticker whitespace-nowrap flex gap-12">
          {[...voices, ...voices].map((v, i) => (
            <span key={i} className="font-black text-lg md:text-xl text-primary-foreground uppercase tracking-tight inline-block">{v}</span>
          ))}
        </div>
      </section>

      {/* ═══ EXCERPT 5 — before explore ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[4]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ EXPLORE ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-4">пространство для себя</p>
            <h2 className="heading-large mb-16">ИССЛЕДУЙ<br /><span className="text-stroke">СЕБЯ</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {[
              { title: 'Загляни внутрь', desc: 'Узнай, где ты сейчас', link: '/interactives' },
              { title: 'Карта перехода', desc: 'Визуализируй свой путь', link: '/interactives' },
              { title: 'Письмо из будущего', desc: 'Напиши себе через 5 лет', link: '/interactives' },
              { title: 'Дневник', desc: 'Размышления и голос автора', link: '/journal' },
              { title: 'История автора', desc: 'Путь, который вдохновляет', link: '/author' },
              { title: 'Книга', desc: 'Почему после 40 не поздно', link: '/book' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <Link to={item.link} className="hover-brutal block p-8 border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] group">
                  <span className="text-mono text-muted-foreground mb-2 block">0{i + 1}</span>
                  <h3 className="font-black text-xl uppercase tracking-tight mb-2 transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOFT CTA ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-section mb-8">
              ЕСЛИ ТЕБЕ НУЖЕН<br />НЕ ТОЛЬКО ОТКЛИК,<br />НО И <span className="text-primary">ЛИЧНЫЙ МАРШРУТ</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl">
              У меня есть формат глубокой индивидуальной работы. Без давления, без обещаний волшебства. Просто — рядом.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/support" className="brutal-btn-outline text-center">Узнать о сопровождении</Link>
              <Link to="/support#form" className="text-mono text-muted-foreground hover:text-primary transition-colors py-4">Оставить запрос →</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </SiteLayout>
  );
}
