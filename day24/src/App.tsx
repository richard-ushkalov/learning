// layout.addEventListener('click', event => {
//   const button = event.target.closest('[data-action]');

//   if (!button) {
//     return;
//   }

//   const id = button.closest('[data-id]').dataset.id;
//   const action = button.dataset.action;

//   setPlayers(incrementPlayerField(getPlayers(), id, action));

//   renderPage(getPlayers(), getSortKey());
// });

// const updateButtons = () => {
//   sortPanel.querySelectorAll('[data-sort]').forEach(button => {
//     button.ariaPressed = button.dataset.sort === getSortKey();
//   });
// }

// sortPanel.addEventListener('click', event => {
//   const button = event.target.closest('[data-sort]');

//   if (!button) {
//     return;
//   }

//   setSortKey(button.dataset.sort);
//   updateButtons();
//   renderPage(getPlayers(), getSortKey());
// });

// updateButtons();

import { initialPlayers } from "./data";
import { renderPage } from "./render";

export const App = () => {
  const players = initialPlayers;

  renderPage(players, 'name');

  return (
    <>
      <div className="sort-panel">
        <button data-sort="potted" type="button">Забито</button>
        <button data-sort="fouls" type="button">Фолы</button>
        <button data-sort="name" type="button">Имя</button>
      </div>
    </>
  );
};