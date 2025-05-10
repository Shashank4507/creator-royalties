import { ethers } from "hardhat";

async function main() {
  console.log("Deploying core contracts...");

  // Deploy ContentRegistry
  console.log("Deploying ContentRegistry...");
  const ContentRegistry = await ethers.getContractFactory("ContentRegistry");
  const contentRegistry = await ContentRegistry.deploy();
  const contentRegistryAddress = await contentRegistry.getAddress();
  console.log(`ContentRegistry deployed to: ${contentRegistryAddress}`);

  // Deploy RoyaltyCalculator with ContentRegistry address
  console.log("Deploying RoyaltyCalculator...");
  const RoyaltyCalculator = await ethers.getContractFactory("RoyaltyCalculator");
  const royaltyCalculator = await RoyaltyCalculator.deploy(contentRegistryAddress);
  const royaltyCalculatorAddress = await royaltyCalculator.getAddress();
  console.log(`RoyaltyCalculator deployed to: ${royaltyCalculatorAddress}`);

  // Deploy UsageTracking with ContentRegistry address
  console.log("Deploying UsageTracking...");
  const UsageTracking = await ethers.getContractFactory("UsageTracking");
  const usageTracking = await UsageTracking.deploy(contentRegistryAddress);
  const usageTrackingAddress = await usageTracking.getAddress();
  console.log(`UsageTracking deployed to: ${usageTrackingAddress}`);

  console.log("Core contracts deployed successfully!");
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
}); 