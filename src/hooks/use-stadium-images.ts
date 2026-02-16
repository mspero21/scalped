'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface StadiumImage {
  id: string;
  stadium_id: string;
  image_url: string;
  storage_path: string | null;
  caption: string | null;
  source: string | null;
  source_url: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export function useStadiumImages(stadiumId: string) {
  const [images, setImages] = useState<StadiumImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      if (!stadiumId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('stadium_images')
          .select('*')
          .eq('stadium_id', stadiumId)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setImages((data || []) as unknown as StadiumImage[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [stadiumId]);

  const primaryImage = images.find(img => img.is_primary) || images[0];
  const additionalImages = images.filter(img => !img.is_primary);

  return { 
    images, 
    primaryImage, 
    additionalImages,
    loading, 
    error,
    hasMultipleImages: images.length > 1
  };
}

