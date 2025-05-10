import { ethers } from 'ethers';

export class EthereumIntegration {
  constructor(provider) {
    this.provider = provider;
    this.chainId = 1;
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

  async getTransactionReceipt(txHash) {
    try {
      return await this.provider.getTransactionReceipt(txHash);
    } catch (error) {
      console.error("Failed to get receipt:", error);
      return null;
    }
  }

  async getCurrentBlock() {
    try {
      return await this.provider.getBlockNumber();
    } catch (error) {
      console.error("Failed to get block:", error);
      return null;
    }
  }
}