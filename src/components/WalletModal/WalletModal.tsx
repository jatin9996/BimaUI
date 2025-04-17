import { FC, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useWallet } from '@/components/btc-wallets-ui/leather_wallet/WalletContext';
import { ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Wallet icons
import leatherIcon from '@/assets/icons/leather.png';
import xverseIcon from '@/assets/icons/xverse.png';
import asignaIcon from '@/assets/icons/asigna.png';
import unisatIcon from '@/assets/icons/unisat.png';
import rainbowIcon from '@/assets/icons/rainbow.svg';

// Wallet connectors (functions)
import {
  connectAsignaWallet,
  connectXverseWallet,
  connectUnisatWallet,
} from '@/scripts/btc-wallets';

// Define wallet configuration
const walletConfig = {
  btcWallets: [
    {
      name: 'Leather',
      icon: leatherIcon,
      onClick: async (
        setWalletAddress: any,
        setManualAddress: any,
        onClose: any
      ) => {
        if (window.LeatherProvider) {
          try {
            const response = await window.LeatherProvider.request(
              'getAddresses'
            );
            const addresses = response.result.addresses;
            const btcAddress = addresses.find(
              (address: { symbol: string }) => address.symbol === 'BTC'
            );
            if (btcAddress) {
              setWalletAddress(btcAddress.address);
              setManualAddress(btcAddress.address);
              onClose();
              return {
                address: btcAddress.address,
                network: 'Leather Mainnet',
              };
            }
          } catch (error) {
            console.error('Error connecting to Leather Wallet:', error);
            throw error;
          }
        } else {
          toast.error(
            <div className='text-gray-500 text-[14px]'>
              <p className='font-bold text-[18px] text-gray-800 font-sans'>
                Wallet Not Found
              </p>
              Leather Wallet is not installed. Please install{' '}
              <a
                href='https://leather.io/install-extension'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline cursor-pointer'>
                Leather Wallet
              </a>
            </div>
          );
        }
      },
    },
    { name: 'Xverse', icon: xverseIcon, onClick: connectXverseWallet },
    { name: 'Unisat', icon: unisatIcon, onClick: connectUnisatWallet },
    { name: 'Asigna', icon: asignaIcon, onClick: connectAsignaWallet },
  ],
  evmWallets: [
    { name: 'RainbowKit', icon: rainbowIcon, isRainbowKit: true },
    // Add more EVM wallets here
  ],
};

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  setManualAddress: (address: string | null) => void;
  setConnectedNetwork: (network: string | null) => void;
}

