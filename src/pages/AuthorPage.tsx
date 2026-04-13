import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import authorPortrait from '@/assets/author-portrait.jpeg';

export default function AuthorPage() {
  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch mb-24">
            <ScrollReveal>
              <div className="border-[3px] border-foreground/20 p-8 md:p-12 flex flex-col justify-center h-full">
                <p className="text-mono text-primary mb-6">обо мне</p>
                <h1 className="heading-display mb-8">ЕЛЕНА<br /><span className="text-primary">ДАНИЛОВА</span></h1>
                <p className="body-editorial text-muted-foreground max-w-md">
                  Не эксперт сверху. Не коуч с формулами. Проводник — женщина, которая прошла свой путь и помогает другим.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative border-[3px] border-foreground/20 -ml-0 lg:-ml-[3px] -mt-[3px] lg:mt-0 overflow-hidden group">
                <img src={authorPortrait} alt="Елена Данилова" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" loading="lazy" width={800} height={1200} />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
                <span className="absolute bottom-4 right-6 font-black text-8xl text-primary/30">///</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Book excerpt */}
          <ScrollReveal>
            <div className="mb-16 border-l-[6px] border-primary pl-8 py-6">
              <p className="italic text-muted-foreground text-lg leading-relaxed">
                «Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре, проводит в стенах обители 16 лет, возвращается в «мир», выходит замуж, рожает первого ребенка почти в 41 год, и в течение 7 лет успевает родить еще троих.»
              </p>
              <p className="text-mono text-primary mt-4">— из книги «Почему не поздно»</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-3xl border-[3px] border-foreground/10 p-8 md:p-12">
              <h2 className="heading-section mb-8">МОЯ<br />ИСТОРИЯ</h2>
              <div className="body-editorial text-muted-foreground space-y-6">
                <p>Красный диплом МГУ, 16 лет жизни в монастыре<br />Замужество в 40<br />4 детей после 40</p>
                <p>Несколько профессий, написанная книга, непрерывные поиски себя и своего места. Глубокая вера Богу и умение жить в перехорных точках.</p>
                <p>Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-16 max-w-3xl">
              <h2 className="heading-section mb-12">МОИ<br />ЦЕННОСТИ</h2>
              <div className="space-y-0">
                {[
                  { title: 'Честность', text: 'Перед собой — в первую очередь. Без фильтров.' },
                  { title: 'Право на перемены', text: 'В любом возрасте. После любого опыта.' },
                  { title: 'Вера и жизнь', text: 'Вера — не побег от мира, а способ быть в нём глубже.' },
                  { title: 'Женская ценность', text: 'Ты ценна просто потому, что ты есть.' },
                  { title: 'Материнство', text: 'Как чудо, а не как норма или отклонение.' },
                ].map((v, i) => (
                  <div key={i} className="border-[3px] border-foreground/10 -mt-[3px] p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                    <h3 className="font-black text-lg uppercase tracking-tight mb-1">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Another book excerpt */}
          <ScrollReveal delay={150}>
            <div className="mt-16 border-[3px] border-primary/20 bg-primary/5 p-8 md:p-12 max-w-3xl">
              <blockquote className="book-quote text-base md:text-lg border-l-0 pl-0">
                «Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление и захватывают необычными почти нереальными приключениями.»
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 max-w-3xl border-[3px] border-primary/20 bg-primary/5 p-8 md:p-12">
              <h2 className="heading-section mb-8">ПОЧЕМУ<br />ЭТОТ ПРОЕКТ</h2>
              <p className="body-editorial text-muted-foreground">
                Потому что я знаю, каково это — стоять на краю и не видеть дороги. Я прошла через всё это сама: через страх, через потерю, через возвращение к себе.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="brutal-btn text-center">Исследовать себя</Link>
              <Link to="/support" className="brutal-btn-outline text-center">Узнать о сопровождении</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
