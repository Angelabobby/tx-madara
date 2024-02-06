const starknet = require("starknet");
const { stark, ec, Account } = require("starknet");

// 定义存储合约的ABI
const contractABI = [
  {
    type: "function",
    name: "set",
    inputs: [
      {
        name: "value",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "get",
    outputs: [
      {
        name: "value",
        type: "uint256",
      },
    ],
  },
];

async function main() {
  // 创建一个 StarkNet RPC 提供程序
  const provider = new starknet.RpcProvider({
    nodeUrl: "http://43.133.178.179:9944",
  });

  const privateKey = stark.randomAddress();
  const accountAddress = ec.starkCurve.getStarkKey(privateKey);
  const account = new Account(provider, accountAddress, privateKey);
  console.log(account.deploy);

  // 部署智能合约
  const contractAddress = await account.deploy(contractABI, provider);

  // // 创建一个合约对象，用于与已部署的合约进行交互
  // const contract = new starknet.Contract(contractABI, contractAddress, provider);

  // // 调用智能合约的 set 方法，将值设为 42
  // await contract.invoke("set", [42]);
  // console.log("Value set to 42");

  // // 调用智能合约的 get 方法，获取当前存储的值
  // const value = await contract.call("get");
  // console.log("Current value:", value);
}

main().catch(console.error);
