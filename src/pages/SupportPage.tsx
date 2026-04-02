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
    console.log('Application submitted:', data);
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">если тебе нужно больше</p>
            <h1 className="heading-display mb-8 max-w-4xl">ЛИЧНЫЙ<br /><span className="text-primary">МАРШРУТ</span></h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-20">
              Иногда книги и тестов недостаточно. Иногда нужен живой человек рядом.
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

          {/* Form */}
          <div id="form" className="max-w-2xl">
            {submitted ? (
              <ScrollReveal>
                <div className="border-[3px] border-primary bg-primary/5 p-12">
                  <h2 className="heading-section mb-8">СПАСИБО<br />ЗА ДОВЕРИЕ</h2>
                  <p className="text-muted-foreground mb-12">Твой запрос получен. Я свяжусь с тобой в ближайшее время.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://t.me/danilovaelal" target="_blank" rel="noopener noreferrer" className="brutal-btn text-center">Telegram</a>
                    <a href="https://vk.ru/danilovaelal" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline text-center">ВКонтакте</a>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <div className="border-[3px] border-foreground/20 p-8 md:p-12">
                  <h2 className="heading-section mb-4">ОСТАВИТЬ<br />ЗАПРОС</h2>
                  <p className="text-muted-foreground mb-12">Без обязательств. Просто расскажи, что происходит.</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="text-mono text-muted-foreground block mb-2">Имя</label>
                      <input {...register('name')} className="w-full bg-transparent border-[3px] border-foreground/20 p-4 text-foreground font-bold focus:outline-none focus:border-primary transition-colors" placeholder="Как к тебе обращаться" />
                      {errors.name && <p className="text-sm text-destructive mt-2 font-bold">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-mono text-muted-foreground block mb-2">Способ связи</label>
                      <input {...register('contact')} className="w-full bg-transparent border-[3px] border-foreground/20 p-4 text-foreground font-bold focus:outline-none focus:border-primary transition-colors" placeholder="Telegram, WhatsApp, email..." />
                      {errors.contact && <p className="text-sm text-destructive mt-2 font-bold">{errors.contact.message}</p>}
                    </div>
                    <div>
                      <label className="text-mono text-muted-foreground block mb-2">Короткий запрос <span className="opacity-50">(необязательно)</span></label>
                      <textarea {...register('message')} className="w-full bg-transparent border-[3px] border-foreground/20 p-4 text-foreground resize-none h-32 font-bold focus:outline-none focus:border-primary transition-colors" placeholder="Что происходит..." />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" {...register('consent')} id="consent" className="mt-1 accent-primary w-5 h-5" />
                      <label htmlFor="consent" className="text-sm text-muted-foreground">
                        Я согласна на обработку данных в соответствии с <a href="/privacy" className="text-primary hover:underline">политикой конфиденциальности</a>
                      </label>
                    </div>
                    {errors.consent && <p className="text-sm text-destructive font-bold">{errors.consent.message}</p>}
                    <button type="submit" disabled={isSubmitting} className="brutal-btn disabled:opacity-50 w-full md:w-auto">
                      {isSubmitting ? 'Отправляю...' : 'Отправить запрос'}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
