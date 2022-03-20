import { ethers } from 'hardhat';

async function deploy() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with deployer address: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Deployer balance: ${balance.toString()}`);

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy();
  await token.deployed();

  const contract = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json') as string),
  };

  console.log('Token deployed:\n', JSON.stringify(contract, null, 4));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
async function bootstrap() {
  try {
    await deploy();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

bootstrap();
