const hre = require("hardhat");

async function main() {
    const [owner, addr1] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x83E398a9da9C5EBA535eA793Fce4A45a267a3340"); // change it with your deployed token address

    const amount = hre.ethers.utils.parseUnits("100", 18); 
    const recipient = addr1.address;

    // Возврат токенов
    const tokenFromAddr1 = token.connect(addr1);
    const tx = await tokenFromAddr1.transfer(owner.address, amount);
    await tx.wait();

    console.log(`Successfully returned 100 tokens from ${recipient} to ${owner.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
