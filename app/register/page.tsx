"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundParticles } from "@/components/background-particles"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { useContracts } from "@/hooks/useContracts"
import { ethers } from "ethers"

export default function RegisterContent() {
  // Use the contracts hook for blockchain functionality
  const { isConnected, address, contracts, connect } = useContracts();

  // Form state
  const [contentURI, setContentURI] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [contentType, setContentType] = useState('0'); // Default to Image
  const [royaltyPercentage, setRoyaltyPercentage] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRegisteredId, setLastRegisteredId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Content types mapping
  const contentTypes = ['Image', 'Audio', 'Video', 'Text', 'Model', 'Other'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!isConnected || !contracts.contentRegistry) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    
    if (!contentURI || !metadataURI) {
      setErrorMessage('Both Content URI and Metadata URI are required');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Register content
      const tx = await contracts.contentRegistry.registerContent(
        contentURI,
        metadataURI,
        Number(contentType)
      );
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      
      // Extract the content ID from the event
      const event = receipt.logs
        .filter((log: any) => contracts.contentRegistry?.interface.parseLog(log))
        .map((log: any) => contracts.contentRegistry?.interface.parseLog(log))
        .find((event: any) => event?.name === 'ContentRegistered');
      
      if (event && event.args) {
        // Content ID is the first argument
        setLastRegisteredId(Number(event.args[0]));
      }
      
      // If royalty percentage is set and different from default, update it
      if (royaltyPercentage && royaltyPercentage !== '10' && contracts.royaltyCalculator) {
        if (lastRegisteredId !== null) {
          // Set royalty percentage for the newly registered content
          const royaltyTx = await contracts.royaltyCalculator.setRoyaltyPercentage(
            lastRegisteredId,
            ethers.utils.parseUnits(royaltyPercentage, 0)
          );
          
          await royaltyTx.wait();
        }
      }
      
      // Clear the form after successful registration
      setContentURI('');
      setMetadataURI('');
      setContentType('0');
      setRoyaltyPercentage('10');
    } catch (error: any) {
      console.error('Error registering content:', error);
      setErrorMessage(error.message || 'Error registering content. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-20">
      <BackgroundParticles />

      <div className="container max-w-2xl">
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

        <h1 className="text-3xl font-bold text-center mb-4 text-white">Register Your Content</h1>
        <p className="text-center text-slate-300 mb-10">
          Secure your digital creations on the blockchain in just a few steps
        </p>

        {errorMessage && (
          <Alert className="mb-6 bg-red-900/20 border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {lastRegisteredId !== null && (
          <Alert className="mb-6 bg-green-900/20 border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Content Registered Successfully!</AlertTitle>
            <AlertDescription>Your content has been registered with ID: {lastRegisteredId}</AlertDescription>
          </Alert>
        )}

        <Card className="shadow-md bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Content Details</CardTitle>
            <CardDescription className="text-slate-300">
              Fill in the information about your digital content
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isConnected ? (
              <div className="mb-6 text-center">
                <p className="mb-4 text-slate-300">Connect your wallet to register content</p>
                <Button 
                  onClick={connect} 
                  className="bg-[#8B5CF6] hover:bg-[#7c3aed]"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleRegister}>
                <div className="text-sm text-slate-300 mb-4 p-3 bg-slate-700/50 rounded-md">
                  Connected Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>

                <div className="space-y-2">
                  <label htmlFor="content-uri" className="text-sm font-medium text-slate-200">
                    Content URI
                  </label>
                  <Input
                    id="content-uri"
                    value={contentURI}
                    onChange={(e) => setContentURI(e.target.value)}
                    placeholder="https://example.com/my-content.jpg"
                    className="h-12 bg-slate-900 border-slate-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="metadata-uri" className="text-sm font-medium text-slate-200">
                    Metadata URI
                  </label>
                  <Input
                    id="metadata-uri"
                    value={metadataURI}
                    onChange={(e) => setMetadataURI(e.target.value)}
                    placeholder="https://example.com/my-content-metadata.json"
                    className="h-12 bg-slate-900 border-slate-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content-type" className="text-sm font-medium text-slate-200">
                    Content Type
                  </label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="h-12 bg-slate-900 border-slate-700 text-white">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {contentTypes.map((type, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="royalty-percentage" className="text-sm font-medium text-slate-200">
                    Royalty Percentage
                  </label>
                  <div className="relative">
                    <Input
                      id="royalty-percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={royaltyPercentage}
                      onChange={(e) => setRoyaltyPercentage(e.target.value)}
                      className="h-12 bg-slate-900 border-slate-700 text-white pr-8"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#8B5CF6] hover:bg-[#7c3aed] h-12" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : 'Register Content'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 