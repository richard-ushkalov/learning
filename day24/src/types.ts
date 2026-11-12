export type Player = {
  id: string;
  name: string;
  team: string;
  potted: number;
  fouls: number;
  isActive: boolean;
}

export type ScoreField = 'potted' | 'fouls';

export type SortKey = 'potted' | 'fouls' | 'name';

export type ScoredPlayer = Player & { score: number };

