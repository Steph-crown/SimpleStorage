const ethers = require("ethers");
const fs = require("fs-extra");
const dotenv = require("dotenv");

dotenv.config();

const main = async () => {
  // compile the contract
  // HTTP://127.0.0.1:7545

  // connect to this node through the rpc provider
  // node runs on ganache
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  // get the signer wallet
  // this is the account that we will use to sign transactions
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const encrypedJson = fs.readFileSync(".encryptedJsonKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encrypedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );

  // wallet = await wallet.connect(provider);

  // contract abi
  const abi = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.json",
    "utf-8"
  );

  // contract bytecode
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // abi of contract
  // binary of contract
  // wallet of signer
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, wait...");

  const contract = await contractFactory.deploy({
    gasPrice: "150011275800",
  });
  // console.log(contract);

  // waits for one block to be added
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log("address", contract.address);
  // console.log("Deploy transacyopn");
  // console.log(contract.deployTransaction);

  // console.log("Transaction receipt");
  // console.log(deploymentReceipt);
  const storeResponse = await contract.store("Green");
  const storeReceipt = storeResponse.wait(1);
  const currentFavourite = await contract.retrieveMyFavColor();
  console.log("favourite number", currentFavourite);
};

const deployWithTxn = async (wallet) => {
  const nonce = await wallet.getTransactionCount();
  const txn = {
    nonce,
    to: contractAddress,
    value: 0,
    data: "0x",
    chainId: 1337,
  };

  const sentTxResponse = await wallet.sendTransaction(txn);
  await sentTxResponse.wait(1);
  // console.log("sentResponse", sentTxResponse);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
