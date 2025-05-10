import { ethers } from 'ethers';
import { config } from './config';

// Initialize provider
export const getProvider = () => {
  // Always use JsonRpcProvider in test mode
  if (config.testMode) {
    return new ethers.JsonRpcProvider(config.network.url);
  }
  
  // Check if MetaMask is installed
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  // Fallback to JSON-RPC provider
  return new ethers.JsonRpcProvider(config.network.url);
};

// Connect wallet and get signer
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    
    // If in test mode, use the test wallet
    if (config.testMode) {
      // Create wallet from private key
      const wallet = new ethers.Wallet(config.testPrivateKey, provider);
      const address = await wallet.getAddress();
      
      return { provider, signer: wallet, address };
    }
    
    // If using MetaMask, request accounts
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Declare global ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
} 