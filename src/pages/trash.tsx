import React from 'react';
import useArbitrageCalculator from '../hooks/useArbitrageCalculators';

const Arbitrage: React.FC = () => {
  const { odds, results, setOdds, calculateArbitrage } = useArbitrageCalculator();

  return (
    <div>
      <h1>Arbitrage Betting Calculator</h1>
      <form onSubmit={(e) => { e.preventDefault(); calculateArbitrage(); }}>
        <div>
          <label>
            Odds for Outcome A:
            <input
              type="number"
              step="0.01"
              value={odds.outcomeA}
              onChange={(e) => setOdds({ ...odds, outcomeA: parseFloat(e.target.value) })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Odds for Outcome B:
            <input
              type="number"
              step="0.01"
              value={odds.outcomeB}
              onChange={(e) => setOdds({ ...odds, outcomeB: parseFloat(e.target.value) })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Odds for Outcome C:
            <input
              type="number"
              step="0.01"
              value={odds.outcomeC}
              onChange={(e) => setOdds({ ...odds, outcomeC: parseFloat(e.target.value) })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Total Stake:
            <input
              type="number"
              step="0.01"
              value={odds.totalStake}
              onChange={(e) => setOdds({ ...odds, totalStake: parseFloat(e.target.value) })}
              required
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>
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
  );
};

export default Arbitrage;
