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

type PlayerWithScoreProps = {
  scoredPlayer: ScoredPlayer;
}

const PlayerWithScore = ({ scoredPlayer }: PlayerWithScoreProps) => {
  return (
    <Block>
      <div className='line__content'>{ 'name: ' + scoredPlayer.name }</div>
      <div className='line__content'>{ 'team: ' + scoredPlayer.team }</div>
      <div className='line__content'>{ 'potted: ' + scoredPlayer.potted }</div>
      <div className='line__content'>{ 'fouls: ' + scoredPlayer.fouls }</div>
      <div className='line__content'>{ 'score: ' + scoredPlayer.score }</div>
      <button type='button'>+1 забитый</button>
      <button type='button'>+1 фол</button>
    </Block>
  )
};

type PlayersProps = {
  players: ScoredPlayer[];
}

const Players = ({ players }: PlayersProps) => {
  return players.map(player => <PlayerWithScore scoredPlayer={player} />);
};

type TeamsProps = {
  teams: Record<string, string[]>;
}

const Teams = ({ teams }: TeamsProps) => {
  return (
    <>
      {Object.entries(teams).map(([team, names]) => (
        <Block key={team}>
          <div className='line__content'>{team + ': ' + names.join(', ')}</div>
        </Block>
      ))}
    </>
  );
};

type TotalProps = {
  players: Player[]
};

const Total = ({ players }: TotalProps) => {
  return (
    <Block>
      <div className='line__content'>{ 'totalActive: ' + calcActivePlayers(players) }</div>
      <div className='line__content'>{ 'totalActivePotted: ' + calcActivePotted(players) }</div>
      <div className='line__content'>{ 'totalActiveAverageFouls: ' + calcActiveAverageFouls(players) }</div>
    </Block>
  )
};

type LeaderProps = {
  leader: ScoredPlayer;
}

const Leader = ({ leader }: LeaderProps) => {
  return (
    <Block>
      <div className='line__content'>{ 'leader: ' + leader.name + ' score: ' + leader.score }</div>
    </Block>
  )
};

type PageProps = {
  players: Player[];
  sortKey: SortKey;
}

export const Page = ({ players, sortKey }: PageProps) => {
  if (!Array.isArray(players) || players.length === 0) { return; }

  const active = players.filter(player => player.isActive);
  const activeSorted = getActiveSortedPlayers(players, sortKey);
  const activeSortedWithScore = getPlayersWithScore(activeSorted);
  const activeLeader = getPlayersLeader(active);
  const teams = getPlayersByTeams(active);

  return (
    <>
      <Players players={activeSortedWithScore} />
      <Teams teams={teams} />
      <Total players={players} />
      {activeLeader && <Leader leader={activeLeader} />}
    </>
  );
};