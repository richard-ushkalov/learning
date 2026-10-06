import { getPlayers, getSortKey, setPlayers, setSortKey } from './data.js';
import { renderPage } from './render.js';
import { incrementPlayerField } from './calc.js';

const layout = document.querySelector('.layout');

layout.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');

  if (!button) {
    return;
  }

  const id = button.closest('[data-id]').dataset.id;
  const action = button.dataset.action;

  setPlayers(incrementPlayerField(getPlayers(), id, action));

  renderPage(getPlayers(), getSortKey());
});

const sortPanel = document.querySelector('.sort-panel');

sortPanel.addEventListener('click', event => {
  const button = event.target.closest('[data-sort]');

  if (!button) {
    return;
  }

  sortPanel.querySelectorAll('[aria-pressed]').forEach(button => button.ariaPressed = false);
  button.ariaPressed = true;

  setSortKey(button.dataset.sort);
  renderPage(getPlayers(), getSortKey());
});

renderPage(getPlayers(), getSortKey());