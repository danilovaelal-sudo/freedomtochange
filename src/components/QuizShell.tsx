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
      { text: 'Понять, чего я хочу', scores: { seeking: 2, awakening: 1 } },
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
      { text: 'Вдохновляет, но я не знаю как', scores: { seeking: 2 } },
      { text: 'Я уже начала, но одинока', scores: { loss: 1, awakening: 1 } },
      { text: 'Верю, что возможно', scores: { awakening: 2, rebellion: 1 } },
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
    description: 'Ты чувствуешь, что прежнее уже не подходит, но новое ещё не оформилось. Это начало трансформации.',
    suggestion: 'Тебе может быть полезна «Карта моего перехода»',
    link: '/interactives',
  },
  {
    key: 'crisis',
    title: 'Ты в точке внутреннего напряжения',
    description: 'Тебе тяжело. Но именно в такие моменты рождается что-то настоящее. Ты не одна.',
    suggestion: 'Прочитай историю автора — она начинала заново не раз',
    link: '/author',
  },
  {
    key: 'loss',
    title: 'Ты переживаешь потерю прежней себя',
    description: 'Что-то важное ушло. Это больно, но за этой болью скрывается пространство для новой тебя.',
    suggestion: 'Книга написана именно об этом',
    link: '/book',
  },
  {
    key: 'rebellion',
    title: 'В тебе просыпается внутренний бунт',
    description: 'Ты устала соответствовать. Это не слабость — это сила. Твой бунт — это голос настоящей тебя.',
    suggestion: 'Попробуй «Письмо себе из будущего»',
    link: '/interactives',
  },
  {
    key: 'awakening',
    title: 'Ты уже просыпаешься',
    description: 'Ты чувствуешь движение внутри. Что-то меняется, и ты готова. Доверься этому.',
    suggestion: 'Исследуй интерактивы — там инструменты для следующего шага',
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full border-[3px] border-primary bg-primary/5 p-8 md:p-12">
          <p className="text-mono text-primary mb-6">Твой результат</p>
          <h2 className="heading-section mb-8">{result.title}</h2>
          <p className="body-editorial text-muted-foreground mb-6">{result.description}</p>
          <p className="text-mono text-primary/70 mb-8">{result.suggestion}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {result.link && (
              <a href={result.link} className="brutal-btn text-center">Перейти →</a>
            )}
            <button onClick={() => { setStep(0); setScores({}); setResult(null); }} className="brutal-btn-outline">
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-mono text-primary">{step + 1} / {questions.length}</p>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-mono text-muted-foreground hover:text-foreground transition-colors">
              ← Назад
            </button>
          )}
        </div>
        <div className="w-full h-[4px] bg-foreground/10 mb-12 relative">
          <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <h3 className="heading-section mb-12">{q.text}</h3>
        <div className="space-y-0">
          {q.answers.map((a, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(a.scores)}
              className="w-full text-left p-6 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all duration-200 group active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span className="text-lg font-bold group-hover:text-primary text-muted-foreground transition-colors">{a.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
