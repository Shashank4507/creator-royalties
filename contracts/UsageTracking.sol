// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ContentRegistry.sol";

/**
 * @title UsageTracking
 * @dev Contract for tracking usage of content and managing licensing
 */
contract UsageTracking {
    // Reference to the content registry
    ContentRegistry public contentRegistry;
    
    // License types
    enum LicenseType {
        SingleUse,      // One-time usage
        TimeBased,      // Usage allowed for a specific time period
        Unlimited,      // Unlimited usage
        QuantityBased   // Usage allowed for a specific number of times
    }
    
    // License structure
    struct License {
        address licensee;
        uint256 contentId;
        LicenseType licenseType;
        uint256 startTime;
        uint256 endTime;      // 0 for non-time-based licenses
        uint256 usageLimit;   // 0 for unlimited
        uint256 usageCount;
        bool isActive;
    }
    
    // Content usage structure
    struct ContentUsage {
        uint256 contentId;
        address user;
        uint256 timestamp;
        string usageContext;   // Additional context about the usage
    }
    
    // Mappings
    mapping(uint256 => License) public licenses;
    uint256 public nextLicenseId = 1;
    
    mapping(uint256 => ContentUsage[]) public contentUsageHistory;
    mapping(address => uint256[]) public userLicenses;
    
    // Events
    event LicenseIssued(uint256 indexed licenseId, address indexed licensee, uint256 indexed contentId, LicenseType licenseType);
    event LicenseRevoked(uint256 indexed licenseId);
    event UsageRecorded(uint256 indexed contentId, uint256 indexed licenseId, address user);
    
    /**
     * @dev Constructor
     * @param _contentRegistry Address of the ContentRegistry contract
     */
    constructor(address _contentRegistry) {
        require(_contentRegistry != address(0), "Invalid content registry address");
        contentRegistry = ContentRegistry(_contentRegistry);
    }
    
    /**
     * @dev Issue a new license
     * @param contentId ID of the content
     * @param licensee Address of the licensee
     * @param licenseType Type of license to issue
     * @param duration Duration in seconds (for time-based licenses)
     * @param usageLimit Maximum usage count (for quantity-based licenses)
     * @return licenseId ID of the issued license
     */
    function issueLicense(
        uint256 contentId,
        address licensee,
        LicenseType licenseType,
        uint256 duration,
        uint256 usageLimit
    ) public returns (uint256) {
        // Only content creator or the licensee themselves can issue a license
        require(
            contentRegistry.isContentCreator(contentId, msg.sender) || msg.sender == licensee,
            "Only content creator or licensee can issue license"
        );
        require(licensee != address(0), "Invalid licensee address");
        
        uint256 licenseId = nextLicenseId;
        nextLicenseId++;
        
        uint256 endTime = 0;
        if (licenseType == LicenseType.TimeBased) {
            require(duration > 0, "Duration must be greater than 0 for time-based licenses");
            endTime = block.timestamp + duration;
        }
        
        if (licenseType == LicenseType.QuantityBased) {
            require(usageLimit > 0, "Usage limit must be greater than 0 for quantity-based licenses");
        }
        
        licenses[licenseId] = License({
            licensee: licensee,
            contentId: contentId,
            licenseType: licenseType,
            startTime: block.timestamp,
            endTime: endTime,
            usageLimit: usageLimit,
            usageCount: 0,
            isActive: true
        });
        
        // Add license to user's licenses
        userLicenses[licensee].push(licenseId);
        
        emit LicenseIssued(licenseId, licensee, contentId, licenseType);
        
        return licenseId;
    }
    
    /**
     * @dev Revoke a license
     * @param licenseId ID of the license to revoke
     */
    function revokeLicense(uint256 licenseId) public {
        License storage license = licenses[licenseId];
        require(license.isActive, "License is not active");
        
        // Only content creator or licensee can revoke
        require(
            contentRegistry.isContentCreator(license.contentId, msg.sender) || 
            msg.sender == license.licensee,
            "Only content creator or licensee can revoke"
        );
        
        license.isActive = false;
        
        emit LicenseRevoked(licenseId);
    }
    
    /**
     * @dev Record content usage
     * @param licenseId ID of the license
     * @param usageContext Additional context about the usage
     */
    function recordUsage(uint256 licenseId, string memory usageContext) public {
        License storage license = licenses[licenseId];
        require(license.isActive, "License is not active");
        require(
            license.licensee == msg.sender || 
            contentRegistry.isContentCreator(license.contentId, msg.sender),
            "Only licensee or content creator can record usage"
        );
        
        // For time-based licenses, check if still valid
        if (license.licenseType == LicenseType.TimeBased) {
            require(block.timestamp <= license.endTime, "License has expired");
        }
        
        // For quantity-based licenses, check if usage limit reached
        if (license.licenseType == LicenseType.QuantityBased) {
            require(license.usageCount < license.usageLimit, "Usage limit reached");
        }
        
        // For single-use licenses, check if already used
        if (license.licenseType == LicenseType.SingleUse) {
            require(license.usageCount == 0, "Single-use license already used");
        }
        
        // Increment usage count
        license.usageCount++;
        
        // Record in usage history
        contentUsageHistory[license.contentId].push(ContentUsage({
            contentId: license.contentId,
            user: license.licensee,
            timestamp: block.timestamp,
            usageContext: usageContext
        }));
        
        // Automatically revoke single-use license after use
        if (license.licenseType == LicenseType.SingleUse) {
            license.isActive = false;
            emit LicenseRevoked(licenseId);
        }
        
        // Automatically revoke quantity-based license if limit reached
        if (license.licenseType == LicenseType.QuantityBased && license.usageCount >= license.usageLimit) {
            license.isActive = false;
            emit LicenseRevoked(licenseId);
        }
        
        emit UsageRecorded(license.contentId, licenseId, license.licensee);
    }
    
    /**
     * @dev Check if a license is valid
     * @param licenseId ID of the license
     * @return isValid Whether the license is valid
     */
    function isLicenseValid(uint256 licenseId) public view returns (bool) {
        License memory license = licenses[licenseId];
        
        if (!license.isActive) {
            return false;
        }
        
        // Time-based license validation
        if (license.licenseType == LicenseType.TimeBased && block.timestamp > license.endTime) {
            return false;
        }
        
        // Quantity-based license validation
        if (license.licenseType == LicenseType.QuantityBased && license.usageCount >= license.usageLimit) {
            return false;
        }
        
        // Single-use license validation
        if (license.licenseType == LicenseType.SingleUse && license.usageCount > 0) {
            return false;
        }
        
        return true;
    }
    
    /**
     * @dev Get license details
     * @param licenseId ID of the license
     * @return licensee The address of the licensee
     * @return contentId The ID of the content
     * @return licenseType The type of license
     * @return startTime The start time of the license
     * @return endTime The end time of the license (for time-based licenses)
     * @return usageLimit The maximum usage limit (for quantity-based licenses)
     * @return usageCount The current usage count
     * @return isActive Whether the license is active
     * @return isValid Whether the license is currently valid
     */
    function getLicense(uint256 licenseId) public view returns (
        address licensee,
        uint256 contentId,
        LicenseType licenseType,
        uint256 startTime,
        uint256 endTime,
        uint256 usageLimit,
        uint256 usageCount,
        bool isActive,
        bool isValid
    ) {
        License memory license = licenses[licenseId];
        
        return (
            license.licensee,
            license.contentId,
            license.licenseType,
            license.startTime,
            license.endTime,
            license.usageLimit,
            license.usageCount,
            license.isActive,
            isLicenseValid(licenseId)
        );
    }
    
    /**
     * @dev Get all licenses for a user
     * @param user Address of the user
     * @return Array of license IDs
     */
    function getUserLicenses(address user) public view returns (uint256[] memory) {
        return userLicenses[user];
    }
    
    /**
     * @dev Get content usage count
     * @param contentId ID of the content
     * @return Total usage count
     */
    function getContentUsageCount(uint256 contentId) public view returns (uint256) {
        return contentUsageHistory[contentId].length;
    }
}