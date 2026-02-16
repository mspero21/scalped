import { PageContainer } from '@/components/layout/page-container';
import { SkeletonProfile, SkeletonStadiumGrid } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <SkeletonProfile />
        <SkeletonStadiumGrid count={6} />
      </div>
    </PageContainer>
  );
}

