const ethers = require("ethers");
const fs = require("fs-extra");

const main = async () => {
  // compile the contract
  // HTTP://127.0.0.1:7545

  // connect to this node through the rpc provider
  // node runs on ganache
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  // get the signer wallet
  // this is the account that we will use to sign transactions
  const wallet = new ethers.Wallet(
    "706d55b7012aac6250a6cdce53ada410730bf7b3b1af2534beab0f8cdf34f0c0",
    provider
  );

  // contract abi
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");

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

  const contract = await contractFactory.deploy();
  console.log(contract);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
