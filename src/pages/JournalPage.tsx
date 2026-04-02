import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

const categories = ['Все', 'Женский путь', 'Перемены', 'Вера и жизнь', 'Материнство', 'Одиночество', 'Свобода', 'Страхи', 'Смысл'];

const posts = [
  { id: '1', title: 'Право на новый сценарий', category: 'Женский путь', excerpt: '«Я никогда не была серой мышью. Да, серьезная и молчаливая, но не замкнутая и нелюдимая, какими представляют девушек, уходящих в монастырь.»', date: '2025-01-15', bookQuote: '«До монастыря я побывала уже в трех серьезных отношениях с мужчинами и не нашла «своего».»' },
  { id: '2', title: 'Когда прежнее перестаёт подходить', category: 'Перемены', excerpt: '«Мне не хватило вот того времени беззаботности и свободы, когда можно все пробовать и не бояться ошибиться. Я не догуляла, не дотанцевала, не довлюблялась.»', date: '2025-02-03', bookQuote: '«Что так повлияло на мое решение вот так отважно и бесповоротно поменять свою жизнь?»' },
  { id: '3', title: 'Вера без формул', category: 'Вера и жизнь', excerpt: '«С появлением Бога в моей жизни просто появилась другая Любовь. Я постепенно внедряла в свою жизнь все, что приближало меня к Богу.»', date: '2025-02-20', bookQuote: '«Было желание жить, как святые отцы пишут, отсекая все лишнее, мирское.»' },
  { id: '4', title: 'Как пережить то, что не пережить', category: 'Перемены', excerpt: '«Безусловно, каждый человек уникален и любая жизнь полна событий и опасных поворотов. Но некоторые истории вызывают у нас особое удивление.»', date: '2025-03-10', bookQuote: '«Монастырь был запрещенной темой для меня 10 лет точно после того, как я вернулась к прежней жизни.»' },
  { id: '5', title: 'Позднее материнство — не приговор', category: 'Материнство', excerpt: '«Мне самой не верится, но все написанное — обо мне. Начала писать и говорить о себе только сейчас, когда мне пятьдесят.»', date: '2025-03-25', bookQuote: '«Я собираюсь рассказать историю женщины, которая в 22 года откладывает красный диплом МГУ и выбирает жизнь в монастыре.»' },
  { id: '6', title: 'Женская ценность вне достижений', category: 'Женский путь', excerpt: '«Ленка выглядела строго, иногда даже сурово. А выражение лица от «весёлой подружки» до «серьезной студентки» менялось всегда неожиданно и быстро.»', date: '2025-04-01', bookQuote: '«Я, как любая девушка, хотела найти свою любовь и искала ее в окружающих.»' },
  { id: '7', title: 'Быть одной — не значит быть одинокой', category: 'Одиночество', excerpt: '«Начиная с детства, я помню постоянно сопровождающее меня чувство одиночества. Подруги вроде бы были, но не было вот той самой близкой.»', date: '2025-04-10', bookQuote: '«Часто получалось так, что нас, подруг, трое, и двое из троих «дружат дружнее». И я была та самая третья.»' },
  { id: '8', title: 'Свобода — это не отсутствие стен', category: 'Свобода', excerpt: '«Сколько себя помню, мне всегда хотелось быть «не такой, как все».»', date: '2025-04-15', bookQuote: '«Я вижу девочку, которая умеет жить свободно и любит жизнь со всеми ее возможностями и неожиданностями.»' },
  { id: '9', title: 'Страх как компас', category: 'Страхи', excerpt: '«В секции меня называли бесстрашной, потому что давление у меня не скакало перед прыжком. Тем не менее, пропустив несколько недель, я тот самый страх уже не смогла преодолеть.»', date: '2025-04-20', bookQuote: '«Помню, как прямо в спортивном зале Володя складывал парашют, а мы наблюдали, раскрыв рты от восхищения.»' },
  { id: '10', title: 'В поисках главного вопроса', category: 'Смысл', excerpt: '«Вы увидите на реальных событиях, как могут развернуться жизненные лабиринты, если слушать себя и доверять.»', date: '2025-04-25', bookQuote: '«Итак, приглашаю вас, друзья, вместе со мной вспомнить и еще раз прожить.»' },
];

export default function JournalPage() {
  const [filter, setFilter] = useState('Все');
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const filtered = filter === 'Все' ? posts : posts.filter(p => p.category === filter);

  if (selectedPost) {
    return (
      <SiteLayout>
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedPost(null)} className="text-mono text-muted-foreground hover:text-primary transition-colors mb-12">
              ← Назад к дневнику
            </button>
            <p className="text-mono text-primary mb-4">{selectedPost.category}</p>
            <h1 className="heading-display mb-8">{selectedPost.title}</h1>
            <p className="text-mono text-muted-foreground mb-16">{selectedPost.date}</p>
            <div className="body-editorial text-muted-foreground space-y-6 border-[3px] border-foreground/10 p-8 md:p-12">
              <p>{selectedPost.excerpt}</p>
              <blockquote className="book-quote">
                {selectedPost.bookQuote}
              </blockquote>
              <p>Каждая публикация — это не инструкция, а приглашение к внутреннему диалогу.</p>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-mono text-primary mb-6">дневник</p>
            <h1 className="heading-display mb-8">РАЗМЫШ-<br />ЛЕНИЯ</h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-16">
              Тексты о женском пути, переменах и праве быть собой. С фрагментами из книги.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-0 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-3 text-xs font-bold uppercase tracking-widest border-[3px] -ml-[3px] first:ml-0 -mt-[3px] first:mt-0 transition-all duration-200 ${filter === cat ? 'border-primary bg-primary text-primary-foreground' : 'border-foreground/10 text-muted-foreground hover:text-foreground hover:border-primary/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 60}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="hover-brutal w-full text-left p-8 border-[3px] border-foreground/10 -mt-[3px] group active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <p className="text-mono text-primary">{post.category}</p>
                    <p className="text-mono text-muted-foreground">{post.date}</p>
                  </div>
                  <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 border-[3px] border-foreground/10 text-center">
              <p className="text-muted-foreground">В этой категории пока нет публикаций.</p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
