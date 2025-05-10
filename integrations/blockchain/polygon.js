import { ethers } from 'ethers';

export class PolygonIntegration {
  constructor(provider) {
    this.provider = provider;
    this.chainId = 137;
  }

  async getBalance(address) {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error("Failed to get balance:", error);
      return null;
    }
  }

  async getGasPrice() {
    try {
      const gasPrice = await this.provider.getGasPrice();
      return ethers.utils.formatUnits(gasPrice, 'gwei');
    } catch (error) {
      console.error("Failed to get gas price:", error);
      return null;
    }
  }

  async getTransactionCount(address) {
    try {
      return await this.provider.getTransactionCount(address);
    } catch (error) {
      console.error("Failed to get tx count:", error);
      return null;
    }
  }
}