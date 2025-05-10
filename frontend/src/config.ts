export const config = {
  // Set to true to use local test wallet instead of MetaMask
  testMode: true,
  
  // Test account private key (only for development)
  testPrivateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', // First Hardhat test account
  
  contracts: {
    contentRegistry: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    royaltyCalculator: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    usageTracking: '0x0165878A594ca255338adfa4d48449f69242Eb8F'
  },
  network: {
    url: 'http://localhost:8545',
    chainId: 1337,
    name: 'Hardhat Local'
  }
};

export default config; 