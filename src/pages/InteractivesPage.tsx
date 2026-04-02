import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizShell from '@/components/QuizShell';

const interactives = [
  { id: 'path-quiz', title: 'Где я сейчас на пути перемен', type: 'тест', desc: 'Пять вопросов, которые помогут остановиться и прислушаться' },
  { id: 'blocks-quiz', title: 'Что удерживает меня от новой жизни', type: 'тест', desc: 'Исследуй внутренние барьеры без оценки' },
  { id: 'future-quiz', title: 'Какой сценарий будущего мне ближе', type: 'тест', desc: 'Посмотри на возможные пути' },
  { id: 'suppressed-quiz', title: 'Что я давно в себе подавляю', type: 'тест', desc: 'Мягкое исследование подавленного' },
  { id: 'map', title: 'Карта моего перехода', type: 'интерактив', desc: 'Состояние → препятствие → ресурс → шаг' },
  { id: 'letter', title: 'Письмо себе из будущего', type: 'интерактив', desc: 'Guided experience от будущей тебя' },
  { id: 'awakening', title: 'Что во мне просыпается сейчас', type: 'интерактив', desc: 'Исследование того, что зреет внутри' },
];

function TransitionMap() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const steps = [
    { title: 'Моё состояние сейчас', options: ['Растерянность', 'Тревога', 'Тихая надежда', 'Усталость', 'Злость', 'Опустошённость'] },
    { title: 'Что мешает двигаться', options: ['Страх неизвестности', 'Чужие ожидания', 'Вина и стыд', 'Нет поддержки', 'Неверие в себя', 'Привычка терпеть'] },
    { title: 'Мой ресурс', options: ['Внутренняя сила', 'Вера', 'Желание перемен', 'Любовь к детям', 'Творчество', 'Усталость от прежнего'] },
    { title: 'Мой следующий шаг', options: ['Остановиться', 'Поговорить', 'Прочитать книгу', 'Пройти тест', 'Написать письмо', 'Подышать'] },
  ];

  if (step >= steps.length) {
    return (
      <div className="py-16">
        <h3 className="heading-section mb-12">ТВОЯ КАРТА<br />ПЕРЕХОДА</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-12">
          {choices.map((c, i) => (
            <div key={i} className="border-[3px] border-foreground/10 -ml-[3px] first:ml-0 p-6">
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
          <button key={i} onClick={() => { setChoices([...choices, opt]); setStep(step + 1); }} className="p-6 border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] hover:border-primary hover:bg-primary/5 transition-all text-left group">
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

export default function InteractivesPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">интерактивы</p>
            <h1 className="heading-display mb-8 max-w-4xl">ЛАБОРАТОРИЯ<br /><span className="text-stroke">ВНУТРЕННЕГО</span><br /><span className="text-primary">ДВИЖЕНИЯ</span></h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-20">
              Пространство, где можно остановиться и исследовать себя. Без регистрации. Только ты и твои ответы.
            </p>
          </ScrollReveal>

          {!active && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {interactives.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 60}>
                  <button
                    onClick={() => setActive(item.id)}
                    className="w-full text-left p-8 border-[3px] border-foreground/10 -mt-[3px] -ml-[3px] hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-mono text-primary">{item.type}</span>
                      <span className="text-mono text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}

          {active && (
            <div>
              <button onClick={() => setActive(null)} className="text-mono text-muted-foreground hover:text-primary transition-colors mb-8">
                ← Вернуться к списку
              </button>
              <h2 className="heading-section mb-4">{interactives.find(i => i.id === active)?.title}</h2>

              {active === 'path-quiz' && <QuizShell />}
              {active === 'map' && <TransitionMap />}
              {active === 'letter' && <FutureLetter />}

              {!['path-quiz', 'map', 'letter'].includes(active) && (
                <div className="py-16 border-[3px] border-foreground/10 p-12 text-center mt-8">
                  <p className="text-muted-foreground mb-8 text-lg">Этот интерактив скоро будет доступен.</p>
                  <button onClick={() => setActive(null)} className="brutal-btn-outline">Вернуться</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
