import { useState, useCallback } from 'react';

interface Question {
  id: number;
  text: string;
  answers: { text: string; scores: Record<string, number> }[];
}

interface Result {
  key: string;
  title: string;
  description: string;
  suggestion: string;
  link?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Что ты чувствуешь, когда думаешь о своей жизни прямо сейчас?',
    answers: [
      { text: 'Тревогу — будто я что-то упускаю', scores: { seeking: 2, crisis: 1 } },
      { text: 'Пустоту — будто всё потеряло смысл', scores: { crisis: 2, loss: 1 } },
      { text: 'Злость — на себя, на обстоятельства', scores: { rebellion: 2, seeking: 1 } },
      { text: 'Тихую надежду — что-то новое зреет', scores: { awakening: 2 } },
    ],
  },
  {
    id: 2,
    text: 'Какое слово ближе всего описывает твоё состояние?',
    answers: [
      { text: 'Перепутье', scores: { seeking: 2 } },
      { text: 'Потеря', scores: { loss: 2, crisis: 1 } },
      { text: 'Пробуждение', scores: { awakening: 2 } },
      { text: 'Усталость', scores: { crisis: 2 } },
    ],
  },
  {
    id: 3,
    text: 'Что тебе сейчас нужнее всего?',
    answers: [
      { text: 'Понять, чего я на самом деле хочу', scores: { seeking: 2, awakening: 1 } },
      { text: 'Перестать бояться перемен', scores: { crisis: 1, rebellion: 2 } },
      { text: 'Найти опору внутри себя', scores: { loss: 1, awakening: 2 } },
      { text: 'Разрешить себе жить по-другому', scores: { rebellion: 2, seeking: 1 } },
    ],
  },
  {
    id: 4,
    text: 'Как ты относишься к идее «начать заново»?',
    answers: [
      { text: 'Это пугает', scores: { crisis: 2 } },
      { text: 'Это вдохновляет, но я не знаю как', scores: { seeking: 2 } },
      { text: 'Я уже начала, но чувствую себя одинокой', scores: { loss: 1, awakening: 1 } },
      { text: 'Я верю, что это возможно', scores: { awakening: 2, rebellion: 1 } },
    ],
  },
  {
    id: 5,
    text: 'Что мешает тебе двигаться дальше?',
    answers: [
      { text: 'Страх осуждения', scores: { crisis: 1, rebellion: 2 } },
      { text: 'Непонимание, куда идти', scores: { seeking: 2 } },
      { text: 'Чувство, что уже поздно', scores: { crisis: 2, loss: 1 } },
      { text: 'Ничего — я уже в движении', scores: { awakening: 2 } },
    ],
  },
];

const results: Result[] = [
  {
    key: 'seeking',
    title: 'Ты на пороге нового пути',
    description: 'Ты чувствуешь, что прежнее уже не подходит, но новое ещё не оформилось. Это не кризис — это начало трансформации. Ты ищешь себя, и само это стремление — уже шаг вперёд.',
    suggestion: 'Тебе может быть полезна «Карта моего перехода»',
    link: '/interactives',
  },
  {
    key: 'crisis',
    title: 'Ты в точке внутреннего напряжения',
    description: 'Тебе тяжело. Возможно, ты чувствуешь, что всё рушится или застыло. Но именно в такие моменты рождается что-то настоящее. Ты не одна в этом.',
    suggestion: 'Прочитай историю автора — она начинала заново не раз',
    link: '/author',
  },
  {
    key: 'loss',
    title: 'Ты переживаешь потерю прежней себя',
    description: 'Что-то важное ушло — отношения, уверенность, ощущение опоры. Это больно, но за этой болью скрывается пространство для новой тебя.',
    suggestion: 'Книга «Почему после 40 не поздно» написана именно об этом',
    link: '/book',
  },
  {
    key: 'rebellion',
    title: 'В тебе просыпается внутренний бунт',
    description: 'Ты устала соответствовать. Устала быть удобной. Это не слабость — это сила, которая ищет выход. Твой бунт — это голос настоящей тебя.',
    suggestion: 'Попробуй «Письмо себе из будущего»',
    link: '/interactives',
  },
  {
    key: 'awakening',
    title: 'Ты уже просыпаешься',
    description: 'Ты чувствуешь движение внутри. Что-то меняется, и ты готова идти навстречу этому. Доверься этому ощущению — оно ведёт тебя верно.',
    suggestion: 'Исследуй пространство интерактивов — там есть инструменты для следующего шага',
    link: '/interactives',
  },
];

export default function QuizShell({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const handleAnswer = useCallback((answerScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([k, v]) => {
      newScores[k] = (newScores[k] || 0) + v;
    });
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const maxKey = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'seeking';
      setResult(results.find(r => r.key === maxKey) || results[0]);
    }
  }, [scores, step]);

  if (result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-mono text-muted-foreground mb-6">Твой результат</p>
        <h2 className="heading-section mb-8 max-w-2xl">{result.title}</h2>
        <p className="body-editorial text-muted-foreground max-w-xl mb-8">{result.description}</p>
        <p className="text-sm text-accent mb-8">{result.suggestion}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          {result.link && (
            <a href={result.link} className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors">
              Перейти →
            </a>
          )}
          <button onClick={() => { setStep(0); setScores({}); setResult(null); }} className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
            Пройти заново
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <p className="text-mono text-muted-foreground">{step + 1} / {questions.length}</p>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Назад
            </button>
          )}
        </div>
        <div className="w-full h-px bg-border mb-12 relative">
          <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <h3 className="heading-section mb-12">{q.text}</h3>
        <div className="space-y-4">
          {q.answers.map((a, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(a.scores)}
              className="w-full text-left p-6 border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
            >
              <span className="body-editorial group-hover:text-foreground text-muted-foreground transition-colors">{a.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
