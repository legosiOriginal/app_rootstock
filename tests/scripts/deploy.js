const { ethers } = require('ethers');
require('dotenv').config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.VITE_ROOTSTOCK_TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const TokenBatcher = await ethers.getContractFactory('TokenBatcher');
    const docTokenAddress = '0xE700691Da7B9851F2F35f8b8182C69C53ccad9DB';
    const tokenBatcher = await TokenBatcher.deploy(docTokenAddress);

    console.log('TokenBatcher deployed to:', tokenBatcher.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});