import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';

import { ShelfItem } from './ShelfItem.tsx';

const shelfArtists = ['Gallant', 'Kelela', 'FKA Twigs'];

export const App = () => {
  const [artist, setArtist] = useState('Kelela');
  const [tracks, setTracks] = useState<Track[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const found = await searchTracks(artist, 3);
        setTracks(found);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [artist]);

  return (
    <main>
      <h1>Поиск треков</h1>

      <section className="starting-block">
        <h2 className="starting-block__title">Для начала</h2>
        <div className="starting-block__current-artist">
          {shelfArtists.map(shelfArtist =>
            <button
              key={shelfArtist}
              type="button"
              aria-pressed={shelfArtist === artist}
              onClick={() => setArtist(shelfArtist)}
            >
              {shelfArtist}
            </button>
          )}
        </div>
        <div className="starting-block__shelves">
          <ShelfItem title={artist} isLoading={isLoading} error={error} tracks={tracks} />
        </div>
      </section>
    </main>
  );
};
