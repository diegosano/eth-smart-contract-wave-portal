import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther('1');

  const lockContractFactory = await ethers.getContractFactory('Lock');
  const lockContact = await lockContractFactory.deploy(unlockTime, {
    value: lockedAmount,
  });

  await lockContact.deployed();

  console.log('Lock with 1 ETH deployed to:', lockContact.address);

  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy();

  await waveContract.deployed();

  console.log('Contract deployed to:', waveContract.address);
  console.log('Contract deployed by:', owner.address);

  let waveCount
  let waveTxn

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.wave("First message");
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).wave("Second message");
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
