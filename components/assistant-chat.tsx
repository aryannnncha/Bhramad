"use client";

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { askAssistant } from '@/lib/api';
import { GlassCard } from './glass-card';

const suggestedQuestions = [
  'Why is Katarmal famous?',
  'What is the best time to visit Jageshwar?',
  'How crowded is Haridwar during the day?',
  'Which place is best for photography?'
];

type Message = {
  role: 'assistant' | 'user';
  text: string;
  sources?: string[];
};

export function AssistantChat() {
  const [query, setQuery] = useState('Why is Katarmal famous?');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Ask about a heritage site and I will respond with a concise, grounded explanation and source chips.',
      sources: ['Verified heritage database'],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async (nextQuery = query) => {
    if (!nextQuery.trim()) {
      return;
    }

    setLoading(true);
    setMessages((current) => [...current, { role: 'user', text: nextQuery }]);
    const answer = await askAssistant(nextQuery);
    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        text: answer.answer,
        sources: answer.sources.map((source) => source.label),
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">AI Assistant</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Ask natural-language questions about the heritage network.</h2>
          </div>
          <div className="rounded-full bg-[#B5651D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">RAG style response</div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestedQuestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              className="rounded-full bg-white/70 px-4 py-2 text-sm text-black/65 transition-all duration-200 hover:bg-white"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-4 rounded-[1.8rem] bg-white/60 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[92%] rounded-[1.5rem] px-4 py-3 sm:max-w-[80%] ${
                  message.role === 'assistant' ? 'bg-white text-black/70' : 'ml-auto bg-[#B5651D] text-white'
                }`}
              >
                <p className="text-sm leading-7">{message.text}</p>
                {message.sources ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.sources.map((source) => (
                      <span
                        key={source}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          message.role === 'assistant' ? 'bg-black/5 text-black/55' : 'bg-white/15 text-white/85'
                        }`}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-14 flex-1 rounded-[1.5rem] border border-black/8 bg-white/75 px-4 text-sm text-ink outline-none focus:border-[#B5651D]/35 focus:ring-4 focus:ring-[#B5651D]/10"
              placeholder="Ask anything about Uttarakhand heritage"
            />
            <button
              type="button"
              onClick={() => send()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B5651D] px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
