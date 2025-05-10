import React, { useState } from 'react';
import { ethers } from 'ethers';

interface ContentRegistrationProps {
  contentRegistryContract: ethers.Contract | null;
  walletAddress: string | null;
}

const ContentRegistration: React.FC<ContentRegistrationProps> = ({ contentRegistryContract, walletAddress }) => {
  const [contentURI, setContentURI] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [contentType, setContentType] = useState(0); // Default to Image
  const [isLoading, setIsLoading] = useState(false);
  const [lastRegisteredId, setLastRegisteredId] = useState<number | null>(null);
  
  const contentTypes = ['Image', 'Audio', 'Video', 'Text', 'Model', 'Other'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentRegistryContract || !walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!contentURI || !metadataURI) {
      alert('Both Content URI and Metadata URI are required');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the contract function
      const tx = await contentRegistryContract.registerContent(
        contentURI,
        metadataURI,
        contentType
      );
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      
      // Extract the content ID from the event (this would need adjustment for production)
      if (receipt.events && receipt.events.length > 0) {
        const event = receipt.events.find((e: any) => e.eventName === 'ContentRegistered');
        if (event && event.args) {
          setLastRegisteredId(Number(event.args[0]));
        }
      }
      
      // Clear the form
      setContentURI('');
      setMetadataURI('');
      
      alert('Content registered successfully!');
    } catch (error) {
      console.error('Error registering content:', error);
      alert('Error registering content. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-registration">
      <h2>Register New Content</h2>
      
      {!walletAddress ? (
        <p>Please connect your wallet to register content</p>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="contentURI">Content URI</label>
            <input
              type="text"
              id="contentURI"
              value={contentURI}
              onChange={(e) => setContentURI(e.target.value)}
              placeholder="https://example.com/content.jpg"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="metadataURI">Metadata URI</label>
            <input
              type="text"
              id="metadataURI"
              value={metadataURI}
              onChange={(e) => setMetadataURI(e.target.value)}
              placeholder="https://example.com/metadata.json"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contentType">Content Type</label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(Number(e.target.value))}
            >
              {contentTypes.map((type, index) => (
                <option key={index} value={index}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Content'}
          </button>
        </form>
      )}
      
      {lastRegisteredId !== null && (
        <div className="success-message">
          <p>Content registered successfully!</p>
          <p>Content ID: {lastRegisteredId}</p>
        </div>
      )}
    </div>
  );
};

export default ContentRegistration; 