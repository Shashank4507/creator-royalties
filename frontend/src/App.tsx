import React, { useState } from 'react';
import './App.css';
import { useContracts } from './hooks/useContracts';
import ContentRegistration from './components/ContentRegistration';
import GradientBackground from './components/ThreeJSBackground';
import ModernNavbar from './components/ModernNavbar';
import AccountSection from './components/AccountSection';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { address, isConnected, contracts, connect, disconnect } = useContracts();
  const [activeTab, setActiveTab] = useState('register'); // 'register', 'royalties', 'licenses', 'account'

  return (
    <div className="App">
      <div className="background-container">
        <GradientBackground />
        <div className="background-overlay"></div>
      </div>

      <ModernNavbar 
        address={address}
        isConnected={isConnected}
        onConnect={connect}
        onDisconnect={disconnect}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="App-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="tab-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'register' && (
              <div className="tab-content">
                <ContentRegistration 
                  contentRegistryContract={contracts.contentRegistry} 
                  walletAddress={address} 
                />
              </div>
            )}

            {activeTab === 'royalties' && (
              <div className="tab-content">
                <h2>Royalty Management</h2>
                <p>
                  Set and manage royalties for your creative content. Define how you get paid when 
                  others use your work.
                </p>
                <div className="coming-soon-banner">
                  <span>Enhanced Royalty Management</span>
                  <span className="badge">Coming Soon</span>
                </div>
              </div>
            )}

            {activeTab === 'licenses' && (
              <div className="tab-content">
                <h2>License Management</h2>
                <p>
                  Create and manage licenses for your content. Control how and where your work can 
                  be used.
                </p>
                <div className="coming-soon-banner">
                  <span>Advanced License Features</span>
                  <span className="badge">Coming Soon</span>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="tab-content">
                <AccountSection 
                  address={address}
                  contentRegistryContract={contracts.contentRegistry}
                  royaltyCalculatorContract={contracts.royaltyCalculator}
                  usageTrackingContract={contracts.usageTracking}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Creator Royalties Platform</h3>
            <p>Empowering creators through blockchain technology</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => setActiveTab('register')}>Register Content</button></li>
              <li><button onClick={() => setActiveTab('royalties')}>Manage Royalties</button></li>
              <li><button onClick={() => setActiveTab('licenses')}>Licenses</button></li>
              <li><button onClick={() => setActiveTab('account')}>My Account</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">Github</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Discord</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Creator Royalties Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
