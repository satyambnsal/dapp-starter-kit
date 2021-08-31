require("@nomiclabs/hardhat-waffle")
require("dotenv/config")

const fs = require("fs")

console.log("env:: ", process.env.FORKING)
console.log("env:: ", process.env.ALCHEMY_API_KEY)
console.log("env:: ", process.env.ACCOUNT_PRIVATE_KEY1)
console.log("env:: ", process.env.INFURA_ID)

const privateKey1 = process.env.ACCOUNT_PRIVATE_KEY1 || "01234567890123456789"
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
      blockNumber: 11095000,
    },

    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey1],
    },
    harmony_testnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts: [privateKey1],
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey1]
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [privateKey1]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}

/*
JSON-RPC based network configuration

{
  url:"URL of the node. required for custom network",
  chainId: "Used to validate the network hardhat connects to"
}
*/
