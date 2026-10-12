import { clearLayout, createBlock } from './block.js';
import {
    calcActivePlayers,
    calcActivePotted,
    calcActiveAverageFouls,
    getPlayersWithScore,
    getActiveSortedPlayers,
    getPlayersByTeams,
    getPlayersLeader
} from './calc.js';

const renderPlayerWithScore = ({ id, name, team, potted, fouls, score }) => {
  const newBlock = createBlock();

  newBlock.addContentWithText('name: ' + name);
  newBlock.addContentWithText('team: ' + team);
  newBlock.addContentWithText('potted: ' + potted);
  newBlock.addContentWithText('fouls: ' + fouls);
  newBlock.addContentWithText('score: ' + score);
  newBlock.addId(id);
  newBlock.addButton('+1 забитый', 'potted');
  newBlock.addButton('+1 фол', 'fouls');
};
const renderPlayers = players => { // 4 Блока 5 Строк
  players.forEach(player => {
    renderPlayerWithScore(player);
  });
};

const renderTeams = teams => { // 3 Блока 1 + 1 + 1 Строки
  Object.entries(teams).forEach(([team, names]) => {
    const newBlock = createBlock();
    newBlock.addContentWithText(team + ': ' + names.join(', '));
  });
};

const renderTotal = players => { // 1 Блок 3 Строки
  const newBlock = createBlock();
  newBlock.addContentWithText('totalActive: ' + calcActivePlayers(players));
  newBlock.addContentWithText('totalActivePotted: ' + calcActivePotted(players));
  newBlock.addContentWithText('totalActiveAverageFouls: ' + calcActiveAverageFouls(players));
};

const renderLeader = leader => { // 1 Блок + 1 Строка
  const newBlock = createBlock();
  newBlock.addContentWithText('leader: ' + leader.name + ' score: ' + leader.score);
};

export const renderPage = (players, sortKey) => {
  clearLayout();

  if (!Array.isArray(players)) { return; }

  const active = players.filter(player => player.isActive);
  const activeSorted = getActiveSortedPlayers(players, sortKey);
  const activeSortedWithScore = getPlayersWithScore(activeSorted);
  const activeLeader = getPlayersLeader(active);

  renderPlayers(activeSortedWithScore);
  renderTeams(getPlayersByTeams(active));
  renderTotal(players);
  if (activeLeader) { renderLeader(activeLeader); }
};