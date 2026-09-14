const players = [
  { id: 'p1', name: 'Аня', team: 'красные', potted: 8, fouls: 3, isActive: true },
  { id: 'p2', name: 'Борис', team: 'красные', potted: 8, fouls: 1, isActive: true },
  { id: 'p3', name: 'Вера', team: 'синие', potted: 3, fouls: 2, isActive: true },
  { id: 'p4', name: 'Глеб', team: 'синие', potted: 5, fouls: 0, isActive: false },
  { id: 'p5', name: 'Дина', team: 'зелёные', potted: 0, fouls: 4, isActive: true },
];

const layout = document.querySelector('.layout'); // 1 Раз
const fragmentBlock = document.querySelector('#template-block'); // 1 Раз
const fragmentContent = document.querySelector('#template-content'); // 1 Раз

const createBlock = () => {
  const initBlock = () => {
    const template = fragmentBlock.content.cloneNode(true);
    const block = template.querySelector('.block');

    layout.append(block);

    return block;
  };

  const block = initBlock();
  const blockLine = block.querySelector('.block__line'); // Кол-во вызовов createBlock() (9 раз)

  const addContent = () => {
    const template = fragmentContent.content.cloneNode(true);
    const content = template.querySelector('.line__content');

    blockLine.append(content);

    return content;
  };

  return {
    addContentWithText: (text) => {
      addContent().textContent = text;
    },
  };
};

const calcPlayerScore = (potted, fouls) => { return potted * 10 - fouls * 5; };
const calcActivePlayers = players => { return players.filter(player => player.isActive).length; };
const calcActivePotted = players => {
  return players
    .filter(player => player.isActive)
    .reduce((potted, player) => potted + player.potted, 0);
};
const calcActiveAverageFouls = players => {
  const activePlayers = players.filter(player => player.isActive);
  const activeCount = activePlayers.length;

  const activeFouls = activePlayers.reduce((fouls, player) => fouls + player.fouls, 0);

  if (activeCount === 0) { return '0.0'; }
  return (activeFouls / activeCount).toFixed(1);
};

const getActiveSortedPlayers = players => {
  return players
    .filter(player => player.isActive)
    .sort((a, b) => b.potted - a.potted === 0 ? a.fouls - b.fouls : b.potted - a.potted);
};

const getPlayersWithScore = players => {
  return players.map(player => ({ ...player, score: calcPlayerScore(player.potted, player.fouls) }));
};

const getPlayersByTeams = players => {
  return players
    .reduce((teams, player) => {
      teams[player.team] = teams[player.team] ?? [];
      teams[player.team].push(player.name);

      return teams;
    }, {});
};

const renderPlayerWithScore = ({ name, team, potted, fouls, score }) => {
  const newBlock = createBlock();

  newBlock.addContentWithText('name: ' + name);
  newBlock.addContentWithText('team: ' + team);
  newBlock.addContentWithText('potted: ' + potted);
  newBlock.addContentWithText('fouls: ' + fouls);
  newBlock.addContentWithText('score: ' + score);
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

const renderPage = players => {
  if (!Array.isArray(players) || players.length === 0) { return; }

  const active = players.filter(player => player.isActive);
  const activeSorted = getActiveSortedPlayers(players);
  const activeSortedWithScore = getPlayersWithScore(activeSorted);

  renderPlayers(activeSortedWithScore);
  renderTeams(getPlayersByTeams(active));
  renderTotal(players);
  if (activeSortedWithScore[0]) { renderLeader(activeSortedWithScore[0]); }
};
renderPage(players);