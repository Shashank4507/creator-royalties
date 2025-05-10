export const NETWORKS = {
    ETHEREUM_MAINNET: {
      chainId: 1,
      name: "Ethereum Mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
      explorerUrl: "https://etherscan.io",
      contracts: {
        contentRegistry: "0x...",
        royaltyCalculator: "0x...",
        paymentSplitter: "0x..."
      }
    },
    POLYGON_MAINNET: {
      chainId: 137,
      name: "Polygon Mainnet",
      rpcUrl: "https://polygon-rpc.com",
      explorerUrl: "https://polygonscan.com",
      contracts: {
        contentRegistry: "0x...",
        royaltyCalculator: "0x...",
        paymentSplitter: "0x..."
      }
    },
    MUMBAI_TESTNET: {
      chainId: 80001,
      name: "Polygon Mumbai",
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
      explorerUrl: "https://mumbai.polygonscan.com",
      contracts: {
        contentRegistry: "0x...",
        royaltyCalculator: "0x...",
        paymentSplitter: "0x..."
      }
    }
  };
  
  export const getNetworkConfig = (chainId) => {
    return Object.values(NETWORKS).find(network => network.chainId === chainId) || NETWORKS.MUMBAI_TESTNET;
  };