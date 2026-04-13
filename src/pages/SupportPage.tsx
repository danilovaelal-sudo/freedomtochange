import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';

export default function SupportPage() {
  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">если тебе нужно больше</p>
            <h1 className="heading-display mb-8 max-w-4xl">ЛИЧНЫЙ<br /><span className="text-primary">МАРШРУТ</span></h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-20">
              Иногда книги недостаточно. Иногда нужен живой человек рядом.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20">
            <ScrollReveal delay={100}>
              <div className="border-[3px] border-foreground/20 p-8 md:p-12">
                <h2 className="heading-section mb-8">ДЛЯ КОГО</h2>
                <div className="space-y-0">
                  {[
                    'Ты переживаешь развод или потерю',
                    'Ты потеряла себя',
                    'Ты боишься перемен',
                    'Тебе нужна поддержка в переходе',
                    'Ты хочешь разобраться глубоко и честно',
                  ].map((item, i) => (
                    <p key={i} className="pl-6 border-l-[4px] border-primary text-muted-foreground py-3 border-b border-foreground/5">{item}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="border-[3px] border-foreground/20 -ml-0 lg:-ml-[3px] -mt-[3px] lg:mt-0 p-8 md:p-12">
                <h2 className="heading-section mb-8">ФОРМАТЫ</h2>
                <div className="space-y-0">
                  {[
                    { title: 'Разовая беседа', desc: 'Одна глубокая встреча' },
                    { title: 'Сопровождение', desc: 'Серия встреч на несколько недель' },
                    { title: 'Письменный формат', desc: 'Переписка как рефлексия' },
                    { title: 'По запросу', desc: 'Напиши — найдём формат' },
                  ].map((item, i) => (
                    <div key={i} className="py-4 border-b border-foreground/5">
                      <h3 className="font-black text-lg uppercase tracking-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact block */}
          <div id="form" className="max-w-2xl">
            <ScrollReveal>
              <div className="border-[3px] border-foreground/20 p-8 md:p-12">
                <h2 className="heading-section mb-4">СВЯЖИСЬ<br />СО МНОЙ</h2>
                <p className="text-muted-foreground mb-12">Напиши любым удобным способом. Без обязательств — просто расскажи, что происходит.</p>
                <div className="space-y-6">
                  <a href="https://t.me/danilovaelal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <span className="brutal-btn text-center w-full md:w-auto">Telegram</span>
                  </a>
                  <a href="https://vk.com/danilovaelal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <span className="brutal-btn-outline text-center w-full md:w-auto">ВКонтакте</span>
                  </a>
                  <a href="mailto:ddanilovaelal@yandex.ru" className="flex items-center gap-4 group">
                    <span className="brutal-btn-outline text-center w-full md:w-auto">ddanilovaelal@yandex.ru</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
