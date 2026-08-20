"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mountain, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/explore', label: 'Explore' },
  { href: '/planner', label: 'Planner' },
  { href: '/assistant', label: 'Assistant' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B5651D]/10 text-[#B5651D] shadow-glass">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="hidden sm:block">Uttarakhand Heritage Explorer</span>
          <span className="sm:hidden">UHE</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-black/5',
                  active ? 'bg-black/5 text-ink' : 'text-black/60',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 rounded-full bg-[#B5651D] px-4 py-2 text-sm font-medium text-white shadow-glass transition-transform duration-200 hover:scale-[1.02]"
        >
          <Sparkles className="h-4 w-4" />
          Start Exploring
        </Link>
      </div>
    </header>
  );
}
