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

const layout = document.querySelector('.layout');

// Show players

for (const player of players) {
  if (!getTemplate('player-template')) { break; }
  const node = getTemplate('player-template');

  showText(node, 'player__name', player.name);
  showText(node, 'player__potted-count', player.potted);
  showText(node, 'player__fouls-count', player.fouls);

  showText(node, 'player__status', getPlayerStatus(player));

  if (!layout) { break; }
  layout.appendChild(node);
}

// Winner name //

if (getTemplate('player-template')) {
  const node = getTemplate('winner-template');
  
  let winnerText;
  if (getWinnerName(players)) {
    winnerText = `${getWinnerName(players)} победитель`;
  } else {
    winnerText = 'Победитель не определён';
  }
  showText(node, 'winner__text', winnerText);

  if (layout) { layout.appendChild(node); }
}

// Average potted //

if (getTemplate('average-potted-template')) {
  const node = getTemplate('average-potted-template');

  showText(node, 'average-potted__count', `${calcAveragePotted(players)}%`);

  if (layout) { layout.appendChild(node); }
}