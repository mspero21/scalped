'use client';

import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Calendar, Building, CheckCircle2, Bookmark, Star, Trophy, Heart } from 'lucide-react';

const mockStadium = {
  name: 'SoFi Stadium',
  team_name: 'Los Angeles Rams',
  sport: 'NFL',
  city: 'Inglewood',
  state: 'CA',
  capacity: 70240,
  year_built: 2020,
  roof_type: 'RETRACTABLE',
  image_url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200',
};

const rankInfo = { rank: 3, total: 25, sportRank: 2, sportTotal: 8, tier: 'LOVED' };

export default function TestStadiumPageDesigns() {
  const [activeDesign, setActiveDesign] = useState(1);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4">
      <div className="max-w-md mx-auto mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Stadium Page Designs</h1>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setActiveDesign(n)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeDesign === n
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Design {n}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {activeDesign === 1 && <HeroTicketDesign />}
        {activeDesign === 2 && <SplitPanelDesign />}
        {activeDesign === 3 && <ImmersiveDesign />}
      </div>
    </div>
  );
}

// Design 1: Hero Ticket Pass
function HeroTicketDesign() {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden">
      {/* Hero Image with Ticket Stub */}
      <div className="relative">
        <div className="flex">
          {/* Main image section */}
          <div className="flex-1 relative h-72">
            <img src={mockStadium.image_url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            
            {/* Back button */}
            <button className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Badges */}
            <div className="absolute top-4 right-16 flex gap-2">
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">NFL</span>
              <span className="bg-emerald-500/20 backdrop-blur-sm text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Visited
              </span>
            </div>

            {/* Perforated edge */}
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-3">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-zinc-900 rounded-full -mr-1.5" />
              ))}
            </div>
          </div>

          {/* Ticket Stub */}
          <div className="w-20 bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col items-center justify-center py-4 px-2 border-l border-zinc-700">
            <span className="text-zinc-500 text-[10px] font-mono uppercase">Rank</span>
            <span className="text-white font-bold text-3xl">#{rankInfo.rank}</span>
            <span className="text-zinc-400 text-xs">of {rankInfo.total}</span>
            <div className="my-3 w-full border-t border-dashed border-zinc-700" />
            <span className="text-zinc-500 text-[10px] font-mono uppercase">NFL</span>
            <span className="text-emerald-400 font-bold text-lg">#{rankInfo.sportRank}</span>
            <span className="text-zinc-500 text-[10px]">of {rankInfo.sportTotal}</span>
            <div className="mt-3 flex items-center gap-1 text-pink-400">
              <Heart className="h-3 w-3 fill-current" />
              <span className="text-[10px] font-bold">LOVED</span>
            </div>
          </div>
        </div>

        {/* Stadium Name overlay */}
        <div className="absolute bottom-0 left-0 right-20 p-4">
          <h1 className="text-2xl font-bold text-white">{mockStadium.name}</h1>
          <p className="text-emerald-400 font-medium">{mockStadium.team_name}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-2">
        <button className="flex-1 bg-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5" /> View in Rankings
        </button>
        <button className="p-3 bg-zinc-800 rounded-xl text-amber-400">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {/* Stats Row */}
      <div className="px-4 pb-4 grid grid-cols-4 gap-2">
        {[
          { icon: MapPin, label: 'Location', value: `${mockStadium.city}, ${mockStadium.state}` },
          { icon: Users, label: 'Capacity', value: '70,240' },
          { icon: Calendar, label: 'Built', value: mockStadium.year_built },
          { icon: Building, label: 'Roof', value: 'Retractable' },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-800/50 rounded-lg p-2 text-center">
            <stat.icon className="h-4 w-4 text-zinc-500 mx-auto mb-1" />
            <p className="text-white text-xs font-medium truncate">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Design 2: Split Panel (mobile stacked)
function SplitPanelDesign() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden">
      {/* Back */}
      <div className="p-4 pb-0">
        <button className="text-zinc-500 flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      {/* Rank Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Overall Rank</p>
              <p className="text-4xl font-bold">#{rankInfo.rank} <span className="text-lg font-normal opacity-80">/ {rankInfo.total}</span></p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm font-medium">NFL Rank</p>
              <p className="text-2xl font-bold">#{rankInfo.sportRank} <span className="text-sm font-normal opacity-80">/ {rankInfo.sportTotal}</span></p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Heart className="h-3 w-3 fill-current" /> LOVED
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Visited
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="px-4">
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img src={mockStadium.image_url} alt="" className="w-full h-full object-cover" />
          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            NFL
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{mockStadium.name}</h1>
        <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">{mockStadium.team_name}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: MapPin, value: `${mockStadium.city}, ${mockStadium.state}` },
            { icon: Users, value: '70,240 seats' },
            { icon: Calendar, value: `Built ${mockStadium.year_built}` },
            { icon: Building, value: 'Retractable roof' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
              <stat.icon className="h-4 w-4" />
              <span>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold py-3 rounded-xl">
            View in Rankings
          </button>
          <button className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl">
            <Bookmark className="h-5 w-5 text-zinc-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Design 3: Immersive Scrolling
function ImmersiveDesign() {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Full bleed image */}
      <div className="h-96 relative">
        <img src={mockStadium.image_url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Floating back */}
        <button className="absolute top-4 left-4 bg-black/30 backdrop-blur-md text-white p-2.5 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Floating bookmark */}
        <button className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white p-2.5 rounded-full">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {/* Frosted glass panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl rounded-t-3xl p-5">
        {/* Tags row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">NFL</span>
          <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Heart className="h-3 w-3 fill-current" /> LOVED
          </span>
          <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Visited
          </span>
          <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full ml-auto">
            #{rankInfo.rank} of {rankInfo.total}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-white mb-1">{mockStadium.name}</h1>
        <p className="text-emerald-400 font-medium mb-4">{mockStadium.team_name}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-zinc-400 text-sm mb-5">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {mockStadium.city}</span>
          <span>•</span>
          <span>70,240</span>
          <span>•</span>
          <span>{mockStadium.year_built}</span>
          <span>•</span>
          <span>Retractable</span>
        </div>

        {/* CTA */}
        <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5" />
          View in Rankings
        </button>
      </div>
    </div>
  );
}

