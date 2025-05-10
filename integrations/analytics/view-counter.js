import { ethers } from 'ethers';
import UsageTrackingABI from '../../contracts/UsageTracking.json';

export class ViewCounter {
  constructor(signer, usageTrackingAddress) {
    this.signer = signer;
    this.usageTracking = new ethers.Contract(
      usageTrackingAddress,
      UsageTrackingABI,
      signer
    );
    this.trackedContents = new Set();
  }

  async trackView(contentId) {
    if (!this.trackedContents.has(contentId)) {
      try {
        await this.usageTracking.reportUsage(contentId, 1);
        this.trackedContents.add(contentId);
        return true;
      } catch (error) {
        console.error("Failed to report view:", error);
        return false;
      }
    }
    return false;
  }

  async batchTrackViews(contentIds) {
    try {
      const tx = await this.usageTracking.batchReportUsage(contentIds, Array(contentIds.length).fill(1));
      await tx.wait();
      contentIds.forEach(id => this.trackedContents.add(id));
      return true;
    } catch (error) {
      console.error("Batch tracking failed:", error);
      return false;
    }
  }

  async getTotalViews(contentId) {
    try {
      const totalViews = await this.usageTracking.getTotalUsage(contentId);
      return totalViews.toNumber();
    } catch (error) {
      console.error("Failed to get views:", error);
      return 0;
    }
  }
}