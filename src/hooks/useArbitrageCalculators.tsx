import { useState, useEffect } from "react";
import { ArbitrageInterface } from "@interfaces/Index";

type OddsType = {
  betId: string;
  odds: number;
};

type OddsInput = OddsType[];

type ArbitrageResults = {
  arbPercentage: number;
  stakes: { [id: string]: number };
  profit: number;
} | null;

const useArbitrageCalculator = () => {
  const [odds, setOdds] = useState<OddsInput>([]);
  const [totalStake, setTotalStake] = useState<number>(0); // Separate totalStake state
  const [results, setResults] = useState<ArbitrageResults>(null);

  useEffect(() => {
    calculateArbitrage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [odds, totalStake]);

  const setOddsHandler = (k: ArbitrageInterface) => {
    setOdds(k.bets);
    setTotalStake(k.totalStake);
  };

  const calculateArbitrage = () => {
    if (odds.length === 0) return;

    // Calculate arbitrage percentage

    const arbPercentage = odds.reduce((acc, { odds }) => acc + 1 / odds, 0);

    if (arbPercentage >= 1) {
      setResults({
        arbPercentage,
        stakes: odds.reduce((acc, { betId }) => ({ ...acc, [betId]: 0 }), {}),
        profit: 0,
      });
      return;
    }

    // Calculate stakes for each outcome
    const stakes = odds.reduce((acc, { betId, odds: outcomeOdds }) => {
      const stake = (totalStake * (1 / outcomeOdds)) / arbPercentage;
      return { ...acc, [betId]: stake };
    }, {});

    // Calculate total returns and profit

    //@ts-expect-error this function not returning well
    const totalReturns = odds.reduce((acc, { betId, odds: odds }) => acc + stakes[betId] * odds,
      0
    );

    const profit = (totalReturns - totalStake) / 2;

    setResults({
      arbPercentage,
      stakes,
      profit,
    });
  };

  // const updateOdds = (newOdds: OddsInput) => {
  //   setOdds(newOdds);
  // };

  return {
    totalStake,
    results,

    setOddsHandler,
  };
};

export default useArbitrageCalculator;
