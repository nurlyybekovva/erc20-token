async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0xE3DfE91D2dF06b5b97d0f27c3Bc758BB2bDeBb2d"); 
    const balance = await token.balanceOf(deployer.address);
    console.log("Owner balance:", ethers.utils.formatUnits(balance, 18));
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  