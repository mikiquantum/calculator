let WalletProvider = require("truffle-wallet-provider");
// require('dotenv').config();

// Read and unlock keystore
let keystore = require('fs').readFileSync('./account').toString();
let pass = "";
let wallet = require('ethereumjs-wallet').fromV3(keystore, pass);
let endpoint = process.env.PROVIDER_ENDPOINT || "http://127.0.0.1:8545";
// console.log(wallet.getPrivateKey().toString('hex'));

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    test: {
      provider: new WalletProvider(wallet, endpoint),
      network_id: "17"
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
