import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useArbitrageCalculator from "../hooks/useArbitrageCalculators";





const Arbitrage = () => {
  const { odds,  setOdds, results, calculateArbitrage } = useArbitrageCalculator();


  // Initial bet object structure
  const betObject = {
    betId: uuidv4(),
    odds: 0,  // Initial odds for each bet
  };

  // State to hold all bet objects (array)
  const [bets, setBets] = useState([betObject]);

  // Function to handle adding new bet
  const addBets = () => {
    setBets([...bets, { betId: uuidv4(), odds: 0 }]);
  };

  // Function to clear all bets except the initial one
  const clearBets = () => {
    setBets([betObject]);
  };

  // Function to handle odds input change
  const handleOddsChange = (betId: string, newOdds: number) => {
    console.log('new odds are ', newOdds)
    setBets(
      bets.map((bet) =>
        bet.betId === betId ? { ...bet, odds: newOdds } : bet
      )
    );

    setTimeout(()=>{
      console.log('bets is ', bets)
    },10000)

    setOdds({...odds, bets})
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate the arbitrage based on the current odds
   // const oddsArray = bets.map((bet) => bet.odds);
    calculateArbitrage();  // Pass odds array to the function
  };

  return (
    <>
      <h1>Arbitrage Betting Form</h1>
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
            {bets.map((bet, betIndex) => (
              <div key={bet.betId} style={{ marginBottom: "20px" }}>
                <h6>{JSON.stringify(bet)}</h6>
                <span style={{ marginRight: "30px" }}>Bet {betIndex + 1}</span>
                <input
                  type="number"
                  step="0.01"
                  value={bet.odds || ""}
                  onChange={(e) =>
                    handleOddsChange(bet.betId, parseFloat(e.target.value))
                  }
                  required
                />
              </div>
            ))}

            <button type="button" onClick={addBets}>
              Add Bet
            </button>
            <button type="submit">Submit</button>
          </form>
          <button onClick={clearBets}>Clear Bets</button>
        </div>

        <div>
          {results && (
            <div>
              <h2>Results</h2>
              <p>Arbitrage Percentage: {results.arbPercentage.toFixed(3)}</p>
              {results.arbPercentage < 1 ? (
                <>
                  <p>Stake for Outcome A: ${results.stakeA.toFixed(2)}</p>
                  <p>Stake for Outcome B: ${results.stakeB.toFixed(2)}</p>
                  <p>Stake for Outcome C: ${results.stakeC.toFixed(2)}</p>
                  <p>Guaranteed Profit: ${results.profit.toFixed(2)}</p>
                </>
              ) : (
                <p>No arbitrage opportunity.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Arbitrage;
