import { MatchInterface, outcomeResult } from "@interfaces/Index";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

/**
 * CartesianProduct component
 *
 * @param {Object} props - The props object
 * @param {MatchInterface} props.match - The match object to process
 * @returns {React.ReactNode} - The rendered React component
 */
const CartesianProduct: React.FC<MatchInterface> = ({
  match,
}): React.ReactNode => {
  /** Recursive function to compute the Cartesian product */

  const cartesianProduct = (arr: outcomeResult[][]): outcomeResult[][] => {
    /**  Base case: if there's only one set, return it don't find the product  */

    if (arr.length === 1)
      return arr[0].map((item) => {
        return [item];
      });

    // Recursive step: take the first set and combine with the Cartesian product of the remaining sets
    const restProduct: outcomeResult[][] = cartesianProduct(arr.slice(1));

    return arr[0].flatMap((firstItem) =>
      restProduct.map((combination) => [firstItem, ...combination])
    );
  };

  // Function to generate combinations and calculate the odds multiplicant
  const getCombinationsWithOdds = () => {
    // Extract only the outcomes for each match
    const outcomeArrays: outcomeResult[][] = match.map(
      (match) => match.outcomes
    );

    // Compute the Cartesian product of all matches
    const combinations = cartesianProduct(outcomeArrays);

    // Calculate combined odds for each combination
    return combinations.map((combination) => {
      const combinedResult = combination
        .map((outcome) => outcome.result)
        .join(" & ");
      const combinedOdds = combination
        .reduce((acc, outcome) => acc * Number(outcome.odds), 1)
        .toFixed(3);
      return { result: combinedResult, odds: combinedOdds };
    });
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {match.map((match, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h5">
            {match.team1}{" "}
            {match.team1 === "" || match.team2 === "" ? null : <span>vs</span>}{" "}
            {match.team2}
          </Typography>
          <List>
            {match.outcomes.map((outcome, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${outcome.result} - Odds: ${outcome.odds}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      ))}

      <Typography variant="h6" gutterBottom>
        Combinations with Odds Multiplicant:
      </Typography>
      <List>
        {getCombinationsWithOdds().map((combo, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${combo.result} - Combined Odds: ${combo.odds}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
    // <div>
    //   <h1>Match Outcomes and Odds Combinations</h1>

    //   {match.map((match, index) => (
    //     <div key={index}>
    //       <h2>{match.team1} {match.team1 === "" || match.team2 ===" "? null: <><span>v</span></> } {match.team2}</h2>
    //       <ul>
    //         {match.outcomes.map((outcome, idx) => (
    //           <li key={idx}>
    //             {outcome.result} - Odds: {outcome.odds}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}

    //   <h3>Combinations with Odds Multiplicant:</h3>
    //   <ul>
    //     {getCombinationsWithOdds().map((combo, idx) => (
    //       <li key={idx}>
    //         {combo.result} - Combined Odds: {combo.odds}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default CartesianProduct;
