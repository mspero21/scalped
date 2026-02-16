'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import { StadiumImage } from '@/hooks/use-stadium-images';
import { getSportEmoji } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StadiumImageGalleryProps {
  images: StadiumImage[];
  stadiumName: string;
  sport: string;
  fallbackImageUrl?: string | null;
}

export function StadiumImageGallery({ 
  images, 
  stadiumName, 
  sport,
  fallbackImageUrl 
}: StadiumImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use fallback if no images in gallery
  const allImages = images.length > 0 
    ? images 
    : fallbackImageUrl 
      ? [{ id: 'fallback', image_url: fallbackImageUrl, caption: null } as StadiumImage]
      : [];

  const hasImages = allImages.length > 0;
  const hasMultiple = allImages.length > 1;
  const currentImage = allImages[currentIndex];

  function nextImage() {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }

  function prevImage() {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }

  if (!hasImages) {
    return (
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-[var(--card-bg-secondary)] flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl">{getSportEmoji(sport)}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-[var(--card-bg-secondary)] group">
        <Image
          src={currentImage.image_url}
          alt={currentImage.caption || stadiumName}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setIsFullscreen(true)}
          priority
        />

        {/* Navigation Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 text-white text-sm px-2.5 py-1 rounded-full">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>{currentIndex + 1} / {allImages.length}</span>
          </div>
        )}

        {/* Dots Indicator */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm">{currentImage.caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnail Strip (if multiple images) */}
      {hasMultiple && allImages.length <= 6 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 ring-2 transition-all ${
                idx === currentIndex 
                  ? 'ring-emerald-500'
                  : 'ring-transparent hover:ring-[var(--card-border)]'
              }`}
            >
              <Image src={img.image_url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-8">
            <Image
              src={currentImage.image_url}
              alt={currentImage.caption || stadiumName}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter in fullscreen */}
          {hasMultiple && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

