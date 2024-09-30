import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
require('dotenv').config();
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";


// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY || ""; 
const scrollscanApiKey = process.env.SCROLLSCAN_API_KEY;
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "scrollSepolia",
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: [deployerPrivateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [deployerPrivateKey],
    },
    scrollSepolia: {
      url: `https://scroll-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [deployerPrivateKey],
    },
    scroll: {
      url: "https://rpc.scroll.io",
      accounts: [deployerPrivateKey],
    },
  },
  etherscan: {

    apiKey: {
        scrollSepolia: `${scrollscanApiKey}`,
    },
    customChains: [
        {
            network: "scrollSepolia",
            chainId: 534351,
            urls: {
            apiURL: "https://api-sepolia.scrollscan.com/api",
            browserURL: "https://sepolia.scrollscan.io"
            
            }
        }
    ]
  },
  
  sourcify: {
    enabled: false,
  },
};

export default config;



