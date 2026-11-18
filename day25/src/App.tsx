import { useEffect, useState } from 'react';

type ShelfProps = {
  artist: string;
};

const Shelf = ({ artist }: ShelfProps) => {
  useEffect(() => {
    console.log('запуск', artist);

    return () => {
      console.log('очистка', artist);
    };
  }, [artist]);

  return <h3>{artist}</h3>;
};

export const App = () => {
  const [artist, setArtist] = useState('Kelela');
  const [isShown, setIsShown] = useState(true);

  return (
    <main>
      <button type="button" onClick={() => setArtist('Gallant')}>
        Gallant
      </button>
      <button type="button" onClick={() => setIsShown(false)}>
        Скрыть полку
      </button>
      {isShown && <Shelf key={artist} artist={artist} />}
    </main>
  );
};
