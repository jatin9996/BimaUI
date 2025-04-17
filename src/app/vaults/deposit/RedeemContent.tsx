// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Manrope, Space_Grotesk } from "next/font/google";
// import React, { useEffect, useState } from "react";
// import USBD_2 from "@/assets/icons/USBD_2.svg";
// import LSTS_1 from "@/assets/icons/LSTS_1.svg";
// import LSTS_2 from "@/assets/icons/LSTS_2.svg";
// import LSTS_3 from "@/assets/icons/LSTS_3.svg";
// import LSTS_4 from "@/assets/icons/LSTS_4.svg";
// import Image from "next/image";
// import { useAccount, useBalance, useChainId } from "wagmi";
// import { useVaultContext } from "@/lib/contextFile";
// import chains from "@/scripts/chains";
// import contracts from "@/scripts/contracts";
// import { Loader2 } from "lucide-react";
// import { redeemColletral } from "@/scripts/mintUSBD";
// import { ethers } from "ethers-old";
// import { fetchRedeemFee } from "@/scripts/redeembreakdown";
// import SuccessPopup from "@/components/ui/SuccessPopup";
// import Link from "next/link";
// import ErrorPopup from "@/components/ui/ErrorPopup";
// const fontMonrope = Manrope({ subsets: ["latin"] });
// const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
// let provider: any;

// const Redeem = () => {
//   const [selectedCollateral, setSelectedCollateral] = useState<string | null>(
//     null
//   );

//   const [inputValue, setInputValue] = useState("");
//   const chain = useChainId();
//   const connectedNetwork = chains[chain];
//   const { isConnected, address } = useAccount();
//   const usbdAddress =
//     contracts[connectedNetwork.NetworkName].SPPools[0].tokenAddress;
//   const [usbdBalance, setUsbdBalance] = useState("0 USBD");
//   const [unformatedUsbdBalance, setUnformatedUsbdBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [troveManagerAddress,setTroveMangerAddress] = useState('');
//   const [helpercontractAddress,sethelpercontractAddress] = useState('');
//   const {lstPrice,setredeemFee,setredeemFeeAmount,setexpectedvaule,expectedvaule} = useVaultContext();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isErrorOpen, setIsErrorOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [txLink,settxLink] = useState<string>('');

//   const formatUSBD = (value: number) =>
//     new Intl.NumberFormat("en-US", {
//       notation: "compact",
//       minimumFractionDigits: 1,
//       maximumFractionDigits: 1,
//     }).format(value);

//   const { data: balance } = useBalance({
//     address,
//     token: usbdAddress as any,
//     query: {
//       enabled: isConnected,
//     },
//   });

//   useEffect(() => {
//     if (balance) {
//       setUnformatedUsbdBalance(Number(balance.value) / 10 ** 18);
//       const formattedBalance = formatUSBD(Number(balance.value) / 10 ** 18);
//       setUsbdBalance(formattedBalance);
//     }

//     const urlParams = new URLSearchParams(window.location.search);
//     const vaultParam = urlParams.get("vault");
//     if (vaultParam !== null) {
//       setTroveMangerAddress(vaultParam);
//       if (!isConnected) {
//         provider = null;
//       } else {
//         provider = new ethers.providers.Web3Provider(window.ethereum);
//       }
//     }
//   }, [balance]);

//   const handleMaxClick = () => {
//     setInputValue((unformatedUsbdBalance - 200).toFixed(2));
//     handleCalculateCollateralRecived((unformatedUsbdBalance - 200).toFixed(2))
//   };

//   const fetchRedeemFeeData =async () =>{
//     const signer = provider.getUncheckedSigner();
//     const data =  await fetchRedeemFee(troveManagerAddress,signer);
//     setredeemFee(data);
//     // setredeemFeeAmount(data.amount);
//   }

//   useEffect(() => {
//     if(isConnected){
//        fetchRedeemFeeData()
//     }
//   })

//   const handleCalculateCollateralRecived = (value: any) =>{
//       const expectedAmount = (value/lstPrice).toFixed(4)
//       setInputValue(value)
//       setexpectedvaule(expectedAmount)
//   }

//   const handleConnectClick = async () => {
//     if (isConnected) {
//       setLoading(true);
//       try {
//         await redeem();
//       } catch (error) {
//         console.error("Minting failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const redeem = async () =>{
//     try{
//       console.log("LST Price ==",lstPrice);

