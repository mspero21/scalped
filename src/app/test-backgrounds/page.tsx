'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type BackgroundOption = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export default function TestBackgroundsPage() {
  const [selected, setSelected] = useState<BackgroundOption>('A');

  const backgrounds: Record<BackgroundOption, { name: string; description: string; style: React.CSSProperties; cardStyle?: string }> = {
    A: {
      name: 'Vintage Stadium',
      description: 'Warm sepia tones with aged texture - classic sports aesthetic',
      style: {
        backgroundColor: '#1a1612',
        backgroundImage: `
          radial-gradient(ellipse 100% 100% at 50% 0%, rgba(180, 120, 60, 0.12), transparent 60%),
          radial-gradient(ellipse 80% 60% at 0% 100%, rgba(139, 90, 43, 0.1), transparent),
          radial-gradient(ellipse 60% 40% at 100% 80%, rgba(205, 133, 63, 0.08), transparent),
          linear-gradient(180deg, #1a1612 0%, #0f0d0a 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-b from-[#2a2420]/90 to-[#1f1b17]/90 border-[#3d3530]',
    },
    B: {
      name: 'Sports Heritage',
      description: 'Deep burgundy & gold - timeless championship vibes',
      style: {
        backgroundColor: '#1a0f14',
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(128, 0, 32, 0.2), transparent),
          radial-gradient(ellipse 40% 40% at 90% 90%, rgba(212, 175, 55, 0.08), transparent),
          radial-gradient(ellipse 50% 30% at 10% 80%, rgba(128, 0, 32, 0.1), transparent),
          linear-gradient(170deg, #1a0f14 0%, #0d0a0c 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-b from-[#2d1f24]/90 to-[#1a1216]/90 border-[#4a3038]',
    },
    C: {
      name: 'Leather & Chrome',
      description: 'Rich brown with metallic accents - luxury sports club',
      style: {
        backgroundColor: '#171310',
        backgroundImage: `
          radial-gradient(ellipse 100% 80% at 30% -20%, rgba(139, 90, 43, 0.15), transparent),
          radial-gradient(ellipse 60% 50% at 100% 50%, rgba(192, 192, 192, 0.05), transparent),
          radial-gradient(ellipse 40% 60% at 0% 100%, rgba(101, 67, 33, 0.12), transparent),
          linear-gradient(135deg, #171310 0%, #0c0a08 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-br from-[#252019]/95 to-[#1a1614]/95 border-[#3a3028]',
    },
    D: {
      name: 'Field at Dusk',
      description: 'Sunset warmth meeting the green turf - game day energy',
      style: {
        backgroundColor: '#0f1210',
        backgroundImage: `
          radial-gradient(ellipse 120% 60% at 50% -30%, rgba(234, 88, 12, 0.1), transparent),
          radial-gradient(ellipse 80% 40% at 80% 100%, rgba(22, 101, 52, 0.12), transparent),
          radial-gradient(ellipse 60% 50% at 10% 80%, rgba(180, 83, 9, 0.08), transparent),
          linear-gradient(175deg, #14120f 0%, #0a0c0a 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-b from-[#1f1d18]/90 to-[#141612]/90 border-[#2f2d25]',
    },
    E: {
      name: 'Brass & Oak',
      description: 'Trophy case aesthetic - warm amber glow on dark wood',
      style: {
        backgroundColor: '#12100d',
        backgroundImage: `
          radial-gradient(ellipse 70% 70% at 50% 10%, rgba(184, 134, 11, 0.12), transparent),
          radial-gradient(ellipse 50% 50% at 85% 85%, rgba(139, 90, 43, 0.1), transparent),
          radial-gradient(ellipse 40% 40% at 15% 70%, rgba(218, 165, 32, 0.06), transparent),
          linear-gradient(180deg, #12100d 0%, #0a0908 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-b from-[#1e1a15]/90 to-[#14120f]/90 border-[#342c22]',
    },
    F: {
      name: 'Midnight Copper',
      description: 'Dark elegance with warm copper highlights - modern classic',
      style: {
        backgroundColor: '#0d0f10',
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 60% -20%, rgba(184, 115, 51, 0.1), transparent),
          radial-gradient(ellipse 50% 60% at 0% 60%, rgba(120, 80, 40, 0.08), transparent),
          radial-gradient(ellipse 40% 30% at 100% 100%, rgba(205, 127, 50, 0.06), transparent),
          linear-gradient(160deg, #0f1012 0%, #08090a 100%)
        `,
      },
      cardStyle: 'bg-gradient-to-b from-[#1a1816]/90 to-[#0f0e0d]/90 border-[#2d2822]',
    },
  };

  const current = backgrounds[selected];

  return (
    <div className="min-h-screen transition-all duration-500" style={current.style}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Rustic Modern Styles</h1>
          <p className="text-zinc-400">Click each option to preview full-screen</p>
        </div>

        {/* Option Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(backgrounds) as BackgroundOption[]).map((key) => (
            <Button
              key={key}
              onClick={() => setSelected(key)}
              variant={selected === key ? 'primary' : 'outline'}
              className={selected === key
                ? 'bg-amber-700 hover:bg-amber-800 text-white border-amber-600'
                : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600'
              }
            >
              {key}: {backgrounds[key].name}
            </Button>
          ))}
        </div>

        {/* Current Selection Info */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Option {selected}: {current.name}
          </h2>
          <p className="text-zinc-400">{current.description}</p>
        </div>

        {/* Sample Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sample Card 1 */}
          <Card className={`${current.cardStyle} border backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className="text-white">SoFi Stadium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/30 rounded-lg mb-4 flex items-center justify-center border border-white/5">
                <span className="text-4xl">🏟️</span>
              </div>
              <p className="text-zinc-400 text-sm">Los Angeles, CA</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-amber-500 text-sm font-medium">#1 Ranked</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500 text-sm">NFL</span>
              </div>
            </CardContent>
          </Card>

          {/* Sample Card 2 */}
          <Card className={`${current.cardStyle} border backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className="text-white">Your Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['SoFi Stadium', 'Allegiant Stadium', 'AT&T Stadium'].map((name, i) => (
                  <div key={name} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="text-lg font-bold text-amber-500">#{i + 1}</span>
                    <span className="text-white">{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className={`${current.cardStyle} border backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className="text-white">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-zinc-500 text-sm">Visited</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">8</div>
                  <div className="text-zinc-500 text-sm">Ranked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">5</div>
                  <div className="text-zinc-500 text-sm">Bucket List</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons Card */}
          <Card className={`${current.cardStyle} border backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                Add Stadium
              </Button>
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                View Map
              </Button>
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Browse Stadiums
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navbar Preview */}
        <div className="mt-12">
          <p className="text-zinc-500 text-sm mb-4 text-center">Navbar Preview</p>
          <div className={`rounded-lg p-4 flex items-center justify-between ${current.cardStyle} border backdrop-blur-sm`}>
            <div className="text-xl font-bold text-white">Scalped</div>
            <div className="flex gap-6">
              <span className="text-zinc-400 hover:text-white cursor-pointer">Stadiums</span>
              <span className="text-amber-500 cursor-pointer">Rankings</span>
              <span className="text-zinc-400 hover:text-white cursor-pointer">Map</span>
              <span className="text-zinc-400 hover:text-white cursor-pointer">Profile</span>
            </div>
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="mt-12">
          <p className="text-zinc-500 text-sm mb-4 text-center">Accent Colors</p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-700" title="Primary Amber" />
            <div className="w-12 h-12 rounded-lg bg-amber-500" title="Highlight" />
            <div className="w-12 h-12 rounded-lg bg-amber-900" title="Dark Amber" />
            <div className="w-12 h-12 rounded-lg bg-zinc-800" title="Card BG" />
            <div className="w-12 h-12 rounded-lg bg-zinc-600" title="Muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
