"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Section from "./Section";
import Dropdown from "@/components/ui/dropdown";
import { Default } from "react-toastify/dist/utils";
import { useAccount, useChainId } from "wagmi";
import chains from "@/scripts/chains";
import VaultHero from "./VaultHero";
import Banner from "@/components/ui/banner";
import MyPosition from "./MyPosition";
import networks from "@/scripts/contracts";
import MorphoIntegration from "@/scripts/morpho-integration";
import { ethers } from "ethers-old";
import MorphoABI from "@/web3/abis/MorphoABI.json";
import { checkVaultPosition } from "@/scripts/mintUSBD";
import contracts from "@/scripts/contracts";

interface IVaultsData {
  VaultTokenName: string;
  VaultTokenImage: string;
  VaultTokenAddress: string;
  formatedTotalCollateral: string;
  formatedTotalDebt: string;
  formatedMCR: string;
  formatedMintFee: string;
  formatedBorrowInterestRate: string;
  formatedRedemptionRebate: string;
  formatedStakedEtherAPR: string;
}

interface ISectionData {
  cardsData: IVaultsData[];
  cardsDataLRT: IVaultsData[];
}

export default function Vaults() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [network, setNetwork] = useState("Bitlayer");
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState("lst");
  const [chainId, setChainId] = useState(0);
  const [cardsData, setCardsData] = useState<IVaultsData[]>([]);
  const [cardsDataLRT, setCardsDataLRT] = useState<IVaultsData[]>([]);
  const [userAddress,setUserAddress] = useState<string>('');
  const [totalTVL, setTotalTVL] = useState<number>(0);
  const [totalDebt, setTotaldebt] = useState<number>(0);
  const chain = useChainId();
  // const [morpho, setMorpho] = useState<MorphoIntegration | null>(null);
  // const [userAddress, setUserAddress] = useState<string | null>(null);
  // const [metadata, setMetadata] = useState<{
  //   totalBorrow: string;
  //   totalSupply: string;
  // }>({ totalBorrow: "", totalSupply: "" });

  // const pools: any[] = networks[network].Markets ?? [];

  // const initializeMorpho = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const userAddress = await signer.getAddress();
  //     setUserAddress(userAddress);
  //     const morphoContractAddress = pools[0].morphoContract;
  //     const morpho = new MorphoIntegration(
  //       provider,
  //       morphoContractAddress,
  //       MorphoABI
  //     );

  //     setMorpho(morpho);
  //   } catch (error) {
  //     console.error("Error initializing Morpho:", error);
  //   }
  // };

  // useEffect(() => {
  //   initializeMorpho();
  // }, []);
  // const formatUSBD = (value: number) =>
  //   new Intl.NumberFormat("en-US", {
  //     notation: "compact",
  //     minimumFractionDigits: 1,
  //     maximumFractionDigits: 1,
  //   }).format(value);
  // const metadataFunction = async () => {
  //   let totalBorrow = 0;
  //   let totalSupply = 0;

  //   // Loop through each pool in the pools array
  //   for (const pool of pools) {
  //     const userData = await morpho?.getTotalStats(pool.id);

  //     // Accumulate totalBorrow and totalSupply
  //     totalBorrow += Number(userData?.totalBorrow) || 0;
  //     totalSupply += Number(userData?.totalSupply) || 0;
  //   }

  //   // Set the aggregated metadata
  //   setMetadata({
  //     totalBorrow: formatUSBD(totalBorrow),
  //     totalSupply: formatUSBD(totalSupply),
  //   });

  //   console.log("Aggregated User Data:", { totalBorrow, totalSupply });
  // };

  // useEffect(() => {
  //   metadataFunction();
  // }, [morpho]);

  useEffect(() => {
    setUserAddress(address?address:'');
    console.log("isConnected", isConnected);
    console.log("chainId", chains[chain].NetworkName);
    setChainId(chain);
    setNetwork(chains[chain].NetworkName);
  }, [chain]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        setIsLoading(true);
        console.log("Network", network);

        const response = await fetch(
          `/api/vaults/cards?tab=${activeTab}&network=${chains[chain].NetworkName}`
        );
        const { data } = await response.json();

        if (activeTab.includes("lrt")) {
          setCardsDataLRT(data.cardsData);
          const totalCollateralValue = cardsData.reduce(
            (sum: number, item: any) => {
              return sum + parseFloat(item.formatedTotalCollateral);
            },
            0
          );
          setTotalTVL(totalCollateralValue);
          const totalDebtValue = cardsData.reduce((sum: number, item: any) => {
            return sum + parseFloat(item.formatedTotalDebt);
          }, 0);
          setTotaldebt(totalDebtValue);
        } else {
          setCardsData(data.cardsData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    };
    fetchCardsData();
  }, [activeTab, chain]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2
          className="animate-spin dark:text-white"
          width={48}
          height={48}
        />
      </div>
    );
  else
    return (
      <div className="min-h-screen mx-design">
        {/* <Dropdown selectedOption={network} setSelectedOption={setNetwork}/> */}
        {/* {vaults?.map((vault: any, i) => (
          <Section
            key={i}
            title={vault.title}
            addonTitle={vault.addonTitle}
            addonSubTitle={vault.addonSubTitle}
            cardsData={vault.cardsData}
            cardsDataLRT={vault.cardsDataLRT}
            chainId={vault.chainId}
          />
        ))} */}
        <Banner />
        {/* <VaultHero /> */}
        {/* <MyPosition
          connectedNetworkName={network}
          positions={cardsData}
        /> */}
        <Section cardsData={cardsData} cardsDataLRT={cardsDataLRT} />
      </div>
    );
}
