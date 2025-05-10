// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ContentRegistry.sol";

/**
 * @title RoyaltyCalculator
 * @dev Contract for calculating and managing royalties for content
 */
contract RoyaltyCalculator {
    // Reference to the content registry
    ContentRegistry public contentRegistry;
    
    // Royalty information for a content item
    struct RoyaltyInfo {
        address payable recipient;
        uint256 percentage;  // In basis points (1/100 of a percent: 10000 = 100%)
        uint256 minAmount;   // Minimum amount per transaction in wei
        uint256 maxAmount;   // Maximum amount per transaction in wei (0 = no max)
        bool isFlat;         // If true, use flat fee instead of percentage
        uint256 flatFee;     // Flat fee amount in wei if isFlat is true
    }
    
    // Mapping from content ID to royalty info
    mapping(uint256 => RoyaltyInfo) public royaltySettings;
    
    // Events
    event RoyaltySettingsUpdated(uint256 indexed contentId, address recipient, uint256 percentage);
    event FlatRoyaltySet(uint256 indexed contentId, address recipient, uint256 flatFee);
    event RoyaltyPaid(uint256 indexed contentId, address from, address to, uint256 amount);
    
    /**
     * @dev Constructor
     * @param _contentRegistry Address of the ContentRegistry contract
     */
    constructor(address _contentRegistry) {
        require(_contentRegistry != address(0), "Invalid content registry address");
        contentRegistry = ContentRegistry(_contentRegistry);
    }
    
    /**
     * @dev Set percentage-based royalty for content
     * @param contentId ID of the content
     * @param recipient Address to receive royalties
     * @param percentage Royalty percentage in basis points (e.g., 250 = 2.5%)
     * @param minAmount Minimum royalty amount per transaction (in wei)
     * @param maxAmount Maximum royalty amount per transaction (0 for no max)
     */
    function setRoyaltyPercentage(
        uint256 contentId,
        address payable recipient,
        uint256 percentage,
        uint256 minAmount,
        uint256 maxAmount
    ) public {
        require(contentRegistry.isContentCreator(contentId, msg.sender), "Only content creator can set royalties");
        require(percentage <= 10000, "Percentage cannot exceed 100%");
        require(recipient != address(0), "Invalid recipient address");
        
        if (maxAmount > 0) {
            require(minAmount <= maxAmount, "Min amount must be less than max amount");
        }
        
        royaltySettings[contentId] = RoyaltyInfo({
            recipient: recipient,
            percentage: percentage,
            minAmount: minAmount,
            maxAmount: maxAmount,
            isFlat: false,
            flatFee: 0
        });
        
        emit RoyaltySettingsUpdated(contentId, recipient, percentage);
    }
    
    /**
     * @dev Set flat fee royalty for content
     * @param contentId ID of the content
     * @param recipient Address to receive royalties
     * @param flatFee Flat fee amount per usage (in wei)
     */
    function setFlatRoyalty(
        uint256 contentId,
        address payable recipient,
        uint256 flatFee
    ) public {
        require(contentRegistry.isContentCreator(contentId, msg.sender), "Only content creator can set royalties");
        require(recipient != address(0), "Invalid recipient address");
        require(flatFee > 0, "Flat fee must be greater than 0");
        
        royaltySettings[contentId] = RoyaltyInfo({
            recipient: recipient,
            percentage: 0,
            minAmount: 0,
            maxAmount: 0,
            isFlat: true,
            flatFee: flatFee
        });
        
        emit FlatRoyaltySet(contentId, recipient, flatFee);
    }
    
    /**
     * @dev Calculate royalty amount for a content transaction
     * @param contentId ID of the content
     * @param amount Transaction amount (in wei)
     * @return Royalty amount (in wei)
     */
    function calculateRoyalty(uint256 contentId, uint256 amount) public view returns (uint256) {
        RoyaltyInfo memory info = royaltySettings[contentId];
        
        // If no royalty set or invalid recipient, return 0
        if (info.recipient == address(0)) {
            return 0;
        }
        
        uint256 royalty;
        
        if (info.isFlat) {
            // Flat fee
            royalty = info.flatFee;
        } else {
            // Percentage based
            royalty = (amount * info.percentage) / 10000;
            
            // Apply minimum if set
            if (info.minAmount > 0 && royalty < info.minAmount) {
                royalty = info.minAmount;
            }
            
            // Apply maximum if set
            if (info.maxAmount > 0 && royalty > info.maxAmount) {
                royalty = info.maxAmount;
            }
        }
        
        return royalty;
    }
    
    /**
     * @dev Pay royalty for content usage
     * @param contentId ID of the content
     */
    function payRoyalty(uint256 contentId) public payable {
        RoyaltyInfo memory info = royaltySettings[contentId];
        
        require(info.recipient != address(0), "No royalty recipient set");
        
        uint256 royaltyAmount;
        
        if (info.isFlat) {
            royaltyAmount = info.flatFee;
            require(msg.value >= royaltyAmount, "Insufficient payment for flat fee");
        } else {
            royaltyAmount = calculateRoyalty(contentId, msg.value);
            require(msg.value >= royaltyAmount, "Insufficient payment for royalty");
        }
        
        // Transfer royalty to recipient
        (bool success, ) = info.recipient.call{value: royaltyAmount}("");
        require(success, "Royalty payment failed");
        
        // Refund excess payment if any
        if (msg.value > royaltyAmount) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - royaltyAmount}("");
            require(refundSuccess, "Refund failed");
        }
        
        emit RoyaltyPaid(contentId, msg.sender, info.recipient, royaltyAmount);
    }
    
    /**
     * @dev Get royalty info for content
     * @param contentId ID of the content
     * @return recipient The address that receives royalties
     * @return percentage The royalty percentage in basis points
     * @return minAmount The minimum royalty amount
     * @return maxAmount The maximum royalty amount
     * @return isFlat Whether the royalty is a flat fee
     * @return flatFee The flat fee amount if applicable
     */
    function getRoyaltyInfo(uint256 contentId) public view returns (
        address recipient,
        uint256 percentage,
        uint256 minAmount,
        uint256 maxAmount,
        bool isFlat,
        uint256 flatFee
    ) {
        RoyaltyInfo memory info = royaltySettings[contentId];
        
        return (
            info.recipient,
            info.percentage,
            info.minAmount,
            info.maxAmount,
            info.isFlat,
            info.flatFee
        );
    }
}