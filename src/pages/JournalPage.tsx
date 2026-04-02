import SiteLayout from '@/components/SiteLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const categories = ['Все', 'Женский путь', 'Возраст', 'Вера и жизнь', 'Перемены', 'Материнство'];

const posts = [
  { id: '1', title: 'Право на новый сценарий', category: 'Женский путь', excerpt: 'Почему мы так боимся менять свою историю? И что происходит, когда мы наконец решаемся.', date: '2025-01-15' },
  { id: '2', title: 'Возраст как освобождение', category: 'Возраст', excerpt: 'После 40 ты наконец перестаёшь оправдываться. И начинаешь жить.', date: '2025-02-03' },
  { id: '3', title: 'Вера без формул', category: 'Вера и жизнь', excerpt: 'Как вера стала не убежищем от мира, а способом быть в нём глубже.', date: '2025-02-20' },
  { id: '4', title: 'Как пережить то, что не пережить', category: 'Перемены', excerpt: 'О переменах, которые ломают всё. И о том, что остаётся после.', date: '2025-03-10' },
  { id: '5', title: 'Позднее материнство — не приговор', category: 'Материнство', excerpt: 'Первый ребёнок в 41. Четвёртый — в 48. И каждый стал чудом.', date: '2025-03-25' },
  { id: '6', title: 'Женская ценность вне достижений', category: 'Женский путь', excerpt: 'Ты не то, что ты сделала. Ты — та, кто ты есть.', date: '2025-04-01' },
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
              <p>Содержание этой публикации будет доступно после наполнения через админ-панель.</p>
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
              Тексты о женском пути, возрасте, вере, переменах и праве быть собой.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-0 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-[3px] -ml-[3px] first:ml-0 transition-colors ${filter === cat ? 'border-primary bg-primary text-primary-foreground' : 'border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}
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
                  className="w-full text-left p-8 border-[3px] border-foreground/10 -mt-[3px] hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
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
