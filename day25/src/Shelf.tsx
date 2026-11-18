import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';
import { ShelfItem } from './ShelfItem.tsx';

type ShelfProps = {
  artist: string;
};

export const Shelf = ({ artist }: ShelfProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const found = await searchTracks(artist, 3);

        if (ignore) {
          return;
        }

        setTracks(found);
      } catch (error) {
        if (ignore) {
          return;
        }

        setError(error instanceof Error ? error.message : String(error));
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [artist]);

  return <ShelfItem title={artist} isLoading={isLoading} error={error} tracks={tracks} />;
};
