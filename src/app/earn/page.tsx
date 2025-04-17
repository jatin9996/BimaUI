"use client";
import { useAccount, useBalance, useChainId } from "wagmi";
import EarnHero, { IEarnStat } from "./EarnHero";
import DataTable from "./EarnTable";
import StabilityPool from "./StabilityPool";
import { useEffect, useState } from "react";
import chains from "@/scripts/chains";
import { TStabilityPool } from "./EarnDataTbl";
import { ethers } from "ethers";
import { ethers as oldethers } from "ethers-old";
import { useEarnContext } from "./contextFile";
import contracts from "@/scripts/contracts";
import { getUSBDBalance } from "@/scripts/mintUSBD";
import Earn_BG from "@/assets/icons/Earn_BG.svg";
import Banner from "@/components/ui/banner";

export default function Earn() {
  const { isConnected, address } = useAccount();
  const [chainId, setChainId] = useState<number>(0);
  const [poolsData, setPoolsData] = useState<TStabilityPool[]>([]);
  const [network, setNetwork] = useState<string>("");
  const [StatData, setStatData] = useState<IEarnStat>();
  const [tvl, setTVL] = useState<string>("0");
  const [apr, setAPR] = useState<string>("0");
  const [deposit, setDeposit] = useState<string>("0");
  const [balance, setBalance] = useState<string>("0");

  const chain = useChainId();
  let provider: any;

  useEffect(() => {
    setChainId(chain);
    setNetwork(chains[chain].NetworkName);
    if (!isConnected) {
      provider = null;
    } else {
      provider = new oldethers.providers.Web3Provider(window.ethereum);
    }
  }, [chain, isConnected]);

  const fetchData = async () => {
    // Set loading to true before fetching data
    try {
      const userAddres = isConnected ? address : ethers.ZeroAddress;
      const response = await fetch(
        `/api/earn/pools?network=${network}&user=${userAddres}`
      );
      const { data } = await response.json();
      console.log("PoolsData -> ", data);
      setPoolsData(data);
      const totalValueLocked = data.reduce((sum: number, item: any) => {
        return sum + parseFloat(item.amountTVL);
      }, 0);
      const mydeposit = data.reduce((sum: number, item: any) => {
        return sum + parseFloat(item.deposit);
      }, 0);
      setTVL(totalValueLocked);
      setAPR("0");
      setDeposit(mydeposit);
      const contract = contracts[network];

      const signer = provider.getUncheckedSigner();
      const Balance = (await getUSBDBalance(
        contract?.SPPools[0].tokenAddress,
        signer
      )) as string;
      console.log("Balance -> ", Balance);
      const balanceInEther = oldethers.utils.formatEther(Balance);
      setBalance(parseFloat(balanceInEther).toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [network, isConnected]);

  return (
    <div className="min-h-screen mx-design">
      <Banner />

      <EarnHero
        totaltvl={tvl}
        apr={apr}
        usbdBalance={balance}
        mydeposit={deposit}
      />
      <StabilityPool pools={poolsData} />
      <div style={{ filter: "blur(10px)" }} className="mt-5">
        <DataTable />
      </div>
      {/* <AllPool /> */}
    </div>
  );
}
