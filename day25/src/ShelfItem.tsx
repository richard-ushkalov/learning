import { TrackItem } from './TrackItem.tsx';
import type { Track } from './types.ts';

type ShelfItemProps = {
  title: string;
  isLoading: boolean;
  error: string | null;
  tracks: Track[];
};

export const ShelfItem = ({ title, isLoading, error, tracks }: ShelfItemProps) => {
  let status = '';

  if (isLoading) {
    status = 'Загрузка...';
  } else if (error) {
    status = `Не удалось загрузить полку: ${error}`;
  } else if (tracks.length === 0) {
    status = 'Ничего не найдено';
  }

  return (
    <section className="shelf">
      <h3 className="shelf__title">{title}</h3>
      <p className="shelf__status" role="status">{status}</p>
      {status === '' && (
        <ul className="shelf__list">
          {tracks.map(track => (
            <TrackItem key={track.trackId} track={track} />
          ))}
        </ul>
      )}
    </section>
  );
};
