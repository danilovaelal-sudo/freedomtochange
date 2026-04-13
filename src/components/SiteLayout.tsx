import { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PageTransition from './PageTransition';
import { MessageCircle } from 'lucide-react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col noise-bg scanline-overlay">
      <SiteHeader />
      <main className="flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />

      {/* Floating VK button */}
      <a
        href="https://vk.com/danilovaelal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 shadow-lg hover:bg-primary/90 transition-all hover:scale-105 group"
        aria-label="Поговорить с Еленой"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Поговорить с Еленой</span>
      </a>
    </div>
  );
}
