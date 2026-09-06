const players = [
  { name: 'Аня', potted: 6, fouls: 1 },
  { name: 'Борис', potted: 8, fouls: 4 },
  { name: 'Вика', potted: 3, fouls: 0 }
];

const getTemplate = templateName => {
  const template = document.querySelector(`#${templateName}`);

  if (!template) { return null; }
  
  return template.content.cloneNode(true);
};

const showText = (origin, elementName, text) => {
  const element = origin.querySelector(`.${elementName}`);

  if (!element) { return; }

  element.textContent = text;
};

const isDisqualified = player => player.fouls >= 4;
const isWinner = player => player.potted === 8 && !isDisqualified(player);

const getPlayerStatus = player => {
  if (isDisqualified(player)) { return 'дисквалификация'; }
  if (isWinner(player)) { return 'победа'; }

  return 'в игре';
};

const getWinnerName = players => players.find(player => isWinner(player))?.name ?? null;

const calcAveragePotted = players => {
  const active = players.filter(player => !isDisqualified(player));
  const potted = active.reduce((sum, player) => sum + player.potted, 0);

  return Math.round(potted / (active.length * 8) * 100);
};

const getTopThreeNames = players => {
  return players
    .filter(player => !isDisqualified(player))
    .sort((a, b) => b.potted - a.potted)
    .slice(0, 3)
    .map(player => ' ' + player.name, ',')
    .join();
};

const calcAverageFouls = players => {
  const active = players.filter(player => !isDisqualified(player));
  const fouls = active.reduce((sum, player) => sum + player.fouls, 0);

  return Math.round(fouls / (players.length * 8) * 100);
};

const renderPlayers = (layout, players) => {
  players.forEach(player => {
    const node = getTemplate('player-template');

    if (!node) { return; }

    showText(node, 'player__name', player.name);
    showText(node, 'player__potted-count', player.potted);
    showText(node, 'player__fouls-count', player.fouls);
    showText(node, 'player__status', getPlayerStatus(player));
    layout.append(node);
  })
};

const renderWinner = (layout, players) => {
  const node = getTemplate('text-template');

  if (!node) { return; }

  const winnerName = getWinnerName(players);

  showText(node, 'text__line', winnerName ? `${winnerName} победитель` : 'Победитель не определён');
  layout.append(node);
};

const renderAveragePotted = (layout, players) => {
  const node = getTemplate('text-template');

  if (!node) { return; }

  showText(node, 'text__line', `${calcAveragePotted(players)}%`);
  layout.append(node);
};

const renderAverageFouls = (layout, players) => {
  const node = getTemplate('text-template');

  if (!node) { return; }

  showText(node, 'text__line', `Средние фолы: ${calcAverageFouls(players)}%`);
  layout.append(node);
};

const renderTopThree = (layout, players) => {
  const node = getTemplate('text-template');
  
  if (!node) { return; }

  showText(node, 'text__line', `Лучшие: ${getTopThreeNames(players)}`);
  layout.append(node);
};

const renderPage = players => {
  const layout = document.querySelector('.layout');

  if (!layout) { return; }

  renderPlayers(layout, players);
  renderWinner(layout, players);
  renderAveragePotted(layout, players);
  renderTopThree(layout, players);
  renderAverageFouls(layout, players);
};

renderPage(players);