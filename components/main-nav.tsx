"use client"

import Link from "next/link"
import { useContracts } from "@/hooks/useContracts"
import { WalletConnect } from "./wallet-connect"

export function MainNav() {
  const { isConnected } = useContracts()

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
        How It Works
      </Link>

      <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
        Register Content
      </Link>

      {isConnected && (
        <>
          <Link href="#royalties" className="text-sm font-medium transition-colors hover:text-primary">
            Royalties
          </Link>
          <Link href="#licenses" className="text-sm font-medium transition-colors hover:text-primary">
            Licenses
          </Link>
          <Link href="/account" className="text-sm font-medium transition-colors hover:text-primary">
            My Account
          </Link>
        </>
      )}
    </nav>
  )
}

export function AuthButtons() {
  return <WalletConnect />
} 