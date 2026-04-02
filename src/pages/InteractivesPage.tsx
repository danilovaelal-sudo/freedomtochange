import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';
import QuizShell from '@/components/QuizShell';

const interactives = [
  { id: 'path-quiz', title: 'Где я сейчас на пути перемен', type: 'погружение', desc: 'Пять вопросов, которые помогут остановиться и прислушаться' },
  { id: 'blocks-quiz', title: 'Что удерживает меня от новой жизни', type: 'погружение', desc: 'Исследуй внутренние барьеры без оценки' },
  { id: 'future-quiz', title: 'Какой сценарий будущего мне ближе', type: 'погружение', desc: 'Посмотри на возможные пути' },
  { id: 'suppressed-quiz', title: 'Что я давно в себе подавляю', type: 'погружение', desc: 'Мягкое исследование подавленного' },
  { id: 'map', title: 'Карта моего перехода', type: 'практика', desc: 'Состояние → препятствие → ресурс → шаг' },
  { id: 'letter', title: 'Письмо себе из будущего', type: 'практика', desc: 'Guided experience от будущей тебя' },
  { id: 'awakening', title: 'Что во мне просыпается сейчас', type: 'погружение', desc: 'Исследование того, что зреет внутри' },
];

const bookQuotes: Record<string, string> = {
  'path-quiz': '«Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.»',
  'blocks-quiz': '«Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни.»',
  'future-quiz': '«Мне не хватило вот того времени беззаботности и свободы, когда можно все пробовать и не бояться ошибиться.»',
  'suppressed-quiz': '«С появлением Бога в моей жизни просто появилась другая Любовь. Я постепенно внедряла в свою жизнь все, что приближало меня к Богу.»',
  'map': '«Что так повлияло на мое решение вот так отважно и бесповоротно поменять свою жизнь?»',
  'letter': '«Было желание жить, как святые отцы пишут, отсекая все лишнее, мирское, все свое время посвящая молитве.»',
  'awakening': '«Я никогда не была серой мышью. Да, серьезная и молчаливая, но не замкнутая и нелюдимая.»',
};

const bookExcerpt = '«Некоторые истории вызывают у нас особое удивление и захватывают необычными почти нереальными приключениями.»';

