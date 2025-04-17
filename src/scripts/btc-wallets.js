import { AddressPurpose, request } from "@sats-connect/core";
import { toast } from "react-toastify";

export const connectXverseWallet = async (
  setWalletAddress,
  setManualAddress,
  onClose
) => {
  try {
    const accounts = await request("getAccounts", {
      purposes: [AddressPurpose.Stacks, AddressPurpose.Payment],
    });
    const paymentAccount = accounts.result.find(
      (account) => account.purpose === "payment"
    );
    if (!paymentAccount) {
      throw new Error("No payment account found");
    }
    const networkInfo = await request("getInfo", {});
    return {
      address: paymentAccount.address,
      network: networkInfo.network || "Unknown network",
    };
  } catch (error) {
    toast.error(
      <div className="text-gray-500 text-[14px]">
        <p className="font-bold text-[18px] text-gray-800 font-sans">
          Wallet Not Found
        </p>
        Xverse Wallet is not installed. Please install{" "}
        <a
          href="https://www.xverse.app/download"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline cursor-pointer"
        >
          Xverse Wallet
        </a>
      </div>
    );
  }
};

export const connectUnisatWallet = async (
  setWalletAddress,
  setManualAddress,
  onClose
) => {
  try {
    if (typeof window.unisat !== "undefined") {
      await window.unisat.requestAccounts();
      const network = await window.unisat.getNetwork();
      const address = await window.unisat.getAccounts();
      const networkLabel = network === "livenet" ? "Mainnet" : "Testnet";
      return {
        address: String(address),
        network: networkLabel,
      };
    } else {
      toast.error(
        <div className="text-gray-500 text-[14px]">
          <p className="font-bold text-[18px] text-gray-800 font-sans">
            Wallet Not Found
          </p>
          Unisat Wallet is not installed. Please install{" "}
          <a
            href="https://unisat.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline cursor-pointer"
          >
            Unisat Wallet
          </a>
        </div>
      );
    }
  } catch (error) {
    console.error("Error connecting to Unisat Wallet:", error);
    throw error;
  }
};

import { showConnect, getUserData } from "@stacks/connect";

export const connectAsignaWallet = async (
  setWalletAddress,
  setManualAddress,
  onClose
) => {
  try {
    if (typeof window.AsignaProvider !== "undefined") {
      await showConnect(
        {
          appDetails: {
            name: "Bima",
            icon: "http://localhost:3000/favicon.ico",
          },
        },
        window.AsignaProvider
      );
      const userData = await getUserData();
      const stxAddress = userData.profile.stxAddress.testnet;
      return {
        address: String(stxAddress),
        network: "Asigna Network",
      };
    } else {
      toast.error(
        <div className="text-gray-500 text-[14px]">
          <p className="font-bold text-[18px] text-gray-800 font-sans">
            Wallet Not Found
          </p>
          Asigna Wallet is not installed. Please install{" "}
          <a
            href="https://chromewebstore.google.com/detail/asigna-multisig/gopddoinbenlokghakiafackadkbnlid?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline cursor-pointer"
          >
            Asigna Wallet
          </a>
        </div>
      );
    }
  } catch (error) {
    console.error("Error connecting to Asigna Wallet:", error);
    throw error;
  }
};
