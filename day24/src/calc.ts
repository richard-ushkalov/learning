import type { Player, ScoreField, SortKey } from './types.ts';

const calcPlayerScore = (potted: number, fouls: number) => { return potted * 10 - fouls * 5; };
export const calcActivePlayers = (players: Player[]) => { return players.filter(player => player.isActive).length; };
export const calcActivePotted = (players: Player[]) => {
  return players
    .filter(player => player.isActive)
    .reduce((potted, player) => potted + player.potted, 0);
};
export const calcActiveAverageFouls = (players: Player[]) => {
  const activePlayers = players.filter(player => player.isActive);
  const activeCount = activePlayers.length;

  const activeFouls = activePlayers.reduce((fouls, player) => fouls + player.fouls, 0);

  if (activeCount === 0) { return '0.0'; }
  return (activeFouls / activeCount).toFixed(1);
};

export const getActiveSortedPlayers = (players: Player[], sortKey: SortKey) => {
  return players
    .filter(player => player.isActive)
    .sort((a, b) => {
      if (sortKey === 'fouls') {
        return a.fouls - b.fouls === 0 ? b.potted - a.potted : a.fouls - b.fouls;
      }
      else if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      }

      return b.potted - a.potted === 0 ? a.fouls - b.fouls : b.potted - a.potted;
  });
};

export const getPlayersWithScore = (players: Player[]) => {
  return players.map(player => ({ ...player, score: calcPlayerScore(player.potted, player.fouls) }));
};

export const getPlayersByTeams = (players: Player[]) => {
  return players.reduce((teams: Record<string, string[]>, player) => {
      teams[player.team] = teams[player.team] ?? [];
      teams[player.team].push(player.name);

      return teams;
    }, {});
};

export const getPlayersLeader = (players: Player[]) => {
  if (players.length === 0) return;

  const playersWithScore = getPlayersWithScore(players);
  return playersWithScore.reduce((leader, player) => {
    return player.score > leader.score ? player : leader;
  }, playersWithScore[0]);
}

export const incrementPlayerField = (players: Player[], id: string, field: ScoreField) => {
  return players.map(player => {
    if (player.id === id) {
      return { ...player, [field]: player[field] + 1 };
    }
    
    return player;
  });
}