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
  if (isDisqualified(player)) {
    return 'дисквалификация';
  } else if (player.potted === 8) {
    return 'победа';
  }

  return 'в игре';
};

const getWinnerName = players => {
  for (const player of players) {
    if (isWinner(player)) { return player.name; }
  }

  return null;
};

const calcAveragePotted = players => {
  let potted = 0;
  let notDisqualified = 0;
  for (const player of players) {
    if (isDisqualified(player)) { continue; }

    potted += player.potted;
    notDisqualified++;
  }

  return Math.round(potted / (notDisqualified * 8) * 100);
};

const renderPlayers = (layout, players) => {
  for (const player of players) {
    const node = getTemplate('player-template');

    if (!node) { break; }

    showText(node, 'player__name', player.name);
    showText(node, 'player__potted-count', player.potted);
    showText(node, 'player__fouls-count', player.fouls);
    showText(node, 'player__status', getPlayerStatus(player));
    layout.append(node);
  }
};

const renderWinner = (layout, players) => {
  const node = getTemplate('winner-template');

  if (!node) { return; }

  const winnerName = getWinnerName(players);

  showText(node, 'winner__text', winnerName ? `${winnerName} победитель` : 'Победитель не определён');
  layout.append(node);
};

const renderAverage = (layout, players) => {
  const node = getTemplate('average-potted-template');

  if (!node) { return; }

  showText(node, 'average-potted__count', `${calcAveragePotted(players)}%`);
  layout.append(node);
};

const renderPage = players => {
  const layout = document.querySelector('.layout');

  if (!layout) { return; }

  renderPlayers(layout, players);
  renderWinner(layout, players);
  renderAverage(layout, players);
}

renderPage(players);