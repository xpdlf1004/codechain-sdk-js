## Table of Contents

- [Install package](#install-package)
- [Usage examples](#usage-examples)
    - [Setup the test account](#setup-the-test-account)
    - [Get the latest block number](#get-the-latest-block-number)
    - [Create a new account with a private key](#create-a-new-account-with-a-private-key)
    - [Create a new account with RPC](#create-a-new-account-with-rpc)
    - [Get the balance of an account](#get-the-balance-of-an-account)
    - [Send a payment parcel via sendParcel](#send-a-payment-parcel-via-sendparcel)
    - [Send a payment parcel via sendSignedParcel](#send-a-payment-parcel-via-sendsignedparcel)
    - [Create an asset transfer address](#create-an-asset-transfer-address)
    - [Mint a new asset](#mint-a-new-asset)
    - [Transfer assets](#transfer-assets)
- [SDK modules](#sdk-modules)

# Install package

```sh
# npm
npm install codechain-sdk
# yarn
yarn add codechain-sdk
```

# Usage examples

Make sure that your CodeChain RPC server is listening. In the examples, we assume that it is localhost:8080

## Setup the test account

Before you begin to meet various examples, you need to setup the account. The given account below(`tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78`) holds 100000 CCC at the genesis block. It's a sufficient amount to pay for the parcel fee.

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

var secret = "ede1d4ccb4ec9a8bbbae9a13db3f4a7b56ea04189be86ac3a6a439d9a0a1addd";
var passphrase = "satoshi";
sdk.rpc.account.importRaw(secret, passphrase).then(function(account) {
  console.log(account); // tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78
});
```

---

## Get the latest block number

You can retrieve the chain information using methods in `sdk.rpc.chain`.

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

sdk.rpc.chain.getBestBlockNumber().then(function(num) {
  console.log(num);
});
```

---

## Create a new account with a private key

```javascript
var SDK = require("codechain-sdk");

var secret = SDK.util.generatePrivateKey();
console.log("Your secret:", secret);

var account = SDK.util.getAccountIdFromPrivate(secret);
var address = SDK.Key.classes.PlatformAddress.fromAccountId(account, {
  networkId: "tc"
});
console.log("Your CodeChain address:", address.toString());
```

---

## Create a new account with RPC

You can manage accounts and create their signatures using methods in `sdk.rpc.account`.

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

var passphrase = "my-secret";
sdk.rpc.account.create(passphrase).then(function(account) {
  console.log(account); // string that starts with "ccc". For example: tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78
});
```

---

## Get the balance of an account

You can get the balance of an account using `getBalance` method in `sdk.rpc.chain`. See also `getNonce`, `getRegularKey`.

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

sdk.rpc.chain
  .getBalance("tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78")
  .then(function(balance) {
    // the balance is a U256 instance at this moment. Use toString() to print it out.
    console.log(balance.toString()); // the amount of CCC that the account has.
  });
```

---

## Send a payment parcel via sendParcel

When you create an account, the CCC balance is 0. CCC is needed to pay for the parcel's fee. The fee must be at least 10 for any parcel. The example below shows the sending of 10000 CCC from the test account(`tccqzn..9a2k78`) to the account(`tccqru..7vzngg`).

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

var parcel = sdk.core.createPaymentParcel({
  recipient: "tccqruq09sfgax77nj4gukjcuq69uzeyv0jcs7vzngg",
  amount: 10000
});

sdk.rpc.chain
  .sendParcel(parcel, {
    account: "tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78",
    passphrase: "satoshi"
  })
  .then(function(parcelHash) {
    return sdk.rpc.chain.getParcelInvoice(parcelHash, { timeout: 300 * 1000 });
  })
  .then(function(parcelInvoice) {
    console.log(parcelInvoice); // { success: true }
  });
```

---

## Send a payment parcel via sendSignedParcel

```javascript
var SDK = require("codechain-sdk");

var sdk = new SDK({ server: "http://localhost:8080" });

var parcel = sdk.core.createPaymentParcel({
  recipient: "tccqruq09sfgax77nj4gukjcuq69uzeyv0jcs7vzngg",
  amount: 10000
});

var account = "tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78";
var accountSecret =
  "ede1d4ccb4ec9a8bbbae9a13db3f4a7b56ea04189be86ac3a6a439d9a0a1addd";

sdk.rpc.chain
  .getNonce(account)
  .then(function(nonce) {
    return sdk.rpc.chain.sendSignedParcel(
      parcel.sign({
        secret: accountSecret,
        fee: 10,
        nonce: nonce
      })
    );
  })
  .then(function(parcelHash) {
    return sdk.rpc.chain.getParcelInvoice(parcelHash, { timeout: 300 * 1000 });
  })
  .then(function(parcelInvoice) {
    console.log(parcelInvoice); // { success: true }
  });
```

---

## Create an asset transfer address

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({
  server: "http://localhost:8080"
});

sdk.key
  .createAssetTransferAddress()
  .then(function(address) {
    // This type of address is used to receive assets when minting or transferring them.
    // Example: tcaqqq9pgkq69z488qlkvhkpcxcgfd3cqlkzgxyq9cewxuda8qqz7jtlvctt5eze
    console.log(address.toString());
  })
  .catch(console.error);
```

---

## Mint a new asset

```javascript
var SDK = require("codechain-sdk");
var sdk = new SDK({ server: "http://localhost:8080" });

// If you want to know how to create an address, see the example "Create an
// asset transfer address".
var address =
  "tcaqqq9pgkq69z488qlkvhkpcxcgfd3cqlkzgxyq9cewxuda8qqz7jtlvctt5eze";

var assetMintTransaction = sdk.core.createAssetMintTransaction({
  scheme: {
    shardId: 0,
    metadata: JSON.stringify({
      name: "Silver Coin",
      description: "...",
      icon_url: "..."
    }),
    amount: 100000000
  },
  recipient: address
});

// Send a change-shard-state parcel to process the transaction.
var parcel = sdk.core.createAssetTransactionGroupParcel({
  transactions: [assetMintTransaction]
});
sdk.rpc.chain
  .sendParcel(parcel, {
    account: "tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78",
    passphrase: "satoshi"
  })
  .then(function(parcelHash) {
    // Get the invoice of the parcel.
    return sdk.rpc.chain.getParcelInvoice(parcelHash, {
      // Wait up to 120 seconds to get the invoice.
      timeout: 120 * 1000
    });
  })
  .then(function(invoice) {
    // The invoice of change-shard-state parcel is an array of the object that has
    // type { success: boolean }. Each object represents the result of each
    // transaction.
    console.log(invoice); // [{ success: true }]
  });
```

---

## Transfer assets

A brief version of the example will be uploaded soon. The entire example can be viewed [here](https://github.com/CodeChain-io/codechain-sdk-js/blob/master/examples/mint-and-transfer.js).

---

# SDK modules

- [RPC](classes/rpc.html)
  - [node](classes/noderpc.html)
  - [chain](classes/chainrpc.html)
  - [network](classes/networkrpc.html)
  - [account](classes/accountrpc.html)
- [Core](classes/core.html)
  - [classes](classes/core.html#classes-1) (Block, Parcel, Transaction, ...)
- [Utility](classes/sdk.html#util)
