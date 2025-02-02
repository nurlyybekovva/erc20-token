const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0xE3DfE91D2dF06b5b97d0f27c3Bc758BB2bDeBb2d"); 

    const sender = await token.getTransactionSender();
    console.log("Sender address:", sender);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
