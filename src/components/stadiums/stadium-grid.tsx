import { Stadium } from '@/types/database';
import { StadiumCard } from './stadium-card';

interface StadiumGridProps {
  stadiums: Stadium[];
  variant?: 'default' | 'compact';
}

export function StadiumGrid({
  stadiums,
  variant = 'default',
}: StadiumGridProps) {
  if (stadiums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--foreground-muted)]">No stadiums found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stadiums.map((stadium) => (
        <StadiumCard
          key={stadium.id}
          stadium={stadium}
          variant={variant}
        />
      ))}
    </div>
  );
}

