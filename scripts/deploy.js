const hre = require("hardhat");
const fs = require('fs');

async function main(contractName, params = [], value = 0) {
  const Contract = await hre.ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...params, { value });
  await contract.deployed();

  const name = contractName[0].toLowerCase() + contractName.slice(1);
  console.log(`${contractName} deployed to: ${contract.address}`);

  let config = `
  export const ${name} = "${contract.address}"
  `

  let data = JSON.stringify(config)
  fs.appendFileSync('config.js', JSON.parse(data))
  return contract.address;
}

(async function () {
  try {
    // Here change contract name and param
    const address = await main("NFTMarket");
    await main("NFT", [address])
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})()
