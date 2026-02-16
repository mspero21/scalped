import { PageContainer } from '@/components/layout/page-container';
import { Skeleton, SkeletonStadiumGrid } from '@/components/ui/skeleton';

export default function StadiumsLoading() {
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-11 w-full md:w-80 rounded-xl" />
        </div>

        {/* Filter skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Grid skeleton */}
        <SkeletonStadiumGrid count={9} />
      </div>
    </PageContainer>
  );
}

