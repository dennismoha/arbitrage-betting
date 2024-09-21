export type outcomeResult = {
  result: string;
  odds: string;
  outComeId: string;
};

export type FieldKey = keyof outcomeResult | 'team1' | 'team2';

export type Match = {
  team1: string;
  team2: string;
  outcomes: outcomeResult[];
  matchId: string;
};
export interface MatchInterface {
  match: Match[];
}

type ArbitrageObject = {
  betId : string;
  odds: number
}

export interface ArbitrageInterface {
  bets: ArbitrageObject[];
  totalStake: number

}
