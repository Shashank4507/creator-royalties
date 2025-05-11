"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useContracts } from "@/hooks/useContracts"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { isConnected, address, connect, disconnect } = useContracts()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-slate-800">
        <nav className="flex flex-col gap-4 mt-8">
          {isConnected ? (
            <div className="bg-slate-800 rounded-md p-4 mb-2">
              <div className="text-sm text-slate-400 mb-1">Connected Wallet</div>
              <div className="font-mono text-white mb-3 break-all">
                {address}
              </div>
              <Button 
                className="w-full bg-slate-700 hover:bg-slate-600"
                onClick={() => {
                  disconnect()
                  setOpen(false)
                }}
              >
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-[#8B5CF6] hover:bg-[#7c3aed] mb-2"
              onClick={() => {
                connect()
                setOpen(false)
              }}
            >
              Connect Wallet
            </Button>
          )}

          <div className="border-t border-slate-800 my-2 pt-2"></div>

          <Link
            href="#how-it-works"
            className="text-lg font-medium py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/register"
            className="text-lg font-medium py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Register Content
          </Link>
          
          {isConnected && (
            <>
              <Link
                href="#royalties"
                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setOpen(false)}
              >
                Royalties
              </Link>
              <Link
                href="#licenses"
                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setOpen(false)}
              >
                Licenses
              </Link>
              <Link
                href="/account"
                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setOpen(false)}
              >
                My Account
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
} 