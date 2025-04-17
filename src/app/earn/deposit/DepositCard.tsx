import USBD from "@/assets/images/tokenImg/bmBTC.png";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Manrope, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useConnectWallet } from "@web3-onboard/react";
import {
  depositUSBD,
  getUSBDBalance,
  WithdrawalUSBD,
} from "@/scripts/mintUSBD";
import contracts from "@/scripts/contracts";
// import {pools} from "@/scripts/stabilityPools";
import { ethers } from "ethers-old";
import { useAccount, useChainId } from "wagmi";
import { Loader2 } from "lucide-react";
import { parseEther } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import chains from "@/scripts/chains";
import networks from "@/scripts/contracts";
import { getPoolDeposited } from "@/scripts/getStabilityPoolDeposit";
import InformationSection from "./InformationSection";
import SuccessPopup from "@/components/ui/SuccessPopup";
import ErrorPopup from "@/components/ui/ErrorPopup";
import WalletModal from "@/components/WalletModal/WalletModal";

const inter = Manrope({ subsets: ["latin"] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export const LargeCard = () => {
  const [amount, setAmount] = useState(0);
  const [usbdBalance, setUSBDBalance] = useState("0.00");
  const [poolAddress, setPoolAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [txLink, settxLink] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [network, setNetwork] = useState("Bitlayer");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcConnectedNetwork, setBtcConnectedNetwork] = useState<string | null>(
    null
  );

  const [manualWalletAddress, setManualWalletAddress] = useState<string | null>(
    null
  );

  const { isConnected, address } = useAccount();
  const chain = useChainId();
  const [poolBalance, setPoolBalance] = useState("0.00");
  let provider: any;

  const deposited = () => toast.success("Deposited successfully!!");
  const ErrorInDeposite = () => toast.error("Error occured!!");
  const withdrawn = () => toast.success("Withdrawn successfully!!");

  // console.log("Amount in ethers:", ethers.utils.formatEther(amount));
  const handleConnectClick = async () => {
    if (isConnected) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Provider", provider);
      const tx = await handleDeposit();
    } else {
      // Wallet is not connected, open the wallet modal
      setIsModalOpen(true);
    }
  };

  const handleWithdrawClick = async () => {
    if (isConnected) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Provider", provider);
      const tx = await withdrawalUSBD();
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

  const handleMaxClick = async () => {
    setAmount(parseFloat(usbdBalance));
  };
  const handleMaxClickPool = async () => {
    setAmount(parseFloat(poolBalance));
  };
  useEffect(() => {
    handleInit();
  }, [isConnected]);

  const handleInit = async () => {
    if (!isConnected) {
      provider = null;
    } else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  };

  useEffect(() => {
    if (isConnected) {
      handleUSBDBalance();
    }
  }, [isConnected]);

  const handleUSBDBalance = async () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const poolAddress = urlParams.get('pool');
    const connectedNetwork = chains[chain];
    setNetwork(connectedNetwork.NetworkName);

    // if (!poolAddress) {
    //   console.log('Pool not found');
    //   return;
    // }
    //   setPoolAddress(poolAddress);
    const signer = provider.getUncheckedSigner();
    const connectedPool = contracts[connectedNetwork.NetworkName].SPPools[0];

    console.log("ConnectedPool -> ", connectedPool);
    setPoolAddress(connectedPool.poolAddress);
    const Balance = (await getUSBDBalance(
      connectedPool?.tokenAddress,
      signer
    )) as string;
    console.log("Balance -> ", Balance);
    const balanceInEther = ethers.utils.formatEther(Balance);
    setUSBDBalance(parseFloat(balanceInEther).toFixed(2));
  };

  const handleDeposit = async () => {
    setLoading(true);
    const signer = provider.getUncheckedSigner();
    console.log("Signer -> ", signer);
    const connectedNetwork = chains[chain];
    console.log("connectedNetwork -> ", connectedNetwork);

    const connectedPool = contracts[connectedNetwork.NetworkName].SPPools[0];
    const explorerLink = contracts[connectedNetwork.NetworkName].explorerLink;
    try {
      const tx = await depositUSBD(
        poolAddress,
        connectedPool.tokenAddress,
        signer,
        parseEther(amount.toString())
      );
      deposited();
      settxLink(`${explorerLink}${tx}`);
      setIsSuccessOpen(true);
      setLoading(false);
      return tx;
    } catch (err) {
      ErrorInDeposite();
      setIsErrorOpen(true);
      setLoading(false);
    }
  };

  const withdrawalUSBD = async () => {
    setLoading(true);
    const signer = provider.getUncheckedSigner();
    console.log("Signer -> ", signer);
    const connectedNetwork = chains[chain];
    console.log("connectedNetwork -> ", connectedNetwork);

    const connectedPool = contracts[connectedNetwork.NetworkName].SPPools[0];
    const explorerLink = contracts[connectedNetwork.NetworkName].explorerLink;
    try {
      const tx = await WithdrawalUSBD(
        poolAddress,
        signer,
        parseEther(amount.toString())
      );
      withdrawn();
      settxLink(`${explorerLink}${tx}`);
      setIsSuccessOpen(true);
      setLoading(false);
      return tx;
    } catch (err) {
      ErrorInDeposite();
      setIsErrorOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStabilityPoolBalance();
  }, []);

  const fetchStabilityPoolBalance = async () => {
    try {
      if (!window.ethereum) {
        console.log("WALLET NOT CONNECTED STABILITY pool");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Wallet connected, fetching stability pool balance");
      const networkName = chains[chain].NetworkName;
      const poolAddress = networks[networkName].SPPools[0].poolAddress;
      const balance = await getPoolDeposited(
        provider,
        poolAddress,
        userAddress
      );
      setPoolBalance(balance);
      console.log("Stability Pool Balance:", balance);
    } catch (error) {
      console.error("Error fetching stability pool balance:", error);
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-[#1A1A1A]  rounded-2xl">
      {/* <div
        className={cn(
          inter.className,
          "pb-4 mb-4 border-b border-dashed border-gray-400"
        )}
      >
        <h1 className="text-xl font-semibold dark:text-gray-100">
          Manage USBD Stability Pool
        </h1>
        <span className="text-muted-foreground text-sm font-medium">
          Deposit USBD to earn rewards. During liquidations, your deposit will
          be used to purchase discounted collaterals.{" "}
          <Link href={"/earn"} className="hover:underline text-theme">
            Read more
          </Link>
        </span>
      </div> */}
      <div>
        <Tabs defaultValue="deposit" className="">
          <div className={cn("flex items-center justify-between")}>
            <TabsList className="bg-[#edeef1] dark:bg-[#302F2E] rounded-xl w-full">
              <TabsTrigger value={"deposit"} className="m-0 rounded-xl w-full">
                Deposit
              </TabsTrigger>
              <TabsTrigger value={"withdraw"} className="m-0 rounded-xl w-full">
                Withdraw
              </TabsTrigger>
              {/* <TabsTrigger value={"stake"} className="m-0 rounded-xl w-full">
                Stake
              </TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value="deposit">
            <div
              className={cn(
                inter.className,
                "flex justify-between my-5 font-semibold"
              )}
            >
              <p className="dark:text-gray-100">Deposit USBD</p>
              <p>
                <span className="text-muted-foreground mr-1">Balance</span>
                <span className="dark:text-gray-100">{usbdBalance}</span>
              </p>
            </div>
            <div className="flex justify-between flex-wrap py-1">
              <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px] w-[75%] px-[2%] dark:bg-[#302F2E]">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="rounded-lg font-semibold border-transparent dark:text-gray-100 bg-[#F5F5F4] dark:bg-[#302F2E] flex-grow mr-2"
                  value={amount}
                  onChange={(event: any) => {
                    setAmount(event.target.value);
                  }}
                />

                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground overflow-x-auto text-right w-[30px]">
                    {`=$${amount}`}
                  </span>

                  <Button
                    variant={"primary"}
                    size={"sm"}
                    className="rounded-lg px-2 h-[27px] w-[50px]"
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
                <Image
                  src={USBD}
                  width={20}
                  height={20}
                  alt="Icon"
                  className="mr-2"
                />{" "}
                USBD
              </Button>
            </div>
            <div>
              <Button
                variant={"primary"}
                className=" w-full mt-3"
                onClick={handleConnectClick}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin dark:text-white" />
                ) : isConnected ? (
                  "Deposit"
                ) : (
                  "Connect wallet"
                )}
              </Button>
              <SuccessPopup
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="USBD Deposited Successful"
                message={`An amount of ${amount} USBD has been successfully deposited. Sit back, relax, and reap the benefits of your effort.`}
                actions={
                  <div className="w-[100%] flex flex-col gap-2">
                    <Link
                      className={cn(
                        "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                        fontSpace_Grotesk.className
                      )}
                      href={{ pathname: "/earn" }}
                    >
                      Deposit more USBD
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
          </TabsContent>
          <TabsContent value="withdraw">
            {/* <div className="flex justify-center items-center space-x-2">
              <span>To Base</span>
              <Switch />
              <span>To LP Token</span>
            </div> */}
            <div
              className={cn(
                inter.className,
                "flex justify-between my-5 font-semibold"
              )}
            >
              <p className="dark:text-gray-100">Withdraw USBD</p>
              <p>
                <span className="text-muted-foreground mr-1"> Balance</span>
                <span className="dark:text-gray-100">{poolBalance}</span>
              </p>
            </div>

            <div className="flex justify-between flex-wrap py-1 font-semibold">
              <div className="flex justify-between items-center bg-[#F5F5F4] rounded-[12px]  w-[75%] px-[2%] dark:bg-[#302F2E]">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="rounded-lg font-semibold border-transparent dark:text-gray-100 bg-[#F5F5F4] dark:bg-[#302F2E]"
                  value={amount}
                  onChange={(event: any) => {
                    setAmount(event.target.value);
                    // handlecalculateUSBDAmount(parseInt(event.target.value));
                  }}
                />

                <div className="flex justify-center items-center space-x-4">
                  <span className="text-muted-foreground overflow-x-auto text-right w-[30px]">{`=$${amount}`}</span>
                  <Button
                    variant={"primary"}
                    size={"sm"}
                    className="rounded-lg px-2 h-[27px] w-[50px]"
                    onClick={handleMaxClickPool}
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
                <Image
                  src={USBD}
                  width={20}
                  height={20}
                  alt="Icon"
                  className="mr-2"
                />{" "}
                USBD
              </Button>
            </div>

            <div>
              <Button
                variant={"primary"}
                className=" w-full mt-3"
                onClick={handleWithdrawClick}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin dark:text-white" />
                ) : isConnected ? (
                  "Withdraw"
                ) : (
                  "Connect wallet"
                )}
              </Button>
              <SuccessPopup
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="USBD Withdrawn Successful"
                message={`An amount of ${amount} USBD has been successfully withdrawn. Sit back, relax, and reap the benefits of your effort.`}
                actions={
                  <div className="w-[100%] flex flex-col gap-2">
                    <Link
                      className={cn(
                        "bg-[#F74A17] text-white text-center text-[16px] px-4 py-2 rounded-[12px] font-medium w-full",
                        fontSpace_Grotesk.className
                      )}
                      href={{ pathname: "/earn/" }}
                    >
                      Withdraw more USBD
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
          </TabsContent>
          <TabsContent value="stake">
            <div
              className={cn(
                inter.className,
                "flex justify-between my-5 font-semibold"
              )}
            >
              <p>Deposit yPRISMA/PRISMA</p>
              <p>
                <span className="text-muted-foreground mr-1">Balance</span>
                <span>0.00</span>
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center font-semibold pb-4">
              <span className="text-muted-foreground pl-4">0.00</span>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-muted-foreground">=$0.0</span>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="rounded-xl bg-black text-white"
                >
                  <Image
                    src={USBD}
                    width={20}
                    height={20}
                    alt="Icon"
                    className="mr-2"
                  />{" "}
                  yPRISMA/PRISMA
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="border-t border-dashed border-[#8C8FA166] mt-5">
        {/* <InformationSection
          minimumLPTokens={0.0}
          minimumLPTokensAfterSlippage={0.0}
          slippageTolerance="0.1%"
          slippageBonus="0.000%"
        /> */}
      </div>
    </div>
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
        className=" bg-slate-300/45 dark:bg-[#302F2E] rounded-md p-2.5 text-black dark:text-white"
      >
        <ChevronLeft />
      </Button>
      <h3 className="text-xl font-semibold">{tokenName}</h3>
    </div>
  );
};
