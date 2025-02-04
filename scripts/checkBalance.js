async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x83E398a9da9C5EBA535eA793Fce4A45a267a3340"); // change it with your deployed token address
    const balance = await token.balanceOf(deployer.address);
    console.log("Owner balance:", ethers.utils.formatUnits(balance, 18));
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  