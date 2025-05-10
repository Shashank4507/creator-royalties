import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, getProvider } from '../connectors';
import config from '../config';
import { ContentRegistryABI, RoyaltyCalculatorABI, UsageTrackingABI } from '../contracts/abis';

export const useContracts = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contracts, setContracts] = useState<{
    contentRegistry: ethers.Contract | null;
    royaltyCalculator: ethers.Contract | null;
    usageTracking: ethers.Contract | null;
  }>({
    contentRegistry: null,
    royaltyCalculator: null,
    usageTracking: null,
  });

  // Initialize provider on component mount
  useEffect(() => {
    const initProvider = async () => {
      try {
        const provider = getProvider();
        setProvider(provider);
        
        // Initialize contracts with provider
        const contentRegistry = new ethers.Contract(
          config.contracts.contentRegistry,
          ContentRegistryABI,
          provider
        );
        
        const royaltyCalculator = new ethers.Contract(
          config.contracts.royaltyCalculator,
          RoyaltyCalculatorABI,
          provider
        );
        
        const usageTracking = new ethers.Contract(
          config.contracts.usageTracking,
          UsageTrackingABI,
          provider
        );
        
        setContracts({
          contentRegistry,
          royaltyCalculator,
          usageTracking
        });
      } catch (error) {
        console.error('Error initializing provider:', error);
      }
    };
    
    initProvider();
  }, []);

  // Connect wallet function
  const connect = async () => {
    try {
      const { provider, signer, address } = await connectWallet();
      setProvider(provider);
      setSigner(signer);
      setAddress(address);
      setIsConnected(true);
      
      // Reinitialize contracts with signer
      const contentRegistry = new ethers.Contract(
        config.contracts.contentRegistry,
        ContentRegistryABI,
        signer
      );
      
      const royaltyCalculator = new ethers.Contract(
        config.contracts.royaltyCalculator,
        RoyaltyCalculatorABI,
        signer
      );
      
      const usageTracking = new ethers.Contract(
        config.contracts.usageTracking,
        UsageTrackingABI,
        signer
      );
      
      setContracts({
        contentRegistry,
        royaltyCalculator,
        usageTracking
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setIsConnected(false);
    setSigner(null);
    setAddress(null);
    
    // Reinitialize contracts with provider
    if (provider) {
      const contentRegistry = new ethers.Contract(
        config.contracts.contentRegistry,
        ContentRegistryABI,
        provider
      );
      
      const royaltyCalculator = new ethers.Contract(
        config.contracts.royaltyCalculator,
        RoyaltyCalculatorABI,
        provider
      );
      
      const usageTracking = new ethers.Contract(
        config.contracts.usageTracking,
        UsageTrackingABI,
        provider
      );
      
      setContracts({
        contentRegistry,
        royaltyCalculator,
        usageTracking
      });
    }
  };

  return {
    provider,
    signer,
    address,
    isConnected,
    contracts,
    connect,
    disconnect
  };
}; 