import { ethers } from "hardhat";
import * as dotenv from "dotenv";

const EXPOSED_KEY = "";

async function main() {
  const wallet =
  process.env.MNEMONIC && process.env.MNEMONIC.length > 0
    ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
    : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
