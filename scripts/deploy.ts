import { ethers } from "hardhat";

async function main() {
  // Deploy ContentRegistry
  const ContentRegistry = await ethers.getContractFactory("ContentRegistry");
  const contentRegistry = await ContentRegistry.deploy();
  await contentRegistry.deployed();
  console.log(`ContentRegistry deployed to: ${contentRegistry.address}`);

  // Deploy RoyaltyCalculator with ContentRegistry address
  const RoyaltyCalculator = await ethers.getContractFactory("RoyaltyCalculator");
  const royaltyCalculator = await RoyaltyCalculator.deploy(contentRegistry.address);
  await royaltyCalculator.deployed();
  console.log(`RoyaltyCalculator deployed to: ${royaltyCalculator.address}`);

  // Deploy UsageTracking with ContentRegistry address
  const UsageTracking = await ethers.getContractFactory("UsageTracking");
  const usageTracking = await UsageTracking.deploy(contentRegistry.address);
  await usageTracking.deployed();
  console.log(`UsageTracking deployed to: ${usageTracking.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 