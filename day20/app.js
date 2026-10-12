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

const updateButtons = () => {
  sortPanel.querySelectorAll('[data-sort]').forEach(button => {
    button.ariaPressed = button.dataset.sort === getSortKey();
  });
}

sortPanel.addEventListener('click', event => {
  const button = event.target.closest('[data-sort]');

  if (!button) {
    return;
  }

  setSortKey(button.dataset.sort);
  updateButtons();
  renderPage(getPlayers(), getSortKey());
});

updateButtons();
renderPage(getPlayers(), getSortKey());