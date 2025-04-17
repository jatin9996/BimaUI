'use client';
import React, { useEffect } from 'react';
import { Copy, LayoutDashboard, LogOut } from 'lucide-react';

interface DropdownProps {
  displayedAddress: string | null;
  onCopyAddress: () => void;
  onDashboardClick: () => void;
  onDisconnect: () => void;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  displayedAddress,
  onCopyAddress,
  onDashboardClick,
  onDisconnect,
  showDropdown,
  setShowDropdown,
}) => {
  const [copied, setCopied] = React.useState(false);
  useEffect(() => {
    setCopied(false);
  }, []);
  return (
    <>
      {showDropdown && (
        <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20'>
          <ul>
            <li
              className='px-4 py-2 flex gap-2 text-green-600 font-semibold hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                onCopyAddress();
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                  setShowDropdown(false);
                }, 1000);
              }}>
              <Copy />
              {copied ? 'Copied' : 'Copy Address'}
            </li>
            {/* <li
              className="px-4 py-2 flex gap-2 text-gray-600 font-semibold hover:bg-gray-100 cursor-pointer"
              onClick={onDashboardClick}
            >
              <LayoutDashboard />
              Dashboard
            </li> */}
            <li
              className='px-4 py-2 flex gap-2 text-red-600 font-semibold hover:bg-gray-100 cursor-pointer'
              onClick={onDisconnect}>
              <LogOut />
              Disconnect
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
