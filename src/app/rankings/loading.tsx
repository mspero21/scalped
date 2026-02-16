import { PageContainer } from '@/components/layout/page-container';
import { Skeleton, SkeletonRankingList } from '@/components/ui/skeleton';

export default function RankingsLoading() {
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>

        {/* Ranking list skeleton */}
        <SkeletonRankingList count={8} />
      </div>
    </PageContainer>
  );
}

