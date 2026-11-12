import type { Player, ScoredPlayer, SortKey } from './types.ts';
import {
    calcActivePlayers,
    calcActivePotted,
    calcActiveAverageFouls,
    getPlayersWithScore,
    getActiveSortedPlayers,
    getPlayersByTeams,
    getPlayersLeader
} from './calc.ts';
import { Block } from './block.tsx';

const renderPlayerWithScore = ({ id, name, team, potted, fouls, score }: ScoredPlayer) => {
  return (
    <Block dataset-id={id}>
      <p>{ 'name: ' + name }</p>
      <p>{ 'team: ' + team }</p>
      <p>{ 'potted: ' + potted }</p>
      <p>{ 'fouls: ' + fouls }</p>
      <p>{ 'score: ' + score }</p>
      <button type='button' dataset-action={'potted'}>{ '+1 забитый' }</button>
      <button type='button' dataset-action={'fouls'}>{ '+1 фол' }</button>
    </Block>
  )
};
const renderPlayers = (players: ScoredPlayer[]) => {
  players.forEach(player => {
    renderPlayerWithScore(player);
  });
};

const renderTeams = (teams: Record<string, string[]>) => {
  Object.entries(teams).forEach(([team, names]) => {
    return (
      <Block>
        <p>{ team + ': ' + names.join(', ') }</p>
      </Block>
    )
  });
};

const renderTotal = (players: Player[]) => {
  return (
    <Block>
      <p>{ 'totalActive: ' + calcActivePlayers(players) }</p>
      <p>{ 'totalActivePotted: ' + calcActivePotted(players) }</p>
      <p>{ 'totalActiveAverageFouls: ' + calcActiveAverageFouls(players) }</p>
    </Block>
  )
};

const renderLeader = (leader: ScoredPlayer) => {
  return (
    <Block>
      <p>{ 'leader: ' + leader.name + ' score: ' + leader.score }</p>
    </Block>
  )
};

export const renderPage = (players: Player[], sortKey: SortKey) => {
  if (!Array.isArray(players) || players.length === 0) { return; }

  const active = players.filter(player => player.isActive);
  const activeSorted = getActiveSortedPlayers(players, sortKey);
  const activeSortedWithScore = getPlayersWithScore(activeSorted);
  const activeLeader = getPlayersLeader(active);

  renderPlayers(activeSortedWithScore);
  renderTeams(getPlayersByTeams(active));
  renderTotal(players);
  if (activeLeader) { renderLeader(activeLeader); }
};