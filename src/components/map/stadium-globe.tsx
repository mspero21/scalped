'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useStadiums } from '@/hooks/use-stadiums';
import { useVisits } from '@/hooks/use-visits';
import { Sport } from '@/types/database';
import { getSportEmoji } from '@/lib/utils';

// Dynamically import Globe.gl to avoid SSR issues
const GlobeComponent = dynamic(
  () => import('react-globe.gl').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--foreground-muted)]" />
      </div>
    ),
  }
);

interface StadiumPoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  stadium: {
    id: string;
    name: string;
    city: string;
    state: string;
    sport: Sport;
  };
}

interface StadiumData {
  id: string;
  name: string;
  city: string;
  state: string;
  sport: Sport;
  isVisited: boolean;
}

interface StadiumHtmlElement extends HTMLDivElement {
  stadiumData?: StadiumData;
}

interface HtmlElementDatum {
  lat: number;
  lng: number;
  element: HTMLDivElement;
}

interface StadiumGlobeProps {
  selectedSport?: Sport | 'ALL';
}

export function StadiumGlobe({ selectedSport = 'ALL' }: StadiumGlobeProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { stadiums, loading } = useStadiums();
  const { visitsByStadium } = useVisits(user?.id);
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [hoveredStadium, setHoveredStadium] = useState<StadiumData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter stadiums with coordinates
  const validStadiums = stadiums.filter(
    (s) => s.latitude && s.longitude && (selectedSport === 'ALL' || s.sport === selectedSport)
  );

  // Create HTML elements data for sport icons (only on client)
  const htmlElements = useMemo(() => {
    if (!isMounted) return [];

    return validStadiums.map((stadium) => {
      const isVisited = visitsByStadium[stadium.id];
      const sportEmoji = getSportEmoji(stadium.sport);

      const el = document.createElement('div');
      el.textContent = sportEmoji;
      el.style.fontSize = '20px';
      el.style.cursor = 'pointer';
      el.style.filter = isVisited ? 'none' : 'grayscale(100%) brightness(1.2)';
      el.style.opacity = isVisited ? '1' : '0.7';
      el.style.transition = 'all 0.2s';
      el.style.pointerEvents = 'auto';

      const stadiumData = {
        id: stadium.id,
        name: stadium.name,
        city: stadium.city,
        state: stadium.state,
        sport: stadium.sport,
        isVisited,
      };
      (el as StadiumHtmlElement).stadiumData = stadiumData;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.3)';
        el.style.filter = isVisited
          ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))'
          : 'grayscale(100%) brightness(1.2) drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))';
        setHoveredStadium(stadiumData);
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.filter = isVisited ? 'none' : 'grayscale(100%) brightness(1.2)';
        setHoveredStadium(null);
      });

      el.addEventListener('click', () => {
        router.push(`/stadium/${stadium.id}`);
      });

      return {
        lat: stadium.latitude!,
        lng: stadium.longitude!,
        element: el,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, validStadiums.length, selectedSport, Object.keys(visitsByStadium).length]);

  // Setup globe controls
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;
      setGlobeReady(true);
    }
  }, []);

  // Handle HTML element click
  const handleElementClick = (el: StadiumHtmlElement | null) => {
    if (el && el.stadiumData) {
      router.push(`/stadium/${el.stadiumData.id}`);
    }
  };

  // Track the last hovered element to reset it
  const lastHoveredRef = useRef<StadiumHtmlElement | null>(null);

  // Handle HTML element hover
  const handleElementHover = (el: StadiumHtmlElement | null) => {
    // Reset previous element if exists
    if (lastHoveredRef.current && lastHoveredRef.current.stadiumData) {
      const prevData = lastHoveredRef.current.stadiumData;
      lastHoveredRef.current.style.transform = 'scale(1)';
      lastHoveredRef.current.style.filter = prevData.isVisited ? 'none' : 'grayscale(100%) brightness(1.2)';
    }

    // Apply hover effect to new element
    if (el && el.stadiumData) {
      const data = el.stadiumData;
      el.style.transform = 'scale(1.3)';
      el.style.filter = data.isVisited
        ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))'
        : 'grayscale(100%) brightness(1.2) drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))';
      lastHoveredRef.current = el;
      setHoveredStadium(data);
    } else {
      lastHoveredRef.current = null;
      setHoveredStadium(null);
    }
  };

  if (!isMounted || loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--foreground-muted)] mx-auto mb-2" />
          <p className="text-sm text-[var(--foreground-muted)]">Loading stadiums...</p>
        </div>
      </div>
    );
  }

  if (validStadiums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <p className="text-6xl mb-4">🏟️</p>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          No Stadiums Found
        </h3>
        <p className="text-sm text-[var(--foreground-muted)]">
          {selectedSport === 'ALL'
            ? 'Stadium coordinates are being populated. Please try again in a moment.'
            : `No ${selectedSport} stadiums with coordinates found.`}
        </p>
      </div>
    );
  }

  // Cast the component to handle incomplete type definitions in react-globe.gl
  const GlobeWithEvents = GlobeComponent as React.ComponentType<any>;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <GlobeWithEvents
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        htmlElementsData={htmlElements}
        htmlAltitude={0.01}
        htmlElement={(d: unknown) => (d as HtmlElementDatum).element}
        htmlTransitionDuration={0}
        onHtmlElementClick={handleElementClick}
        onHtmlElementHover={handleElementHover}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.1}
        animateIn={false}
        width={undefined}
        height={undefined}
      />

      {/* Custom Tooltip */}
      {hoveredStadium && (
        <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-3 rounded-lg shadow-lg pointer-events-none z-50 max-w-xs">
          <div className="font-semibold text-base">{hoveredStadium.name}</div>
          <div className="text-sm text-zinc-300 mt-1">
            {hoveredStadium.city}, {hoveredStadium.state}
          </div>
          <div className={`text-sm mt-1 ${hoveredStadium.isVisited ? 'text-emerald-400' : 'text-red-400'}`}>
            {hoveredStadium.isVisited ? '✓ Visited' : '○ Not Visited'}
          </div>
        </div>
      )}
    </div>
  );
}
