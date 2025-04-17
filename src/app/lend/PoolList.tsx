import { cn, formatCurrency } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { Manrope, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import btc_icon from '@/assets/icons/btc_icon.svg';

import Image from 'next/image';

const inter = Manrope({ subsets: ['latin'] });
const fontSpace_Grotesk = Space_Grotesk({ subsets: ['latin'] });

export interface Pool {
  id: number;
  name: string;
  marketSize: string;
  apr: number;
  yourLends: number;
  yourBorrow: number;
  src: string;
  src2: string;
  src3: string;
  src4: string;
}

interface PoolListProps {
  pools: any[];
  type: 'supply' | 'borrow';
}

export function PoolList({ pools, type }: PoolListProps) {
  return (
    <div className='space-y-4 '>
      <div
        className={cn(
          'flex justify-around  items-center py-3 text-[14px] font-semibold leading-[20.16px] text-[#A8A29E]',
          inter.className
        )}>
        <span>Market Size</span>
        <span>APR</span>
        <span className='flex items-center gap-1'>
          {type === 'supply' ? 'Your Lends' : 'Your Borrow'}
          <ChevronsUpDown />
        </span>
      </div>
      {pools.map((pool) => (
        <Link
          key={pool.id}
          href={`/lending/${pool.id}`}
          className='block hover:bg-gray-50 rounded-lg transition-colors duration-200'>
          <div className='grid grid-cols-1 md:grid-cols-3 items-center p-4 gap-4'>
            <div className='flex items-center gap-2'>
              <img
                src='/_next/static/media/imgicon.png'
                alt={pool.name}
                className='w-8 h-8 rounded-full'
              />
              <div>
                <p className={cn('font-semibold text-[16px]', inter.className)}>
                  {pool.debtToken}
                </p>
                <div className='flex items-center gap-2'>
                  <img
                    src='/_next/static/media/bitcoin.png'
                    alt='Icon'
                    className='w-[16px] h-[16px]'
                  />
                  <p className={cn('text-sm text-gray-500', inter.className)}>
                    ${pool.marketSize}
                  </p>
                </div>
              </div>
            </div>
            <span className={cn('font-semibold text-[16px]', inter.className)}>
              {pool.interest}
            </span>
            <div className='flex items-center gap-2'>
              <img
                src='/_next/static/media/imgsui.png'
                alt={pool.name}
                className='w-8 h-8 rounded-full'
              />
              <span className={cn('text-sm text-gray-500', inter.className)}>
                {formatCurrency(
                  type === 'supply' ? pool.yourLends : pool.yourBorrow
                )}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
