import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/layout/page-container';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🏟️</div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--foreground-muted)] mb-8">
          Looks like this page got tackled before you could reach it. 
          Let&apos;s get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/stadiums">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Stadiums
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

