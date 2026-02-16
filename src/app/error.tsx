'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/layout/page-container';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          Something went wrong
        </h1>
        <p className="text-[var(--foreground-muted)] mb-8">
          We encountered an unexpected error while loading this page. Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

