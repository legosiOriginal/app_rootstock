const { ethers } = require('ethers');
require('dotenv').config();
const fs = require('fs');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.VITE_ROOTSTOCK_TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const deployedAddress = fs.readFileSync('deployedAddress.txt', 'utf8');
    const TokenBatcher = await ethers.getContractAt('TokenBatcher', deployedAddress, wallet);

    // Agregar la lógica de interacción aquí
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});