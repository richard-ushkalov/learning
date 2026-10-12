import { getPlayers, getSortKey, loadPlayers, setPlayers, setSortKey } from './data.js';
import { renderPage } from './render.js';
import { getPlayerById, incrementPlayerField } from './calc.js';
import { showToast } from './toast.js';

const layout = document.querySelector('.layout');

layout.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');

  if (!button) {
    return;
  }

  const id = button.closest('[data-id]').dataset.id;
  const action = button.dataset.action;

  setPlayers(incrementPlayerField(getPlayers(), id, action));

  const player = getPlayerById(getPlayers(), id);
  const actionName = action === 'potted' ? 'забитый' : 'фол';
  showToast(`${player.name}: +1 ${actionName}`);

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
layout.textContent = 'Загрузка...';
try {
  loadPlayers((error, players) => {
    if (error) {
      layout.textContent = 'Не удалось загрузить игроков';
      return;
    }

    renderPage(players, getSortKey());
  });
} catch (error) {
  console.error(error);
  layout.textContent = 'Не удалось отрисовать таблицу';
}