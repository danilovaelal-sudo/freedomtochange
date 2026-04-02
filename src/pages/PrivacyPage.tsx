import SiteLayout from '@/components/SiteLayout';

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-large mb-12">Политика конфиденциальности</h1>
          <div className="body-editorial text-muted-foreground space-y-8">
            <p>Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
            
            <h2 className="font-serif text-2xl text-foreground">1. Сбор данных</h2>
            <p>Мы собираем только те данные, которые вы добровольно предоставляете через формы на сайте: имя и контактные данные для обратной связи.</p>
            
            <h2 className="font-serif text-2xl text-foreground">2. Использование данных</h2>
            <p>Персональные данные используются исключительно для связи с вами по вашему запросу. Данные не передаются третьим лицам.</p>
            
            <h2 className="font-serif text-2xl text-foreground">3. Результаты тестов</h2>
            <p>Результаты интерактивных тестов и упражнений не сохраняются на сервере и не связываются с вашей личностью.</p>
            
            <h2 className="font-serif text-2xl text-foreground">4. Защита данных</h2>
            <p>Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа.</p>
            
            <h2 className="font-serif text-2xl text-foreground">5. Контакты</h2>
            <p>По вопросам обработки персональных данных вы можете связаться с нами через Telegram или ВКонтакте.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
