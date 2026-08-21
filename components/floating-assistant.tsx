"use client";

import { useEffect, useState } from 'react';
import { Loader2, Send, Sparkles, X } from 'lucide-react';
import { askAssistant } from '@/lib/api';
import { usePortal } from './portal-context';
import { cn } from '@/lib/utils';

const chips = [
  'Why is Katarmal famous?',
  'Best photo spots near Almora?',
  'Least crowded temple right now?',
];

type Message = {
  role: 'assistant' | 'user';
  text: string;
  sources?: string[];
};

export function FloatingAssistant() {
  const { assistantOpen, setAssistantOpen, pendingQuestion, consumePendingQuestion } = usePortal();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'I can explain a site, suggest a quieter alternative, or point you to a better photo window. Every answer keeps a verified source tag.',
      sources: ['Verified heritage database'],
    },
  ]);

  const send = async (nextQuery: string) => {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    setQuery('');
    setLoading(true);
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    const answer = await askAssistant(trimmed);
    setMessages((current) => [
      ...current,
      { role: 'assistant', text: answer.answer, sources: answer.sources.map((source) => source.label) },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (assistantOpen && pendingQuestion) {
      void send(pendingQuestion);
      consumePendingQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantOpen, pendingQuestion]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#B5651D] px-4 py-3 text-white shadow-2xl"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="pr-1 text-sm font-semibold">Ask Heritage AI</span>
      </button>

      {assistantOpen ? (
        <div className="fixed inset-0 z-[80] flex justify-end bg-black/35 backdrop-blur-sm">
          <button type="button" className="h-full flex-1" onClick={() => setAssistantOpen(false)} aria-label="Close assistant" />
          <aside className="flex h-full w-full max-w-md flex-col border-l border-white/20 bg-white/90 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">Heritage AI</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">Ask anything on the circuit</h2>
              </div>
              <button type="button" onClick={() => setAssistantOpen(false)} className="rounded-2xl bg-black/5 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-5 py-4">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => void send(chip)}
                  className="rounded-full bg-black/5 px-3 py-2 text-xs font-medium text-black/70 hover:bg-black/10"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    'max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6',
                    message.role === 'assistant' ? 'bg-white text-black/70' : 'ml-auto bg-[#B5651D] text-white',
                  )}
                >
                  <p>{message.text}</p>
                  {message.sources ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.sources.map((source) => (
                        <span key={source} className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
                          {source}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-black/5 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void send(query);
              }}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Send a message"
                className="flex-1 rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm outline-none"
              />
              <button type="submit" className="rounded-2xl bg-[#B5651D] px-4 text-white">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}
