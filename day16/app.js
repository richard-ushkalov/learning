const players = [
  { id: 'p1', name: 'Аня', team: 'красные', potted: 8, fouls: 3, isActive: true },
  { id: 'p2', name: 'Борис', team: 'красные', potted: 8, fouls: 1, isActive: true },
  { id: 'p3', name: 'Вера', team: 'синие', potted: 3, fouls: 2, isActive: true },
  { id: 'p4', name: 'Глеб', team: 'синие', potted: 5, fouls: 0, isActive: false },
  { id: 'p5', name: 'Дина', team: 'зелёные', potted: 0, fouls: 4, isActive: true },
];

const block = {
  createBlock: function() {
    if (this.block) { return this.block; }

    const template = this.templateBlock.content.cloneNode(true);
    this.block = template.querySelector('.block');
    const layout = document.querySelector('.layout');
    layout.append(this.block);

    return this.block;
  },
  createContent: function() {
    if (this.content) { return this.content; }
    this.createBlock();

    const template = this.templateContent.content.cloneNode(true);
    this.content = [];
    this.content.push(template.querySelector('.line__content'));
    this.block.querySelector('.block__line').append(this.content[this.content.length - 1]);

    return this.content;
  },

  addContent: function() {
    this.createContent();

    const template = this.templateContent.content.cloneNode(true);
    this.content.push(template.querySelector('.line__content'));
    const line = this.block.querySelector('.block__line');
    line.append(this.content[this.content.length - 1]);

    return this.content[this.content.length - 1];
  },
  addContentWithText: function(text) { this.addContent().textContent = text; },

  // getContent: function() { return this.content[this.content.length - 1]; },

  // setText: function(text) {
  //   if (!this.createContent()) { return; }
  //   this.content[this.content.length - 1].textContent = text;
  // },
  // setTextByIndex: function(text, index) {
  //   if (!this.createContent()) { return; }
  //   if (!this.content[index]) { return; }
  //   this.createContent()[index].textContent = text;
  // },

  templateBlock: document.querySelector('#template-block'),
  templateContent: document.querySelector('#template-content'),
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

  const activeFouls =  activePlayers.reduce((fouls, player) => fouls + player.fouls, 0);
  
  if (activeCount === 0) { return '0.0'; }
  return (activeFouls / activeCount).toFixed(1);
};

const getActiveSortedPlayers = players => {
  return players
    .filter(player => player.isActive)
    .sort((a, b) => b.potted - a.potted === 0 ? a.fouls - b.fouls : b.potted - a.potted);
};

const getPlayersWithScore = players => {
  return players.map(player => ({ ...player, score: calcPlayerScore(player.potted, player.fouls)}));
};

const getPlayersByTeams = players => {
  return players
    .reduce((teams, player) => {
      teams[player.team] = teams[player.team] ?? [];
      teams[player.team].push(player.name);

      return teams;
    }, {});
};

// const getLeader = players => { return getActiveSortedPlayers(players)[0]; };

const renderPlayerWithScore = ({ name, team, potted, fouls, score }) => {
  const newBlock = {...block};

  newBlock.addContentWithText('name: ' + name);
  newBlock.addContentWithText('team: ' + team);
  newBlock.addContentWithText('potted: ' + potted);
  newBlock.addContentWithText('fouls: ' + fouls);
  newBlock.addContentWithText('score: ' + score);
};
const renderPlayers = players => {
  players.forEach(player => {
      renderPlayerWithScore(player);
  });
};

const renderTeams = teams => {
  Object.entries(teams).forEach(([team, names]) => {
    const newBlock = {...block};
    newBlock.addContentWithText(team + ': ' + names.join(', '));
  });
};

const renderTotal = players => {
  const newBlock = {...block};
  newBlock.addContentWithText('totalActive: ' + calcActivePlayers(players));
  newBlock.addContentWithText('totalActivePotted: ' + calcActivePotted(players));
  newBlock.addContentWithText('totalActiveAverageFouls: ' + calcActiveAverageFouls(players));
};

const renderLeader = leader => {
  const newBlock = {...block};
  newBlock.addContentWithText('leader: ' + leader.name + ' score: ' + leader.score);
};

const renderPage = players => {
  if (!Array.isArray(players) || players.length === 0) { return; }

  const active = players.filter(player => player.isActive);
  const activeWithScore = getPlayersWithScore(active);
  const activeSorted = getActiveSortedPlayers(players);
  const activeSortedWithScore = getPlayersWithScore(activeSorted);

  renderPlayers(activeSortedWithScore);
  renderTeams(getPlayersByTeams(activeSorted));
  renderTotal(players);
  if (activeWithScore[0]) { renderLeader(activeWithScore[0]); }
};
renderPage(players);