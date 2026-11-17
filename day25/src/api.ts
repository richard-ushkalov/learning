import type { Track } from './types.ts';

export const searchTracks = async (term: string, limit = 10): Promise<Track[]> => {
  const params = new URLSearchParams({ term, media: 'music', entity: 'song', limit: String(limit) });

  const response = await fetch(`https://itunes.apple.com/search?${params}`);

  if (!response.ok) {
    throw new Error(`Сервер вернул статус: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
};
