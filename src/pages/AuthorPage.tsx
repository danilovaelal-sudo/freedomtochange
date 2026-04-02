import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import authorPortrait from '@/assets/author-portrait.jpeg';

export default function AuthorPage() {
  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
            <ScrollReveal>
              <div>
                <p className="text-mono text-muted-foreground mb-6">обо мне</p>
                <h1 className="heading-display mb-8">Елена<br />Данилова</h1>
                <p className="body-editorial text-muted-foreground">
                  Не эксперт сверху. Не коуч с формулами. Проводник — женщина, которая прошла свой путь и теперь помогает другим найти свой.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <img src={authorPortrait} alt="Елена Данилова" className="w-full grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" width={800} height={1200} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="heading-section mb-8">Моя история</h2>
              <div className="body-editorial text-muted-foreground space-y-8">
                <p>Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре, проводит в стенах обители 16 лет, возвращается в «мир» накануне своего сорокалетия, выходит замуж, рожает своего первого ребенка почти в 41 год, и в течение 7 лет успевает родить еще троих детей.</p>
                <p>Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.</p>
                <p>Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни. Я не могла говорить об этом даже с мужем.</p>
                <p>Речь пойдет не о том, зачем уходят в монастырь и почему возвращаются из него, не только о женщине, неожиданно ставшей многодетной мамой после 40 лет, не только о поиске предназначения и своего места в жизни. Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять Богу.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border-t border-border/20 pt-16 mt-20 max-w-3xl">
              <h2 className="heading-section mb-12">Мои ценности</h2>
              <div className="space-y-8">
                {[
                  { title: 'Честность', text: 'Перед собой — в первую очередь. Без фильтров, без красивых формулировок.' },
                  { title: 'Право на перемены', text: 'В любом возрасте. После любого опыта. Без разрешения окружающих.' },
                  { title: 'Вера и жизнь', text: 'Вера для меня — не побег от мира, а способ быть в нём глубже.' },
                  { title: 'Женская ценность', text: 'Вне достижений, статусов, ролей. Ты ценна просто потому, что ты есть.' },
                  { title: 'Позднее материнство', text: 'Как чудо, а не как отклонение от нормы.' },
                ].map((v, i) => (
                  <div key={i} className="pl-6 border-l border-primary/30">
                    <h3 className="font-serif text-xl mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border-t border-border/20 pt-16 mt-20 max-w-3xl">
              <h2 className="heading-section mb-8">Почему этот проект</h2>
              <p className="body-editorial text-muted-foreground">
                Потому что я знаю, каково это — стоять на краю и не видеть дороги. Потому что я прошла через всё это сама: через страх, через потерю, через возвращение к себе. И теперь я хочу быть рядом с теми, кто проходит свой путь.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-20 flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/80 transition-colors text-center">
                Читать книгу
              </Link>
              <Link to="/support" className="px-8 py-3 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
                Узнать о сопровождении
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
