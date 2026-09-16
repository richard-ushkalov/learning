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

export { calcActivePlayers, calcActivePotted, calcActiveAverageFouls, getActiveSortedPlayers, getPlayersWithScore, getPlayersByTeams }