function TransitionMap() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const steps = [
    { title: 'Моё состояние сейчас', options: ['Растерянность', 'Тревога', 'Тихая надежда', 'Усталость', 'Злость', 'Опустошённость'] },
    { title: 'Что мешает двигаться', options: ['Страх неизвестности', 'Чужие ожидания', 'Вина и стыд', 'Нет поддержки', 'Неверие в себя', 'Привычка терпеть'] },
    { title: 'Мой ресурс', options: ['Внутренняя сила', 'Вера', 'Желание перемен', 'Любовь к близким', 'Творчество', 'Усталость от прежнего'] },
    { title: 'Мой следующий шаг', options: ['Остановиться', 'Поговорить', 'Прочитать книгу', 'Пройти практику', 'Написать письмо', 'Подышать'] },
  ];

  if (step >= steps.length) {
    return (
      <div className="py-16">
        <h3 className="heading-section mb-12">ТВОЯ КАРТА<br />ПЕРЕХОДА</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-12">
          {choices.map((c, i) => (
            <div key={i} className="border-[3px] border-foreground/10 -ml-[3px] first:ml-0 p-6 hover:border-primary/30 transition-colors">
              <p className="text-mono text-primary text-xs mb-2">{steps[i].title}</p>
              <p className="font-black text-lg uppercase tracking-tight">{c}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-lg mb-8">Ты видишь свой путь. Ты уже в нём.</p>
        <button onClick={() => { setStep(0); setChoices([]); }} className="brutal-btn-outline">Пройти заново</button>
      </div>
    );
  }

  const current = steps[step];
  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-6">
        <p className="text-mono text-primary">{step + 1} / {steps.length}</p>
        {step > 0 && <button onClick={() => { setStep(step - 1); setChoices(choices.slice(0, -1)); }} className="text-mono text-muted-foreground hover:text-foreground">← Назад</button>}
      </div>
      <div className="w-full h-[4px] bg-foreground/10 mb-12 relative">
        <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <h3 className="heading-section mb-12">{current.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {current.options.map((opt, i) => (
          <button key={i} onClick={() => { setChoices([...choices, opt]); setStep(step + 1); }} className="p-6 border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] hover:border-primary hover:bg-primary/5 transition-all text-left group active:translate-x-[2px] active:translate-y-[2px]">
            <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FutureLetter() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const prompts = [
    'Что ты хочешь оставить в прошлом?',
    'Какой ты видишь себя через 5 лет?',
    'Что ты хочешь сказать себе сегодняшней?',
  ];

  if (step >= prompts.length) {
    return (
      <div className="py-16 max-w-2xl">
        <h3 className="heading-section mb-8">ПИСЬМО ТЕБЕ<br />ОТ БУДУЩЕЙ ТЕБЯ</h3>
        <div className="p-8 border-[3px] border-primary bg-primary/5 mb-12">
          <p className="font-black text-xl uppercase tracking-tight mb-6">Дорогая я,</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Я знаю, что ты хочешь оставить в прошлом: {answers[0]?.toLowerCase()}. И я хочу сказать тебе — ты сможешь.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Через 5 лет ты будешь {answers[1]?.toLowerCase()}. И это будет настоящая ты.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            А сегодня я хочу сказать тебе: {answers[2]}
          </p>
          <p className="font-black text-lg uppercase tracking-tight text-primary">
            С любовью, будущая ты.
          </p>
        </div>
        <button onClick={() => { setStep(0); setAnswers([]); }} className="brutal-btn-outline">Написать заново</button>
      </div>
    );
  }

  return (
    <div className="py-16 max-w-2xl">
      <p className="text-mono text-primary mb-4">{step + 1} / {prompts.length}</p>
      <h3 className="heading-section mb-8">{prompts[step]}</h3>
      <textarea
        className="w-full bg-transparent border-[3px] border-foreground/20 p-6 text-foreground font-bold text-lg resize-none h-40 focus:outline-none focus:border-primary transition-colors"
        placeholder="Напиши здесь..."
        value={answers[step] || ''}
        onChange={(e) => {
          const newAnswers = [...answers];
          newAnswers[step] = e.target.value;
          setAnswers(newAnswers);
        }}
      />
      <div className="flex justify-between mt-8">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="text-mono text-muted-foreground hover:text-foreground">← Назад</button>}
        <button onClick={() => setStep(step + 1)} disabled={!answers[step]?.trim()} className="brutal-btn disabled:opacity-30 ml-auto">
          {step < prompts.length - 1 ? 'Далее' : 'Получить письмо'}
        </button>
      </div>
    </div>
  );
}

/* Quiz: What holds me back */
function BlocksQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const questions = [
    { q: 'Когда ты думаешь о переменах, первое чувство?', opts: ['Страх', 'Вина', 'Возбуждение', 'Пустота'] },
    { q: 'Чей голос ты слышишь, когда хочешь что-то изменить?', opts: ['Мамы', 'Партнёра', 'Подруги', 'Свой собственный'] },
    { q: 'Что ты обычно делаешь с болью?', opts: ['Терплю', 'Отвлекаюсь', 'Плачу', 'Анализирую'] },
    { q: 'Что для тебя страшнее?', opts: ['Остаться как есть', 'Измениться и потерять всё', 'Не суметь', 'Быть осуждённой'] },
  ];
  const results = ['Тебя держит страх неизвестности. Это нормально — но за ним свобода.', 'Чужие голоса громче твоего. Пора учиться слышать себя.', 'Ты привыкла не чувствовать. Дай себе разрешение на боль.', 'Ты боишься чужого суда. Но твоя жизнь — только твоя.'];

  if (step >= questions.length) {
    const maxIdx = scores.indexOf(Math.max(...scores));
    return (
      <div className="py-16 max-w-2xl">
        <h3 className="heading-section mb-8">ТВОЙ РЕЗУЛЬТАТ</h3>
        <div className="p-8 border-[3px] border-primary bg-primary/5 mb-8">
          <p className="text-foreground text-lg font-bold">{results[maxIdx] || results[0]}</p>
        </div>
        <button onClick={() => { setStep(0); setScores([]); }} className="brutal-btn-outline">Пройти заново</button>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="py-16 max-w-2xl">
      <p className="text-mono text-primary mb-4">{step + 1} / {questions.length}</p>
      <h3 className="heading-section mb-8">{current.q}</h3>
      <div className="space-y-0">
        {current.opts.map((opt, i) => (
          <button key={i} onClick={() => { setScores([...scores, i]); setStep(step + 1); }} className="w-full text-left p-6 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all group">
            <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Quiz: Future scenario */
function FutureQuiz() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const questions = [
    { q: 'Через 3 года я хочу...', opts: ['Тишины и покоя', 'Новых отношений', 'Своего дела', 'Полной свободы'] },
    { q: 'Что для меня важнее?', opts: ['Стабильность', 'Развитие', 'Любовь', 'Творчество'] },
    { q: 'Я готова ради перемен...', opts: ['Рискнуть всем', 'Идти маленькими шагами', 'Попросить помощь', 'Пока не знаю'] },
  ];

  if (step >= questions.length) {
    return (
      <div className="py-16 max-w-2xl">
        <h3 className="heading-section mb-8">ТВОЙ СЦЕНАРИЙ</h3>
        <div className="p-8 border-[3px] border-primary bg-primary/5 mb-8">
          <p className="text-foreground text-lg font-bold mb-4">Ты выбираешь: {picks.join(' → ')}</p>
          <p className="text-muted-foreground">Твой путь уже начался. Каждый выбор — это шаг вперёд, даже если кажется, что ты стоишь на месте.</p>
        </div>
        <button onClick={() => { setStep(0); setPicks([]); }} className="brutal-btn-outline">Пройти заново</button>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="py-16 max-w-2xl">
      <p className="text-mono text-primary mb-4">{step + 1} / {questions.length}</p>
      <h3 className="heading-section mb-8">{current.q}</h3>
      <div className="space-y-0">
        {current.opts.map((opt, i) => (
          <button key={i} onClick={() => { setPicks([...picks, opt]); setStep(step + 1); }} className="w-full text-left p-6 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all group">
            <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Quiz: What I suppress */
function SuppressedQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questions = [
    { q: 'Что ты чаще всего скрываешь от окружающих?', opts: ['Злость', 'Грусть', 'Амбиции', 'Нежность'] },
    { q: 'Когда ты последний раз кричала?', opts: ['Не помню', 'Вчера', 'Давно', 'Я не кричу'] },
    { q: 'Что ты не позволяешь себе?', opts: ['Отдых', 'Ошибки', 'Желания', 'Быть слабой'] },
    { q: 'Какое чувство ты считаешь «неправильным»?', opts: ['Зависть', 'Ярость', 'Влечение', 'Безразличие'] },
  ];

  if (step >= questions.length) {
    return (
      <div className="py-16 max-w-2xl">
        <h3 className="heading-section mb-8">ТО, ЧТО ТЫ ПРЯЧЕШЬ</h3>
        <div className="p-8 border-[3px] border-primary bg-primary/5 mb-8">
          <p className="text-foreground text-lg font-bold mb-4">Ты подавляешь: {answers.join(', ').toLowerCase()}</p>
          <p className="text-muted-foreground">Каждое подавленное чувство — это часть тебя, которая просит внимания. Не суда, а внимания.</p>
        </div>
        <button onClick={() => { setStep(0); setAnswers([]); }} className="brutal-btn-outline">Пройти заново</button>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="py-16 max-w-2xl">
      <p className="text-mono text-primary mb-4">{step + 1} / {questions.length}</p>
      <h3 className="heading-section mb-8">{current.q}</h3>
      <div className="space-y-0">
        {current.opts.map((opt, i) => (
          <button key={i} onClick={() => { setAnswers([...answers, opt]); setStep(step + 1); }} className="w-full text-left p-6 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all group">
            <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Quiz: Awakening */
function AwakeningQuiz() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const questions = [
    { q: 'Что тебе снится в последнее время?', opts: ['Дорога', 'Вода', 'Полёт', 'Темнота'] },
    { q: 'Что ты замечаешь чаще?', opts: ['Красоту вокруг', 'Раздражение', 'Тоску', 'Энергию'] },
    { q: 'Что тебя тянет?', opts: ['Уехать', 'Создавать', 'Молчать', 'Говорить'] },
  ];

  if (step >= questions.length) {
    return (
      <div className="py-16 max-w-2xl">
        <h3 className="heading-section mb-8">ЧТО ПРОСЫПАЕТСЯ</h3>
        <div className="p-8 border-[3px] border-primary bg-primary/5 mb-8">
          <p className="text-foreground text-lg font-bold mb-4">В тебе просыпается: {picks.join(' + ').toLowerCase()}</p>
          <p className="text-muted-foreground">Это не случайность. Это ты — настоящая, под слоем привычного. Она уже здесь.</p>
        </div>
        <button onClick={() => { setStep(0); setPicks([]); }} className="brutal-btn-outline">Пройти заново</button>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="py-16 max-w-2xl">
      <p className="text-mono text-primary mb-4">{step + 1} / {questions.length}</p>
      <h3 className="heading-section mb-8">{current.q}</h3>
      <div className="space-y-0">
        {current.opts.map((opt, i) => (
          <button key={i} onClick={() => { setPicks([...picks, opt]); setStep(step + 1); }} className="w-full text-left p-6 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all group">
            <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InteractivesPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">пространство</p>
            <h1 className="heading-display mb-8 max-w-4xl">ЛАБОРАТОРИЯ<br /><span className="text-stroke">ВНУТРЕННЕГО</span><br /><span className="text-primary">ДВИЖЕНИЯ</span></h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-12">
              Пространство, где можно остановиться и исследовать себя. Без регистрации. Только ты и твои ответы.
            </p>
          </ScrollReveal>

          {!active && (
            <ScrollReveal delay={100}>
              <div className="mb-16 border-l-[6px] border-primary pl-8 py-4">
                <p className="italic text-muted-foreground text-base">{bookExcerpt}</p>
                <p className="text-mono text-primary mt-3">— из книги</p>
              </div>
            </ScrollReveal>
          )}

          {!active && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {interactives.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 80}>
                  <button
                    onClick={() => setActive(item.id)}
                    className="hover-brutal w-full text-left p-8 border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] group active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-mono text-primary">{item.type}</span>
                      <span className="text-mono text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-3 transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}

          {active && (
            <div>
              <button onClick={() => setActive(null)} className="text-mono text-muted-foreground hover:text-primary transition-colors mb-8">
                ← Вернуться к пространству
              </button>
              <h2 className="heading-section mb-4">{interactives.find(i => i.id === active)?.title}</h2>
              
              {bookQuotes[active] && (
                <div className="mb-8 border-l-[6px] border-primary pl-8 py-4 bg-primary/5">
                  <p className="italic text-muted-foreground text-sm">{bookQuotes[active]}</p>
                  <p className="text-mono text-primary text-xs mt-2">— из книги «Почему после 40 не поздно»</p>
                </div>
              )}

              {active === 'path-quiz' && <QuizShell />}
              {active === 'blocks-quiz' && <BlocksQuiz />}
              {active === 'future-quiz' && <FutureQuiz />}
              {active === 'suppressed-quiz' && <SuppressedQuiz />}
              {active === 'map' && <TransitionMap />}
              {active === 'letter' && <FutureLetter />}
              {active === 'awakening' && <AwakeningQuiz />}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
