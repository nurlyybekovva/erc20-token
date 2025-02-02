const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstanaItUniversity_SE2314", function () {
    let Token, token, owner, addr1;

    // The beforeEach function runs before every test case to set up the environment
    beforeEach(async function () {
        // Getting the account addresses to interact with the contract
        [owner, addr1] = await ethers.getSigners();
        const initialMintValue = 5000;  // Set the number of tokens to mint initially
        Token = await ethers.getContractFactory("AstanaItUniversity_SE2314");
        token = await Token.deploy(initialMintValue); // Deploy the token contract with the initial supply
        await token.deployed(); // Wait until the contract is fully deployed
    });

    // Test to ensure the owner is assigned the correct amount of tokens upon contract creation
    it("Should mint the specified amount of tokens to the owner", async function () {
        const balance = await token.balanceOf(owner.address);
        // Ensure the minted balance is correct
        expect(balance.toString()).to.equal(ethers.utils.parseUnits("5000", 18).toString());
    });

    // Test to check the token transfer functionality from owner to addr1
    it("Should transfer tokens to addr1", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Transfer 100 tokens to addr1
        
        // Verify that addr1 received the correct amount
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("100.0");

        // Verify the owner's balance is reduced by the transferred amount
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ethers.utils.formatUnits(ownerBalance, 18)).to.equal("4900.0");
    });

    // Test to ensure the contract returns the correct initial mint value
    it("Should return the correct initial mint value", async function () {
        const initialMintValue = 5000;
        const value = await token.getInitialMintValue(); // Get the initial mint value
        expect(value.toString()).to.equal(initialMintValue.toString());
    });

    // Test to verify the timestamp of the contract after a transfer
    it("Should return the correct timestamp after a transfer", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        const tx = await token.transfer(addr1.address, transferAmount); // Transfer tokens
        const receipt = await tx.wait(); // Wait for the transaction to be mined
        
        const contractTimestamp = await token.getTransactionTimestamp(); // Get timestamp from contract
        const blockTimestamp = (await ethers.provider.getBlock(receipt.blockNumber)).timestamp; // Get block timestamp

        // Split the contract timestamp into date components and compare it with block timestamp
        const [day, month, year] = contractTimestamp.split("-");
        const expectedDate = new Date(blockTimestamp * 1000);

        expect(parseInt(day)).to.equal(expectedDate.getUTCDate());
        expect(parseInt(month)).to.equal(expectedDate.getUTCMonth() + 1);
        expect(parseInt(year)).to.equal(expectedDate.getUTCFullYear());
    });

    // Test to check the sender and receiver of the transaction
    it("Should return the correct sender and receiver of transactions", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Transfer tokens
        
        const sender = await token.getTransactionSender(); // Get the sender of the last transaction
        const receiver = await token.getTransactionReceiver(); // Get the receiver of the last transaction
        
        expect(sender).to.equal(owner.address); // Verify the sender is the owner
        expect(receiver).to.equal(addr1.address); // Verify the receiver is addr1
    });

    // Test to ensure the correct details are returned for a transaction by its index
    it("Should return the correct transaction details by index", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount); // Transfer tokens
        const [sender, receiver, amount] = await token.getTransaction(0); // Get transaction details by index
        expect(sender).to.equal(owner.address); // Check if the sender is correct
        expect(receiver).to.equal(addr1.address); // Check if the receiver is correct
        expect(amount.toString()).to.equal(transferAmount.toString()); // Check if the amount is correct
    });
});
