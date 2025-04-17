'use client';
// contexts/VaultContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

// Create Context
export const EarnContext = createContext();


// Provider Component
export const EarnProvider = ({ children }) => {
  const initialtvlState = JSON.parse(localStorage.getItem('setTVL')) || 0;
  const initialaprState = JSON.parse(localStorage.getItem('setAPR')) || 0;
  const initialdeposit = JSON.parse(localStorage.getItem('setDeposit')) || 0;
  const intialbalance = JSON.parse(localStorage.getItem('setbalance')) || 0;
  const initialpoolAddress = JSON.parse(localStorage.getItem('setpoolAddress')) || 0;
  const initialdebtAddress = JSON.parse(localStorage.getItem('setDebtAddress')) || 0;
  // const intiallstPrice = JSON.parse(localStorage.getItem('setlstPrice')) || 0;
  const [tvl, setTVL] = useState(initialtvlState);
  const [APR, setAPR] = useState(initialaprState);
  const [deposit,setDeposit]= useState(initialdeposit)
  const [balance,setbalance]= useState(intialbalance)
  const [poolAddress,setpoolAddress]= useState(initialpoolAddress)
  const [debtAddress,setDebtAddress]= useState(initialdebtAddress)
  // Centralized update method
  const updateEarnData = (data) => {
    if (data.tvl !== undefined) setTVL(data.tvl);
    if (data.APR !== undefined) setTotalDebt(data.APR);
    if (data.deposit !== undefined) setDeposit(data.deposit);
    if (data.balance !== undefined) setbalance(data.balance);
    if (data.poolAddress !== undefined) setpoolAddress(data.poolAddress);
    if (data.debtAddress !== undefined) setDebtAddress(data.debtAddress);
  };

  useEffect(() => {
    localStorage.setItem('setTVL', JSON.stringify(tvl));
    localStorage.setItem('setAPR', JSON.stringify(APR));
    localStorage.setItem('setDeposit', JSON.stringify(deposit));
    localStorage.setItem('setbalance', JSON.stringify(balance));
    localStorage.setItem('setpoolAddress', JSON.stringify(poolAddress));
    localStorage.setItem('setDebtAddress', JSON.stringify(debtAddress));
  }, [tvl,APR,deposit]);

  // Context value
  const contextValue = {
    tvl,
    APR,
    deposit,
    poolAddress,
    debtAddress,
    balance,
    setbalance,
    setpoolAddress,
    setDebtAddress,
    setDeposit,
    setTVL,
    setAPR,
    updateEarnData,
  };

  return (
    <EarnContext.Provider value={contextValue}>
      {children}
    </EarnContext.Provider>
  );
};

// Custom Hook
export const useEarnContext = () => {
  const context = useContext(EarnContext);

  if (!context) {
    throw new Error('useEarnContext must be used within a EarnProvider');
  }

  return context;
};
