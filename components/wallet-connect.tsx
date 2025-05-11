"use client"

import { Button } from "@/components/ui/button"
import { useContracts } from "@/hooks/useContracts"

export function WalletConnect() {
  const { isConnected, address, connect, disconnect } = useContracts()

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-4">
          <div className="hidden md:block overflow-hidden text-sm font-medium text-white">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="border-purple-700 text-white hover:bg-purple-700/20"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          variant="default"
          size="sm"
          onClick={connect}
          className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  )
} 