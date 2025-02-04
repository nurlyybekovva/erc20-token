require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x01839266fd9f09e77611715228d707fe2b4916c5e8c87f99dc3e22a189da2456",
        "0x957955216397089cf005d2427d1f8403e6c27f429115f421b9c0d8028a661779"
      ]
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};