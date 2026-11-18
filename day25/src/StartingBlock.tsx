import { Shelf } from './Shelf.tsx';

const startingArtists = ['Gallant', 'Kelela', 'FKA Twigs'];

export const StartingBlock = () => {
  return (
    <section className="starting-block">
      <h2 className="starting-block__title">Для начала</h2>
      <div className="starting-block__shelves">
        {startingArtists.map(artist => (
          <Shelf key={artist} artist={artist} />
        ))}
      </div>
    </section>
  );
};
