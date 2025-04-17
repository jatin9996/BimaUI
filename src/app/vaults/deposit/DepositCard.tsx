// import bitlayer from "@/assets/images/tokenImg/bitlayer.png";
// import lorenzo from "@/assets/images/tokenImg/lorenzo_logo.png";
// import Image from "next/image";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useRouter, useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Manrope, Space_Grotesk } from "next/font/google";
// import { troveManagerContract } from "@/constants/walletConstants";
// import Onboard from "@web3-onboard/core";
// import { getWalletClient } from "@wagmi/core";
// import { ethers } from "ethers-old";
// import { ethers as ethersNew } from "ethers";
// import { parseEther, isHex, fromHex, numberToHex } from "viem";
// import contracts from "@/scripts/contracts";
// import { ToastContainer, ToastOptions, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { fetchDataToCalculateUSDB } from "../../../scripts/fetchData";
// import Vaults from "@/scripts/vaults";
// import { getUserBalance } from "@/lib/colletral-utils";
// import { useAccount, useBalance, useChainId } from "wagmi";
// import { Loader2 } from "lucide-react";
// import { getMinNetDebt } from "@/scripts/minNetDebt";
// import { breakdownFunctions } from "@/scripts/breakdown";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { VBtn } from "../ValutsComponents";
// import { Input } from "@/components/ui/input";
// import { AArrowDown, ChevronLeft } from "lucide-react";
// // import { CircleAlert } from "lucide-react";
// import injectedModule from "@web3-onboard/injected-wallets";
// import wagmi from "@web3-onboard/wagmi";
// import { use, useContext, useEffect, useState } from "react";
// // import { TroveManagerAddress } from "@/constants/walletConstants";
// import { getLSTPrice, getUSBDAmount, mintUSBD } from "@/scripts/mintUSBD";
// import networks from "@/scripts/contracts";
// import chains from "@/scripts/chains";
// import { useConnectWallet } from "@web3-onboard/react";
// import ErrorMinting from "./Toast/ErrorMinting";
// import SuccessMinting from "./Toast/SuccessMinting";
// import SliderButton from "../sliderButton";
// import Redeem from "./RedeemContent";
// import RedeemBreakdown from "./RedeemBreakdown";
// import { useVaultContext } from "@/lib/contextFile";
// import ErrorPopup from "@/components/ui/ErrorPopup";
// import Link from "next/link";
// import SuccessPopup from "@/components/ui/SuccessPopup";
// import fetchRedeemBreakdownData from "@/scripts/redeembreakdown";
// //import { createConfig } from "wagmi";
// let provider: any;

// const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
// const inter = Manrope({ subsets: ["latin"] });

// // export const TmpTabContent = () => {
// //   return (
// //     <>
// //       <div
// //         className={cn(
// //           inter.className,
// //           "flex justify-between my-5 font-semibold"
// //         )}
// //       >
// //         <p>Minting USBD</p>
// //         <p>
// //           <span className="text-muted-foreground mr-1">Balance</span>
// //           <span>0.00</span>
// //         </p>
// //       </div>
// //       <div className="grid grid-cols-1 lg:grid-cols-2 items-center font-semibold pb-4">
// //         <Input
// //           type="number"
// //           placeholder="0.00"
// //           className="rounded-lg font-semibold border-transparent  dark:bg-slate-800/90"
// //         />
// //         <div className="flex justify-center items-center space-x-4">
// //           <span className="text-muted-foreground">200000</span>
// //           <Button
// //             variant={"primary"}
// //             size={"sm"}
// //             className="rounded-lg px-2 h-[27px]"
// //           >
// //             Max
// //           </Button>
// //           <Button
// //             variant={"default"}
// //             size={"lg"}
// //             className="rounded-xl bg-black text-white"
// //           >
// //             <Image
// //               src={bitlayer}
// //               width={20}
// //               height={20}
// //               alt="Icon"
// //               className="mr-2"
// //             />{" "}
// //             stBTC
// //           </Button>
// //         </div>
// //       </div>
// //       <ul className={inter.className}>
// //         <li className="flex items-center justify-between">
// //           <span className="text-muted-foreground font-semibold text-sm">
// //             +Net debt
// //           </span>
// //           <span className="font-bold">0.00 USBD</span>
// //         </li>
// //         <li className="flex items-center justify-between">
// //           <span className="text-muted-foreground font-semibold text-sm">
// //             +Mint Fee
// //           </span>
// //           <span className="font-bold">(0.00%) 0.00 USBD</span>
// //         </li>
// //         <li className="flex items-center justify-between">
// //           <span className="text-muted-foreground font-semibold text-sm">
// //             +Liquidation Reserve
// //           </span>
// //           <span className="font-bold">200 USBD</span>
// //         </li>
// //         <li className="flex items-center justify-between">
// //           <span className="text-muted-foreground font-semibold text-sm">
// //             Your total debt
// //           </span>
// //           <span className="font-bold text-green-400">0.00 USBD</span>
// //         </li>
// //       </ul>
// //       <p
// //         className={cn(
// //           "rounded-md text-red-500 bg-red-100 p-3 my-2 font-semibold text-sm text-center",
// //           inter.className
// //         )}
// //       >
// //         Opening an account with a Collateral Ratio of less than 150% is at risk
// //         of liquidation during recovery mode
// //       </p>
// //     </>
// //   );
// // };

// export const InfoCard = () => {
//   const formatUSBD = (value: number) =>
//     new Intl.NumberFormat("en-US", {
//       notation: "compact",
//       minimumFractionDigits: 1,
//       maximumFractionDigits: 1,
//     }).format(value);

//   const chain = useChainId();
//   const connectedNetwork = chains[chain];
//   const { isConnected, address } = useAccount();
//   const usbdAddress =
//     contracts[connectedNetwork.NetworkName].SPPools[0].tokenAddress;
//   const [usbdBalance, setUsbdBalance] = useState("0 USBD");

//   const { data: balance } = useBalance({
//     address,
//     token: usbdAddress as any,
//     query: {
//       enabled: isConnected,
//     },
//   });

//   useEffect(() => {
//     if (balance) {
//       const formattedBalance = formatUSBD(Number(balance.value) / 10 ** 18);
//       setUsbdBalance(formattedBalance);
//     }
//   }, [balance]);

