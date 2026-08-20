"use client";

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
