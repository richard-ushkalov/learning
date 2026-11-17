import type { Track } from './types.ts';

type TrackItemProps = {
  track: Track;
}

export const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <li className="track">
      <img className="track__artwork" width="100" height="100" loading="lazy" src={track.artworkUrl100} alt="" />
      <p className="track__title">{track.trackName}</p>
      <p className="track__artist">{track.artistName}</p>
    </li>
  );
};
