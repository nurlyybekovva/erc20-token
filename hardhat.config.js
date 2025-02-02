require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0xb9b33d9589266ad6865c9d558dac467cad74068d512673ed55c74aaab07bc4e9", "0x2a186a0fcbe98c37464ba4cd66c072fe6f7c6c09ae1a25d1c1b7d84723e13a54"] 
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
