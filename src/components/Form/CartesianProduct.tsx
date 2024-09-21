import { MatchInterface, outcomeResult } from "@interfaces/Index";


/**
 * CartesianProduct component
 * 
 * @param {Object} props - The props object
 * @param {MatchInterface} props.match - The match object to process
 * @returns {React.ReactNode} - The rendered React component
 */
const CartesianProduct: React.FC<MatchInterface> = ({match}): React.ReactNode => {
/** Recursive function to compute the Cartesian product */

  const cartesianProduct = (arr: outcomeResult[][]) :  outcomeResult[][]=> {    
    /**  Base case: if there's only one set, return it don't find the product  */
    
    if (arr.length === 1) return arr[0].map(item => {
      console.log('item is =======> ', item)
      return [item]
    });

    // Recursive step: take the first set and combine with the Cartesian product of the remaining sets
    const restProduct: outcomeResult[][] = cartesianProduct(arr.slice(1));
    console.log('rest product is~~~~~^^^^^^^^^^----> ', restProduct)
    console.log('@@@@@@@ the final product is --------> ', arr[0].flatMap(firstItem => restProduct.map(combination => [firstItem, ...combination])))

    return arr[0].flatMap(firstItem => restProduct.map(combination => [firstItem, ...combination]));
  };

  // Function to generate combinations and calculate the odds multiplicant
  const getCombinationsWithOdds = () => {
    // Extract only the outcomes for each match
    const outcomeArrays: outcomeResult[][] = match.map(match => match.outcomes);
    console.log('outcome array is ', outcomeArrays)

    // Compute the Cartesian product of all matches
    const combinations  = cartesianProduct(outcomeArrays);

    // Calculate combined odds for each combination
    return combinations.map(combination => {
      console.log('combinations when returning are ', combinations)
      const combinedResult = combination.map(outcome => outcome.result).join(' & ');
      const combinedOdds = combination.reduce((acc, outcome) => acc * Number(outcome.odds), 1).toFixed(3);
      return { result: combinedResult, odds: combinedOdds };
    });
  };

  return (
    <div>
      <h1>Match Outcomes and Odds Combinations</h1>
      
      {match.map((match, index) => (
        <div key={index}>
          <h2>{match.team1} {match.team1 === "" || match.team2 ===" "? null: <><span>v</span></> } {match.team2}</h2>
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
