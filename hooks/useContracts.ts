"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ContentRegistryABI, RoyaltyCalculatorABI, UsageTrackingABI } from './contractAbis';

// Contract addresses
const config = {
  contracts: {
    contentRegistry: '0x0000000000000000000000000000000000000000', // Replace with actual address
    royaltyCalculator: '0x0000000000000000000000000000000000000000', // Replace with actual address
    usageTracking: '0x0000000000000000000000000000000000000000', // Replace with actual address
  }
};

export const useContracts = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
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
        // Check if window is defined (browser environment)
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
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
        }
      } catch (error) {
        console.error('Error initializing provider:', error);
      }
    };
    
    initProvider();
  }, []);

  // Connect wallet function
  const connect = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
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
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
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