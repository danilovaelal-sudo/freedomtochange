import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  'Это пространство, где можно перестать держаться из последних сил.\nГде не нужно казаться сильной, правильной и удобной.\nГде можно честно посмотреть на свою жизнь, услышать себя, вернуть опору и понять, куда идти дальше.',
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

/* Cursor-following glow for hero */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const onMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => setVisible(false));
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', () => setVisible(false));
    };
  }, [onMove]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-opacity duration-300"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsl(24 100% 50% / 0.1) 0%, transparent 70%)',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

/* Ripple button wrapper */
function RippleButton({ children, className = '', onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.className = 'ripple';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    onClick?.(e);
  };

  return (
    <button ref={btnRef} className={`ripple-container ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

/* Morphing blob decoration */
function MorphBlob({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute animate-morph bg-primary/5 blur-3xl ${className}`} />
  );
}

/* Rotating typography ring */
function TypoRing({ text, className = '' }: { text: string; className?: string }) {
  const chars = text.split('');
  return (
    <div className={`animate-spin-slow ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <path id="circlePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" fill="none" />
        </defs>
        <text className="fill-primary/30 text-[11px] font-black uppercase tracking-[0.3em]">
          <textPath href="#circlePath">
            {chars.map((c, i) => c).join('')}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref: heroRef, offset: heroOffset } = useParallax(0.25);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <SiteLayout>
      {/* ═══ HERO — Art-house + Material ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <CursorGlow />
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-20 grayscale contrast-150"
            style={{ transform: `translateY(${heroOffset}px) scale(1.15)`, willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>

        {/* Decorative rotating text ring */}
        <div className="absolute top-20 right-4 md:right-16 w-32 md:w-48 h-32 md:h-48 opacity-20">
          <TypoRing text="НЕ ПОЗДНО • НАЧНИ СЕЙЧАС • ТВОЯ ИСТОРИЯ • " />
        </div>

        {/* Morphing blob */}
        <MorphBlob className="w-[600px] h-[600px] -bottom-40 -left-40 opacity-30" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20 pt-40">
          <div className="md-chip mb-6 animate-fade-up" style={{ animationDelay: '0s' }}>
            пространство для тех, кто в переходе
          </div>
          <h1 className="text-[2.2rem] md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-6 animate-fade-up animation-delay-200 max-w-5xl">
            ТЫ НЕ<br />
            <span className="text-primary">ОПОЗДАЛА.</span><br />
            <span className="text-stroke">ТВОЯ ИСТОРИЯ</span><br />
            ЕЩЁ ПРОДОЛЖАЕТСЯ.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-12 animate-fade-up animation-delay-400 font-light">
            Книга, пространство и поддержка для женщин, которые ищут новый путь.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-600">
            <Link to="/interactives" className="brutal-btn inline-block text-center">
              Посмотреть внутрь
            </Link>
            <Link to="/support" className="brutal-btn-outline">
              записаться на консультацию
            </Link>
          </div>
        </div>

        {/* Scroll indicator — Material style */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in animation-delay-1000">
          <span className="text-mono text-muted-foreground text-[10px]">скролль</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-float" />
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 1 — Material surface card ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="md-surface p-8 md:p-12">
              <blockquote className="book-quote text-lg md:text-xl border-l-primary">{bookExcerpts[0]}</blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MANIFESTO — kinetic typography ═══ */}
      <section className="py-24 md:py-40 px-6 border-t-[3px] border-foreground/10 relative overflow-hidden">
        <MorphBlob className="w-[400px] h-[400px] top-20 -right-40 opacity-20" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="md-chip mb-12">манифест</div>
          {manifestItems.map((item, i) => (
            <KineticLine key={i} text={item} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ WHO ARE YOU — first 3 scenarios — Material cards ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="md-chip mb-4">нажми и почувствуй</div>
            <h2 className="heading-large mb-16">КТО ТЫ<br />СЕЙЧАС?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {scenarios.slice(0, 3).map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <RippleButton
                  onClick={() => setActiveScenario(activeScenario === i ? null : i)}
                  className={`hover-brutal w-full text-left p-8 border-[3px] group transition-all duration-300 ${activeScenario === i ? 'border-primary bg-primary/10 animate-shake' : 'border-foreground/10'}`}
                >
                  <span className="md-chip mb-3">0{i + 1}</span>
                  <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4 mt-3 transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ${activeScenario === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.text}</p>
                    <blockquote className="border-l-[4px] border-primary pl-4 mb-4">
                      <p className="text-xs italic text-primary/80">{s.quote}</p>
                    </blockquote>
                    <Link to="/interactives" className="text-mono text-primary hover:text-foreground transition-colors">Погрузиться глубже →</Link>
                  </div>
                </RippleButton>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 2 — floating diagonal ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/30 border-b-[3px] art-diagonal">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="md-surface p-8 md:p-12">
              <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[1]}</blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ QUIZ — Material surface ═══ */}
      {showQuiz ? (
        <section className="py-16 px-6 border-t-[3px] border-primary" id="quiz">
          <div className="max-w-4xl mx-auto">
            <div className="md-chip mb-4 mx-auto w-fit">заглянуть в себя</div>
            <h2 className="heading-large text-center mb-8">ГДЕ Я СЕЙЧАС?</h2>
            <div className="md-surface p-6 md:p-10">
              <QuizShell />
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10 relative overflow-hidden">
          <MorphBlob className="w-[500px] h-[500px] -bottom-60 -right-60 opacity-20" />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="md-chip mb-4 mx-auto w-fit">заглянуть в себя</div>
              <h2 className="heading-large mb-8">ГДЕ Я СЕЙЧАС<br />НА СВОЁМ ПУТИ?</h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto whitespace-pre-line">
                Пять вопросов, которые помогут остановиться{"\n"}и прислушаться к себе.
              </p>
              <Link to="/interactives" className="brutal-btn animate-pulse-border inline-block text-center">
                Посмотреть внутрь
              </Link>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ═══ REMAINING 3 scenarios ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="md-chip mb-4">продолжение</div>
            <h2 className="heading-large mb-16">А МОЖЕТ<br /><span className="text-stroke">ТАК?</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {scenarios.slice(3).map((s, i) => (
              <ScrollReveal key={i + 3} delay={i * 80}>
                <RippleButton
                  onClick={() => setActiveScenario(activeScenario === i + 3 ? null : i + 3)}
                  className={`hover-brutal w-full text-left p-8 border-[3px] group transition-all duration-300 ${activeScenario === i + 3 ? 'border-primary bg-primary/10 animate-shake' : 'border-foreground/10'}`}
                >
                  <span className="md-chip mb-3">0{i + 4}</span>
                  <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4 mt-3 transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ${activeScenario === i + 3 ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.text}</p>
                    <blockquote className="border-l-[4px] border-primary pl-4 mb-4">
                      <p className="text-xs italic text-primary/80">{s.quote}</p>
                    </blockquote>
                    <Link to="/interactives" className="text-mono text-primary hover:text-foreground transition-colors">Погрузиться глубже →</Link>
                  </div>
                </RippleButton>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 3 ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/20 bg-primary/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="md-surface p-8 md:p-12 bg-primary/5">
              <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[2]}</blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TIMELINE — Material elevated cards ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10 bg-card/30 relative overflow-hidden">
        <MorphBlob className="w-[300px] h-[300px] top-10 left-10 opacity-15" />
        <div className="max-w-[1400px] mx-auto relative">
          <ScrollReveal>
            <div className="md-chip mb-4">история автора</div>
            <h2 className="heading-large mb-20">ПУТЬ, КОТОРЫЙ<br />НЕЛЬЗЯ<br /><span className="text-stroke-primary">ЗАПЛАНИРОВАТЬ</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="hover-timeline border-[3px] border-foreground/10 p-8 group">
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

      {/* ═══ BOOK — Material elevated layout ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10 relative overflow-hidden">
        <MorphBlob className="w-[500px] h-[500px] -top-40 -right-40 opacity-15" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            <ScrollReveal className="lg:col-span-2">
              <div className="md-surface p-4 h-full flex items-center justify-center group overflow-hidden border-[3px] border-foreground/20 hover:border-primary transition-all duration-500">
                <img 
                  src={bookCover} 
                  alt="Почему после 40 не поздно. И есть ли жизнь после монастыря?" 
                  className="w-full max-w-sm group-hover:scale-105 group-hover:rotate-1 transition-all duration-700" 
                  loading="lazy" width={640} height={960} 
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="lg:col-span-3">
              <div className="md-surface border-[3px] border-foreground/20 p-8 md:p-12 h-full flex flex-col justify-center">
                <div className="md-chip mb-4 w-fit">книга</div>
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

      {/* ═══ VOICES MARQUEE — art-house running text ═══ */}
      <section className="py-8 border-t-[3px] border-b-[3px] border-primary overflow-hidden bg-primary">
        <div className="marquee-wrap">
          <div className="marquee-inner gap-12">
            {[...voices, ...voices].map((v, i) => (
              <span key={i} className="font-black text-lg md:text-xl text-primary-foreground uppercase tracking-tight inline-block px-4">{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXCERPT 5 ═══ */}
      <section className="py-12 md:py-16 px-6 border-t-[3px] border-primary/20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <blockquote className="book-quote text-lg md:text-xl">{bookExcerpts[4]}</blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ EXPLORE — Material card grid ═══ */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <MorphBlob className="w-[400px] h-[400px] -bottom-40 left-1/2 opacity-15" />
        <div className="max-w-[1400px] mx-auto relative">
          <ScrollReveal>
            <div className="md-chip mb-4">пространство для себя</div>
            <h2 className="heading-large mb-16">ИССЛЕДУЙ<br /><span className="text-stroke">СЕБЯ</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Загляни внутрь', desc: 'Узнай, где ты сейчас', link: '/interactives' },
              { title: 'Карта перехода', desc: 'Визуализируй свой путь', link: '/interactives' },
              { title: 'Письмо из будущего', desc: 'Напиши себе через 5 лет', link: '/interactives' },
              { title: 'Дневник', desc: 'Размышления и голос автора', link: '/journal' },
              { title: 'История автора', desc: 'Путь, который вдохновляет', link: '/author' },
              { title: 'Книга', desc: 'Почему после 40 не поздно', link: '/book' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <Link to={item.link} className="hover-brutal block p-8 border-[3px] border-foreground/10 group">
                  <span className="md-chip mb-2">0{i + 1}</span>
                  <h3 className="font-black text-xl uppercase tracking-tight mb-2 mt-3 transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOFT CTA — Material elevated ═══ */}
      <section className="py-24 md:py-32 px-6 border-t-[3px] border-foreground/10 relative overflow-hidden">
        <MorphBlob className="w-[600px] h-[600px] -top-40 -left-40 opacity-10" />
        <ScrollReveal>
          <div className="max-w-3xl mx-auto relative">
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

      {/* ═══ FAB — back to top ═══ */}
      {scrollY > 600 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="md-fab animate-fade-in"
          aria-label="Наверх"
        >
          ↑
        </button>
      )}
    </SiteLayout>
  );
}
