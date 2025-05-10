// Simplified ABIs for our contracts

export const ContentRegistryABI = [
  // Content registration
  "function registerContent(string contentURI, string metadataURI, uint8 contentType) public returns (uint256)",
  "function updateContentURI(uint256 contentId, string newContentURI) public",
  "function updateMetadataURI(uint256 contentId, string newMetadataURI) public",
  "function setContentStatus(uint256 contentId, bool isActive) public",
  
  // Content retrieval
  "function getContent(uint256 contentId) public view returns (address creator, string contentURI, string metadataURI, uint256 timestamp, bool isActive, uint8 contentType)",
  "function getCreatorContents(address creator) public view returns (uint256[] memory)",
  "function isContentCreator(uint256 contentId, address creator) public view returns (bool)",
  
  // State variables
  "function nextContentId() public view returns (uint256)",
  
  // Events
  "event ContentRegistered(uint256 indexed contentId, address indexed creator, uint8 contentType)",
  "event ContentUpdated(uint256 indexed contentId, string contentURI, string metadataURI)",
  "event ContentStatusChanged(uint256 indexed contentId, bool isActive)"
];

export const RoyaltyCalculatorABI = [
  // Royalty settings
  "function setRoyaltyPercentage(uint256 contentId, address payable recipient, uint256 percentage, uint256 minAmount, uint256 maxAmount) public",
  "function setFlatRoyalty(uint256 contentId, address payable recipient, uint256 flatFee) public",
  
  // Royalty calculation and payment
  "function calculateRoyalty(uint256 contentId, uint256 amount) public view returns (uint256)",
  "function payRoyalty(uint256 contentId) public payable",
  
  // Royalty info
  "function getRoyaltyInfo(uint256 contentId) public view returns (address recipient, uint256 percentage, uint256 minAmount, uint256 maxAmount, bool isFlat, uint256 flatFee)",
  
  // Events
  "event RoyaltySettingsUpdated(uint256 indexed contentId, address recipient, uint256 percentage)",
  "event FlatRoyaltySet(uint256 indexed contentId, address recipient, uint256 flatFee)",
  "event RoyaltyPaid(uint256 indexed contentId, address from, address to, uint256 amount)"
];

export const UsageTrackingABI = [
  // License management
  "function issueLicense(uint256 contentId, address licensee, uint8 licenseType, uint256 duration, uint256 usageLimit) public returns (uint256)",
  "function revokeLicense(uint256 licenseId) public",
  "function recordUsage(uint256 licenseId, string memory usageContext) public",
  
  // License validation
  "function isLicenseValid(uint256 licenseId) public view returns (bool)",
  "function getLicense(uint256 licenseId) public view returns (address licensee, uint256 contentId, uint8 licenseType, uint256 startTime, uint256 endTime, uint256 usageLimit, uint256 usageCount, bool isActive, bool isValid)",
  "function getUserLicenses(address user) public view returns (uint256[] memory)",
  "function getContentUsageCount(uint256 contentId) public view returns (uint256)",
  
  // State variables
  "function nextLicenseId() public view returns (uint256)",
  
  // Events
  "event LicenseIssued(uint256 indexed licenseId, address indexed licensee, uint256 indexed contentId, uint8 licenseType)",
  "event LicenseRevoked(uint256 indexed licenseId)",
  "event UsageRecorded(uint256 indexed contentId, uint256 indexed licenseId, address user)"
]; 