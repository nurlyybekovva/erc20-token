// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AstanaItUniversity_SE2314 is ERC20 {
    // Event to log transaction details
    event TransactionDetails(address indexed sender, address indexed receiver, uint256 amount, uint256 timestamp);

    // Struct to store transaction information
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store all transactions
    Transaction[] private transactions;
    uint256 private initialMintValue;

    // Constructor: Initializes the token with a given initial supply
    constructor() ERC20("AstanaItUniversity_SE2314", "AIU2314") {
        initialMintValue = 2000 * 10 ** decimals(); // Mint 2000 tokens
        _mint(msg.sender, initialMintValue);
    }

    // Function to retrieve the initial minted token supply
    function getInitialMintValue() public view returns (uint256) {
        return initialMintValue;
    }

    // Override the transfer function to log transactions
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        bool success = super.transfer(recipient, amount);
        if (success) {
            transactions.push(Transaction(msg.sender, recipient, amount, block.timestamp));
            emit TransactionDetails(msg.sender, recipient, amount, block.timestamp);
        }
        return success;
    }

    // Function to return the latest transaction timestamp in a human-readable format
    function getTransactionTimestamp() public view returns (string memory) {
        require(transactions.length > 0, "No transactions yet");
        return _timestampToString(transactions[transactions.length - 1].timestamp);
    }

    // Function to retrieve the sender address of the latest transaction
    function getTransactionSender() public view returns (address) {
        require(transactions.length > 0, "No transactions yet");
        return transactions[transactions.length - 1].sender;
    }

    // Function to retrieve the receiver address of the latest transaction
    function getTransactionReceiver() public view returns (address) {
        require(transactions.length > 0, "No transactions yet");
        return transactions[transactions.length - 1].receiver;
    }

    // Function to retrieve details of a specific transaction by index
    function getTransaction(uint256 index) public view returns (address, address, uint256, uint256) {
        require(index < transactions.length, "Transaction does not exist");

        Transaction memory txn = transactions[index];
        return (txn.sender, txn.receiver, txn.amount, txn.timestamp);
    }

    // Convert a timestamp to a readable date format (DD-MM-YYYY)
    function _timestampToString(uint256 timestamp) internal pure returns (string memory) {
        (uint year, uint month, uint day) = _daysToDate(timestamp / 86400);
        return string(abi.encodePacked(uint2str(day), "-", uint2str(month), "-", uint2str(year)));
    }

    // Convert days since epoch to a human-readable date (year, month, day)
    function _daysToDate(uint _days) internal pure returns (uint year, uint month, uint day) {
        int __days = int(_days);
        int L = __days + 68569 + 2440588; // Offset for Unix epoch
        int N = 4 * L / 146097;
        L = L - (146097 * N + 3) / 4;
        int _year = 4000 * (L + 1) / 1461001;
        L = L - 1461 * _year / 4 + 31;
        int _month = 80 * L / 2447;
        int _day = L - 2447 * _month / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;
        
        year = uint(_year);
        month = uint(_month);
        day = uint(_day);
    }

    // Convert unsigned integer to string
    function uint2str(uint _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
