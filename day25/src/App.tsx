import { Search } from './Search.tsx';
import { StartingBlock } from './StartingBlock.tsx';

export const App = () => {
  return (
    <main>
      <h1>Поиск треков</h1>

      <Search />
      <StartingBlock />
    </main>
  );
};
