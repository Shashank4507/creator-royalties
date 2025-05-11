# Creator Royalties Platform

A modern blockchain-based platform for registering, managing, and monetizing digital content through creator royalties.

## Overview

The Creator Royalties Platform empowers digital content creators to:

1. Register their digital content on the blockchain
2. Set and manage royalty percentages for content usage
3. Track content usage and automatically collect royalties
4. Manage licensing for their creative work

This application combines a sleek, modern UI with powerful blockchain functionality to provide creators with complete control over their digital assets.

## Features

- **Blockchain Integration**: Connect your Web3 wallet (MetaMask, etc.) to interact with the blockchain
- **Content Registration**: Register your digital assets on the blockchain with detailed metadata
- **Royalty Management**: Set royalty percentages for your content and track payments
- **Content Dashboard**: View all your registered content in one place
- **Beautiful UI**: Modern, responsive user interface built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **UI Components**: Radix UI with Tailwind CSS
- **Blockchain Interaction**: ethers.js
- **Smart Contracts**: Solidity (deployed on Ethereum or compatible networks)

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Web3 wallet (MetaMask recommended)
- Access to Ethereum or a compatible testnet

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/creator-royalties-platform.git
   cd creator-royalties-platform
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the blockchain node and UI development server
   ```
   npm start
   ```
   
   This will start both:
   - A local Hardhat blockchain node
   - The Next.js UI development server

4. Open your browser to `http://localhost:3000`

## Smart Contracts

This platform interacts with the following smart contracts:

1. **ContentRegistry**: Manages content registration and ownership
2. **RoyaltyCalculator**: Handles royalty calculations and settings
3. **UsageTracking**: Tracks content usage and distributes royalties

The smart contracts are available in the `contracts/` directory.

## Development

### Project Structure

```
creator-royalties/
├── contracts/            # Smart contracts
├── scripts/              # Deployment scripts
├── test/                 # Contract tests
├── ui-repo/              # Next.js UI Application
│   ├── app/              # Next.js pages and layouts
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── public/           # Static assets
│   └── styles/           # Global styles
└── hardhat.config.ts     # Hardhat configuration
```

### Blockchain Integration

The application uses the `useContracts` hook to manage wallet connections and smart contract interactions. Key files:

- `ui-repo/hooks/useContracts.ts`: Manages wallet connection and contract instances
- `ui-repo/components/wallet-connect.tsx`: UI component for connecting wallets
- `ui-repo/components/auth-provider.tsx`: Handles user authentication

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub or contact the maintainers at support@creatorplatform.example.com. 