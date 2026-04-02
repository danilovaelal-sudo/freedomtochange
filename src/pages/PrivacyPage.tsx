import SiteLayout from '@/components/SiteLayout';

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-large mb-12">ПОЛИТИКА<br />КОНФИДЕН-<br />ЦИАЛЬНОСТИ</h1>
          <div className="space-y-8 border-[3px] border-foreground/10 p-8 md:p-12">
            <p className="body-editorial text-muted-foreground">Настоящая политика определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
            
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight mb-2">01 — Сбор данных</h2>
              <p className="text-muted-foreground">Мы собираем только данные, которые вы добровольно предоставляете через формы: имя и контактные данные.</p>
            </div>
            
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight mb-2">02 — Использование</h2>
              <p className="text-muted-foreground">Данные используются исключительно для связи по вашему запросу. Не передаются третьим лицам.</p>
            </div>
            
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight mb-2">03 — Результаты тестов</h2>
              <p className="text-muted-foreground">Результаты интерактивных тестов не сохраняются на сервере и не связываются с вашей личностью.</p>
            </div>
            
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight mb-2">04 — Защита</h2>
              <p className="text-muted-foreground">Мы принимаем необходимые меры для защиты данных от несанкционированного доступа.</p>
            </div>
            
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight mb-2">05 — Контакты</h2>
              <p className="text-muted-foreground">По вопросам обработки данных свяжитесь через Telegram или ВКонтакте.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
