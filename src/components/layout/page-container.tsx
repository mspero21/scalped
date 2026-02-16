import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({ children, className, noPadding }: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-screen',
        'pb-20 md:pb-0 md:pt-20', // Account for navbar
        !noPadding && 'px-4 py-6',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[var(--foreground-muted)]">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

