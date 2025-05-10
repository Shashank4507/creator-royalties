# Creator Royalties Platform

A blockchain-based platform for creators to register their content, manage royalties, and track usage licenses. This platform empowers digital content creators to maintain ownership and monetize their work through transparent, automated royalty payments.

![Creator Royalties Platform](https://i.imgur.com/placeholder.png)

## Features

### Core Functionality
- **Content Registration**: Register any digital content (images, audio, video, text, 3D models) on the blockchain
- **Royalty Management**: Set and manage royalty percentages for your creative work
- **License Tracking**: Track who has licensed your content and monitor usage
- **Automated Payments**: Receive royalty payments automatically when your content is used

### Technical Features
- Smart contracts built on Ethereum/EVM-compatible blockchains
- React-based modern frontend with responsive design
- 3D animations and modern UI elements
- Test mode for development without MetaMask

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MetaMask extension (for production use)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shashank4507/creator-royalties.git
cd creator-royalties
```

2. Install dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

### Running in Development Mode

1. Start a local Hardhat node:
```bash
npm run start:node
```

2. In a new terminal, deploy contracts to the local network:
```bash
npm run compile
npx hardhat run scripts/deploy-core.ts --network localhost
```

3. Copy the contract addresses from the console output and update them in `frontend/src/config.ts`

4. Start the frontend:
```bash
npm run start:frontend
```

5. Open your browser and navigate to `http://localhost:3000`

### Test Mode vs. Production Mode

#### Test Mode (Default)
In test mode, the application uses a local test wallet with pre-funded ETH instead of requiring MetaMask. This makes development and testing faster.

To use test mode:
- Ensure `testMode: true` is set in `frontend/src/config.ts`
- A "Test Mode" indicator will appear in the navbar

#### Production Mode (with MetaMask)
For real transactions using MetaMask:
- Set `testMode: false` in `frontend/src/config.ts`
- Connect your MetaMask wallet when prompted
- Ensure your MetaMask is connected to the appropriate network

## Smart Contract Architecture

The platform consists of several smart contracts:

- **ContentRegistry.sol**: Core contract for registering and managing content
- **RoyaltyCalculator.sol**: Handles royalty calculations based on usage and rates
- **UsageTracking.sol**: Tracks content usage and license activations
- **PaymentSplitter.sol**: Manages payment distribution to multiple creators
- **CrossChainBridge.sol**: Enables cross-chain functionality (future development)
- **ZKProofVerifier.sol**: Implements zero-knowledge proofs for private transactions (future development)

## Frontend Structure

The React-based frontend offers:

- Modern, responsive UI with CSS animations
- 3D background using Canvas-based animations
- Wallet connection for blockchain interactions
- Content registration and management dashboard
- Account section displaying user content and licenses

## How to Use

### Registering Content

1. Navigate to the "Register Content" tab
2. Connect your wallet (or use test mode)
3. Enter the Content URI (direct link to your content)
4. Enter the Metadata URI (link to a JSON file with content metadata)
5. Select the appropriate content type
6. Click "Register Content"

### Metadata Format

Create a JSON file with the following structure:
```json
{
  "name": "My Digital Artwork",
  "description": "This is a digital painting created in 2023",
  "creator": "Your Name",
  "creationDate": "2023-05-15",
  "license": "CC BY-SA 4.0",
  "royaltyPercentage": 5,
  "attributes": [
    {"trait_type": "Medium", "value": "Digital"},
    {"trait_type": "Style", "value": "Abstract"}
  ]
}
```

Host this file online and provide its URL as the Metadata URI.

### Managing Royalties

Coming soon: Enhanced royalty management features will allow you to:
- Set different royalty rates for different usage types
- Create tiered pricing models
- Implement time-based royalty schedules

### License Management

Coming soon: Advanced license features will include:
- Custom license terms
- License expiration and renewal
- Usage restriction settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Hardhat](https://hardhat.org/) and [React](https://reactjs.org/)
- Uses [ethers.js](https://docs.ethers.io/) for blockchain interactions
- Animations powered by [Framer Motion](https://www.framer.com/motion/) 