import { ethers } from 'ethers';
import ContentRegistryABI from '../../contracts/ContentRegistry.json';

export class WebEmbedding {
  constructor(provider, contentRegistryAddress) {
    this.provider = provider;
    this.contentRegistry = new ethers.Contract(
      contentRegistryAddress,
      ContentRegistryABI,
      provider
    );
  }

  async verifyContent(contentId, expectedHash) {
    try {
      const isValid = await this.contentRegistry.verifyContentHash(
        contentId,
        expectedHash
      );
      return isValid;
    } catch (error) {
      console.error("Verification failed:", error);
      return false;
    }
  }

  async getLicenseTerms(contentId) {
    try {
      const royaltyInfo = await this.contentRegistry.royaltyInfo(contentId, 10000); // For 1 ETH equivalent
      return {
        royaltyPercentage: royaltyInfo.royaltyAmount / 100, // Convert basis points to percentage
        recipient: royaltyInfo.receiver
      };
    } catch (error) {
      console.error("Failed to get license terms:", error);
      return null;
    }
  }

  async embedContent(contentId, elementId, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }

    try {
      const metadata = await this.contentRegistry.getContentMetadata(contentId);
      const contentURI = await this.contentRegistry.tokenURI(contentId);

      // In a real implementation, you would fetch and display the content
      // This is a simplified version
      const embedElement = document.createElement('div');
      embedElement.className = 'embedded-content';
      embedElement.innerHTML = `
        <h3>Embedded Content</h3>
        <p>Type: ${metadata.contentType}</p>
        <p>Content URI: <a href="${contentURI}" target="_blank">View</a></p>
        ${options.showLicense ? `<p>Royalty: ${metadata.royaltyPercentage}%</p>` : ''}
      `;
      
      element.appendChild(embedElement);
      return true;
    } catch (error) {
      console.error("Embedding failed:", error);
      return false;
    }
  }
}