const WalletModal: FC<WalletModalProps> = ({
  isOpen,
  onClose,
  setManualAddress,
  setConnectedNetwork,
}) => {
  const { setWalletAddress } = useWallet();
  const [showAllBTC, setShowAllBTC] = useState(false);
  const [showAllEVM, setShowAllEVM] = useState(false);

  const handleToggleBTC = () => {
    setShowAllBTC(!showAllBTC);
    setShowAllEVM(false);
  };

  const handleToggleEVM = () => {
    setShowAllEVM(!showAllEVM);
    setShowAllBTC(false);
  };

  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}>
        <Dialog
          as='div'
          className='relative z-30'
          onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-100'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-100'>
            <div className='fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto '>
            <div className='flex items-center justify-center min-h-full p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-[300px] absolute right-12 top-[12.5%] p-4 bg-white rounded-2xl shadow-xl '>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-800'>
                    Select a Wallet
                  </Dialog.Title>

                  <div className='mt-6'>
                    {/* BTC Wallets Section */}

                    {/* EVM Wallets Section */}
                    {!showAllBTC && (
                      <div>
                        <div className='flex justify-between'>
                          <h4 className='text-md font-medium text-gray-400 mb-2'>
                            MetaMask and More
                          </h4>
                          <ChevronRight
                            className='text-gray-400 cursor-pointer'
                            onClick={handleToggleEVM}
                          />
                        </div>
                        <div
                          className={`grid grid-cols-4 gap-4 ${
                            walletConfig.evmWallets.length > 12
                              ? 'max-h-48 overflow-y-scroll'
                              : ''
                          }`}>
                          {walletConfig.evmWallets
                            .slice(
                              0,
                              showAllEVM ? walletConfig.evmWallets.length : 4
                            )
                            .map((wallet, idx) =>
                              wallet.isRainbowKit ? (
                                <ConnectButton.Custom key={idx}>
                                  {({
                                    account,
                                    chain,
                                    openAccountModal,
                                    openChainModal,
                                    openConnectModal,
                                    authenticationStatus,
                                    mounted,
                                  }) => {
                                    const ready =
                                      mounted &&
                                      authenticationStatus !== 'loading';
                                    const connected =
                                      ready &&
                                      account &&
                                      chain &&
                                      (!authenticationStatus ||
                                        authenticationStatus ===
                                          'authenticated');

                                    return (
                                      <div
                                        {...(!ready && {
                                          'aria-hidden': true,
                                          style: {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                          },
                                        })}>
                                        <div
                                          className='flex flex-col gap-1 items-center justify-center cursor-pointer mt-2 ms-2'
                                          onClick={openConnectModal}>
                                          <Image
                                            src={wallet.icon}
                                            alt={wallet.name}
                                            width={48}
                                            height={48}
                                            className='h-12 w-12 rounded-lg'
                                          />
                                          <button
                                            type='button'
                                            className='text-[14px] text-gray-800 font-semibold'>
                                            {wallet.name}
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </ConnectButton.Custom>
                              ) : (
                                <div
                                  key={idx}
                                  className='flex flex-col items-center'>
                                  <Image
                                    src={wallet.icon}
                                    alt={wallet.name}
                                    width={48}
                                    height={48}
                                    className='h-12 w-12'
                                  />
                                  <span className='mt-2 text-[14px] text-gray-800 font-semibold'>
                                    {wallet.name}
                                  </span>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    )}
                    {!showAllEVM && (
                      <div className='mt-4'>
                        <div className='flex justify-between'>
                          <h4 className='text-md font-medium text-gray-400 mb-2'>
                            BTC Wallets
                          </h4>
                          <ChevronRight
                            className='text-gray-400 cursor-pointer'
                            onClick={handleToggleBTC}
                          />
                        </div>
                        <div
                          className={`grid grid-cols-4 gap-2 pt-4 ${
                            walletConfig.btcWallets.length > 12
                              ? 'max-h-48 overflow-y-scroll'
                              : ''
                          }`}>
                          {walletConfig.btcWallets
                            .slice(
                              0,
                              showAllBTC ? walletConfig.btcWallets.length : 4
                            )
                            .map((wallet, idx) => (
                              <div
                                key={idx}
                                className='flex flex-col items-center cursor-pointer'
                                onClick={async () => {
                                  try {
                                    // Call the wallet connection function with the required arguments
                                    const result = await wallet.onClick(
                                      setWalletAddress,
                                      setManualAddress,
                                      onClose
                                    );

                                    // Ensure the result is valid before accessing properties
                                    if (
                                      result &&
                                      result.address &&
                                      result.network
                                    ) {
                                      setWalletAddress(result.address); // Update address in state/context
                                      setManualAddress(result.address); // Update the manual wallet address
                                      setConnectedNetwork(result.network); // Update the connected network
                                      onClose(); // Close the modal
                                    } else {
                                      console.error(
                                        'Invalid wallet connection result:',
                                        result
                                      );
                                    }
                                  } catch (error) {
                                    console.error(
                                      'Failed to connect to wallet:',
                                      error
                                    );
                                  }
                                }}>
                                <Image
                                  src={wallet.icon}
                                  alt={wallet.name}
                                  width={48}
                                  height={48}
                                  className='h-12 w-12'
                                />
                                <span className='mt-2 text-[14px] text-gray-800 font-semibold'>
                                  {wallet.name}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='mt-6 pt-4 text-center text-sm border-dashed border-t-2 text-gray-500'>
                    By connecting to your wallet, you agree to our{' '}
                    <span className='text-blue-500 cursor-pointer'>
                      Terms of Service
                    </span>{' '}
                    and our{' '}
                    <span className='text-blue-500 cursor-pointer'>
                      Privacy Policy
                    </span>
                    .
                  </div>
                  {/* Include ToastContainer for Toastify */}
                  <ToastContainer
                    position='top-center'
                    toastClassName={() =>
                      'relative flex px-4 py-2 min-h-10 rounded-xl justify-between overflow-hidden bg-white text-black text-[16px] font-semibold'
                    }
                    pauseOnFocusLoss
                    draggable
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WalletModal;
