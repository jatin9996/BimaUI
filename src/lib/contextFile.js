'use client';
// contexts/VaultContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

// Create Context
export const VaultContext = createContext();

// Provider Component
export const VaultProvider = ({ children }) => {
  const initialtvlState = JSON.parse(localStorage.getItem('setTVL')) || 0;
  const initialdebtState = JSON.parse(localStorage.getItem('setTotalDebt')) || 0;
  const initialusbdMintbale = JSON.parse(localStorage.getItem('setusbdMintable')) || 0;
  const intiallstPrice = JSON.parse(localStorage.getItem('setlstPrice')) || 0;
  const intiallredeemfee = JSON.parse(localStorage.getItem('setredeemFee')) || 0;
  const intiallredeemfeeAmount = JSON.parse(localStorage.getItem('setredeemFeeAmount')) || 0;
  const initialExpectedvaule = JSON.parse(localStorage.getItem('setexpectedvaule')) || 0;
  const [tvl, setTVL] = useState(initialtvlState);
  const [totaldebt, setTotalDebt] = useState(initialdebtState);
  const [usbdMintable,setusbdMintable]= useState(initialusbdMintbale)
  const [lstPrice,setlstPrice]= useState(intiallstPrice);
  const [redeemFee,setredeemFee]= useState(intiallredeemfee);
  const [expectedvaule,setexpectedvaule]= useState(initialExpectedvaule);
  const [redeemFeeAmount,setredeemFeeAmount]= useState(intiallredeemfeeAmount);
  // Centralized update method
  const updateVaultData = (data) => {
    if (data.tvl !== undefined) setTVL(data.tvl);
    if (data.totaldebt !== undefined) setTotalDebt(data.totaldebt);
    if (data.redeemFee !== undefined) setredeemFee(data.redeemFee);
    if (data.expectedvaule !== undefined) setexpectedvaule(data.expectedvaule);
    if (data.redeemFeeAmount !== undefined) setredeemFeeAmount(data.redeemFeeAmount);
  };

  useEffect(() => {
    localStorage.setItem('setTVL', JSON.stringify(tvl));
    localStorage.setItem('setTotalDebt', JSON.stringify(totaldebt));
    localStorage.setItem('setusbdMintable', JSON.stringify(usbdMintable));
    localStorage.setItem('setlstPrice', JSON.stringify(lstPrice));
    localStorage.setItem('setredeemFee', JSON.stringify(redeemFee));
    localStorage.setItem('setexpectedvaule', JSON.stringify(expectedvaule));
    localStorage.setItem('setredeemFeeAmount', JSON.stringify(redeemFeeAmount));
  }, [tvl,totaldebt,usbdMintable]);

  // Context value
  const contextValue = {
    tvl,
    totaldebt,
    usbdMintable,
    lstPrice,
    redeemFee,
    redeemFeeAmount,
    expectedvaule,
    setexpectedvaule,
    setredeemFee,
    setredeemFeeAmount,
    setusbdMintable,
    setTVL,
    setTotalDebt,
    setlstPrice,
    updateVaultData,
  };

  return (
    <VaultContext.Provider value={contextValue}>
      {children}
    </VaultContext.Provider>
  );
};

// Custom Hook
export const useVaultContext = () => {
  const context = useContext(VaultContext);

  if (!context) {
    throw new Error('useVaultContext must be used within a VaultProvider');
  }

  return context;
};
