"use client";

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return <div className={cn('glass-panel rounded-[2rem]', className)}>{children}</div>;
}
