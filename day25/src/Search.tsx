import { useEffect, useState } from 'react';

import type { Track } from './types.ts';

import { searchTracks } from './api.ts';

import { TrackItem } from './TrackItem.tsx';

export const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Track[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTerm(query.trim());
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    let ignore = false;

    if (term === '') {
      return () => {
        ignore = true;
      };
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const found = await searchTracks(term, 5);

        if (ignore) {
          return;
        }

        setResults(found);
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
  }, [term]);

  let status = '';

  if (isLoading) {
    status = 'Загрузка...';
  } else if (error) {
    status = `Не удалось найти трек: ${error}`;
  } else if (term.length != 0 && results.length === 0) {
    status = 'Ничего не найдено';
  }

  return (
    <search className="search">
      <label htmlFor="tracks">Введите название трека
        <input
          id="tracks"
          className="search__input"
          type="search"
          name="tracks-search"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>

      <p className="search__status" role="status">{status}</p>

      <ul className="search__list">
        {(status === '' && term.length !== 0) && results.map(result => (
          <TrackItem key={result.trackId} track={result} />
        ))}
      </ul>
    </search>
  );
};
