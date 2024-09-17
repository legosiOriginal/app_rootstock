const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenBatcher', function () {
    let TokenBatcher;
    let tokenBatcher;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        TokenBatcher = await ethers.getContractFactory('TokenBatcher');
        tokenBatcher = await TokenBatcher.deploy('0x...'); // Reemplaza con la dirección del token DOC
    });

    it('should deploy the contract', async function () {
        expect(await tokenBatcher.owner()).to.equal(owner.address);
    });

    // Agregar más pruebas aquí
});
