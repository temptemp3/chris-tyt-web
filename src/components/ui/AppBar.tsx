'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Modal } from "./modal"
import { useWallet, WalletId } from '@txnlab/use-wallet-react'
import { fetchVoiName, formatAddress, getVoiBalance } from '@/lib/utils'

export function AppBar() {
  const { wallets, activeAccount } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [voiName, setVoiName] = useState<string | null>(null)
  const [ctytBalance, setCtytBalance] = useState<number | null>(null)

  // Fetch the .voi name and CTYT balance for the connected wallet
  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (typeof window === 'undefined') return; // Ensure this runs only on the client

      if (activeAccount?.address) {
        // Fetch .voi name
        const name = await fetchVoiName(activeAccount.address)
        setVoiName(name)

        // Fetch CTYT balance (using the provided utility)
        const balance = await getVoiBalance(activeAccount.address)
        setCtytBalance(balance)
      }
    }
    fetchWalletDetails()
  }, [activeAccount?.address])

  const handleConnect = async (walletId: WalletId) => {
    const wallet = wallets.find((w) => w.id === walletId)
    if (wallet) {
      try {
        await wallet.connect()
        setIsModalOpen(false) // Close the modal after connecting
      } catch (error) {
        console.error('Failed to connect:', error)
      }
    } else {
      console.error('Wallet not found')
    }
  }

  const handleDisconnect = async () => {
    const wallet = wallets.find((w) => w.id === WalletId.KIBISIS) // Ensure Kibisis is used
    if (wallet) {
      try {
        await wallet.disconnect()
        setVoiName(null)
        setCtytBalance(null)
      } catch (error) {
        console.error('Failed to disconnect:', error)
      }
    } else {
      console.error('Kibisis wallet not found')
    }
  }

  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="text-lg font-bold">Chris Thank You Tokens</div>
      {activeAccount ? (
        <div className="flex items-center gap-4">
          <div>
            <span className="block text-sm font-medium">
              {voiName || formatAddress(activeAccount.address, 8)} {/* Show .voi name or shortened address */}
            </span>
            <span className="block text-xs text-gray-300">
              CTYT Balance: {ctytBalance !== null ? `${ctytBalance.toFixed(2)} CTYT` : 'Loading...'}
            </span>
          </div>
          <Button
            onClick={handleDisconnect} // Use the updated disconnect logic
            className="bg-red-500 hover:bg-red-600"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
          Connect Wallet
        </Button>
      )}

      {/* Modal for Wallet Options */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Connect Wallet</h2>
            <div className="space-y-4">
              <Button
                onClick={() => handleConnect(WalletId.KIBISIS)}
                className="w-full bg-gray-700 hover:bg-gray-800"
              >
                Connect Kibisis Wallet
              </Button>
              {/* Add more wallet options here if needed */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}