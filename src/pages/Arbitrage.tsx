import  { useState } from "react"; 
import { v4 as uuidv4 } from "uuid";
import useArbitrageCalculator from "@hooks/useArbitrageCalculators";
import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';


const Arbitrage = () => {
  const {  results, setOddsHandler,} = useArbitrageCalculator();

  // Initial bet object structure
  const initialBet = {
    betId: uuidv4(),
    odds: 0, // Initial odds for each bet
  };

  // State to hold data: bets array and totalStake
  const [data, setData] = useState({
    bets: [initialBet],
    totalStake: 0,
  });

  /**
   * Function to add a new bet
   */
  const addBet = () => {
    const newBet = { betId: uuidv4(), odds: 0 };
    setData((prevData) => ({
      ...prevData,
      bets: [...prevData.bets, newBet],
    }));
  };

  /**
   * Function to clear all bets except the initial one and reset totalStake
   */
  const clearBets = () => {
    setData({
      bets: [initialBet],
      totalStake: 0,
    });
  };

  /**
   * Function to handle odds input change
   * @param {string} betId - The ID of the bet to update
   * @param {number} newOdds - The new odds value
   */
  const handleOddsChange = (betId: string, newOdds:number) => {
    setData((prevData) => ({
      ...prevData,
      bets: prevData.bets.map((bet) =>
        bet.betId === betId ? { ...bet, odds: newOdds } : bet
      ),
    }));
  };

  /**
   * Function to handle totalStake input change
   * @param {number} newStake - The new total stake value
   */
  const handleTotalStakeChange = (newStake: number) => {
    setData((prevData) => ({
      ...prevData,
      totalStake: newStake,
    }));
  };

  /**
   * Handle form submission
   * @param {React.FormEvent} e - The form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOddsHandler(data);
    // calculateArbitrage(); // Assuming this uses the updated state internally
  };

  return (
    // <>
    //   <h1>Arbitrage Betting Form</h1>
    //   <hr />
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     {/* Betting Form Section */}
    //     <div>
    //       <form onSubmit={handleSubmit}>
    //         {/* Render each bet */}
    //         {data.bets.map((bet, betIndex) => (
    //           <div key={bet.betId} style={{ marginBottom: "20px" }}>
    //             <span style={{ marginRight: "10px" }}>Bet {betIndex + 1}:</span>
    //             <input
    //               type="number"
    //               step="0.01"
    //               value={bet.odds == 0 ? '': bet.odds}
    //               onChange={(e) =>
    //                 handleOddsChange(bet.betId, parseFloat(e.target.value))
    //               }
    //               placeholder="Enter odds"
    //               required
    //             />
    //           </div>
    //         ))}

    //         {/* Input for Total Stake */}
    //         <div style={{ marginBottom: "20px" }}>
    //           <span style={{ marginRight: "10px" }}>Total Stake:</span>
    //           <input
    //             type="number"
    //             step="0.01"
    //             value={data.totalStake === 0 ? "" : data.totalStake}
    //             onChange={(e) =>
    //               handleTotalStakeChange(parseFloat(e.target.value))
    //             }
    //             placeholder="Enter total stake"
    //             required
    //           />
    //         </div>

    //         {/* Action Buttons */}
    //         <div>
    //           <button type="button" onClick={addBet} style={{ marginRight: "10px" }}>
    //             Add Bet
    //           </button>
    //           <button type="submit" style={{ marginRight: "10px" }}>
    //             Submit
    //           </button>
    //           <button type="button" onClick={clearBets}>
    //             Clear Bets
    //           </button>
    //         </div>
    //       </form>
    //     </div>

    //     {/* Results Section */}
    //     <div>
    //       {results && (
    //         <div>
    //           <h2>Results</h2>
    //           <p>Arbitrage Percentage: {results.arbPercentage.toFixed(3)}</p>
    //           {results.arbPercentage < 1 ? (
    //             <>
             
    //               <p>Stake for Outcome A: ${JSON.stringify(results)}</p>
    //               {/* <p>Stake for Outcome B: ${results.stake}</p>
    //               <p>Stake for Outcome C: ${results.stake}</p> */}
    //               {/* <p>Guaranteed Profit: ${results.profit.toFixed(2)}</p> */}
    //             </>
    //           ) : (
    //             <p>No arbitrage opportunity.</p>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
    <Typography variant="h4" gutterBottom>
      Arbitrage Betting Form
    </Typography>
    <Divider style={{ marginBottom: '20px' }} />

    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-evenly">
      {/* Betting Form Section */}
      <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
        <form onSubmit={handleSubmit}>
          {/* Render each bet */}
          {data.bets.map((bet, betIndex) => (
            <Box key={bet.betId} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>Bet {betIndex + 1}:</Typography>
              <TextField
                type="number"            
                value={bet.odds === 0 ? '' : bet.odds}
                onChange={(e) => handleOddsChange(bet.betId, parseFloat(e.target.value))}
                placeholder="Enter odds"
                required
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          ))}

          {/* Input for Total Stake */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Total Stake:</Typography>
            <TextField
              type="number"             
              value={data.totalStake === 0 ? '' : data.totalStake}
              onChange={(e) => handleTotalStakeChange(parseFloat(e.target.value))}
              placeholder="Enter total stake"
              required
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Action Buttons */}
          <Box>
            <Button variant="outlined" color="primary" onClick={addBet} sx={{ mr: 2 }}>
              Add Bet
            </Button>
            <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={clearBets}>
              Clear Bets
            </Button>
          </Box>
        </form>
      </Box>

      {/* Results Section */}
      <Box sx={{ flex: 1, ml: { md: 3 } }}>
        {results && (
          <Box>
            <Typography variant="h5">Results</Typography>
            <Typography variant="body1">Arbitrage Percentage: {results.arbPercentage.toFixed(3)}</Typography>
            {results.arbPercentage < 1 ? (
              <>
                <Typography variant="body1">Stake for Outcome A: ${JSON.stringify(results)}</Typography>
                {/* Uncomment and customize as needed
                <Typography variant="body1">Stake for Outcome B: ${results.stake}</Typography>
                <Typography variant="body1">Stake for Outcome C: ${results.stake}</Typography>
                <Typography variant="body1">Guaranteed Profit: ${results.profit.toFixed(2)}</Typography>
                */}
              </>
            ) : (
              <Typography variant="body1">No arbitrage opportunity.</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  </Paper>
  );
};

export default Arbitrage;
