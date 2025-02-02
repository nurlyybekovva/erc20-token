# AstanaItUniversity_SE2314
# Team: Alua Nurlybekova, Alikhan Sailybaev, Zarina Beketova

AstanaItUniversity_SE2314 is a smart contract that implements an ERC-20 token, enhanced with extra features to fetch and display transaction details.

---

## Overview

This contract provides the core functionality of an ERC-20 token, with added capabilities for handling transactions:
- **Token Minting:** When deployed, 2000 tokens are generated and assigned to the creator of the contract.
- **Transaction Logging:** Each transaction is recorded in an event, containing detailed information.
- **Transaction Data Access:**
  - Address of the sender.
  - Address of the recipient.
  - Readable timestamp of the most recent transaction.

---

## Installation Guide

### Clone the Repository

```bash
git clone https://github.com/your-repository.git
cd your-repository
```

---

### Install Required Dependencies

```bash
npm install
```

---

### Run Unit Tests

```bash
npx hardhat test
```

![Run Tests](./screenshots/)

---

### Deploy to Local Network

Set up a local blockchain (e.g., Ganache), and then deploy the contract using:

```bash
npx hardhat run scripts/deploy.js --network ganache
```

![Deploy Contract](./screenshots/)

---

## Example Usages

### Check Token Balance

Fetch the token balance of the contract’s owner:

```javascript
const balance = await token.balanceOf(owner.address);
console.log("Balance:", ethers.utils.formatUnits(balance, 18));
```

![Check Balance](./screenshots/)

---

### Example of a Token Transfer

Send 100 tokens to a different address:

```javascript
await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18));
```

![Transaction Example](./screenshots/)

---

### Retrieve Transaction Details

1. Get the sender’s address from the latest transaction:

   ```javascript
   const sender = await token.getTransactionSender();
   console.log("Sender address:", sender);
   ```

   ![Get Sender](./screenshots/)

2. Get the receiver’s address of the most recent transaction:

   ```javascript
   const receiver = await token.getTransactionReceiver();
   console.log("Receiver address:", receiver);
   ```

   ![Get Receiver](./screenshots/)

3. Fetch the timestamp of the latest transaction:

   ```javascript
   const timestamp = await token.getTransactionTimestamp();
   console.log("Last transaction timestamp:", timestamp);
   ```

   ![Get Timestamp](./screenshots/)

---

## Project Screenshots

Below are some key screenshots showcasing the project setup and actions:

1. Cloning the repository:
   ![Clone Repository](./screenshots/)

2. Installing necessary dependencies:
   ![Install Dependencies](./screenshots/)

3. Running unit tests:
   ![Run Tests](./screenshots/)

4. Deploying the smart contract:
   ![Deploy Contract](./screenshots/)

5. Usage examples:
   - Check token balance.
   - Execute a transfer.
   - Fetch transaction details.
```