//       const signer = provider.getUncheckedSigner();
//       const explorerLink = contracts[connectedNetwork.NetworkName].explorerLink;
//       const tx = await redeemColletral(contracts[connectedNetwork.NetworkName].multiCollateralHintHelpers,troveManagerAddress,inputValue,lstPrice,signer);
//       settxLink(`${explorerLink}${tx}`);
//       setIsSuccessOpen(true)
//       console.log("Transaction of redeem Colletral", tx);
//     }catch (e){
//       setIsErrorOpen(true)
//       console.error("Error:",e);
//       return e;
//     }
//   };

//   // const collaterals = [
//   //   // { id: "wsETH", label: "wsETH", src: LSTS_2 }, // Replace with real icons
//   //   // { id: "rETH", label: "rETH", src: LSTS_3 },
//   //   // { id: "cbETH", label: "cbETH", src: LSTS_1 },
//   //   // { id: "sfrxETH", label: "sfrxETH", src: LSTS_4 },
//   // ];

//   return (
//     <div className=" ">
//       {/* Title */}
//       {/* <div className="mb-4">
//         <h3
//           className={cn(
//             "text-[14px] font-semibold text-[#151618]",
//             fontMonrope.className
//           )}
//         >
//           Select a collateral to redeem for:
//         </h3>
//       </div> */}

//       {/* Collateral Options */}
//       {/* <div className="flex items-center justify-center lg:justify-between flex-wrap gap-5 lg:gap-0 space-x-5 lg:space-x-10 mb-6">
//         {collaterals.map((collateral) => (
//           <button
//             key={collateral.id}
//             onClick={() => setSelectedCollateral(collateral.id)}
//             className="flex items-center  rounded-lg "
//           >
//             <div
//               className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-1 ${
//                 selectedCollateral === collateral.id
//                   ? "border-[#F74A17]"
//                   : "border-[#8C8FA133]"
//               }`}
//             >
//               {selectedCollateral === collateral.id && (
//                 <div className="w-3 h-3 bg-[#F74A17] rounded-full" />
//               )}
//             </div> */}

//       {/* Label and Icon */}
//       {/* <div className="flex items-center space-x-2">
//               <Image src={collateral.src} alt="icon" className="size-[20px]" />
//               <span className="text-black">{collateral.label}</span>
//             </div>
//           </button>
//         ))} */}
//       {/* </div> */}

//       {/* Redeem Section */}
//       <div className="mb-4 flex justify-between">
//         <h4
//           className={cn(
//             "text-[14px] font-semibold text-[#151618] dark:text-[#FFFFFF]",
//             fontMonrope.className
//           )}
//         >
//           Enter amount of {" "}
//           <span className="font-semibold">{'USBD'}</span>
//         </h4>
//         <div
//           className={cn(
//             "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
//             fontMonrope.className
//           )}
//         >
//           Balance{" "}
//           <span
//             className={cn(
//               "text-[#151618] dark:text-[#FFFFFF] font-bold",
//               fontSpace_Grotesk
//             )}
//           >
//             {usbdBalance}
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 w-[100%]">
//         {/* Input Field */}
//         <div className="flex items-center justify-between bg-[#F5F5F4] dark:bg-[#302F2E] rounded-[12px] px-2 w-[100%] md:w-[77%]">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => handleCalculateCollateralRecived(e.target.value)}
//             placeholder="0.00"
//             className="bg-transparent h-[48px] text-[14px] text-[#A8A29E] dark:bg-[#302F2E] focus:outline-none"
//           />
//           <span className="text-[#A8A29E] text-[14px]">
//             =${(parseFloat(inputValue) || 0).toFixed(2)}
//           </span>
//           <button
//             className="bg-[#F74A17] text-white text-[16px] font-bold px-[8px] w-[48px] h-[27px] rounded-[8px] ml-4"
//             onClick={handleMaxClick}
//           >
//             Max
//           </button>
//         </div>

//         {/* Balance and Button */}
//         <div className="flex items-center justify-between w-[100%] md:w-[20%]">
//           <button className="bg-[#151618] h-[48px] w-[100%] text-white px-[20px] rounded-[12px] flex justify-center gap-1 items-center">
//             <Image src={USBD_2} alt="usbd" />
//             <span className={cn("text-[16px] font-medium", fontSpace_Grotesk)}>
//               USBD
//             </span>
//           </button>
//         </div>
//       </div>
//       <div>
//       <Button
//           variant='primary'
//           className='w-full flex justify-center mt-4 items-center'
//           onClick={handleConnectClick}
//           disabled={loading}
//         >
//           {loading ? (
//             <Loader2 size={20} className="animate-spin dark:text-white" />
//           ) : isConnected ? (
//             "Redeem"
//           ) : (
//             "Connect wallet"
//           )}
//         </Button>
//       </div>
//       <SuccessPopup
//                 isOpen={isSuccessOpen}
//                 onClose={() => setIsSuccessOpen(false)}
//                 title="Collateral Redeemed Successfully"
//                 message={`An amount of ${expectedvaule} Collateral has been successfully Redeemed. Sit back, relax, and reap the benefits of your effort.`}
//                 actions={
//                   <div className="w-[100%] flex flex-col gap-2">
//                     <Link
//                       className={cn(
//                         "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
//                         fontSpace_Grotesk.className
//                       )}
//                       href={{ pathname: "/vaults/" }}
//                     >
//                       Redeem more Collateral
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
//   );
// };

