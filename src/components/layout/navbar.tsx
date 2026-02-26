'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Trophy, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/feed', icon: Users, label: 'Feed' },
  { href: '/stadiums', icon: MapPin, label: 'Stadiums' },
  { href: '/rankings', icon: Trophy, label: 'Rankings' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function Navbar() {
  const pathname = usePathname();

  // Hide navbar on auth pages
  const hideOn = ['/login', '/signup', '/onboarding'];
  if (hideOn.some(path => pathname.startsWith(path))) return null;

  return (
    <>
      {/* Desktop Top Nav */}
      <nav role="navigation" aria-label="Main navigation" className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--nav-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Scalped home">
              <span className="text-2xl">🎟️</span>
              <span className="text-xl font-extrabold text-[var(--foreground)] tracking-tight">Scalped</span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-[var(--nav-active-bg)] text-[var(--nav-text-active)]'
                        : 'text-[var(--nav-text)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
                    )}
                  >
                    <item.icon className={cn('h-4 w-4', isActive && 'stroke-[2.5]')} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav role="navigation" aria-label="Main navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-[var(--nav-bg)] backdrop-blur-xl border-t border-[var(--nav-border)]">
          <div className="flex items-end justify-around px-2 pt-2 pb-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    'flex flex-col items-center gap-0.5 px-3 pt-2 pb-2 rounded-xl text-[10px] font-medium transition-all duration-200 relative min-w-[56px]',
                    isActive
                      ? 'text-[var(--nav-text-active)]'
                      : 'text-[var(--nav-text)]'
                  )}
                >
                  {isActive && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--nav-text-active)]" />
                  )}
                  <item.icon className={cn(
                    'h-5 w-5 transition-transform duration-200',
                    isActive && 'stroke-[2.5] scale-110'
                  )} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          {/* Safe area spacer for devices with home indicator */}
          <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
        </div>
      </nav>

      {/* Spacer so page content doesn't get hidden behind the mobile nav */}
      <div className="md:hidden h-20" />
    </>
  );
}
