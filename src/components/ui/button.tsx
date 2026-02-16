'use client';

import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      primary: 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-dark)] focus:ring-[var(--accent-ring)] active:scale-[0.98]',
      secondary: 'bg-[var(--card-bg-secondary)] text-[var(--foreground)] hover:bg-[var(--card-hover)] focus:ring-[var(--accent-ring)] active:scale-[0.98]',
      outline: 'border-2 border-[var(--card-border)] text-[var(--foreground-muted)] hover:bg-[var(--card-hover)] focus:ring-[var(--accent-ring)] active:scale-[0.98]',
      ghost: 'text-[var(--foreground-muted)] hover:bg-[var(--card-hover)] focus:ring-[var(--accent-ring)] active:scale-[0.98]',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:scale-[0.98]',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:scale-[0.98]',
    };

    // Sizes optimized for mobile touch targets (44px minimum)
    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[36px]',
      md: 'px-4 py-2.5 text-sm min-h-[44px]',
      lg: 'px-6 py-3 text-base min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
