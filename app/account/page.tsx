"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundParticles } from "@/components/background-particles"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, FileCheck } from "lucide-react"
import { useContracts } from "@/hooks/useContracts"

interface Content {
  id: number
  contentURI: string
  metadataURI: string
  contentType: number
  timestamp: number
}

export default function AccountPage() {
  const { isConnected, address, contracts, connect } = useContracts()
  const [userContent, setUserContent] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const contentTypes = ['Image', 'Audio', 'Video', 'Text', 'Model', 'Other']

  useEffect(() => {
    const loadUserContent = async () => {
      if (!isConnected || !address || !contracts.contentRegistry) return
      
      try {
        setIsLoading(true)
        setError(null)
        
        // Get content IDs owned by the connected wallet
        const contentIds = await contracts.contentRegistry.getContentByCreator(address)
        
        // Fetch details for each content ID
        const contentDetails = await Promise.all(
          contentIds.map(async (id: any) => {
            const content = await contracts.contentRegistry.getContent(id)
            return {
              id: Number(id.toString()),
              contentURI: content[0],
              metadataURI: content[1],
              contentType: Number(content[2]),
              timestamp: Number(content[4])
            }
          })
        )
        
        setUserContent(contentDetails)
      } catch (err: any) {
        console.error("Error loading user content:", err)
        setError(err.message || "Failed to load your content")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserContent()
  }, [isConnected, address, contracts.contentRegistry])

  return (
    <div className="relative min-h-screen py-20">
      <BackgroundParticles />

      <div className="container max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="text-[#8B5CF6] hover:underline flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-4 text-white">My Account</h1>
        <p className="text-center text-slate-300 mb-10">
          View and manage your registered content
        </p>

        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isConnected ? (
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="pt-6 text-center">
              <p className="mb-4 text-slate-300">Connect your wallet to view your content</p>
              <Button 
                onClick={connect} 
                className="bg-[#8B5CF6] hover:bg-[#7c3aed]"
              >
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Connected Wallet</p>
                    <p className="font-mono text-white">{address}</p>
                  </div>
                  <Link href="/register">
                    <Button className="bg-[#8B5CF6] hover:bg-[#7c3aed]">
                      Register New Content
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6 text-white">Your Registered Content</h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
              </div>
            ) : userContent.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-12 text-center">
                  <p className="text-slate-300 mb-4">You haven't registered any content yet</p>
                  <Link href="/register">
                    <Button className="bg-[#8B5CF6] hover:bg-[#7c3aed]">
                      Register Your First Content
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {userContent.map((content) => (
                  <Card key={content.id} className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-[#8B5CF6]" />
                        <CardTitle className="text-white">Content #{content.id}</CardTitle>
                      </div>
                      <CardDescription className="text-slate-300">
                        Type: {contentTypes[content.contentType]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-slate-400">Content URI</p>
                          <p className="text-white break-all">{content.contentURI}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Metadata URI</p>
                          <p className="text-white break-all">{content.metadataURI}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="text-sm text-slate-400">
                        Registered on {new Date(content.timestamp * 1000).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}