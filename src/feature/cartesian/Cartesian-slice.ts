// src/features/counter/cartesianSlice.ts

import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Match,   FieldKey } from "@interfaces/Index";
import { v4 as uuidv4 } from "uuid";




// Define the Match and Outcome types


// Define the initial match object
const initialMatch: Match = {
  team1: "",
  team2: "",
  outcomes: [{ result: "", odds: "", outComeId: uuidv4() }],
  matchId: uuidv4(),
};

// Define the initial state
interface MatchesState {
  matches: Match[];
}

const initialState: MatchesState = {
  matches: [initialMatch],
};

// Create the slice
const CartesianSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    addMatch: (state) => {
      state.matches.push({
        ...initialMatch  ,
        matchId: uuidv4()   
      });
    },
    removeMatch: (state, action: PayloadAction<number>) => {
      state.matches.splice(action.payload, 1);
    },
    clearMatches: (state) => {
      state.matches = [initialMatch];
    },
    handleChange: (
      state,
      action: PayloadAction<{
        matchIndex: number;
        outcomeIndex: number | null;
        field:  FieldKey;
        value: string;
      }>
    ) => {
      const { matchIndex, outcomeIndex, field, value } = action.payload;
      const match: Match  = state.matches[matchIndex];
      if (field === 'team1' || field === 'team2') {
        match[field] = value;
      } else if (outcomeIndex !== null) {
        match.outcomes[outcomeIndex][field] = value;
      }
    },
    addOutcome: (state, action: PayloadAction<number>) => {
      const match = state.matches[action.payload];
      match.outcomes.push({
        result: '',
        odds: '',
        outComeId: uuidv4(),
      });
    },
    removeOutcome: (
      state,
      action: PayloadAction<{ matchIndex: number; outComeId: string }>
    ) => {
      const { matchIndex, outComeId } = action.payload;
      const match = state.matches[matchIndex];
      match.outcomes = match.outcomes.filter(
        (outcome) => outcome.outComeId !== outComeId
      );
    },
  },
});

// Export actions and reducer
export const {
  addMatch,
  removeMatch,
  clearMatches,
  handleChange,
  addOutcome,
  removeOutcome,
} = CartesianSlice.actions;

export default CartesianSlice.reducer;
