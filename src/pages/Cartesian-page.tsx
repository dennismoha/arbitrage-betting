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



import { RootState } from "@store/store"; // Adjust the path accordingly

const Cartesian = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state: RootState) => state.CartesianReducer.matches);
  console.log('matches are ',  useSelector((state: RootState) => state.CartesianReducer.matches))

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", matches);
    // You can send the matches data to an API or use it in your app
  };

  return (
    <>
      <h1>Match Outcomes Form</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            {matches.map((match, matchIndex) => (
              <div key={match.matchId} style={{ marginBottom: "20px" }}>
                <h3>Match {matchIndex + 1}</h3>

                <input
                  type="text"
                  placeholder="Team 1"
                  value={match.team1}
                  onChange={(e) =>
                    handleInputChange(matchIndex, null, "team1", e.target.value)
                  }
                />
                <span> vs </span>
                <input
                  type="text"
                  placeholder="Team 2"
                  value={match.team2}
                  onChange={(e) =>
                    handleInputChange(matchIndex, null, "team2", e.target.value)
                  }
                />
                <span
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveMatch(matchIndex)}
                >
                  X
                </span>

                <h3>Outcomes</h3>
                {match.outcomes.map((outcome, outcomeIndex) => (
                  <div key={outcome.outComeId} style={{ marginBottom: "10px" }}>
                    <input
                      type="text"
                      placeholder="Outcome (1X, 2X, 12)"
                      value={outcome.result}
                      maxLength={2}
                      onChange={(e) =>
                        handleInputChange(
                          matchIndex,
                          outcomeIndex,
                          "result",
                          e.target.value
                        )
                      }
                    />
                    <span> - </span>
                    <input
                      type="number"
                      placeholder="Odds"
                      value={outcome.odds}
                      maxLength={4}
                      onChange={(e) =>
                        handleInputChange(
                          matchIndex,
                          outcomeIndex,
                          "odds",
                          e.target.value
                        )
                      }
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleRemoveOutcome(matchIndex, outcome.outComeId)
                      }
                    >
                      x
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddOutcome(matchIndex)}
                >
                  Add Outcome
                </button>
              </div>
            ))}

            <button type="button" onClick={handleAddMatch}>
              Add Match
            </button>

            <button type="submit">Submit</button>
          </form>
          <button onClick={handleClearMatches}>Clear Matches</button>
        </div>

        <div>
          <h2>Cartesian Product Outcome is</h2>
          <CartesianProduct match={matches} />
        </div>
      </div>
    </>
  );
};

export default Cartesian;
