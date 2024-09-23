import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartesianProduct from "@components/Form/CartesianProduct";
import {
  addMatch,
  removeMatch,
  clearMatches,
  handleChange,
  addOutcome,
  removeOutcome,
} from "@slice/cartesian/Cartesian-slice"; // Adjust the path accordingly
import { FieldKey } from "@interfaces/Index";
// import { Button } from '@mui/material';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { RootState } from "@store/store"; // Adjust the path accordingly

const Cartesian = () => {
  const dispatch = useDispatch();
  const matches = useSelector(
    (state: RootState) => state.CartesianReducer.matches
  );

  // Handle form input changes
  const handleInputChange = (
    matchIndex: number,
    outcomeIndex: number | null,
    field: FieldKey,
    value: string
  ) => {
    dispatch(handleChange({ matchIndex, outcomeIndex, field, value }));
  };

  const handleAddMatch = () => {
    dispatch(addMatch());
  };

  const handleRemoveMatch = (matchIndex: number) => {
    dispatch(removeMatch(matchIndex));
  };

  const handleAddOutcome = (matchIndex: number) => {
    dispatch(addOutcome(matchIndex));
  };

  const handleRemoveOutcome = (matchIndex: number, outComeId: string) => {
    dispatch(removeOutcome({ matchIndex, outComeId }));
  };

  const handleClearMatches = () => {
    dispatch(clearMatches());
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5">Match Outcomes Form</Typography>
      <Divider style={{ margin: "10px 0" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <form>
              {matches.map((match, matchIndex) => (
                <Box
                  key={match.matchId}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6">Match {matchIndex + 1}</Typography>
                  <Box display="flex" alignItems="center">
                    <TextField
                      variant="outlined"
                      placeholder="Team 1"
                      value={match.team1}
                      onChange={(e) =>
                        handleInputChange(
                          matchIndex,
                          null,
                          "team1",
                          e.target.value
                        )
                      }
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body1">vs</Typography>
                    <TextField
                      variant="outlined"
                      placeholder="Team 2"
                      value={match.team2}
                      onChange={(e) =>
                        handleInputChange(
                          matchIndex,
                          null,
                          "team2",
                          e.target.value
                        )
                      }
                      sx={{ mx: 1 }}
                    />

                    {matches.length === 1 ? null : (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveMatch(matchIndex)}
                      >
                        X
                      </Button>
                    )}
                  </Box>
                  <Typography variant="h6">Outcomes</Typography>
                  {match.outcomes.map((outcome, outcomeIndex) => (
                    <Box
                      key={outcome.outComeId}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <TextField
                        variant="outlined"
                        placeholder="Outcome (1X, 2X, 12)"
                        value={outcome.result}
                        inputProps={{
                          maxLength: 25,
                        }}
                        onChange={(e) =>
                          handleInputChange(
                            matchIndex,
                            outcomeIndex,
                            "result",
                            e.target.value
                          )
                        }
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body1">-</Typography>
                      <TextField
                        variant="outlined"
                        type="number"
                        placeholder="Odds"
                        value={outcome.odds}
                        onChange={(e) =>
                          handleInputChange(
                            matchIndex,
                            outcomeIndex,
                            "odds",
                            e.target.value
                          )
                        }
                        sx={{ mx: 1 }}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleRemoveOutcome(matchIndex, outcome.outComeId)
                        }
                      >
                        x
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => handleAddOutcome(matchIndex)}
                  >
                    Add Outcome
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleAddMatch}
              >
                Add Match
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearMatches}
                sx={{ ml: 1 }}
              >
                Clear Matches
              </Button>
            </form>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{ mr: "10x", ml: "10px", mt: "8px", textAlign: "center" }}
              >
                Match Outcome combination
              </Typography>
              <CartesianProduct match={matches} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Cartesian;
