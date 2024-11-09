import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ChainAsset } from "@/types"

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

export async function fetchTokenBalance(address: string): Promise<number> {
  try {
    // TODO: Implement actual chain query
    return 0
  } catch (error) {
    console.error('Error fetching token balance:', error)
    return 0
  }
}

export async function fetchARC200Balances(address: string): Promise<ChainAsset[]> {
  try {
    // TODO: Implement ARC200 token query
    return []
  } catch (error) {
    console.error('Error fetching ARC200 balances:', error)
    return []
  }
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}