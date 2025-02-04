const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x83E398a9da9C5EBA535eA793Fce4A45a267a3340"); // change it with your deployed token address

    const recipient = "0x79f8cac6d9b197ce7e7e92f605d4281462e86b1d15ff299075cfbb155695fd37"; 
    const amount = hre.ethers.utils.parseUnits("100", 18); 

    const tx = await token.transfer(recipient, amount);
    await tx.wait();

    console.log(`Successfully transferred 100 tokens to ${recipient}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
