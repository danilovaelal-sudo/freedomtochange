import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Укажите имя').max(100),
  contact: z.string().min(1, 'Укажите способ связи').max(255),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Необходимо согласие' }) }),
});

type FormData = z.infer<typeof schema>;

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // In production, this would save to Supabase
    console.log('Application submitted:', data);
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-6">если тебе нужно больше</p>
            <h1 className="heading-display mb-8">Личный<br /><span className="italic">маршрут</span></h1>
            <p className="body-editorial text-muted-foreground mb-20">
              Иногда книги и тестов недостаточно. Иногда нужен живой человек рядом — не тот, кто знает ответы, а тот, кто умеет слушать и быть.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border-t border-border/20 pt-16 mb-20">
              <h2 className="heading-section mb-8">Для кого</h2>
              <div className="space-y-4">
                {[
                  'Ты переживаешь развод, расставание или потерю',
                  'Ты чувствуешь, что потеряла себя и не знаешь, куда дальше',
                  'Ты боишься перемен, но понимаешь, что они неизбежны',
                  'Тебе нужна поддержка в переходном периоде жизни',
                  'Ты хочешь разобраться в себе — глубоко и честно',
                ].map((item, i) => (
                  <p key={i} className="pl-6 border-l border-primary/30 text-muted-foreground">{item}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border-t border-border/20 pt-16 mb-20">
              <h2 className="heading-section mb-8">Форматы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Разовая беседа', desc: 'Одна глубокая встреча — чтобы остановиться и услышать себя' },
                  { title: 'Сопровождение', desc: 'Серия встреч на протяжении нескольких недель или месяцев' },
                  { title: 'Письменный формат', desc: 'Переписка как пространство для рефлексии' },
                  { title: 'По запросу', desc: 'Если ни один формат не подходит — напиши, и мы найдём' },
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-border/30">
                    <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <div id="form" className="border-t border-border/20 pt-16">
            {submitted ? (
              <ScrollReveal>
                <div className="text-center py-16">
                  <h2 className="heading-section mb-8">Спасибо за доверие</h2>
                  <p className="text-muted-foreground mb-12">Твой запрос получен. Я свяжусь с тобой в ближайшее время.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://t.me/danilovaelal" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors">
                      Telegram
                    </a>
                    <a href="https://vk.ru/danilovaelal" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                      ВКонтакте
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <h2 className="heading-section mb-8">Оставить запрос</h2>
                <p className="text-muted-foreground mb-12">Без обязательств. Просто расскажи, что происходит — и мы вместе разберёмся, нужно ли идти дальше.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Имя</label>
                    <input {...register('name')} className="w-full bg-transparent border border-border/50 p-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="Как к тебе обращаться" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Удобный способ связи</label>
                    <input {...register('contact')} className="w-full bg-transparent border border-border/50 p-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="Telegram, WhatsApp, email..." />
                    {errors.contact && <p className="text-sm text-destructive mt-1">{errors.contact.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Короткий запрос <span className="text-muted-foreground/50">(необязательно)</span></label>
                    <textarea {...register('message')} className="w-full bg-transparent border border-border/50 p-4 text-foreground resize-none h-32 focus:outline-none focus:border-primary/50 transition-colors" placeholder="Что происходит, с чем нужна помощь..." />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" {...register('consent')} id="consent" className="mt-1 accent-primary" />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      Я согласна на обработку персональных данных в соответствии с <a href="/privacy" className="underline hover:text-foreground transition-colors">политикой конфиденциальности</a>
                    </label>
                  </div>
                  {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}
                  <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/80 transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Отправляю...' : 'Отправить запрос'}
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
