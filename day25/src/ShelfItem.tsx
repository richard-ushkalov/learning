import { TrackItem } from './TrackItem.tsx';
import type { Track } from './types.ts';

type ShelfItemProps = {
  title: string
  tracks: Track[];
}

export const ShelfItem = ({ title, tracks }: ShelfItemProps) => {
  return (
    <section className="shelf">
      <h3 className="shelf__title">{title}</h3>
      <p className="shelf__status" role="status"></p>
      <ul className="shelf__list">
        {tracks.map(track => <TrackItem key={track.trackId} track={track} />)}
      </ul>
    </section>
  )
};
