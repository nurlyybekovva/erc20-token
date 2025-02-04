const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstanaItUniversity_SE2314", function () {
    let Token, token, owner, addr1;

    // Before each test, deploy the smart contract and mint the initial supply
    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners(); // Get test accounts
        const initialMintValue = 5000;  // Specify the amount of tokens to mint
        Token = await ethers.getContractFactory("AstanaItUniversity_SE2314");
        token = await Token.deploy(initialMintValue); // Deploy contract with initial mint
        await token.deployed(); // Ensure deployment is complete
    });

    // Test: The contract should mint the correct initial amount to the owner
    it("Should mint the specified amount of tokens to the owner", async function () {
        const balance = await token.balanceOf(owner.address);
        expect(balance.toString()).to.equal(ethers.utils.parseUnits("5000", 18).toString());
    });

    // Test: Tokens should be transferable between accounts
    it("Should transfer tokens to addr1", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Transfer 100 tokens to addr1
        
        // Verify addr1 received 100 tokens
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("100.0");

        // Verify owner's balance reduced accordingly (5000 - 100)
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ethers.utils.formatUnits(ownerBalance, 18)).to.equal("4900.0");
    });

    // Test: The contract should return the correct initial mint value
    it("Should return the correct initial mint value", async function () {
        const initialMintValue = 5000;
        const value = await token.getInitialMintValue(); // Call contract function
        expect(value.toString()).to.equal(initialMintValue.toString());
    });

    // Test: The contract should return the correct timestamp after a transaction
    it("Should return the correct timestamp after a transfer", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        const tx = await token.transfer(addr1.address, transferAmount);
        const receipt = await tx.wait(); // Wait for transaction to be mined
        
        const contractTimestamp = await token.getTransactionTimestamp(); // Get contract timestamp
        const blockTimestamp = (await ethers.provider.getBlock(receipt.blockNumber)).timestamp; // Get blockchain timestamp

        // Split contract timestamp into day, month, and year
        const [day, month, year] = contractTimestamp.split("-");
        const expectedDate = new Date(blockTimestamp * 1000); // Convert timestamp to date

        // Validate if contract timestamp matches the actual blockchain timestamp
        expect(parseInt(day)).to.equal(expectedDate.getUTCDate());
        expect(parseInt(month)).to.equal(expectedDate.getUTCMonth() + 1);
        expect(parseInt(year)).to.equal(expectedDate.getUTCFullYear());
    });

    // Test: The contract should return the correct sender and receiver for transactions
    it("Should return the correct sender and receiver of transactions", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Execute transfer
        
        const sender = await token.getTransactionSender(); // Get sender address from contract
        const receiver = await token.getTransactionReceiver(); // Get receiver address

        // Validate sender and receiver addresses
        expect(sender).to.equal(owner.address);
        expect(receiver).to.equal(addr1.address);
    });

    // Test: The contract should store and return transaction details correctly
    it("Should return the correct transaction details by index", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Execute transfer

        // Retrieve transaction details from contract by index 0
        const [sender, receiver, amount] = await token.getTransaction(0);

        // Validate transaction details
        expect(sender).to.equal(owner.address);
        expect(receiver).to.equal(addr1.address);
        expect(amount.toString()).to.equal(transferAmount.toString());
    });
});
