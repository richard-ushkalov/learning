import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';

import { ShelfItem } from './ShelfItem.tsx';

const shelfArtists = ['Gallant', 'Kelela', 'FKA Twigs'];

export const App = () => {
  const [artist, setArtist] = useState('Gallant');
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    searchTracks(artist, 3).then(setTracks);
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
              aria-pressed={shelfArtist === artist}
              onClick={() => setArtist(shelfArtist)}
            >
              {shelfArtist}
            </button>
          )}
        </div>
        <div className="starting-block__shelves">
          <ShelfItem title={artist} tracks={tracks} />
        </div>
      </section>
    </main>
  );
};
