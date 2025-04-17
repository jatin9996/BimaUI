'use client';
// contexts/VaultContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

// Create Context
export const LendingContext = createContext();


// Provider Component
export const LendingProvider = ({ children }) => {
  const initialtvlState = JSON.parse(localStorage.getItem('setTVL')) || 0;
  const initialtotalBorrowState = JSON.parse(localStorage.getItem('settotalBorrow')) || 0;
  const initialtotalSupplyState = JSON.parse(localStorage.getItem('settotalSupply')) || 0;
  const initialexplorerLink = JSON.parse(localStorage.getItem('setExplorerLink')) || '';
  const [tvl, setTVL] = useState(initialtvlState);
  const [explorerLink, setexplorerLink] = useState(initialexplorerLink);
  const [totalBorrow, settotalBorrow] = useState(initialtotalBorrowState);
  const [totalSupply, settotalSupply] = useState(initialtotalSupplyState);
  // Centralized update method
  const updateLendingData = (data) => {
    if (data.tvl !== undefined) setTVL(data.tvl);
    if (data.explorerLink !== undefined) setTVL(data.explorerLink);
    if (data.totalBorrow !== undefined) settotalBorrow(data.totalBorrow);
    if (data.totalSupply !== undefined) settotalSupply(data.totalSupply);
  };

  useEffect(() => {
    localStorage.setItem('setTVL', JSON.stringify(tvl));
    localStorage.setItem('setExplorerLink', JSON.stringify(explorerLink));
    localStorage.setItem('settotalBorrow', JSON.stringify(totalBorrow));
    localStorage.setItem('settotalSupply', JSON.stringify(totalSupply));
  }, [totalBorrow,totalSupply]);

  // Context value
  const contextValue = {
    tvl,
    explorerLink,
    totalBorrow,
    totalSupply,
    settotalBorrow,
    settotalSupply,
    setTVL,
    setexplorerLink,
    updateLendingData,
  };

  return (
    <LendingContext.Provider value={contextValue}>
      {children}
    </LendingContext.Provider>
  );
};

// Custom Hook
export const useLendingContext = () => {
  const context = useContext(LendingContext);

  if (!context) {
    throw new Error('useEarnContext must be used within a EarnProvider');
  }

  return context;
};
