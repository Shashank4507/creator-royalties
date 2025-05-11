// Contract ABIs for the blockchain interactions

export const ContentRegistryABI = [
  // Content registration function
  "function registerContent(string contentURI, string metadataURI, uint8 contentType) returns (uint256)",
  
  // Get content by ID
  "function getContent(uint256 contentId) view returns (string, string, uint8, address, uint256)",
  
  // Get content by creator address
  "function getContentByCreator(address creator) view returns (uint256[])",
  
  // Content registered event
  "event ContentRegistered(uint256 indexed contentId, address indexed creator, string contentURI, string metadataURI, uint8 contentType)"
];

export const RoyaltyCalculatorABI = [
  // Calculate royalty for content usage
  "function calculateRoyalty(uint256 contentId, uint256 usageAmount) view returns (uint256)",
  
  // Set royalty percentage for content
  "function setRoyaltyPercentage(uint256 contentId, uint256 percentage) returns (bool)",
  
  // Get royalty percentage for content
  "function getRoyaltyPercentage(uint256 contentId) view returns (uint256)"
];

export const UsageTrackingABI = [
  // Record content usage
  "function recordUsage(uint256 contentId, uint256 usageAmount) returns (bool)",
  
  // Get total usage for content
  "function getTotalUsage(uint256 contentId) view returns (uint256)",
  
  // Get usage history for content
  "function getUsageHistory(uint256 contentId) view returns (uint256[], uint256[])",
  
  // Usage recorded event
  "event UsageRecorded(uint256 indexed contentId, address indexed user, uint256 usageAmount, uint256 timestamp)"
]; 