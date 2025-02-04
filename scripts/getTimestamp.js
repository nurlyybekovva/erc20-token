const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x83E398a9da9C5EBA535eA793Fce4A45a267a3340"); // change it with your deployed token address
    const timestamp = await token.getTransactionTimestamp();
    console.log("Last transaction timestamp:", timestamp);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
