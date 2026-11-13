import { useState } from 'react';

import { initialPlayers, initialSortKey } from "./data.ts";
import { Page } from "./render.tsx";

import './styles/base.css';
import './styles/layout.css';
import './styles/block.css';
import './styles/line.css';
import './styles/sort.css';

import type { ScoreField } from './types.ts';
import { incrementPlayerField } from './calc.ts';

export const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [sortKey, setSortKey] = useState(initialSortKey);

  const handleIncrement = (id: string, field: ScoreField) => {
    setPlayers(current => incrementPlayerField(current, id, field));
  };

  return (
    <>
      <div className="sort-panel">
        <button type="button" aria-pressed={sortKey === 'potted'} onClick={() => setSortKey('potted')}>Забито</button>
        <button type="button" aria-pressed={sortKey === 'fouls'} onClick={() => setSortKey('fouls')}>Фолы</button>
        <button type="button" aria-pressed={sortKey === 'name'} onClick={() => setSortKey('name')}>Имя</button>
      </div>

      <Page players={players} sortKey={sortKey} onIncrement={handleIncrement}/>
    </>
  );
};