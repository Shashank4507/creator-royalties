// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ContentRegistry
 * @dev Contract for registering and managing creative content.
 * Allows creators to register their content and manage its associated metadata.
 */
contract ContentRegistry {
    // Structure to store content information
    struct Content {
        address creator;
        string contentURI;
        string metadataURI;
        uint256 timestamp;
        bool isActive;
        ContentType contentType;
    }

    // Enum for different content types
    enum ContentType {
        Image,
        Audio,
        Video,
        Text,
        Model,
        Other
    }

    // Mapping from content ID to Content structure
    mapping(uint256 => Content) public contents;
    
    // Counter for content IDs
    uint256 public nextContentId = 1;
    
    // Mapping from creator address to their content IDs
    mapping(address => uint256[]) public creatorContents;

    // Events
    event ContentRegistered(uint256 indexed contentId, address indexed creator, ContentType contentType);
    event ContentUpdated(uint256 indexed contentId, string contentURI, string metadataURI);
    event ContentStatusChanged(uint256 indexed contentId, bool isActive);

    /**
     * @dev Register new content
     * @param contentURI URI pointing to the content
     * @param metadataURI URI pointing to the content metadata
     * @param contentType Type of the content being registered
     * @return contentId The ID of the registered content
     */
    function registerContent(
        string memory contentURI, 
        string memory metadataURI, 
        ContentType contentType
    ) 
        public 
        returns (uint256) 
    {
        require(bytes(contentURI).length > 0, "Content URI cannot be empty");
        require(bytes(metadataURI).length > 0, "Metadata URI cannot be empty");
        
        uint256 contentId = nextContentId;
        
        contents[contentId] = Content({
            creator: msg.sender,
            contentURI: contentURI,
            metadataURI: metadataURI,
            timestamp: block.timestamp,
            isActive: true,
            contentType: contentType
        });
        
        // Add content to creator's list
        creatorContents[msg.sender].push(contentId);
        
        nextContentId++;
        
        emit ContentRegistered(contentId, msg.sender, contentType);
        
        return contentId;
    }
    
    /**
     * @dev Update the content URI
     * @param contentId ID of the content to update
     * @param newContentURI New URI for the content
     */
    function updateContentURI(uint256 contentId, string memory newContentURI) public {
        require(contentId < nextContentId, "Content does not exist");
        require(contents[contentId].creator == msg.sender, "Only creator can update content");
        require(bytes(newContentURI).length > 0, "Content URI cannot be empty");
        
        contents[contentId].contentURI = newContentURI;
        
        emit ContentUpdated(contentId, newContentURI, contents[contentId].metadataURI);
    }
    
    /**
     * @dev Update the metadata URI
     * @param contentId ID of the content to update
     * @param newMetadataURI New URI for the metadata
     */
    function updateMetadataURI(uint256 contentId, string memory newMetadataURI) public {
        require(contentId < nextContentId, "Content does not exist");
        require(contents[contentId].creator == msg.sender, "Only creator can update metadata");
        require(bytes(newMetadataURI).length > 0, "Metadata URI cannot be empty");
        
        contents[contentId].metadataURI = newMetadataURI;
        
        emit ContentUpdated(contentId, contents[contentId].contentURI, newMetadataURI);
    }
    
    /**
     * @dev Activate or deactivate content
     * @param contentId ID of the content to update
     * @param isActive New status of the content
     */
    function setContentStatus(uint256 contentId, bool isActive) public {
        require(contentId < nextContentId, "Content does not exist");
        require(contents[contentId].creator == msg.sender, "Only creator can change status");
        
        contents[contentId].isActive = isActive;
        
        emit ContentStatusChanged(contentId, isActive);
    }
    
    /**
     * @dev Get content details
     * @param contentId ID of the content
     * @return creator The address of the content creator
     * @return contentURI The URI of the content
     * @return metadataURI The URI of the metadata
     * @return timestamp The timestamp when the content was registered
     * @return isActive Whether the content is active
     * @return contentType The type of the content
     */
    function getContent(uint256 contentId) public view returns (
        address creator,
        string memory contentURI,
        string memory metadataURI,
        uint256 timestamp,
        bool isActive,
        ContentType contentType
    ) {
        require(contentId < nextContentId, "Content does not exist");
        
        Content storage content = contents[contentId];
        
        return (
            content.creator,
            content.contentURI,
            content.metadataURI,
            content.timestamp,
            content.isActive,
            content.contentType
        );
    }
    
    /**
     * @dev Get all content IDs for a creator
     * @param creator Address of the creator
     * @return Array of content IDs
     */
    function getCreatorContents(address creator) public view returns (uint256[] memory) {
        return creatorContents[creator];
    }
    
    /**
     * @dev Check if an address is the creator of specific content
     * @param contentId ID of the content
     * @param creator Address to check
     * @return True if the address is the creator
     */
    function isContentCreator(uint256 contentId, address creator) public view returns (bool) {
        require(contentId < nextContentId, "Content does not exist");
        return contents[contentId].creator == creator;
    }
}