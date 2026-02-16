import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'sport' | 'outline';
}

const variantClasses = {
  default: 'bg-[var(--card-bg-secondary)] text-[var(--foreground)]',
  success: 'bg-[var(--accent-bg)] text-[var(--accent)]',
  warning: 'bg-orange-100 text-orange-700',
  danger: 'bg-red-100 text-red-700',
  sport: 'bg-[var(--accent-bg)] text-[var(--accent)]',
  outline: 'bg-transparent border border-[var(--card-border)] text-[var(--foreground-muted)]',
};

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
