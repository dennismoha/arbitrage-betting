import { useState, useEffect } from 'react';
import {ArbitrageInterface} from '@interfaces/Index'

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

  console.log('the hooks odds are ', odds)

  useEffect(()=>{
    calculateArbitrage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[odds, totalStake])

  const setOddsHandler = (k: ArbitrageInterface)=>{
    console.log('incoming k', k)
    setOdds(k.bets)
    setTotalStake(k.totalStake)
    console.log('stake is ',totalStake)
    console.log(' set odds handler set', odds)
 
    console.log('done')
  }

  const calculateArbitrage = () => {
    
    if (odds.length === 0) return;

    // Calculate arbitrage percentage

    
   
    const arbPercentage = odds.reduce((acc, { odds }) => acc + (1 / odds), 0);
    console.log('arbPercentage ', arbPercentage)

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
    console.log('oddddddddddddds are::: -----<>> ',  odds)
    //@ts-expect-error this function not returning well
    const totalReturns = odds.reduce((acc, { betId, odds: odds }) => acc + (stakes[betId] * odds), 0);
    console.log('totttttttttttttttttal returns are ', totalReturns)
    const profit = totalReturns - totalStake;

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
  
  
   
    setOddsHandler
  };
};

export default useArbitrageCalculator;
