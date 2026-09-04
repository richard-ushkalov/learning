const players = [
  { name: 'Аня', potted: 8, fouls: 1 },
  { name: 'Борис', potted: 8, fouls: 3 },
  { name: 'Вика', potted: 3, fouls: 0 }
];

const getTemplate = templateName => {
  const template = document.querySelector(`#${templateName}`);

  if (!template) { return null; }
  
  return template.content.cloneNode(true);
}

const showText = (origin, elementName, text) => {
  origin.querySelector(`.${elementName}`).textContent = `${text}`;
}

const isDisqualified = player => player.fouls >= 4;
const isWinner = player => player.potted == 8 && !isDisqualified(player);

const getPlayerStatus = player => {
  if (isDisqualified(player)) {
    return 'дисквалификация';
  } else if (player.potted == 8) {
    return 'победа';
  }

  return 'в игре';
}

const getWinnerName = () => {
  for (const player of players) {
    if (!isWinner(player)) { continue; }

    return `${player.name} победитель`;
  }

  return null;
}

const countAveragePotted = players => {
  let potted = 0;
  for (const player of players) {
    if (isDisqualified(player)) { continue; }

    potted += player.potted;
  }

  return Math.round(potted / (players.length * 8) * 100);
}

const layout = document.querySelector('.layout');
let node;

// Show players

for (const player of players) {
  node = getTemplate('player-template');

  showText(node, 'player__name', player.name);
  showText(node, 'player__potted-count', player.potted);
  showText(node, 'player__fouls-count', player.fouls);

  showText(node, 'player__status', getPlayerStatus(player));

  layout.appendChild(node);
}

// Winner name //

node = getTemplate('winner-template');
showText(node, 'winner__name', getWinnerName() ?? 'Победитель не определён');
layout.appendChild(node);


// Average potted //

node = getTemplate('average-potted-template');
showText(node, 'average-potted__count', `${countAveragePotted(players)}%`);
layout.appendChild(node);