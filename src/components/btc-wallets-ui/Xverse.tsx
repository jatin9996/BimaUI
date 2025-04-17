"use client";
import { useState } from "react";
import { AddressPurpose, request } from "@sats-connect/core";

export const ConnectXverseWallet = () => {
  const [stacksAccount, setStacksAccount] = useState<any>(null);
  const [paymentAccount, setPaymentAccount] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      const accounts: any = await request("getAccounts", {
        purposes: [AddressPurpose.Stacks, AddressPurpose.Payment],
      });

      console.log("X Verse Wallet Accounts:", accounts);

      const stacksAccountData = accounts.result.find(
        (account: any) => account.purpose === "stacks"
      );
      if (stacksAccountData) {
        setStacksAccount(stacksAccountData);
      }

      const paymentAccountData = accounts.result.find(
        (account: any) => account.purpose === "payment"
      );
      if (paymentAccountData) {
        setPaymentAccount(paymentAccountData);
      }
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting to Xverse wallet:", error);
    }
  };

  return (
    <div>
      {!isConnected && (
        <button onClick={handleConnect}>Connect Xverse Wallet</button>
      )}
      {isConnected && (
        <div>
          {stacksAccount && (
            <div>
              <h3>Stacks Account:</h3>
              <p>Address: {stacksAccount.address}</p>
              <p>Address Type: {stacksAccount.addressType}</p>
              <p>Public Key: {stacksAccount.publicKey}</p>
            </div>
          )}
          {paymentAccount && (
            <div>
              <h3>Payment Account:</h3>
              <p>Address: {paymentAccount.address}</p>
              <p>Address Type: {paymentAccount.addressType}</p>
              <p>Public Key: {paymentAccount.publicKey}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectXverseWallet;
