import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CartesianProduct from "./components/Form/CartesianProduct";
import { Match } from "./interfaces/index";

const App = () => {
  // Initial match object
  const matchObject: Match = {
    team1: "",
    team2: "",
    outcomes: [{ result: "", odds: "", outComeId: uuidv4() }],
    matchId: uuidv4(),
  };

  // State to hold matches
  const [matches, setMatches] = useState([matchObject]);

  // Handle form input changes
  const handleChange = (
    matchIndex: number,
    outcomeIndex: number | null,
    field: string,
    value: string
  ) => {
    const newMatches = [...matches];
    if (field === "team1" || field === "team2") {
      newMatches[matchIndex][field] = value;
    } else if (outcomeIndex !== null) {
      //@ts-expect-error err
      newMatches[matchIndex].outcomes[outcomeIndex][field] = value;
    }
    setMatches(newMatches);
  };

  // Add a new match
  const addMatch = () => {
    setMatches([...matches, { ...matchObject, matchId: uuidv4() }]);
  };

  // Clear all matches except the initial match
  const clearMatches = () => {
    setMatches([matchObject]);
  };

  // Add a new outcome to a match
  const addOutcome = (matchIndex: number) => {
    const newMatches = [...matches];
    newMatches[matchIndex].outcomes.push({
      result: "",
      odds: "",
      outComeId: uuidv4(),
    });
    setMatches(newMatches);
  };

  // Remove an outcome from a match
  const removeOutcome = (matchIndex: number, outComeId: string) => {
    const newMatches = [...matches];
    newMatches[matchIndex].outcomes = newMatches[matchIndex].outcomes.filter(
      (outcome) => outcome.outComeId !== outComeId
    );
    setMatches(newMatches);
  };

  // Handle form submission
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
                <h2>Match {matchIndex + 1}</h2>
                <input
                  type="text"
                  placeholder="Team 1"
                  value={match.team1}
                  onChange={(e) =>
                    handleChange(matchIndex, null, "team1", e.target.value)
                  }
                />
                <span> vs </span>
                <input
                  type="text"
                  placeholder="Team 2"
                  value={match.team2}
                  onChange={(e) =>
                    handleChange(matchIndex, null, "team2", e.target.value)
                  }
                />

                <h3>Outcomes</h3>
                {match.outcomes.map((outcome, outcomeIndex) => (
                  <div key={outcome.outComeId} style={{ marginBottom: "10px" }}>
                    <input
                      type="text"
                      placeholder="Outcome (1X, 2X, 12)"
                      value={outcome.result}
                      maxLength={2}
                      onChange={(e) =>
                        handleChange(
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
                        handleChange(
                          matchIndex,
                          outcomeIndex,
                          "odds",
                          e.target.value
                        )
                      }
                    />
                    <span
                      style={{marginLeft:"10px", marginRight:"10px", cursor: 'pointer'}}
                      onClick={() =>
                        removeOutcome(matchIndex, outcome.outComeId)
                      }
                    >
                     x
                    </span>
                  </div>
                ))}
                <button type="button" onClick={() => addOutcome(matchIndex)}>
                  Add Outcome
                </button>
              </div>
            ))}

            <button type="button" onClick={addMatch}>
              Add Match
            </button>

            <button type="submit">Submit</button>
          </form>
          <button onClick={clearMatches}>Clear Matches</button>
        </div>

        <div>
          <h2>Cartesian Product Outcome is</h2>
          <CartesianProduct match={matches} />
        </div>
      </div>
    </>
  );
};

export default App;
