"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ItineraryPreferences } from '@/lib/types';

type PortalContextValue = {
  plannerPrefs: ItineraryPreferences;
  setPlannerPrefs: (prefs: ItineraryPreferences) => void;
  applyHeroSearch: (prefs: Partial<ItineraryPreferences>) => void;
  generateSignal: number;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  pendingQuestion: string;
  askFromChip: (question?: string) => void;
  consumePendingQuestion: () => void;
};

const defaultPrefs: ItineraryPreferences = {
  days: 3,
  budget: 15000,
  interests: ['Temples', 'Architecture'],
  startingLocation: 'Almora',
  crowdTolerance: 35,
  transportMode: 'Car',
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [plannerPrefs, setPlannerPrefs] = useState<ItineraryPreferences>(defaultPrefs);
  const [generateSignal, setGenerateSignal] = useState(0);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState('');

  const applyHeroSearch = useCallback((prefs: Partial<ItineraryPreferences>) => {
    setPlannerPrefs((current) => ({ ...current, ...prefs }));
    setGenerateSignal((value) => value + 1);
    document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const askFromChip = useCallback((question?: string) => {
    setPendingQuestion(question ?? '');
    setAssistantOpen(true);
  }, []);

  const consumePendingQuestion = useCallback(() => {
    setPendingQuestion('');
  }, []);

  const value = useMemo(
    () => ({
      plannerPrefs,
      setPlannerPrefs,
      applyHeroSearch,
      generateSignal,
      assistantOpen,
      setAssistantOpen,
      pendingQuestion,
      askFromChip,
      consumePendingQuestion,
    }),
    [plannerPrefs, generateSignal, assistantOpen, pendingQuestion, applyHeroSearch, askFromChip, consumePendingQuestion],
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within PortalProvider');
  }
  return context;
}
