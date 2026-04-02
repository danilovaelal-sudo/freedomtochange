import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizShell from '@/components/QuizShell';

const interactives = [
  { id: 'path-quiz', title: 'Где я сейчас на пути перемен', type: 'тест', desc: 'Пять вопросов, которые помогут остановиться и прислушаться к себе' },
  { id: 'blocks-quiz', title: 'Что удерживает меня от новой жизни', type: 'тест', desc: 'Исследуй свои внутренние барьеры без оценки и осуждения' },
  { id: 'future-quiz', title: 'Какой сценарий будущего мне ближе', type: 'тест', desc: 'Посмотри на возможные пути и почувствуй, какой из них отзывается' },
  { id: 'suppressed-quiz', title: 'Что я давно в себе подавляю', type: 'тест', desc: 'Мягкое исследование того, что ты давно не позволяла себе чувствовать' },
  { id: 'map', title: 'Карта моего перехода', type: 'интерактив', desc: 'Визуальный маршрут: состояние → препятствие → ресурс → следующий шаг' },
  { id: 'letter', title: 'Письмо себе из будущего', type: 'интерактив', desc: 'Guided experience — серия вопросов и финальный текст от будущей тебя' },
  { id: 'awakening', title: 'Что во мне просыпается сейчас', type: 'интерактив', desc: 'Исследование того, что зреет внутри прямо сейчас' },
];

function TransitionMap() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const steps = [
    { title: 'Моё состояние сейчас', options: ['Растерянность', 'Тревога', 'Тихая надежда', 'Усталость', 'Злость', 'Опустошённость'] },
    { title: 'Что мешает мне двигаться', options: ['Страх неизвестности', 'Чужие ожидания', 'Вина и стыд', 'Отсутствие поддержки', 'Неверие в себя', 'Привычка терпеть'] },
    { title: 'Мой ресурс', options: ['Внутренняя сила', 'Вера', 'Желание перемен', 'Любовь к детям', 'Творчество', 'Усталость от прежнего'] },
    { title: 'Мой следующий шаг', options: ['Остановиться и прислушаться', 'Поговорить с кем-то', 'Прочитать книгу', 'Пройти ещё один тест', 'Написать себе письмо', 'Просто подышать'] },
  ];

  if (step >= steps.length) {
    return (
      <div className="py-16 text-center">
        <h3 className="heading-section mb-8">Твоя карта перехода</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          {choices.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="p-4 border border-primary/30 bg-card/50">
                <p className="text-mono text-muted-foreground text-xs mb-1">{steps[i].title}</p>
                <p className="font-serif text-lg">{c}</p>
              </div>
              {i < choices.length - 1 && <span className="text-muted-foreground hidden md:block">→</span>}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mb-8">Ты видишь свой путь. Ты уже в нём.</p>
        <button onClick={() => { setStep(0); setChoices([]); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Пройти заново</button>
      </div>
    );
  }

  const current = steps[step];
  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-8">
        <p className="text-mono text-muted-foreground">{step + 1} / {steps.length}</p>
        {step > 0 && <button onClick={() => { setStep(step - 1); setChoices(choices.slice(0, -1)); }} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>}
      </div>
      <div className="w-full h-px bg-border mb-12 relative">
        <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <h3 className="heading-section mb-12">{current.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {current.options.map((opt, i) => (
          <button key={i} onClick={() => { setChoices([...choices, opt]); setStep(step + 1); }} className="p-6 border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all text-left">
            <span className="font-serif text-xl">{opt}</span>
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
      <div className="py-16 max-w-2xl mx-auto text-center">
        <h3 className="heading-section mb-8">Письмо тебе от будущей тебя</h3>
        <div className="text-left p-8 border border-border/30 bg-card/30 mb-12">
          <p className="font-serif text-xl italic text-muted-foreground leading-relaxed mb-6">
            Дорогая я,
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Я знаю, что ты хочешь оставить в прошлом: {answers[0]?.toLowerCase()}. И я хочу сказать тебе — ты сможешь. Это уже не будет частью твоей жизни.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Через 5 лет ты будешь {answers[1]?.toLowerCase()}. И это будет настоящая ты.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            А сегодня я хочу сказать тебе: {answers[2]}
          </p>
          <p className="font-serif text-lg italic text-foreground">
            С любовью, будущая ты.
          </p>
        </div>
        <button onClick={() => { setStep(0); setAnswers([]); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Написать заново</button>
      </div>
    );
  }

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <p className="text-mono text-muted-foreground mb-4">{step + 1} / {prompts.length}</p>
      <h3 className="heading-section mb-8">{prompts[step]}</h3>
      <textarea
        className="w-full bg-transparent border border-border/50 p-6 text-foreground font-serif text-xl resize-none h-40 focus:outline-none focus:border-primary/50 transition-colors"
        placeholder="Напиши здесь..."
        value={answers[step] || ''}
        onChange={(e) => {
          const newAnswers = [...answers];
          newAnswers[step] = e.target.value;
          setAnswers(newAnswers);
        }}
      />
      <div className="flex justify-between mt-8">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>}
        <button onClick={() => setStep(step + 1)} disabled={!answers[step]?.trim()} className="px-8 py-3 bg-primary text-primary-foreground text-sm disabled:opacity-30 hover:bg-primary/80 transition-colors ml-auto">
          {step < prompts.length - 1 ? 'Далее' : 'Получить письмо'}
        </button>
      </div>
    </div>
  );
}

export default function InteractivesPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-6">интерактивы</p>
            <h1 className="heading-display mb-8">Лаборатория<br />внутреннего<br /><span className="italic">движения</span></h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-20">
              Пространство, где можно остановиться, прислушаться и исследовать себя. Без регистрации, без сохранения данных. Только ты и твои ответы.
            </p>
          </ScrollReveal>

          {!active && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interactives.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 80}>
                  <button
                    onClick={() => setActive(item.id)}
                    className="w-full text-left p-8 border border-border/30 hover:border-primary/30 hover:bg-card/30 transition-all duration-300 group"
                  >
                    <p className="text-mono text-accent mb-3">{item.type}</p>
                    <h3 className="font-serif text-2xl mb-3 group-hover:text-foreground transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}

          {active && (
            <div>
              <button onClick={() => setActive(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                ← Вернуться к списку
              </button>
              <h2 className="heading-section mb-4">{interactives.find(i => i.id === active)?.title}</h2>

              {active === 'path-quiz' && <QuizShell />}
              {active === 'map' && <TransitionMap />}
              {active === 'letter' && <FutureLetter />}

              {!['path-quiz', 'map', 'letter'].includes(active) && (
                <div className="py-16 text-center">
                  <p className="text-muted-foreground mb-8">Этот интерактив скоро будет доступен.</p>
                  <button onClick={() => setActive(null)} className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Вернуться
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
