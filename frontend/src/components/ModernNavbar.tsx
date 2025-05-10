import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

interface ModernNavbarProps {
  address: string | null;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ModernNavbar: React.FC<ModernNavbarProps> = ({
  address,
  isConnected,
  onConnect,
  onDisconnect,
  activeTab,
  setActiveTab
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'register', label: 'Register Content' },
    { id: 'royalties', label: 'Manage Royalties' },
    { id: 'licenses', label: 'Licenses' },
    { id: 'account', label: 'My Account' },
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Creator Royalties</h1>
          {config.testMode && (
            <div className="test-mode-indicator">
              Test Mode
            </div>
          )}
        </motion.div>
        
        <div className="navbar-menu">
          {/* Desktop Menu */}
          <ul className="navbar-links desktop-menu">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
          
          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        {/* Wallet Connection */}
        <motion.div 
          className="wallet-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isConnected ? (
            <div className="wallet-connected">
              <div className="wallet-address">
                <div className="address-indicator"></div>
                <span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}</span>
              </div>
              <button className="disconnect-button" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <button className="connect-button" onClick={onConnect}>
              Connect Wallet
            </button>
          )}
        </motion.div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default ModernNavbar; 