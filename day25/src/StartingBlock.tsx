import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';
import { ShelfItem } from './ShelfItem.tsx';

const startingArtists = ['Gallant', 'Kelela', 'FKA Twigs'];

export const StartingBlock = () => {
  const [artist, setArtist] = useState('Kelela');
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

  return (
    <section className="starting-block">
      <h2 className="starting-block__title">Для начала</h2>
      <div className="starting-block__current-artist">
        {startingArtists.map(startingArtist =>
          <button
            key={startingArtist}
            type="button"
            aria-pressed={startingArtist === artist}
            onClick={() => setArtist(startingArtist)}
          >
            {startingArtist}
          </button>
        )}
      </div>
      <div className="starting-block__shelves">
        <ShelfItem title={artist} isLoading={isLoading} error={error} tracks={tracks} />
      </div>
    </section>
  );
};