//   const { tvl, totaldebt } = useVaultContext();
//   const formatCurrency = (value: number) =>
//     new Intl.NumberFormat("en-US", {
//       notation: "compact",
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 1,
//       maximumFractionDigits: 1,
//     }).format(value);
//   return (
//     <div className="flex justify-around py-[28px] flex-col gap-5 lg:gap-0 lg:flex-row ps-8 lg:ps-0 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[20px] mb-4">
//       <div>
//         <p
//           className={cn(
//             "text-[32px] font-medium leading-[40.96px] text-[#F74A17]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           {formatCurrency(tvl)}
//         </p>
//         <p
//           className={cn(
//             "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
//             inter.className
//           )}
//         >
//           TVL
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[32px] font-medium leading-[40.96px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           {formatCurrency(totaldebt)}
//         </p>
//         <p
//           className={cn(
//             "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
//             inter.className
//           )}
//         >
//           Total USBD minted
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[32px] font-medium leading-[40.96px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           ${usbdBalance}
//         </p>
//         <p
//           className={cn(
//             "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
//             inter.className
//           )}
//         >
//           USBD Balance
//         </p>
//       </div>
//     </div>
//   );
// };

// export const LargeCard = ({
//   setShow,
// }: {
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   console.log("LargeCard");
//   // const [{ wallet, connecting }, connect, disconnect,address] = useConnectWallet();
//   const { isConnected, address } = useAccount();
//   const [loading, setLoading] = useState(false);
//   const chain = useChainId();
//   // const injected = injectedModule();
//   // const onboard = Onboard({
//   //   wagmi,
//   //   wallets: [injected],
//   //   chains: [
//   //     {
//   //       id: '83291',
//   //       token: 'stBtc',
//   //       label: 'Lorenzo',
//   //       rpcUrl: 'https://rpc-testnet.lorenzo-protocol.xyz'
//   //     }
//   //   ],
//   //   appMetadata: {
//   //     name: 'BIMA Finance',
//   //     icon: 'Test',
//   //     description: 'BIMA finance',
//   //   }
//   // });

//   // const handleConnectClick = async () => {
//   //   if (isConnected) {
//   //     const tx = await mint();
//   //     mintedSuccessfully();
//   //   }
//   // };

//   const handleConnectClick = async () => {
//     if (isConnected) {
//       setLoading(true);
//       try {
//         const tx = await mint();
//       } catch (error) {
//         console.error("Minting failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const [stBtcAmount, setStBtcAmount] = useState<string>("");
//   const [stBTCBalance, setstBTCBalance] = useState<string>("0");
//   const [usbdAmount, setUsbdAmount] = useState<string>("0");
//   // const [chainId,setChainId] = useState<string>("0");
//   const [mcr, setMcr] = useState<string>("0");
//   const [ColletralLogo, setColletralLogo] = useState("");
//   const [ColletralName, setColletralName] = useState("");
//   const [vaultNetwork, setVaultNetwork] = useState<string>("0");
//   const [colletralRatio, setcolletralRatio] = useState<number>(250);
//   const [vaultAddress, setVaultAddress] = useState<string>("");
//   const [CRMsgShow, setCRMsgShow] = useState<boolean>(false);
//   const [USBDAmmountMsg, setUSBDAmmountMsg] = useState<boolean>(false);

//   const [stBTCPrice, setstBTCPrice] = useState<string>("0");
//   const [minUSBDLimit, setminUSBDLimit] = useState<number>(0);
//   const [showMinDebt, setShowMinDebt] = useState<boolean>(true);
//   const [vaultParam, setVaultParam] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isErrorOpen, setIsErrorOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [txLink, settxLink] = useState<string>("");
//   const [amount, setAmount] = useState(0);
//   const [signerAddress, setsignerAddress] = useState("");
//   const [collateralRatioType, setCollateralRatioType] =
//     useState<string>("auto");
//   const { lstPrice, redeemFee, expectedvaule } = useVaultContext();
//   const [colletralTokenAddress, setColletralTokenAddress] =
//     useState<string>("");
//   const [oracleAddress, setOracleAddress] = useState<string>("");

//   const errorNotify = () =>
//     toast.error("You have connected with wrong network!!");
//   const notify = () => toast.success("Connected successfully!!");
//   const invalidVaultChainId = () => toast.error("Invalid Vault Chain Id!!");
//   const mintedSuccessfully = () => {
//     toast(<SuccessMinting />, {
//       position: "top-right",
//       autoClose: 5000,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       hideProgressBar: true,
//       closeButton: false,
//     });
//   };

//   const ErrorInMinting = () => {
//     toast(<ErrorMinting />, {
//       position: "top-right",
//       autoClose: 5000,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       hideProgressBar: true,
//       closeButton: false,
//     });
//   };

//   const fetchData = async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const vaultParam = urlParams.get("vault");
//     if (vaultParam !== null) {
//       setVaultParam(vaultParam);

//       const vault = Vaults.find(
//         (vault) =>
//           vault.vaultsAddress === vaultParam &&
//           vault.chain_id === chain.toString()
//       );

//       setColletralLogo(vault?.colletralTockenImage as string);
//       setColletralName(vault?.colletralTockenName as string);
//       setVaultNetwork(vault?.network as string);
//       setVaultAddress(vault?.vaultsAddress as string);
//       setColletralTokenAddress(vault?.colletralTokenAddress as string);
//       setOracleAddress(vault?.OracleAddress as string);
//       if (!isConnected) {
//         provider = null;
//       } else {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchMinNetDebt();
//     fetchData();
//     fetchBreakdownData();
//     fetchBalance();
//   });

//   useEffect(() => {
//     setSigner();
//   }, [isConnected]);

//   const setSigner = async () => {
//     try {
//       if (isConnected) {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getUncheckedSigner();
//         setsignerAddress(await signer.getAddress());
//       } else {
//         setsignerAddress("0x0000000000000000000000000000000000000000");
//       }
//     } catch (e) {
//       return e;
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       const data = await getUserBalance(
//         address,
//         vaultAddress,
//         contracts[vaultNetwork].rpcURL
//       );
//       console.log("Data->", data);
//       const Balance = ethers.utils.formatEther(data);
//       const formattedBalance = parseFloat(Balance).toFixed(2);
//       setstBTCBalance(formattedBalance);
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   };

//   const fetchMinNetDebt = async () => {
//     try {
//       const networkName = chains[chain].NetworkName;
//       const provider = new ethers.providers.JsonRpcProvider(
//         networks[networkName].rpcURL as any
//       );
//       const minDebt: any = await getMinNetDebt(
//         provider,
//         networks[networkName].borrowerOperationsAddress
//       );
//       let roundedMinDebt = Math.floor(parseFloat(minDebt));
//       console.log("minimum debt", roundedMinDebt);
//       console.log("minimum debt", roundedMinDebt);
//       if (Number.isNaN(roundedMinDebt)) {
//         roundedMinDebt = 0;
//       }
//       setminUSBDLimit(roundedMinDebt);
//     } catch (error) {
//       console.error("Error fetching minimum net debt:", error);
//     }
//   };

//   type Detail = {
//     label: string;
//     value: string | number;
//     unit?: string;
//   };

//   const [debtInFront, setDebtInFront] = useState<string>("0");
//   const [liquidationPrice, setLiquidationPrice] = useState<string>("");
//   const [borrowInterestRate, setBorrowInterestRate] = useState<string>("0");
//   const [remainingMintableUSBD, setRemainingMintableUSBD] =
//     useState<string>("0");
//   const [RedeemDetails, setRedeemDetails] = useState<Detail[]>([]);
//   const [collateralRatio, setCollateralRatio] = useState<string>("0");
//   const searchParams = useSearchParams();
//   const vaultAddressFromParams = searchParams.get("vault");
//   const { usbdMintable } = useVaultContext();

//   const fetchBreakdownData = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const userAddress = await signer.getAddress();
//       const troveManagerAddress = vaultAddressFromParams;
//       const chainName = chains[chain].NetworkName;
//       const priceFeedAddress = networks[chainName].priceFeedAddress;
//       const data = await breakdownFunctions(
//         troveManagerAddress,
//         priceFeedAddress,
//         userAddress,
//         provider
//       );

//       const Redeemdata = await fetchRedeemBreakdownData(
//         troveManagerAddress,
//         provider
//       );
//       if (Redeemdata == undefined) {
//         return;
//       }
//       console.log("RedeemData", Redeemdata);
//       setDebtInFront(data.debtInFront);
//       setLiquidationPrice(data.liquidationPrice);
//       setBorrowInterestRate(data.borrowInterestRate);
//       setRemainingMintableUSBD(data.remainingMintableUSBD);
//       setCollateralRatio(data.collateralRatio);

//       console.log("Debt in front:", data.debtInFront);
//       console.log("Liquidation Price:", data.liquidationPrice);
//       console.log("Borrow Interest Rate:", data.borrowInterestRate);
//       console.log("Remaining Mintable USBD:", data.remainingMintableUSBD);
//       console.log("Collateral Ratio:", data.collateralRatio);
//     } catch (error) {
//       console.error("Error fetching breakdown data:", error);
//     }
//   };

//   // useEffect(() => {
//   //   fetchBreakdownData();
//   // }, []);

//   const handleLSTAmmount = async (value: any) => {
//     try {
//       setStBtcAmount(value);
//       const provider = new ethers.providers.JsonRpcProvider(
//         contracts[vaultNetwork].rpcURL
//       );
//       const usdPrice = (await getLSTPrice(
//         contracts[vaultNetwork].oracleAddress,
//         colletralTokenAddress,
//         provider
//       )) as string;

//       const LSTAmmount = parseFloat(value) * parseFloat(usdPrice);
//       console.log("LSTAmmount", LSTAmmount);
//       console.log("LSTAmmount", LSTAmmount);

//       setstBTCPrice(LSTAmmount.toFixed(2));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handlecalculateUSBDAmount = async (
//     _stBtcAmount: number,
//     _colletralRatio: number
//   ) => {
//     if (_stBtcAmount === 0 || _colletralRatio === 0) {
//       setUsbdAmount("0");
//       return;
//     }
//     setIsLoading(true);

//     const connectedNetwork = contracts[vaultNetwork];
//     console.log("Cpnnected", connectedNetwork);

//     const internal_provider = new ethers.providers.JsonRpcProvider(
//       connectedNetwork.rpcURL
//     );
//     const USBDAmount = (await getUSBDAmount(
//       connectedNetwork.oracleAddress,
//       colletralTokenAddress,
//       vaultAddress,
//       internal_provider,
//       _stBtcAmount,
//       _colletralRatio,
//       signerAddress
//     )) as string;
//     setUsbdAmount(USBDAmount);
//     setIsLoading(false);

//     if (parseFloat(USBDAmount) < parseFloat(usbdMintable)) {
//       setUSBDAmmountMsg(false);
//     } else {
//       setUSBDAmmountMsg(true);
//     }
//     if (parseFloat(USBDAmount) > minUSBDLimit) {
//       setShowMinDebt(false);
//     } else {
//       setShowMinDebt(false);
//     }
//   };

//   const mint = async () => {
//     const connectedContracts = contracts[vaultNetwork];

//     const signer = provider.getUncheckedSigner();
//     try {
//       const tx = await mintUSBD({
//         borrowerOperationsAddress: connectedContracts.borrowerOperationsAddress,
//         troveManagerAddress: vaultAddress,
//         signer,
//         amountstBTC: parseEther(stBtcAmount),
//         percentage: colletralRatio,
//         oracleAddress: oracleAddress,
//         collateralAddress: colletralTokenAddress,
//       });
//       console.log("Tx", tx);
//       mintedSuccessfully();
//       setIsSuccessOpen(true);
//       settxLink(`${connectedContracts.explorerLink}${tx.hash}`);
//       return tx;
//     } catch (e) {
//       ErrorInMinting();
//       setIsErrorOpen(true);
//     }
//   };

//   const handleColletralRationChange = (event: any) => {
//     setcolletralRatio(event.target.value);
//     if (event.target.value <= 225) {
//       setCRMsgShow(true);
//     } else {
//       setCRMsgShow(false);
//     }
//   };
//   const handleUSBDAmountChange = (event: any) => {
//     const newUSBDAmount = parseFloat(event.target.value);
//     setUsbdAmount(event.target.value);

//     if (collateralRatioType === "custom") {
//       const stBtcAmountNum = parseFloat(stBtcAmount);
//       const stBTCPriceNum = parseFloat(stBTCPrice);

//       if (stBtcAmountNum > 0 && newUSBDAmount > 0) {
//         let newRatio = ((stBtcAmountNum * stBTCPriceNum) / newUSBDAmount) * 100;

//         if (newRatio < 225) {
//           newRatio = 225;
//           setCRMsgShow(true);
//           toast.error("Collateral ratio cannot be below 225%");
//         } else {
//           setCRMsgShow(false);
//         }
//         if (newUSBDAmount < parseFloat(usbdMintable)) {
//           setUSBDAmmountMsg(false);
//         } else {
//           setUSBDAmmountMsg(true);
//         }

//         setcolletralRatio(newRatio);
//       } else {
//         setcolletralRatio(0);
//       }
//     }
//   };

//   const handleMaxClick = () => {
//     setStBtcAmount(stBTCBalance);
//     handleLSTAmmount(stBTCBalance);
//     handlecalculateUSBDAmount(parseInt(stBTCBalance), colletralRatio);
//   };
//   const informationData = [
//     {
//       title: "Vault position",
//       info: "This is the position your Vault will be placed at in the list of all Vaults. This list is ordered by the Vault's collateral ratio. Vaults with a lower collateral ratio and hence a lower position will be the first to be liquidated or redeemed against.",
//     },
//     {
//       title: "Debt in front",
//       info: "This is how much debt would need to be redeemed before your Vault can be redeemed against assuming USBD was under peg. A higher amount of debt infront means a lower chance of redemption.",
//     },
//     {
//       title: "Collat. Ratio",
//       info: "This is the percentage of the loan that is collateralised. You will be liquidated automatically if you reach 225%.",
//     },
//     {
//       title: "Liquidation Price",
//       info: "You will be liquidated if the price of your collateral reaches this price.",
//     },
//     {
//       title: "Borrow Interest Rate",
//       info: "The fee that accrues over time on outstanding debt. It is charged in USBD.",
//     },
//     {
//       title: "Remaining Mintable USBD",
//       info: "This is the amount of USBD that can be currently minted against this collateral.",
//     },
//   ];

//   const RedeemBreakDownData = [
//     {
//       title: "Collateral Price",
//       info: "This is the position your Vault will be placed at in the list of all Vaults. This list is ordered by the Vault's collateral ratio. Vaults with a lower collateral ratio and hence a lower position will be the first to be liquidated or redeemed against.",
//     },
//     {
//       title: "Redemption Fees",
//       info: "This is how much debt would need to be redeemed before your Vault can be redeemed against assuming USBD was under peg. A higher amount of debt infront means a lower chance of redemption.",
//     },
//     {
//       title: "Redemption Fee Amount",
//       info: "This is the percentage of the loan that is collateralised. You will be liquidated automatically if you reach 225%.",
//     },
//     {
//       title: "Expected Collateral Received",
//       info: "You will be liquidated if the price of your collateral reaches this price.",
//     },
//   ];

//   const formatCurrency = (value: number) =>
//     new Intl.NumberFormat("en-US", {
//       notation: "compact",
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 1,
//       maximumFractionDigits: 1,
//     }).format(value);

//   const [isMint, setIsMint] = useState(true);
//   return (
//     <Card className="bg-white dark:bg-[#1A1A1A] rounded-2xl mb-4">
//       <div className="px-[5%]">
//         <SliderButton isMint={isMint} setIsMint={setIsMint} />
//       </div>
//       <CardHeader>
//         {isMint ? (
//           <div className="flex justify-between">
//             <h1 className="text-xl font-semibold pt-2">Mint USBD</h1>
//             {/* <VBtn rootClassName="w-[170px]" className="flex items-center">
//               6.70% → 13.41% APR
//             </VBtn> */}
//           </div>
//         ) : (
//           <div className="flex justify-between">
//             <h1 className="text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] pt-2">
//               1 USBD is always redeemable for $1 of collateral
//             </h1>
//           </div>
//         )}
//       </CardHeader>
//       <CardContent className=" mt-2 border-b border-dashed border-[#8C8FA1]">
//         {isMint ? (
//           <div>
//             <div className="flex items-center space-x-2 py-2">
//               {/* <span className="text-muted-foreground text-[14px] font-semibold text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
//                 Zap ETH / wETH to stBTC
//               </span> */}
//               {/* <Switch /> */}
//             </div>
//             <div>
//               <div
//                 className={cn(
//                   "flex items-center justify-between font-semibold",
//                   inter.className
//                 )}
//               >
//                 <span>Enter amount of {ColletralName}</span>
//                 <p>
//                   <span className="text-muted-foreground">Balance</span>&nbsp;
//                   <span>{stBTCBalance}</span>
//                 </p>
//               </div>
//               <div className="flex justify-between flex-wrap py-1 ">
//                 <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
//                   <Input
//                     placeholder="Enter amount here"
//                     className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
//                     value={stBtcAmount}
//                     defaultValue={0}
//                     onChange={(event: any) => {
//                       setStBtcAmount(event.target.value);
//                       handleLSTAmmount(event.target.value);
//                       handlecalculateUSBDAmount(
//                         parseFloat(event.target.value),
//                         colletralRatio
//                       );
//                       // handlecalculateUSBDAmount(parseInt(event.target.value));
//                     }}
//                   />

//                   <div className="flex justify-center items-center space-x-4">
//                     <span className="text-muted-foreground">
//                       =${stBTCPrice}
//                     </span>
//                     <Button
//                       variant={"primary"}
//                       size={"sm"}
//                       className="rounded-lg px-2 h-[27px]"
//                       onClick={handleMaxClick}
//                     >
//                       Max
//                     </Button>
//                   </div>
//                 </div>

//                 <Button
//                   variant={"default"}
//                   size={"lg"}
//                   className="rounded-xl bg-black text-white w-[24%]"
//                 >
//                   <img
//                     src={ColletralLogo}
//                     width={20}
//                     height={20}
//                     alt="Icon"
//                     className="mr-2"
//                   />{" "}
//                   {ColletralName}
//                 </Button>

//                 <div
//                   className={cn(
//                     "flex items-center justify-between font-semibold mt-2",
//                     inter.className
//                   )}
//                 >
//                   <span> Minting USBD Token</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 py-1">
//                 <div>
//                   {isLoading ? (
//                     <Loader2
//                       size={20}
//                       className="animate-spin m-[10px] dark:text-white"
//                     />
//                   ) : (
//                     <Input
//                       type="number"
//                       placeholder={usbdAmount}
//                       className="rounded-[12px] w-[100%] lg:w-[200%] font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
//                       value={usbdAmount}
//                       onChange={handleUSBDAmountChange}
//                       readOnly={collateralRatioType !== "custom"} // Editable when collateralRatioType is 'custom'
//                     />
//                   )}
//                 </div>
//                 <div
//                   className={cn(
//                     "flex items-center justify-between font-semibold",
//                     inter.className
//                   )}
//                 ></div>
//               </div>
//             </div>
//             <Tabs defaultValue="auto" className="py-4">
//               <span
//                 className={cn(
//                   "border-b border-dashed text-sm border-black dark:border-gray-100 mb-2 inline-block font-semibold",
//                   inter.className
//                 )}
//               >
//                 Calculate Debt
//               </span>
//               <div
//                 className={cn(
//                   "flex flex-col lg:flex-row items-center gap-2 justify-between"
//                 )}
//               >
//                 <TabsList className="bg-[#edeef1] rounded-xl ">
//                   <TabsTrigger
//                     value={"auto"}
//                     onClick={() => setCollateralRatioType("auto")}
//                     className="m-0 rounded-xl w-32"
//                   >
//                     Auto
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value={"custom"}
//                     onClick={() => setCollateralRatioType("custom")}
//                     className="m-0 rounded-xl  w-32"
//                   >
//                     Custom
//                   </TabsTrigger>
//                 </TabsList>
//                 <p className="flex items-center justify-between w-full rounded-[12px] bg-[#F5F5F4] dark:bg-[#302F2E] px-5">
//                   <Input
//                     type="number"
//                     placeholder={"0.00%"}
//                     className=" font-semibold border-transparent bg-[#F5F5F4]   dark:bg-[#302F2E]"
//                     value={colletralRatio}
//                     defaultValue={0}
//                     onChange={(event: any) => {
//                       handleColletralRationChange(event);
//                       handlecalculateUSBDAmount(
//                         parseFloat(stBtcAmount),
//                         event.target.value
//                       );
//                     }}
//                   />
//                   <span>%</span>
//                 </p>
//               </div>

//               {CRMsgShow && (
//                 <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
//                   <p className="text-red-500">
//                     Minimum collateral ratio should be greater than 225%
//                   </p>
//                 </div>
//               )}
//               {USBDAmmountMsg && (
//                 <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
//                   <p className="text-red-500">
//                     USBD Amount is greater than Remaining mintable USBD Amount
//                   </p>
//                 </div>
//               )}
//               {showMinDebt && (
//                 <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
//                   <p className="text-red-500">
//                     Minimum USBD value should be more than {minUSBDLimit}
//                   </p>
//                 </div>
//               )}
//               {/* <TabsContent value="auto">
//             <TmpTabContent />
//           </TabsContent>
//           <TabsContent value="custom">
//             <TmpTabContent />
//           </TabsContent> */}
//             </Tabs>
//             {/* <ToastContainer className="bg-white h-[86px] w-[360px] rounded-[20px]" /> */}
//             <ToastContainer
//               className="!right-16 !top-20"
//               toastClassName={() =>
//                 " h-[86px] w-[360px] rounded-[20px] flex item-center"
//               }
//               position="top-right"
//               autoClose={5000}
//               hideProgressBar
//               closeOnClick
//               draggable
//               pauseOnHover
//             />
//             <div>
//               <Button
//                 variant="primary"
//                 className="w-full flex justify-center items-center"
//                 onClick={handleConnectClick}
//                 disabled={CRMsgShow || USBDAmmountMsg || loading}
//               >
//                 {loading ? (
//                   <Loader2 size={20} className="animate-spin dark:text-white" />
//                 ) : isConnected ? (
//                   "Mint"
//                 ) : (
//                   "Connect wallet"
//                 )}
//               </Button>
//               <SuccessPopup
//                 isOpen={isSuccessOpen}
//                 onClose={() => setIsSuccessOpen(false)}
//                 title="USBD Minted Successfully"
//                 message={`An amount of ${usbdAmount} USBD has been successfully minted. Sit back, relax, and reap the benefits of your effort.`}
//                 actions={
//                   <div className="w-[100%] flex flex-col gap-2">
//                     <Link
//                       className={cn(
//                         "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
//                         fontSpace_Grotesk.className
//                       )}
//                       href={{ pathname: "/earn/" }}
//                     >
//                       Deposit into Earn Pools
//                     </Link>
//                     <Link
//                       className="bg-[#F5F5F4] text-[#78716C] text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full"
//                       href={txLink}
//                     >
//                       Check on explorer
//                     </Link>
//                   </div>
//                 }
//               />
//               <ErrorPopup
//                 isOpen={isErrorOpen}
//                 onClose={() => setIsErrorOpen(false)}
//                 title="Something went wrong"
//                 message={`Something went wrong while processing the transaction. Please wait for the balances to reflect or try again.`}
//                 actions={
//                   <div className="w-[100%] flex flex-col gap-2">
//                     <button
//                       className={cn(
//                         "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
//                         fontSpace_Grotesk.className
//                       )}
//                       onClick={() => setIsErrorOpen(false)}
//                     >
//                       Try Again
//                     </button>
//                   </div>
//                 }
//               />
//             </div>
//           </div>
//         ) : (
//           <div>
//             <Redeem />
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className={cn(inter.className, "flex-col  items-start")}>
//         <h1 className="text-xl font-semibold pt-2">Breakdown</h1>
//         {isMint ? (
//           <ul className={cn("w-full")}>
//             {informationData.map((item, index) => (
//               <li key={index} className="flex items-center justify-between">
//                 <div className="relative flex items-center">
//                   <span className="text-muted-foreground font-semibold text-sm border-b border-dashed border-gray-400">
//                     {item.title}
//                   </span>
//                   <div className="group ml-1 inline-block cursor-pointer">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
//                       <div className="bg-black text-white text-xs rounded px-2 py-1 mt-1 w-72 shadow-lg">
//                         {item.info}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <span
//                   className={`font-bold ${
//                     item.title === "Collat. Ratio" ||
//                     item.title === "Liquidation Price"
//                       ? "text-green-400"
//                       : item.title === "Debt in front"
//                       ? "text-red-500"
//                       : ""
//                   }`}
//                 >
//                   {index === 0
//                     ? "1/16"
//                     : index === 1
//                     ? debtInFront
//                     : index === 2
//                     ? `${collateralRatio}%`
//                     : index === 3
//                     ? `$${debtInFront}`
//                     : index === 4
//                     ? `${borrowInterestRate}%`
//                     : usbdMintable}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="w-[100%]">
//             <ul className={cn("w-full")}>
//               {RedeemBreakDownData.map((item, index) => (
//                 <li key={index} className="flex items-center justify-between">
//                   <div className="relative flex items-center">
//                     <span className="text-muted-foreground font-semibold text-sm border-b border-dashed border-gray-400">
//                       {item.title}
//                     </span>
//                     {/* <div className="group ml-1 inline-block cursor-pointer">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
//                       <div className="bg-black text-white text-xs rounded px-2 py-1 mt-1 w-72 shadow-lg">
//                         {item.info}
//                       </div>
//                     </div>
//                   </div> */}
//                   </div>
//                   <span
//                     className={`font-bold ${
//                       item.title === "Collat. Ratio" ||
//                       item.title === "Expected Collateral Received"
//                         ? "text-green-400"
//                         : item.title === "Redemption Fees"
//                         ? "text-red-500"
//                         : ""
//                     }`}
//                   >
//                     {index === 0
//                       ? `${lstPrice}`
//                       : index === 1
//                       ? `${redeemFee}%`
//                       : index === 2
//                       ? `00.00`
//                       : index === 3
//                       ? `${expectedvaule} ${ColletralName}`
//                       : index === 4
//                       ? `${borrowInterestRate}%`
//                       : usbdMintable}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export const HeadBtn = () => {
//   const router = useRouter();
//   const sp = useSearchParams();
//   let tokenName = sp.get("token");
//   return (
//     <div className="flex items-center justify-start space-x-4 mb-5">
//       <Button
//         onClick={() => {
//           router.back();
//         }}
//         className=" bg-slate-300/45 dark:bg-[#1A1A1A] rounded-md p-2.5 text-black dark:text-white"
//       >
//         <ChevronLeft />
//       </Button>
//       <h3 className="text-xl font-semibold">{tokenName}</h3>
//     </div>
//   );
// };

// export const DetailCard = () => {
//   const { isConnected, address } = useAccount();
//   const chain = useChainId();
//   const [ColletralName, setColletralName] = useState("");
//   const [vaultParam, setVaultParam] = useState<string>("");
//   const { tvl, totaldebt, usbdMintable, lstPrice } = useVaultContext();

//   const fetchData = async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const vaultParam = urlParams.get("vault");
//     if (vaultParam !== null) {
//       setVaultParam(vaultParam);

//       const vault = Vaults.find(
//         (vault) =>
//           vault.vaultsAddress === vaultParam &&
//           vault.chain_id === chain.toString()
//       );

//       setColletralName(vault?.colletralTockenName as string);

//       if (!isConnected) {
//         provider = null;
//       } else {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   });

//   const formatCurrency = (value: number) =>
//     new Intl.NumberFormat("en-US", {
//       notation: "compact",
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 1,
//       maximumFractionDigits: 1,
//     }).format(value);

//   return (
//     <div className="grid grid-cols-2 gap-4 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[12px] mb-5 py-5 ps-5">
//       <div>
//         <p
//           className={cn(
//             "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           225.0%
//         </p>
//         <p
//           className={cn(
//             "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
//             inter
//           )}
//         >
//           Minimum Collat. Ratio
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           100.00B
//         </p>
//         <p
//           className={cn(
//             "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
//             inter
//           )}
//         >
//           Total USBD mintable
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           {formatCurrency(tvl)}
//         </p>
//         <p
//           className={cn(
//             "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
//             inter
//           )}
//         >
//           {ColletralName} TVL
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           {lstPrice}
//         </p>
//         <p
//           className={cn(
//             "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
//             inter
//           )}
//         >
//           Price of {ColletralName}
//         </p>
//       </div>
//       <div>
//         <p
//           className={cn(
//             "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
//             fontSpace_Grotesk.className
//           )}
//         >
//           {formatCurrency(totaldebt)}
//         </p>
//         <p
//           className={cn(
//             "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
//             inter
//           )}
//         >
//           USBD minted
//         </p>
//       </div>
//     </div>
//   );
// };

// // export const NetworkError = ({
// //   chainId,
// //   setShow,
// // }: {
// //   chainId: string;
// //   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// // }) => {
// //   const [{ wallet, connecting }, connect, disconnect, address] =
// //     useConnectWallet();
// //   const { isConnected, address } = useAccount();
// //   const handleSwitchNetwork = async () => {
// //     if (!isConnected) {
// //       provider = null;
// //     } else {
// //       try {
// //         console.log("Switching Network");
// //         await wallet.provider.request({
// //           method: "wallet_switchEthereumChain",
// //           params: [{ chainId: numberToHex(parseInt(chainId, 16)) }],
// //         });
// //         setShow(false);
// //       } catch (error) {
// //         if ((error as any).code === 4902) {
// //           try {
// //             await wallet.provider.request({
// //               method: "wallet_addEthereumChain",
// //               params: [chains[chainId]],
// //             });
// //             setShow(false);
// //           } catch (error) {
// //             console.error(error);
// //           }
// //           setShow(false);
// //         } else {
// //           console.error(error);
// //         }
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center py-8">
// //       {/* <h1 className="text-2xl font-semibold mb-4">Wrong Network</h1> */}
// //       <p className="text-gray-500 mb-6">
// //         Please switch to the correct network to continue.
// //       </p>
// //       <Button variant="primary" onClick={handleSwitchNetwork} className="w-40">
// //         Switch Network
// //       </Button>
// //     </div>
// //   );
// // };

import bitlayer from "@/assets/images/tokenImg/bitlayer.png";
import lorenzo from "@/assets/images/tokenImg/lorenzo_logo.png";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import { troveManagerContract } from "@/constants/walletConstants";
import Onboard from "@web3-onboard/core";
import { getWalletClient } from "@wagmi/core";
import { ethers } from "ethers-old";
import { ethers as ethersNew } from "ethers";
import { parseEther, isHex, fromHex, numberToHex } from "viem";
import contracts from "@/scripts/contracts";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataToCalculateUSDB } from "../../../scripts/fetchData";
import Vaults from "@/scripts/vaults";
import { getUserBalance } from "@/lib/colletral-utils";
import { useAccount, useBalance, useChainId } from "wagmi";
import { Loader2 } from "lucide-react";
import { getMinNetDebt } from "@/scripts/minNetDebt";
import { breakdownFunctions } from "@/scripts/breakdown";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { VBtn } from "../ValutsComponents";
import { Input } from "@/components/ui/input";
import { AArrowDown, ChevronLeft } from "lucide-react";
// import { CircleAlert } from "lucide-react";
import injectedModule from "@web3-onboard/injected-wallets";
import wagmi from "@web3-onboard/wagmi";
import { use, useContext, useEffect, useState } from "react";
// import { TroveManagerAddress } from "@/constants/walletConstants";
import { getLSTPrice, getUSBDAmount, mintUSBD } from "@/scripts/mintUSBD";
import networks from "@/scripts/contracts";
import chains from "@/scripts/chains";
import { useConnectWallet } from "@web3-onboard/react";
import ErrorMinting from "./Toast/ErrorMinting";
import SuccessMinting from "./Toast/SuccessMinting";
import SliderButton from "../sliderButton";
import Redeem from "./RedeemContent";
import RedeemBreakdown from "./RedeemBreakdown";
import { useVaultContext } from "@/lib/contextFile";
import ErrorPopup from "@/components/ui/ErrorPopup";
import Link from "next/link";
import SuccessPopup from "@/components/ui/SuccessPopup";
import fetchRedeemBreakdownData from "@/scripts/redeembreakdown";
import { log } from "console";
import WalletModal from "@/components/WalletModal/WalletModal";
//import { createConfig } from "wagmi";
let provider: any;

const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Manrope({ subsets: ["latin"] });

// export const TmpTabContent = () => {
//   return (
//     <>
//       <div
//         className={cn(
//           inter.className,
//           "flex justify-between my-5 font-semibold"
//         )}
//       >
//         <p>Minting USBD</p>
//         <p>
//           <span className="text-muted-foreground mr-1">Balance</span>
//           <span>0.00</span>
//         </p>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 items-center font-semibold pb-4">
//         <Input
//           type="number"
//           placeholder="0.00"
//           className="rounded-lg font-semibold border-transparent  dark:bg-slate-800/90"
//         />
//         <div className="flex justify-center items-center space-x-4">
//           <span className="text-muted-foreground">200000</span>
//           <Button
//             variant={"primary"}
//             size={"sm"}
//             className="rounded-lg px-2 h-[27px]"
//           >
//             Max
//           </Button>
//           <Button
//             variant={"default"}
//             size={"lg"}
//             className="rounded-xl bg-black text-white"
//           >
//             <Image
//               src={bitlayer}
//               width={20}
//               height={20}
//               alt="Icon"
//               className="mr-2"
//             />{" "}
//             stBTC
//           </Button>
//         </div>
//       </div>
//       <ul className={inter.className}>
//         <li className="flex items-center justify-between">
//           <span className="text-muted-foreground font-semibold text-sm">
//             +Net debt
//           </span>
//           <span className="font-bold">0.00 USBD</span>
//         </li>
//         <li className="flex items-center justify-between">
//           <span className="text-muted-foreground font-semibold text-sm">
//             +Mint Fee
//           </span>
//           <span className="font-bold">(0.00%) 0.00 USBD</span>
//         </li>
//         <li className="flex items-center justify-between">
//           <span className="text-muted-foreground font-semibold text-sm">
//             +Liquidation Reserve
//           </span>
//           <span className="font-bold">200 USBD</span>
//         </li>
//         <li className="flex items-center justify-between">
//           <span className="text-muted-foreground font-semibold text-sm">
//             Your total debt
//           </span>
//           <span className="font-bold text-green-400">0.00 USBD</span>
//         </li>
//       </ul>
//       <p
//         className={cn(
//           "rounded-md text-red-500 bg-red-100 p-3 my-2 font-semibold text-sm text-center",
//           inter.className
//         )}
//       >
//         Opening an account with a Collateral Ratio of less than 150% is at risk
//         of liquidation during recovery mode
//       </p>
//     </>
//   );
// };

export const InfoCard = () => {
  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  const chain = useChainId();
  const connectedNetwork = chains[chain];
  const { isConnected, address } = useAccount();
  const usbdAddress =
    contracts[connectedNetwork.NetworkName].SPPools[0].tokenAddress;
  const [usbdBalance, setUsbdBalance] = useState("0 USBD");

  const { data: balance } = useBalance({
    address,
    token: usbdAddress as any,
    query: {
      enabled: isConnected,
    },
  });

  useEffect(() => {
    if (balance) {
      const formattedBalance = formatUSBD(Number(balance.value) / 10 ** 18);
      setUsbdBalance(formattedBalance);
    }
  }, [balance]);

  const { tvl, totaldebt } = useVaultContext();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  return (
    <div className="flex justify-around py-[28px] flex-col gap-5 lg:gap-0 lg:flex-row ps-8 lg:ps-0 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[20px] mb-4">
      <div>
        <p
          className={cn(
            "text-[32px] font-medium leading-[40.96px] text-[#F74A17]",
            fontSpace_Grotesk.className
          )}
        >
          {formatCurrency(tvl)}
        </p>
        <p
          className={cn(
            "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
            inter.className
          )}
        >
          TVL
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[32px] font-medium leading-[40.96px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          {formatCurrency(totaldebt)}
        </p>
        <p
          className={cn(
            "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
            inter.className
          )}
        >
          Total USBD minted
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[32px] font-medium leading-[40.96px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          ${usbdBalance}
        </p>
        <p
          className={cn(
            "inline text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] border-b-[1.5px] border-dashed border-[#A8A29E]",
            inter.className
          )}
        >
          USBD Balance
        </p>
      </div>
    </div>
  );
};

export const LargeCard = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log("LargeCard");
  // const [{ wallet, connecting }, connect, disconnect,address] = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcConnectedNetwork, setBtcConnectedNetwork] = useState<string | null>(
    null
  );

  const [manualWalletAddress, setManualWalletAddress] = useState<string | null>(
    null
  ); // State to store manual wallet address

  const { isConnected, address } = useAccount();
  const [loading, setLoading] = useState(false);
  const chain = useChainId();
  // const injected = injectedModule();
  // const onboard = Onboard({
  //   wagmi,
  //   wallets: [injected],
  //   chains: [
  //     {
  //       id: '83291',
  //       token: 'stBtc',
  //       label: 'Lorenzo',
  //       rpcUrl: 'https://rpc-testnet.lorenzo-protocol.xyz'
  //     }
  //   ],
  //   appMetadata: {
  //     name: 'BIMA Finance',
  //     icon: 'Test',
  //     description: 'BIMA finance',
  //   }
  // });

  // const handleConnectClick = async () => {
  //   if (isConnected) {
  //     const tx = await mint();
  //     mintedSuccessfully();
  //   }
  // };

  const handleConnectClick = async () => {
    if (isConnected) {
      setLoading(true);
      try {
        const tx = await mint();
      } catch (error) {
        console.error("Minting failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Wallet is not connected, open the wallet modal
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    {
      setManualWalletAddress(null); // Reset manual wallet address
      setBtcConnectedNetwork(null); // Reset the connected BTC wallet network on disconnect
    }
  };

  const [stBtcAmount, setStBtcAmount] = useState<string>("");
  const [stBTCBalance, setstBTCBalance] = useState<string>("0");
  const [usbdAmount, setUsbdAmount] = useState<string>("0");
  // const [chainId,setChainId] = useState<string>("0");
  const [mcr, setMcr] = useState<string>("0");
  const [ColletralLogo, setColletralLogo] = useState("");
  const [ColletralName, setColletralName] = useState("");
  const [vaultNetwork, setVaultNetwork] = useState<string>("0");
  const [colletralRatio, setcolletralRatio] = useState<number>(250);
  const [vaultAddress, setVaultAddress] = useState<string>("");
  const [CRMsgShow, setCRMsgShow] = useState<boolean>(false);
  const [USBDAmmountMsg, setUSBDAmmountMsg] = useState<boolean>(false);

  const [stBTCPrice, setstBTCPrice] = useState<string>("0");
  const [minUSBDLimit, setminUSBDLimit] = useState<number>(0);
  const [showMinDebt, setShowMinDebt] = useState<boolean>(true);
  const [vaultParam, setVaultParam] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [txLink, settxLink] = useState<string>("");
  const [amount, setAmount] = useState(0);
  const [signerAddress, setsignerAddress] = useState("");
  const [collateralRatioType, setCollateralRatioType] =
    useState<string>("auto");
  const { lstPrice, redeemFee, expectedvaule } = useVaultContext();
  const [colletralTokenAddress, setColletralTokenAddress] =
    useState<string>("");
  const [oracleAddress, setOracleAddress] = useState<string>("");

  const errorNotify = () =>
    toast.error("You have connected with wrong network!!");
  const notify = () => toast.success("Connected successfully!!");
  const invalidVaultChainId = () => toast.error("Invalid Vault Chain Id!!");
  const mintedSuccessfully = () => {
    toast(<SuccessMinting />, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  const ErrorInMinting = () => {
    toast(<ErrorMinting />, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vaultParam = urlParams.get("vault");
    if (vaultParam !== null) {
      setVaultParam(vaultParam);

      const vault = Vaults.find(
        (vault) =>
          vault.vaultsAddress === vaultParam &&
          vault.chain_id === chain.toString()
      );

      setColletralLogo(vault?.colletralTockenImage as string);
      setColletralName(vault?.colletralTockenName as string);
      setVaultNetwork(vault?.network as string);
      setVaultAddress(vault?.vaultsAddress as string);
      setColletralTokenAddress(vault?.colletralTokenAddress as string);
      setOracleAddress(vault?.OracleAddress as string);
      if (!isConnected) {
        provider = null;
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      }
    }
  };

  useEffect(() => {
    fetchMinNetDebt();
    fetchData();
    fetchBreakdownData();
    fetchBalance();
  });

  useEffect(() => {
    setSigner();
  }, [isConnected]);

  const setSigner = async () => {
    try {
      if (isConnected) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getUncheckedSigner();
        setsignerAddress(await signer.getAddress());
      } else {
        setsignerAddress("0x0000000000000000000000000000000000000000");
      }
    } catch (e) {
      return e;
    }
  };

  const fetchBalance = async () => {
    try {
      const data = await getUserBalance(
        address,
        vaultAddress,
        contracts[vaultNetwork].rpcURL
      );
      console.log("Data->", data);
      const Balance = ethers.utils.formatEther(data);
      const formattedBalance = parseFloat(Balance).toFixed(2);
      setstBTCBalance(formattedBalance);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const fetchMinNetDebt = async () => {
    try {
      const networkName = chains[chain].NetworkName;
      const provider = new ethers.providers.JsonRpcProvider(
        networks[networkName].rpcURL as any
      );
      const minDebt: any = await getMinNetDebt(
        provider,
        networks[networkName].borrowerOperationsAddress
      );
      let roundedMinDebt = Math.floor(parseFloat(minDebt));
      console.log("minimum debt", roundedMinDebt);
      console.log("minimum debt", roundedMinDebt);
      if (Number.isNaN(roundedMinDebt)) {
        roundedMinDebt = 0;
      }
      setminUSBDLimit(roundedMinDebt);
    } catch (error) {
      console.error("Error fetching minimum net debt:", error);
    }
  };

  type Detail = {
    label: string;
    value: string | number;
    unit?: string;
  };

  const [debtInFront, setDebtInFront] = useState<string>("0");
  const [liquidationPrice, setLiquidationPrice] = useState<string>("");
  const [borrowInterestRate, setBorrowInterestRate] = useState<string>("0");
  const [remainingMintableUSBD, setRemainingMintableUSBD] =
    useState<string>("0");
  const [RedeemDetails, setRedeemDetails] = useState<Detail[]>([]);
  const [collateralRatio, setCollateralRatio] = useState<string>("0");
  const searchParams = useSearchParams();
  const vaultAddressFromParams = searchParams.get("vault");
  const { usbdMintable } = useVaultContext();

  const fetchBreakdownData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const troveManagerAddress = vaultAddressFromParams;
      const chainName = chains[chain].NetworkName;
      const priceFeedAddress = networks[chainName].priceFeedAddress;
      const data = await breakdownFunctions(
        troveManagerAddress,
        priceFeedAddress,
        userAddress,
        provider
      );

      const Redeemdata = await fetchRedeemBreakdownData(
        troveManagerAddress,
        provider
      );
      if (Redeemdata == undefined) {
        return;
      }
      console.log("RedeemData", Redeemdata);
      setDebtInFront(data.debtInFront);
      setLiquidationPrice(data.liquidationPrice);
      setBorrowInterestRate(data.borrowInterestRate);
      setRemainingMintableUSBD(data.remainingMintableUSBD);
      setCollateralRatio(data.collateralRatio);

      console.log("Debt in front:", data.debtInFront);
      console.log("Liquidation Price:", data.liquidationPrice);
      console.log("Borrow Interest Rate:", data.borrowInterestRate);
      console.log("Remaining Mintable USBD:", data.remainingMintableUSBD);
      console.log("Collateral Ratio:", data.collateralRatio);
    } catch (error) {
      console.error("Error fetching breakdown data:", error);
    }
  };

  // useEffect(() => {
  //   fetchBreakdownData();
  // }, []);

  const handleLSTAmmount = async (value: any) => {
    try {
      setStBtcAmount(value);
      const provider = new ethers.providers.JsonRpcProvider(
        contracts[vaultNetwork].rpcURL
      );
      const usdPrice = (await getLSTPrice(
        contracts[vaultNetwork].oracleAddress,
        colletralTokenAddress,
        provider
      )) as string;

      const LSTAmmount = parseFloat(value) * parseFloat(usdPrice);
      console.log("LSTAmmount", LSTAmmount);
      console.log("LSTAmmount", LSTAmmount);

      setstBTCPrice(LSTAmmount.toFixed(2));
    } catch (e) {
      console.error(e);
    }
  };

  const handlecalculateUSBDAmount = async (
    _stBtcAmount: number,
    _colletralRatio: number
  ) => {
    if (_stBtcAmount === 0 || _colletralRatio === 0) {
      setUsbdAmount("0");
      return;
    }
    setIsLoading(true);

    const connectedNetwork = contracts[vaultNetwork];
    console.log("Cpnnected", connectedNetwork);

    const internal_provider = new ethers.providers.JsonRpcProvider(
      connectedNetwork.rpcURL
    );
    const USBDAmount = (await getUSBDAmount(
      connectedNetwork.oracleAddress,
      colletralTokenAddress,
      vaultAddress,
      internal_provider,
      _stBtcAmount,
      _colletralRatio,
      signerAddress
    )) as string;
    setUsbdAmount(USBDAmount);
    setIsLoading(false);

    if (parseFloat(USBDAmount) < parseFloat(usbdMintable)) {
      setUSBDAmmountMsg(false);
    } else {
      setUSBDAmmountMsg(true);
    }
    if (parseFloat(USBDAmount) > minUSBDLimit) {
      setShowMinDebt(false);
    } else {
      setShowMinDebt(false);
    }
  };

  const mint = async () => {
    const connectedContracts = contracts[vaultNetwork];

    const signer = provider.getUncheckedSigner();
    try {
      const tx = await mintUSBD({
        borrowerOperationsAddress: connectedContracts.borrowerOperationsAddress,
        troveManagerAddress: vaultAddress,
        signer,
        amountstBTC: parseEther(stBtcAmount),
        percentage: colletralRatio,
        oracleAddress: oracleAddress,
        collateralAddress: colletralTokenAddress,
      });
      console.log("Tx", tx);
      mintedSuccessfully();
      setIsSuccessOpen(true);
      settxLink(`${connectedContracts.explorerLink}${tx.hash}`);
      return tx;
    } catch (e) {
      ErrorInMinting();
      setIsErrorOpen(true);
    }
  };

  const handleColletralRationChange = (event: any) => {
    setcolletralRatio(event.target.value);
    if (event.target.value <= 225) {
      setCRMsgShow(true);
    } else {
      setCRMsgShow(false);
    }
  };
  const handleUSBDAmountChange = (event: any) => {
    const newUSBDAmount = parseFloat(event.target.value);
    setUsbdAmount(event.target.value);

    if (collateralRatioType === "custom") {
      const stBtcAmountNum = parseFloat(stBtcAmount);
      const stBTCPriceNum = parseFloat(stBTCPrice);

      if (stBtcAmountNum > 0 && newUSBDAmount > 0) {
        let newRatio = ((stBtcAmountNum * stBTCPriceNum) / newUSBDAmount) * 100;

        if (newRatio < 225) {
          newRatio = 225;
          setCRMsgShow(true);
          toast.error("Collateral ratio cannot be below 225%");
        } else {
          setCRMsgShow(false);
        }
        if (newUSBDAmount < parseFloat(usbdMintable)) {
          setUSBDAmmountMsg(false);
        } else {
          setUSBDAmmountMsg(true);
        }

        setcolletralRatio(newRatio);
      } else {
        setcolletralRatio(0);
      }
    }
  };

  const handleMaxClick = () => {
    setStBtcAmount(stBTCBalance);
    handleLSTAmmount(stBTCBalance);
    handlecalculateUSBDAmount(parseInt(stBTCBalance), colletralRatio);
  };
  const informationData = [
    {
      title: "Vault position",
      info: "This is the position your Vault will be placed at in the list of all Vaults. This list is ordered by the Vault's collateral ratio. Vaults with a lower collateral ratio and hence a lower position will be the first to be liquidated or redeemed against.",
    },
    {
      title: "Debt in front",
      info: "This is how much debt would need to be redeemed before your Vault can be redeemed against assuming USBD was under peg. A higher amount of debt infront means a lower chance of redemption.",
    },
    {
      title: "Collat. Ratio",
      info: "This is the percentage of the loan that is collateralised. You will be liquidated automatically if you reach 225%.",
    },
    {
      title: "Liquidation Price",
      info: "You will be liquidated if the price of your collateral reaches this price.",
    },
    {
      title: "Borrow Interest Rate",
      info: "The fee that accrues over time on outstanding debt. It is charged in USBD.",
    },
    {
      title: "Remaining Mintable USBD",
      info: "This is the amount of USBD that can be currently minted against this collateral.",
    },
  ];

  const RedeemBreakDownData = [
    {
      title: "Collateral Price",
      info: "This is the position your Vault will be placed at in the list of all Vaults. This list is ordered by the Vault's collateral ratio. Vaults with a lower collateral ratio and hence a lower position will be the first to be liquidated or redeemed against.",
    },
    {
      title: "Redemption Fees",
      info: "This is how much debt would need to be redeemed before your Vault can be redeemed against assuming USBD was under peg. A higher amount of debt infront means a lower chance of redemption.",
    },
    {
      title: "Redemption Fee Amount",
      info: "This is the percentage of the loan that is collateralised. You will be liquidated automatically if you reach 225%.",
    },
    {
      title: "Expected Collateral Received",
      info: "You will be liquidated if the price of your collateral reaches this price.",
    },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  const [isMint, setIsMint] = useState(true);
  return (
    <Card className="bg-white dark:bg-[#1A1A1A] rounded-2xl mb-4">
      <div className="px-[5%]">
        <SliderButton isMint={isMint} setIsMint={setIsMint} />
      </div>
      <CardHeader>
        {isMint ? (
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold pt-2">Mint USBD</h1>
            {/* <VBtn rootClassName="w-[170px]" className="flex items-center">
              6.70% → 13.41% APR
            </VBtn> */}
          </div>
        ) : (
          <div className="flex justify-between">
            <h1 className="text-[14px] font-semibold leading-[20.16px] text-[#A8A29E] pt-2">
              1 USBD is always redeemable for $1 of collateral
            </h1>
          </div>
        )}
      </CardHeader>
      <CardContent className=" mt-2 border-b border-dashed border-[#8C8FA1]">
        {isMint ? (
          <div>
            <div className="flex items-center space-x-2 py-2">
              {/* <span className="text-muted-foreground text-[14px] font-semibold text-[#A8A29E] border-b border-dashed border-[#A8A29E]">
                Zap ETH / wETH to stBTC
              </span> */}
              {/* <Switch /> */}
            </div>
            <div>
              <div
                className={cn(
                  "flex items-center justify-between font-semibold",
                  inter.className
                )}
              >
                <span>Enter amount of {ColletralName}</span>
                <p>
                  <span className="text-muted-foreground">Balance</span>&nbsp;
                  <span>{stBTCBalance}</span>
                </p>
              </div>
              <div className="flex justify-between flex-wrap py-1 ">
                <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
                  <Input
                    placeholder="Enter amount here"
                    className="rounded-lg font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
                    value={stBtcAmount}
                    defaultValue={0}
                    onChange={(event: any) => {
                      setStBtcAmount(event.target.value);
                      handleLSTAmmount(event.target.value);
                      handlecalculateUSBDAmount(
                        parseFloat(event.target.value),
                        colletralRatio
                      );
                      // handlecalculateUSBDAmount(parseInt(event.target.value));
                    }}
                  />

                  <div className="flex justify-center items-center space-x-4">
                    <span className="text-muted-foreground">
                      =${stBTCPrice}
                    </span>
                    <Button
                      variant={"primary"}
                      size={"sm"}
                      className="rounded-lg px-2 h-[27px]"
                      onClick={handleMaxClick}
                    >
                      Max
                    </Button>
                  </div>
                </div>

                <Button
                  variant={"default"}
                  size={"lg"}
                  className="rounded-xl bg-black text-white w-[24%]"
                >
                  <img
                    src={ColletralLogo}
                    width={20}
                    height={20}
                    alt="Icon"
                    className="mr-2"
                  />{" "}
                  {ColletralName}
                </Button>

                <div
                  className={cn(
                    "flex items-center justify-between font-semibold mt-2",
                    inter.className
                  )}
                >
                  <span> Minting USBD Token</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 py-1">
                <div>
                  {isLoading ? (
                    <Loader2
                      size={20}
                      className="animate-spin m-[10px] dark:text-white"
                    />
                  ) : (
                    <Input
                      type="number"
                      placeholder={usbdAmount}
                      className="rounded-[12px] w-[100%] lg:w-[200%] font-semibold border-transparent bg-[#F5F5F4] dark:bg-[#302F2E]"
                      value={usbdAmount}
                      onChange={handleUSBDAmountChange}
                      readOnly={collateralRatioType !== "custom"} // Editable when collateralRatioType is 'custom'
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "flex items-center justify-between font-semibold",
                    inter.className
                  )}
                ></div>
              </div>
            </div>
            <Tabs defaultValue="auto" className="py-4">
              <span
                className={cn(
                  "border-b border-dashed text-sm border-black dark:border-gray-100 mb-2 inline-block font-semibold",
                  inter.className
                )}
              >
                Calculate Debt
              </span>
              <div
                className={cn(
                  "flex flex-col lg:flex-row items-center gap-2 justify-between"
                )}
              >
                <TabsList className="bg-[#edeef1] rounded-xl ">
                  <TabsTrigger
                    value={"auto"}
                    onClick={() => setCollateralRatioType("auto")}
                    className="m-0 rounded-xl w-32"
                  >
                    Auto
                  </TabsTrigger>
                  <TabsTrigger
                    value={"custom"}
                    onClick={() => setCollateralRatioType("custom")}
                    className="m-0 rounded-xl  w-32"
                  >
                    Custom
                  </TabsTrigger>
                </TabsList>
                <p className="flex items-center justify-between w-full rounded-[12px] bg-[#F5F5F4] dark:bg-[#302F2E] px-5">
                  <Input
                    type="number"
                    placeholder={"0.00%"}
                    className=" font-semibold border-transparent bg-[#F5F5F4]   dark:bg-[#302F2E]"
                    value={colletralRatio}
                    defaultValue={0}
                    onChange={(event: any) => {
                      handleColletralRationChange(event);
                      handlecalculateUSBDAmount(
                        parseFloat(stBtcAmount),
                        event.target.value
                      );
                    }}
                  />
                  <span>%</span>
                </p>
              </div>

              {CRMsgShow && (
                <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
                  <p className="text-red-500">
                    Minimum collateral ratio should be greater than 225%
                  </p>
                </div>
              )}
              {USBDAmmountMsg && (
                <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
                  <p className="text-red-500">
                    USBD Amount is greater than Remaining mintable USBD Amount
                  </p>
                </div>
              )}
              {showMinDebt && (
                <div className="border border-red-500 rounded-lg p-2 mt-2 text-center">
                  <p className="text-red-500">
                    Minimum USBD value should be more than {minUSBDLimit}
                  </p>
                </div>
              )}
              {/* <TabsContent value="auto">
            <TmpTabContent />
          </TabsContent>
          <TabsContent value="custom">
            <TmpTabContent />
          </TabsContent> */}
            </Tabs>
            {/* <ToastContainer className="bg-white h-[86px] w-[360px] rounded-[20px]" /> */}
            <ToastContainer
              className="!right-16 !top-20"
              toastClassName={() =>
                " h-[86px] w-[360px] rounded-[20px] flex item-center"
              }
              position="top-right"
              autoClose={5000}
              hideProgressBar
              closeOnClick
              draggable
              pauseOnHover
            />
            <div>
              <Button
                variant="primary"
                className="w-full flex justify-center items-center"
                onClick={handleConnectClick}
                disabled={CRMsgShow || USBDAmmountMsg || loading}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin dark:text-white" />
                ) : isConnected ? (
                  "Mint"
                ) : (
                  "Connect wallet"
                )}
              </Button>
              <SuccessPopup
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="USBD Minted Successfully"
                message={`An amount of ${usbdAmount} USBD has been successfully minted. Sit back, relax, and reap the benefits of your effort.`}
                actions={
                  <div className="w-[100%] flex flex-col gap-2">
                    <Link
                      className={cn(
                        "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                        fontSpace_Grotesk.className
                      )}
                      href={{ pathname: "/earn/" }}
                    >
                      Deposit into Earn Pools
                    </Link>
                    <Link
                      className="bg-[#F5F5F4] text-[#78716C] text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full"
                      href={txLink}
                    >
                      Check on explorer
                    </Link>
                  </div>
                }
              />
              <ErrorPopup
                isOpen={isErrorOpen}
                onClose={() => setIsErrorOpen(false)}
                title="Something went wrong"
                message={`Something went wrong while processing the transaction. Please wait for the balances to reflect or try again.`}
                actions={
                  <div className="w-[100%] flex flex-col gap-2">
                    <button
                      className={cn(
                        "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                        fontSpace_Grotesk.className
                      )}
                      onClick={() => setIsErrorOpen(false)}
                    >
                      Try Again
                    </button>
                  </div>
                }
              />

              {isModalOpen && (
                <WalletModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  setManualAddress={setManualWalletAddress} // Pass the function to set manual wallet address
                  setConnectedNetwork={setBtcConnectedNetwork} // Pass the function to set connected BTC wallet network
                />
              )}
            </div>
          </div>
        ) : (
          <div>
            <Redeem />
          </div>
        )}
      </CardContent>
      <CardFooter className={cn(inter.className, "flex-col  items-start")}>
        <h1 className="text-xl font-semibold pt-2">Breakdown</h1>
        {isMint ? (
          <ul className={cn("w-full")}>
            {informationData.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="relative flex items-center">
                  <span className="text-muted-foreground font-semibold text-sm border-b border-dashed border-gray-400">
                    {item.title}
                  </span>
                  <div className="group ml-1 inline-block cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                      <div className="bg-black text-white text-xs rounded px-2 py-1 mt-1 w-72 shadow-lg">
                        {item.info}
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    item.title === "Collat. Ratio" ||
                    item.title === "Liquidation Price"
                      ? "text-green-400"
                      : item.title === "Debt in front"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {index === 0
                    ? "1/16"
                    : index === 1
                    ? debtInFront
                    : index === 2
                    ? `${collateralRatio}%`
                    : index === 3
                    ? `$${debtInFront}`
                    : index === 4
                    ? `${borrowInterestRate}%`
                    : usbdMintable}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-[100%]">
            <ul className={cn("w-full")}>
              {RedeemBreakDownData.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="relative flex items-center">
                    <span className="text-muted-foreground font-semibold text-sm border-b border-dashed border-gray-400">
                      {item.title}
                    </span>
                    {/* <div className="group ml-1 inline-block cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                      <div className="bg-black text-white text-xs rounded px-2 py-1 mt-1 w-72 shadow-lg">
                        {item.info}
                      </div>
                    </div>
                  </div> */}
                  </div>
                  <span
                    className={`font-bold ${
                      item.title === "Collat. Ratio" ||
                      item.title === "Expected Collateral Received"
                        ? "text-green-400"
                        : item.title === "Redemption Fees"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {index === 0
                      ? `${lstPrice}`
                      : index === 1
                      ? `${redeemFee}%`
                      : index === 2
                      ? `00.00`
                      : index === 3
                      ? `${expectedvaule} ${ColletralName}`
                      : index === 4
                      ? `${borrowInterestRate}%`
                      : usbdMintable}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export const HeadBtn = () => {
  const router = useRouter();
  const sp = useSearchParams();
  let tokenName = sp.get("token");
  return (
    <div className="flex items-center justify-start space-x-4 mb-5">
      <Button
        onClick={() => {
          router.back();
        }}
        className=" bg-slate-300/45 dark:bg-[#1A1A1A] rounded-md p-2.5 text-black dark:text-white"
      >
        <ChevronLeft />
      </Button>
      <h3 className="text-xl font-semibold">{tokenName}</h3>
    </div>
  );
};

export const DetailCard = () => {
  const { isConnected, address } = useAccount();
  const chain = useChainId();
  const [ColletralName, setColletralName] = useState("");
  const [vaultParam, setVaultParam] = useState<string>("");
  const { tvl, totaldebt, usbdMintable, lstPrice } = useVaultContext();

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vaultParam = urlParams.get("vault");
    if (vaultParam !== null) {
      setVaultParam(vaultParam);

      const vault = Vaults.find(
        (vault) =>
          vault.vaultsAddress === vaultParam &&
          vault.chain_id === chain.toString()
      );

      setColletralName(vault?.colletralTockenName as string);

      if (!isConnected) {
        provider = null;
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      }
    }
  };

  useEffect(() => {
    fetchData();
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <div className="grid grid-cols-2 gap-4 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-[12px] mb-5 py-5 ps-5">
      <div>
        <p
          className={cn(
            "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          225.0%
        </p>
        <p
          className={cn(
            "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
            inter
          )}
        >
          Minimum Collat. Ratio
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          100.00B
        </p>
        <p
          className={cn(
            "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
            inter
          )}
        >
          Total USBD mintable
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          {formatCurrency(tvl)}
        </p>
        <p
          className={cn(
            "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
            inter
          )}
        >
          {ColletralName} TVL
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          {lstPrice}
        </p>
        <p
          className={cn(
            "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
            inter
          )}
        >
          Price of {ColletralName}
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[16px] font-bold leading-[20.48px] text-[#151618] dark:text-[#FFFFFF]",
            fontSpace_Grotesk.className
          )}
        >
          {formatCurrency(totaldebt)}
        </p>
        <p
          className={cn(
            "text-[14px] leading-[20.16px] font-semibold text-[#A8A29E]",
            inter
          )}
        >
          USBD minted
        </p>
      </div>
    </div>
  );
};

// export const NetworkError = ({
//   chainId,
//   setShow,
// }: {
//   chainId: string;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const [{ wallet, connecting }, connect, disconnect, address] =
//     useConnectWallet();
//   const { isConnected, address } = useAccount();
//   const handleSwitchNetwork = async () => {
//     if (!isConnected) {
//       provider = null;
//     } else {
//       try {
//         console.log("Switching Network");
//         await wallet.provider.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: numberToHex(parseInt(chainId, 16)) }],
//         });
//         setShow(false);
//       } catch (error) {
//         if ((error as any).code === 4902) {
//           try {
//             await wallet.provider.request({
//               method: "wallet_addEthereumChain",
//               params: [chains[chainId]],
//             });
//             setShow(false);
//           } catch (error) {
//             console.error(error);
//           }
//           setShow(false);
//         } else {
//           console.error(error);
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center py-8">
//       {/* <h1 className="text-2xl font-semibold mb-4">Wrong Network</h1> */}
//       <p className="text-gray-500 mb-6">
//         Please switch to the correct network to continue.
//       </p>
//       <Button variant="primary" onClick={handleSwitchNetwork} className="w-40">
//         Switch Network
//       </Button>
//     </div>
//   );
// };
