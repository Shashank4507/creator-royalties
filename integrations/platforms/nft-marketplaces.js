import { ethers } from 'ethers';
import ContentRegistryABI from '../../contracts/ContentRegistry.json';

export class NFTMarketplaceIntegration {
  constructor(provider, contentRegistryAddress) {
    this.provider = provider;
    this.contentRegistry = new ethers.Contract(
      contentRegistryAddress,
      ContentRegistryABI,
      provider
    );
  }

  async verifyContentOwnership(contentId, ownerAddress) {
    try {
      const owner = await this.contentRegistry.ownerOf(contentId);
      return owner.toLowerCase() === ownerAddress.toLowerCase();
    } catch (error) {
      console.error("Ownership verification failed:", error);
      return false;
    }
  }

  async getRoyaltyInfo(contentId, salePrice) {
    try {
      const royaltyInfo = await this.contentRegistry.royaltyInfo(
        contentId,
        salePrice
      );
      return {
        receiver: royaltyInfo.receiver,
        royaltyAmount: royaltyInfo.royaltyAmount.toString()
      };
    } catch (error) {
      console.error("Failed to get royalty info:", error);
      return null;
    }
  }
}import { ethers } from 'ethers';
import ContentRegistryABI from '../../contracts/ContentRegistry.json';

export class NFTMarketplaceIntegration {
  constructor(provider, contentRegistryAddress) {
    this.provider = provider;
    this.contentRegistry = new ethers.Contract(
      contentRegistryAddress,
      ContentRegistryABI,
      provider
    );
  }

  async verifyContentOwnership(contentId, ownerAddress) {
    try {
      const owner = await this.contentRegistry.ownerOf(contentId);
      return owner.toLowerCase() === ownerAddress.toLowerCase();
    } catch (error) {
      console.error("Ownership verification failed:", error);
      return false;
    }
  }

  async getRoyaltyInfo(contentId, salePrice) {
    try {
      const royaltyInfo = await this.contentRegistry.royaltyInfo(
        contentId,
        salePrice
      );
      return {
        receiver: royaltyInfo.receiver,
        royaltyAmount: royaltyInfo.royaltyAmount.toString()
      };
    } catch (error) {
      console.error("Failed to get royalty info:", error);
      return null;
    }
  }
}