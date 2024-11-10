import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import algosdk from 'algosdk'
import { CONFIG } from '@/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string, length: number = 6): string {
  if (!address) return ''
  if (address.length <= length * 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)
}

const algodClient = new algosdk.Algodv2(
  '',
  CONFIG.APIS.VOI_NODE,
  ''
)

export async function getVoiBalance(address: string): Promise<number> {
  try {
    const accountInfo = await algodClient.accountInformation(address).do()
    // Convert bigint to number and then divide by 1_000_000
    return Number(accountInfo.amount) / 1_000_000
  } catch (err) {
    console.error('Error fetching VOI balance:', err)
    return 0
  }
}