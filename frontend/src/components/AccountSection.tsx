import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';

interface AccountSectionProps {
  address: string | null;
  contentRegistryContract: ethers.Contract | null;
  royaltyCalculatorContract: ethers.Contract | null;
  usageTrackingContract: ethers.Contract | null;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  address,
  contentRegistryContract,
  royaltyCalculatorContract,
  usageTrackingContract
}) => {
  const [contentIds, setContentIds] = useState<number[]>([]);
  const [contentDetails, setContentDetails] = useState<any[]>([]);
  const [licenseIds, setLicenseIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!address || !contentRegistryContract || !usageTrackingContract) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Get wallet balance
        const provider = contentRegistryContract.runner?.provider;
        if (provider) {
          const balanceWei = await provider.getBalance(address);
          setBalance(ethers.formatEther(balanceWei));
        }

        // Get user's content
        const ids = await contentRegistryContract.getCreatorContents(address);
        setContentIds(ids.map((id: ethers.BigNumberish) => Number(id)));

        // Get content details
        const details = await Promise.all(
          ids.map(async (id: ethers.BigNumberish) => {
            const content = await contentRegistryContract.getContent(id);
            return {
              id: Number(id),
              contentURI: content[1], // contentURI is at index 1
              metadataURI: content[2], // metadataURI is at index 2
              timestamp: Number(content[3]), // timestamp is at index 3
              isActive: content[4], // isActive is at index 4
              contentType: Number(content[5]) // contentType is at index 5
            };
          })
        );
        setContentDetails(details);

        // Get user's licenses
        const licenses = await usageTrackingContract.getUserLicenses(address);
        setLicenseIds(licenses.map((id: ethers.BigNumberish) => Number(id)));
      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [address, contentRegistryContract, usageTrackingContract]);

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  // Map content type numbers to names
  const contentTypes = ['Image', 'Audio', 'Video', 'Text', 'Model', 'Other'];

  return (
    <div className="account-section">
      <motion.div
        className="account-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>My Account</h2>
        {address && (
          <div className="account-info">
            <div className="account-address">
              <span className="label">Address:</span>
              <span className="value">{address}</span>
            </div>
            <div className="account-balance">
              <span className="label">Balance:</span>
              <span className="value">{balance} ETH</span>
            </div>
          </div>
        )}
      </motion.div>

      {isLoading ? (
        <div className="loading">Loading account data...</div>
      ) : (
        <div className="account-data">
          <motion.div
            className="my-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>My Content ({contentIds.length})</h3>
            {contentIds.length === 0 ? (
              <p>You haven't registered any content yet.</p>
            ) : (
              <div className="content-grid">
                {contentDetails.map((content, index) => (
                  <motion.div
                    key={content.id}
                    className="content-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="content-image">
                      {content.contentURI.includes('http') ? (
                        <img src={content.contentURI} alt={`Content ${content.id}`} />
                      ) : (
                        <div className="placeholder-image">
                          {contentTypes[content.contentType].charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="content-info">
                      <h4>Content #{content.id}</h4>
                      <p className="content-type">{contentTypes[content.contentType]}</p>
                      <p className="content-date">Created: {formatDate(content.timestamp)}</p>
                      <p className={`content-status ${content.isActive ? 'active' : 'inactive'}`}>
                        {content.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="my-licenses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>My Licenses ({licenseIds.length})</h3>
            {licenseIds.length === 0 ? (
              <p>You don't have any licenses yet.</p>
            ) : (
              <ul className="license-list">
                {licenseIds.map((id, index) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="license-item"
                  >
                    License #{id}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AccountSection; 