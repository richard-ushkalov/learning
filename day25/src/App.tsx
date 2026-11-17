import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';

import { ShelfItem } from './ShelfItem.tsx';

export const App = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    searchTracks('Kelela', 3).then(setTracks);
  }, []);

  return (
    <main>
      <h1>Поиск треков</h1>

      <section className="starting-block">
        <h2 className="starting-block__title">Для начала</h2>
        <div className="starting-block__shelves">
          <ShelfItem title={tracks[0].artistName} tracks={tracks} />
        </div>
      </section>
    </main>
  )
};
