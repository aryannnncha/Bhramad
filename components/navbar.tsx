"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Mountain, Route, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePortal } from './portal-context';

const links = [
  { href: '/explore', label: 'Explore' },
  { href: '/planner', label: 'Smart Planner' },
  { href: '/assistant', label: 'AI Assistant' },
  { href: '/stories', label: 'Heritage Stories' },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(isHome);
  const { askFromChip } = usePortal();

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const onScroll = () => setOverHero(window.scrollY < 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const inverted = isHome && overHero;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-colors duration-300',
        inverted
          ? 'border-white/10 bg-black/20 backdrop-blur-xl'
          : 'border-black/5 bg-white/70 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn('flex items-center gap-3 text-sm font-semibold tracking-tight', inverted ? 'text-white' : 'text-ink')}
        >
          <span
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-2xl shadow-glass',
              inverted ? 'bg-white/15 text-white' : 'bg-[#B5651D]/10 text-[#B5651D]',
            )}
          >
            <Mountain className="h-5 w-5" />
          </span>
          <span className="hidden sm:block">Uttarakhand Heritage Explorer</span>
          <span className="sm:hidden">UHE</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  inverted
                    ? active
                      ? 'bg-white/15 text-white'
                      : 'text-white/80 hover:bg-white/10'
                    : active
                      ? 'bg-black/5 text-ink'
                      : 'text-black/60 hover:bg-black/5',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 rounded-full bg-[#B5651D] px-4 py-2 text-sm font-medium text-white shadow-glass transition-transform duration-200 hover:scale-[1.02]"
          >
            <Route className="h-4 w-4" />
            Build Smart Trip
          </Link>
          <button
            type="button"
            className={cn('rounded-2xl p-2 lg:hidden', inverted ? 'text-white' : 'text-ink')}
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className={cn('border-t px-4 py-4 backdrop-blur-xl lg:hidden', inverted ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/90')}>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn('rounded-2xl px-4 py-3 text-sm font-medium hover:bg-black/5', inverted ? 'text-white/90 hover:bg-white/10' : 'text-ink')}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                askFromChip();
              }}
              className={cn('rounded-2xl px-4 py-3 text-left text-sm font-medium hover:bg-black/5', inverted ? 'text-white/90 hover:bg-white/10' : 'text-ink')}
            >
              Ask Heritage AI
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
