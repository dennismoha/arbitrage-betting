import { MatchInterface } from "../../interfaces";

const CartesianProduct: React.FC<MatchInterface> = ({match})  => {
  // Sample data for N matches with outcomes and odds


  // Recursive function to compute the Cartesian product
  const cartesianProduct = (arr) => {
    // Base case: if there's only one set, return it as the product
    if (arr.length === 1) return arr[0].map(item => [item]);

    // Recursive step: take the first set and combine with the Cartesian product of the remaining sets
    const restProduct = cartesianProduct(arr.slice(1));
    console.log('array 0 is ', arr)
    return arr[0].flatMap(firstItem => restProduct.map(combination => [firstItem, ...combination]));
  };

  // Function to generate combinations and calculate the odds multiplicant
  const getCombinationsWithOdds = () => {
    // Extract only the outcomes for each match
    const outcomeArrays = match.map(match => match.outcomes);

    // Compute the Cartesian product of all matches
    const combinations = cartesianProduct(outcomeArrays);

    // Calculate combined odds for each combination
    return combinations.map(combination => {
      console.log('combinations when returning are ', combinations)
      const combinedResult = combination.map(outcome => outcome.result).join(' & ');
      const combinedOdds = combination.reduce((acc, outcome) => acc * outcome.odds, 1).toFixed(3);
      return { result: combinedResult, odds: combinedOdds };
    });
  };

  return (
    <div>
      <h1>Match Outcomes and Odds Combinations</h1>
      
      {match.map((match, index) => (
        <div key={index}>
          <h2>{match.teams}</h2>
          <ul>
            {match.outcomes.map((outcome, idx) => (
              <li key={idx}>
                {outcome.result} - Odds: {outcome.odds}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Combinations with Odds Multiplicant:</h3>
      <ul>
        {getCombinationsWithOdds().map((combo, idx) => (
          <li key={idx}>
            {combo.result} - Combined Odds: {combo.odds}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartesianProduct;
