'use client';

import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl border bg-[var(--input-bg)]',
            'text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--input-border)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
