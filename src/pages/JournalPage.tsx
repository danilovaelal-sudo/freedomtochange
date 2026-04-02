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
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedPost(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
              ← Назад к дневнику
            </button>
            <p className="text-mono text-accent mb-4">{selectedPost.category}</p>
            <h1 className="heading-display mb-8">{selectedPost.title}</h1>
            <p className="text-mono text-muted-foreground mb-16">{selectedPost.date}</p>
            <div className="body-editorial text-muted-foreground space-y-8">
              <p>{selectedPost.excerpt}</p>
              <p>Содержание этой публикации будет доступно после наполнения через админ-панель. Здесь будет полный текст размышления, который можно редактировать и обновлять.</p>
              <p>Каждая публикация — это не инструкция, а приглашение к внутреннему диалогу. Здесь нет правильных ответов. Есть только честные вопросы.</p>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-mono text-muted-foreground mb-6">дневник</p>
            <h1 className="heading-display mb-8">Размышления</h1>
            <p className="body-editorial text-muted-foreground max-w-xl mb-16">
              Тексты о женском пути, возрасте, вере, переменах и праве быть собой.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-3 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm border transition-colors ${filter === cat ? 'border-primary text-foreground' : 'border-border/30 text-muted-foreground hover:text-foreground hover:border-border'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full text-left p-8 border border-border/20 hover:border-primary/20 hover:bg-card/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <p className="text-mono text-accent">{post.category}</p>
                    <p className="text-mono text-muted-foreground">{post.date}</p>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-foreground transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">В этой категории пока нет публикаций.</p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
