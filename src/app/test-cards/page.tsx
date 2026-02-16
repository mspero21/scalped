'use client';

import { PageContainer } from '@/components/layout/page-container';
import { useStadiums } from '@/hooks/use-stadiums';

const fallbackImage = "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800";

interface CardProps {
  stadium: {
    name: string;
    team_name: string;
    sport: string;
    image_url: string | null;
    city?: string;
    state?: string;
  };
}

// Design 1: Classic Ticket with stub
function TicketCard({ stadium }: CardProps) {
  const imgSrc = stadium.image_url || fallbackImage;
  return (
    <div className="relative flex">
      {/* Stub */}
      <div className="w-16 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-l-lg p-2 flex flex-col items-center justify-between relative">
        <span className="text-white text-xs font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>ADMIT ONE</span>
        <span className="text-emerald-200 text-[10px] rotate-180" style={{ writingMode: 'vertical-rl' }}>#00142</span>
        {/* Jagged perforation edge */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-1">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full -mr-1.5" />
          ))}
        </div>
      </div>
      {/* Main ticket */}
      <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-r-lg overflow-hidden ml-1">
        <div className="h-32 relative">
          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded">{stadium.sport}</span>
        </div>
        <div className="p-3 border-t-2 border-dashed border-zinc-300 dark:border-zinc-600">
          <h3 className="font-bold text-zinc-900 dark:text-white">{stadium.name}</h3>
          <p className="text-sm text-emerald-600">{stadium.team_name}</p>
        </div>
      </div>
    </div>
  );
}

// Design 2: Vintage Ticket
function VintageTicketCard({ stadium }: CardProps) {
  const imgSrc = stadium.image_url || fallbackImage;
  return (
    <div className="relative bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-lg overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
      {/* Left jagged edge */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
        {[...Array(14)].map((_, i) => <div key={i} className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full -ml-1.5" />)}
      </div>
      {/* Right jagged edge */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2">
        {[...Array(14)].map((_, i) => <div key={i} className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full -mr-1.5" />)}
      </div>
      <div className="p-4 pl-6 pr-6">
        <div className="text-center mb-2">
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400">★ STADIUM PASS ★</span>
        </div>
        <div className="h-28 rounded overflow-hidden mb-3">
          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">{stadium.name}</h3>
          <p className="text-amber-700 dark:text-amber-400 text-sm">{stadium.team_name}</p>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
    </div>
  );
}

// Design 3: Modern Arena Pass
function ArenaPassCard({ stadium }: CardProps) {
  const imgSrc = stadium.image_url || fallbackImage;
  return (
    <div className="relative flex">
      {/* Main ticket section */}
      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-l-xl overflow-hidden border border-zinc-700 border-r-0 relative">
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-b from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur-sm" />
        <div className="relative">
          <div className="h-32 relative">
            <img src={imgSrc} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>
          <div className="p-4 -mt-6 relative">
            <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">{stadium.sport}</span>
            <h3 className="font-bold text-xl text-white">{stadium.name}</h3>
            <p className="text-emerald-400">{stadium.team_name}</p>
          </div>
        </div>
        {/* Perforated edge */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full -mr-1.5" />
          ))}
        </div>
      </div>
      {/* Ticket stub */}
      <div className="w-20 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-r-xl border border-zinc-700 border-l-0 ml-1 flex flex-col items-center justify-between py-4 px-2">
        <span className="text-zinc-500 text-[10px] font-mono">SECTION</span>
        <span className="text-white font-bold text-lg">104</span>
        <div className="flex flex-col gap-0.5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-1 bg-zinc-600 rounded" style={{ width: `${12 + Math.random() * 16}px` }} />
          ))}
        </div>
        <span className="text-zinc-500 text-[8px] font-mono rotate-0">NO REFUND</span>
      </div>
    </div>
  );
}

// Design 4: Stadium Silhouette Card
function StadiumSilhouetteCard({ stadium }: CardProps) {
  const imgSrc = stadium.image_url || fallbackImage;
  return (
    <div className="relative rounded-xl overflow-hidden group cursor-pointer">
      <div className="h-48 relative">
        <img src={imgSrc} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8">
          <svg viewBox="0 0 100 30" className="w-full h-full fill-white/10">
            <path d="M0,30 Q50,0 100,30 L100,0 L0,0 Z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl text-white drop-shadow-lg">{stadium.name}</h3>
            <p className="text-emerald-400 font-medium">{stadium.team_name}</p>
          </div>
          <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">{stadium.sport}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestCardsPage() {
  const { stadiums, loading } = useStadiums('NFL');
  const stadium = stadiums[0];

  if (loading) {
    return <PageContainer><p>Loading...</p></PageContainer>;
  }

  if (!stadium) {
    return <PageContainer><p>No stadium found</p></PageContainer>;
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-8">Stadium Card Designs</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-zinc-500">1. Classic Ticket with Stub</h2>
          <TicketCard stadium={stadium} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-zinc-500">2. Vintage Ticket</h2>
          <VintageTicketCard stadium={stadium} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-zinc-500">3. Modern Arena Pass</h2>
          <ArenaPassCard stadium={stadium} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-zinc-500">4. Stadium Silhouette</h2>
          <StadiumSilhouetteCard stadium={stadium} />
        </div>
      </div>
    </PageContainer>
  );
}

