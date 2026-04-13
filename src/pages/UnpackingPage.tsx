import SiteLayout from '@/components/SiteLayout';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ExternalLink, Sparkles } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

interface Portrait {
  portrait: true;
  archetype: string;
  core_trait: string;
  hidden_power: string;
  shadow: string;
  direction: string;
  metaphor: string;
  message: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/unpacking`;

function parsePortrait(text: string): Portrait | null {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) || text.match(/\{[\s\S]*"portrait"\s*:\s*true[\s\S]*\}/);
    if (!jsonMatch) return null;
    const jsonStr = jsonMatch[1] || jsonMatch[0];
    const parsed = JSON.parse(jsonStr);
    if (parsed.portrait) return parsed as Portrait;
  } catch { /* not JSON yet */ }
  return null;
}

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: Msg[];
  onDelta: (delta: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData.error || 'Ошибка соединения');
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let done = false;

  while (!done) {
    const { done: rDone, value } = await reader.read();
    if (rDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') { done = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }

  if (buffer.trim()) {
    for (let raw of buffer.split('\n')) {
      if (!raw) continue;
      if (raw.endsWith('\r')) raw = raw.slice(0, -1);
      if (raw.startsWith(':') || raw.trim() === '') continue;
      if (!raw.startsWith('data: ')) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

function PortraitCard({ portrait }: { portrait: Portrait }) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Archetype header */}
      <div className="border-2 border-primary p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 font-mono">Твой архетип</p>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-tight">{portrait.archetype}</h2>
      </div>

      {/* Grid of traits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Суть', value: portrait.core_trait, icon: '◉' },
          { label: 'Скрытая сила', value: portrait.hidden_power, icon: '⚡' },
          { label: 'Тень', value: portrait.shadow, icon: '◐' },
          { label: 'Направление', value: portrait.direction, icon: '→' },
        ].map((item) => (
          <div key={item.label} className="border border-border p-5 bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary text-lg">{item.icon}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">{item.label}</span>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Metaphor */}
      <div className="border-l-4 border-primary pl-6 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">Образ</p>
        <p className="text-lg md:text-xl italic text-foreground/90 font-serif">{portrait.metaphor}</p>
      </div>

      {/* Personal message */}
      <div className="bg-primary/10 border border-primary/30 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">Послание от Елены</p>
        <p className="text-foreground leading-relaxed">{portrait.message}</p>
      </div>

      {/* CTA */}
      <div className="border-2 border-dashed border-primary/40 p-6 md:p-8 text-center space-y-4">
        <p className="text-foreground/80 text-sm leading-relaxed max-w-md mx-auto">
          Хочешь разобраться глубже? Я провожу личное сопровождение — 
          помогу распаковать то, что пока скрыто, и найти свой путь.
        </p>
        <a
          href="https://vk.com/id_elena_danilova"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-primary/90 transition-colors"
        >
          Записаться на консультацию
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function UnpackingPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [started, setStarted] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const startSession = async () => {
    setStarted(true);
    setIsLoading(true);
    const initial: Msg[] = [{ role: 'user', content: 'Начни распаковку' }];

    let assistantText = '';
    const upsert = (chunk: string) => {
      assistantText += chunk;
      setMessages([{ role: 'assistant', content: assistantText }]);
    };

    try {
      await streamChat({
        messages: initial,
        onDelta: upsert,
        onDone: () => {
          setIsLoading(false);
          setQuestionNum(1);
        },
      });
    } catch (e) {
      setIsLoading(false);
      setMessages([{ role: 'assistant', content: 'Что-то пошло не так. Попробуй обновить страницу.' }]);
    }
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let assistantText = '';
    const upsert = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > newMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
        }
        return [...newMessages, { role: 'assistant', content: assistantText }];
      });
    };

    try {
      await streamChat({
        messages: newMessages,
        onDelta: upsert,
        onDone: () => {
          setIsLoading(false);
          const newQ = questionNum + 1;
          setQuestionNum(newQ);
          // Check for portrait in final response
          const p = parsePortrait(assistantText);
          if (p) setPortrait(p);
        },
      });
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono mb-4">Интерактив</p>
            <h1 className="text-3xl font-bold text-foreground mb-4 font-sans md:text-6xl">
              Распаковка личности
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
              Семь вопросов. Без масок, без правильных ответов.{'\n'}
              В конце — твой портрет и направление дальнейшего движения.
            </p>
          </div>

          {!started ? (
            <div className="text-center space-y-8">
              <div className="border border-border p-8 max-w-md mx-auto">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                  Я задам тебе семь вопросов — честных и глубоких. 
                  Отвечай так, как чувствуешь. Здесь нет оценок.
                </p>
                <button
                  onClick={startSession}
                  className="brutal-btn w-full"
                >
                  Начать распаковку
                </button>
              </div>
            </div>
          ) : portrait ? (
            <PortraitCard portrait={portrait} />
          ) : (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 transition-colors duration-500 ${
                      i < questionNum ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground font-mono ml-2">{questionNum}/7</span>
              </div>

              {/* Messages */}
              <div className="space-y-4 min-h-[300px]">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`animate-fade-in ${
                      msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary/20 border border-primary/30 text-foreground'
                          : 'bg-card border border-border text-foreground/90'
                      }`}
                    >
                      {msg.role === 'assistant' && i === 0 && (
                        <p className="text-xs text-primary font-mono mb-2 uppercase tracking-wider">Елена</p>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-card border border-border p-4 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground">думаю...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              {!isLoading && (
                <div className="flex gap-2 border border-border bg-card p-2 animate-fade-in">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Твой ответ..."
                    className="flex-1 bg-transparent text-foreground text-sm px-3 py-2 outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="p-2 text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
