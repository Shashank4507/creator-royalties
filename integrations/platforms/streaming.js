import { ethers } from 'ethers';
import UsageTrackingABI from '../../contracts/UsageTracking.json';

export class StreamingIntegration {
  constructor(signer, usageTrackingAddress) {
    this.signer = signer;
    this.usageTracking = new ethers.Contract(
      usageTrackingAddress,
      UsageTrackingABI,
      signer
    );
  }

  async reportStreamMinutes(contentId, minutes) {
    try {
      // Convert minutes to "views" (e.g., 1 view per 10 minutes)
      const views = Math.ceil(minutes / 10);
      const tx = await this.usageTracking.reportUsage(contentId, views);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Failed to report streaming:", error);
      return false;
    }
  }

  async getStreamStats(contentId) {
    try {
      const totalUsage = await this.usageTracking.getTotalUsage(contentId);
      return {
        totalStreams: totalUsage.toNumber(),
        estimatedMinutes: totalUsage.toNumber() * 10 // Assuming 10 minutes per "view"
      };
    } catch (error) {
      console.error("Failed to get stream stats:", error);
      return null;
    }
  }
}