// export default Redeem;

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import React, { useEffect, useState } from "react";
import USBD_2 from "@/assets/icons/USBD_2.svg";
import LSTS_1 from "@/assets/icons/LSTS_1.svg";
import LSTS_2 from "@/assets/icons/LSTS_2.svg";
import LSTS_3 from "@/assets/icons/LSTS_3.svg";
import LSTS_4 from "@/assets/icons/LSTS_4.svg";
import Image from "next/image";
import { useAccount, useBalance, useChainId } from "wagmi";
import { useVaultContext } from "@/lib/contextFile";
import chains from "@/scripts/chains";
import contracts from "@/scripts/contracts";
import { Loader2 } from "lucide-react";
import { redeemColletral } from "@/scripts/mintUSBD";
import { ethers } from "ethers-old";
import { fetchRedeemFee } from "@/scripts/redeembreakdown";
import SuccessPopup from "@/components/ui/SuccessPopup";
import Link from "next/link";
import ErrorPopup from "@/components/ui/ErrorPopup";
import WalletModal from "@/components/WalletModal/WalletModal";
const fontMonrope = Manrope({ subsets: ["latin"] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });
let provider: any;

const Redeem = () => {
  const [selectedCollateral, setSelectedCollateral] = useState<string | null>(
    null
  );

  const [inputValue, setInputValue] = useState("");
  const chain = useChainId();
  const connectedNetwork = chains[chain];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcConnectedNetwork, setBtcConnectedNetwork] = useState<string | null>(
    null
  );

  const [manualWalletAddress, setManualWalletAddress] = useState<string | null>(
    null
  );

  const { isConnected, address } = useAccount();
  const usbdAddress =
    contracts[connectedNetwork.NetworkName].SPPools[0].tokenAddress;
  const [usbdBalance, setUsbdBalance] = useState("0 USBD");
  const [unformatedUsbdBalance, setUnformatedUsbdBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [troveManagerAddress, setTroveMangerAddress] = useState("");
  const [helpercontractAddress, sethelpercontractAddress] = useState("");
  const {
    lstPrice,
    setredeemFee,
    setredeemFeeAmount,
    setexpectedvaule,
    expectedvaule,
  } = useVaultContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [txLink, settxLink] = useState<string>("");

  const formatUSBD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);

  const { data: balance } = useBalance({
    address,
    token: usbdAddress as any,
    query: {
      enabled: isConnected,
    },
  });

  useEffect(() => {
    if (balance) {
      setUnformatedUsbdBalance(Number(balance.value) / 10 ** 18);
      const formattedBalance = formatUSBD(Number(balance.value) / 10 ** 18);
      setUsbdBalance(formattedBalance);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const vaultParam = urlParams.get("vault");
    if (vaultParam !== null) {
      setTroveMangerAddress(vaultParam);
      if (!isConnected) {
        provider = null;
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      }
    }
  }, [balance]);

  const handleMaxClick = () => {
    setInputValue((unformatedUsbdBalance - 200).toFixed(2));
    handleCalculateCollateralRecived((unformatedUsbdBalance - 200).toFixed(2));
  };

  const fetchRedeemFeeData = async () => {
    const signer = provider.getUncheckedSigner();
    const data = await fetchRedeemFee(troveManagerAddress, signer);
    setredeemFee(data);
    // setredeemFeeAmount(data.amount);
  };

  useEffect(() => {
    if (isConnected) {
      fetchRedeemFeeData();
    }
  });

  const handleCalculateCollateralRecived = (value: any) => {
    const expectedAmount = (value / lstPrice).toFixed(4);
    setInputValue(value);
    setexpectedvaule(expectedAmount);
  };

  const handleConnectClick = async () => {
    if (isConnected) {
      setLoading(true);
      try {
        await redeem();
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

  const redeem = async () => {
    try {
      console.log("LST Price ==", lstPrice);

      const signer = provider.getUncheckedSigner();
      const explorerLink = contracts[connectedNetwork.NetworkName].explorerLink;
      const tx = await redeemColletral(
        contracts[connectedNetwork.NetworkName].multiCollateralHintHelpers,
        troveManagerAddress,
        inputValue,
        lstPrice,
        signer
      );
      settxLink(`${explorerLink}${tx}`);
      setIsSuccessOpen(true);
      console.log("Transaction of redeem Colletral", tx);
    } catch (e) {
      setIsErrorOpen(true);
      console.error("Error:", e);
      return e;
    }
  };

  // const collaterals = [
  //   // { id: "wsETH", label: "wsETH", src: LSTS_2 }, // Replace with real icons
  //   // { id: "rETH", label: "rETH", src: LSTS_3 },
  //   // { id: "cbETH", label: "cbETH", src: LSTS_1 },
  //   // { id: "sfrxETH", label: "sfrxETH", src: LSTS_4 },
  // ];

  return (
    <div className=" ">
      {/* Title */}
      {/* <div className="mb-4">
        <h3
          className={cn(
            "text-[14px] font-semibold text-[#151618]",
            fontMonrope.className
          )}
        >
          Select a collateral to redeem for:
        </h3>
      </div> */}

      {/* Collateral Options */}
      {/* <div className="flex items-center justify-center lg:justify-between flex-wrap gap-5 lg:gap-0 space-x-5 lg:space-x-10 mb-6">
        {collaterals.map((collateral) => (
          <button
            key={collateral.id}
            onClick={() => setSelectedCollateral(collateral.id)}
            className="flex items-center  rounded-lg "
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-1 ${
                selectedCollateral === collateral.id
                  ? "border-[#F74A17]"
                  : "border-[#8C8FA133]"
              }`}
            >
              {selectedCollateral === collateral.id && (
                <div className="w-3 h-3 bg-[#F74A17] rounded-full" />
              )}
            </div> */}

      {/* Label and Icon */}
      {/* <div className="flex items-center space-x-2">
              <Image src={collateral.src} alt="icon" className="size-[20px]" />
              <span className="text-black">{collateral.label}</span>
            </div>
          </button>
        ))} */}
      {/* </div> */}

      {/* Redeem Section */}
      <div className="mb-4 flex justify-between">
        <h4
          className={cn(
            "text-[14px] font-semibold text-[#151618] dark:text-[#FFFFFF]",
            fontMonrope.className
          )}
        >
          Enter amount of <span className="font-semibold">{"USBD"}</span>
        </h4>
        <div
          className={cn(
            "text-[14px] font-semibold text-[#A8A29E] leading-[20.16px]",
            fontMonrope.className
          )}
        >
          Balance{" "}
          <span
            className={cn(
              "text-[#151618] dark:text-[#FFFFFF] font-bold",
              fontSpace_Grotesk
            )}
          >
            {usbdBalance}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 w-[100%]">
        {/* Input Field */}
        <div className="flex items-center justify-between bg-[#F5F5F4] dark:bg-[#302F2E] rounded-[12px] px-2 w-[100%] md:w-[77%]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleCalculateCollateralRecived(e.target.value)}
            placeholder="0.00"
            className="bg-transparent h-[48px] text-[14px] text-[#A8A29E] dark:bg-[#302F2E] focus:outline-none"
          />
          <span className="text-[#A8A29E] text-[14px]">
            =${(parseFloat(inputValue) || 0).toFixed(2)}
          </span>
          <button
            className="bg-[#F74A17] text-white text-[16px] font-bold px-[8px] w-[48px] h-[27px] rounded-[8px] ml-4"
            onClick={handleMaxClick}
          >
            Max
          </button>
        </div>

        {/* Balance and Button */}
        <div className="flex items-center justify-between w-[100%] md:w-[20%]">
          <button className="bg-[#151618] h-[48px] w-[100%] text-white px-[20px] rounded-[12px] flex justify-center gap-1 items-center">
            <Image src={USBD_2} alt="usbd" />
            <span className={cn("text-[16px] font-medium", fontSpace_Grotesk)}>
              USBD
            </span>
          </button>
        </div>
      </div>
      <div>
        <Button
          variant="primary"
          className="w-full flex justify-center mt-4 items-center"
          onClick={handleConnectClick}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin dark:text-white" />
          ) : isConnected ? (
            "Redeem"
          ) : (
            "Connect wallet"
          )}
        </Button>
      </div>
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Collateral Redeemed Successfully"
        message={`An amount of ${expectedvaule} Collateral has been successfully Redeemed. Sit back, relax, and reap the benefits of your effort.`}
        actions={
          <div className="w-[100%] flex flex-col gap-2">
            <Link
              className={cn(
                "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                fontSpace_Grotesk.className
              )}
              href={{ pathname: "/vaults/" }}
            >
              Redeem more Collateral
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
  );
};

export default Redeem;
