/* 13/02/2023
*/ 
let web3, account, accounts, provider, getProvider, contract_diamond;

const chainNAME = "Cronos Tesnet";
const chainID = "338";

LoadedLionsTreasuryFacet = {
  contractName: "LoadedLionsTreasuryFacet",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "itemId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tax",
          type: "uint256",
        },
      ],
      name: "Buy",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "DiamondPurchaseInCompetitiveWorld",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "DiamondPurchaseInPersistentWorld",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "receivers",
          type: "address[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "fees",
          type: "uint256[]",
        },
      ],
      name: "Redeem",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TaxTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct Tax",
          name: "diamondPurchaseTax",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct Tax",
          name: "marketplaceTax",
          type: "tuple",
        },
      ],
      name: "TaxesChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TopUp",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "playersReservesWallet",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "taxRevenueWallet",
          type: "address",
        },
      ],
      name: "TreasuryWalletsChanged",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "playersReservesWallet",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "taxRevenueWallet",
          type: "address",
        },
      ],
      name: "setTreasuryWallets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getTreasuryWallets",
      outputs: [
        {
          internalType: "address",
          name: "playersReservesWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "taxRevenueWallet",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          internalType: "struct Tax",
          name: "diamondPurchaseTax",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          internalType: "struct Tax",
          name: "marketplaceTax",
          type: "tuple",
        },
      ],
      name: "setTaxes",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getTaxes",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          internalType: "struct Tax",
          name: "diamondPurchaseTax",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "numerator",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "denominator",
              type: "uint256",
            },
          ],
          internalType: "struct Tax",
          name: "marketplaceTax",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "purchaseDiamondsInCompetitiveWorld",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [],
      name: "purchaseDiamondsInPersistentWorld",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "receivers",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "fees",
          type: "uint256[]",
        },
      ],
      name: "redeem",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [],
      name: "transferTax",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "itemId",
          type: "uint256",
        },
      ],
      name: "buy",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [],
      name: "topUp",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
  ]
};

async function executeTransaction(tx, from, gas, value = 0, gasPrice = undefined) {
  console.log("from estimate", from);
  console.log("gas estimate", gas);
  console.log("value estimate", value);
  console.log("gasPrice estimate", gasPrice);
  if (!gas) {
    gas = await tx.estimateGas({ from, value });
    console.log('gas estimate (', tx._method.name, '):', gas);
  }
  
  return await tx.send({ from, gas, value, gasPrice });
} 

class LoadedLionsTreasuryContractWrapper {

  initWithAddress(web3, diamondAddress) {
    this.address = diamondAddress;
    this.treasury = new web3.eth.Contract(LoadedLionsTreasuryFacet.abi, diamondAddress);
  }

  purchaseDiamondsInCompetitiveWorld(sender, gas, value) {
    return executeTransaction(this.treasury.methods.purchaseDiamondsInCompetitiveWorld(), sender, gas, value);
  }

  purchaseDiamondsInPersistentWorld(sender, gas, value) {
    return executeTransaction(this.treasury.methods.purchaseDiamondsInPersistentWorld(), sender, gas, value);
  }

  buy(seller, itemId, buyer, gas, value) {
    console.log("seller estimate", seller);
    console.log("itemId estimate", itemId);
    console.log("buyer estimate", buyer);
    console.log("gas estimate", gas);
    console.log("value estimate", value);
    return executeTransaction(this.treasury.methods.buy(seller, itemId), buyer, gas, value);
  }

  getTreasuryWallets() {
    return this.treasury.methods.getTreasuryWallets().call();
  }

  getTaxes() {
    return this.treasury.methods.getTaxes().call();
  }

}

async function connectMetamask() {
  if (window.ethereum) {
    try {
    
      provider = window.ethereum;
      web3 = new Web3(provider);

      accounts = await provider.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      console.log("eth_requestAccounts: ", account);

      provider.on("accountsChanged", async () => {
        accounts = await provider.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        console.log("accountsChanged: ", account);
      });

      provider.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      if (accounts != undefined) {

        const currentChainId = await web3.eth.getChainId();

        if (currentChainId != 338) {
          try {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x152" }],
            });
          } catch (error) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x152",
                      rpcUrls: ["https://evm-t3.cronos.org"],
                      chainName: "Cronos Testnet",
                      blockExplorerUrls: [
                        "https://cronos.org/explorer/testnet3/",
                      ],
                      nativeCurrency: {
                        name: "Cronos Testnet",
                        symbol: "tCRO", // 2-6 characters long
                        decimals: 18,
                      },
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
                console.log("error.code == 'bad' || error.code == 'bad'");
              }
            console.error(error);
          }
        }

      }
    } catch (error) {
      console.error(error);
      console.log("error.code: ", error);
      //window.location.reload();
      if(error.code == -32002) {
        web3.eth.getAccounts(function (err, accounts) {
          if (err != null) console.log("An error occurred: " + err);
          else if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            

            alert("Please select the metamask icon in your browser's extension bar and log in");
          } else {
            // Do something with the available accounts here.
          }
        });
      }
    }
  } else {
    let url = "https://metamask.io/download/";
    if (
      window.confirm("MetaMask is not installed. Do you want to install it?")
    ) {
      window.open(url);
      return;
    }
  }

  web3 = new Web3(provider);

  contract_diamond = new LoadedLionsTreasuryContractWrapper(web3);
  contract_diamond.initWithAddress(
    web3,
    "0x297CAFCC0a0c98476db1586c9bB2d89b44494cD7"
  );
}


async function connectCronos() {
  /* provider = new window.DeFiConnectProvider.DeFiConnectProvider({
    mode: "regular",
    rpcNetwork: {
        rpcUrl: "https://evm-t3.cronos.org/",
        chainId: "338",
        chainIdHex: "0x152",
        chainName: "Cronos Testnet",
        chainType: "testnet",
        nativeCurrency: {
        name: "CRO",
        symbol: "CRO",
        decimals: 18,
        },
        blockExplorerUrl: "https://cronos.crypto.org/explorer/testnet3/",
    }
  }); */

  const connector = new window.DeFiConnect.DeFiWeb3Connector({
    supportedChainIds: [338],
    rpc: {
      [338]: "https://evm-t3.cronos.org/",
    },
    pollingInterval: 15000,
  });
  console.log(connector);
  await connector.activate();
  const provider = await connector.getProvider();

  
  if (provider !== undefined) {

    accounts = await provider.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    console.log("eth_requestAccounts: ", account);

    /* provider.on("accountsChanged", async () => {
      accounts = await provider.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      console.log("accountsChanged: ", account);
    });

    provider.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    if (provider.chainId !== "338") {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x152` }],
      });
    } */

  } else {
    let url = "https://crypto.com/defi-wallet#wallet_extension";
      if (window.confirm("DeFi Wallet is not installed. Do you want to install it?")) {
        window.open(url);
        return;
      }
  }
  web3 = new Web3(provider);

  contract_diamond = new LoadedLionsTreasuryContractWrapper(web3);
  contract_diamond.initWithAddress(
    web3,
    "0x297CAFCC0a0c98476db1586c9bB2d89b44494cD7"
  );
  
}
