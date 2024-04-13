const ethers = require('ethers');


// Setup provider and contract variables
const provider = new ethers.JsonRpcProvider("https://rpc-evm-sidechain.xrpl.org");
const contractAddress = "0xF5C671f6a14e3C4ceb82c005a595A2e86DE86e91"; // Replace with actual address after deployment
const contractABI = [
    "function buyShares(address to, uint256 amount) public payable"
];

const privateKey = "98cbac7a03a3989b75c61f6a6feeddc9be09c34b195d26f847195acd0b6ee7d5";  // DO NOT hard-code in production
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);


const buyShares = async (req, res) =>  {
    // try {
    //     const { investorId, amount } = req.body;
    //     const transactionResponse = await contract.buyShares(investorId, amount);
    //     await transactionResponse.wait();
    //     res.send({ success: true, transactionHash: transactionResponse.hash });
    // } catch (error) {
    //     res.status(500).send({ success: false, message: error.message });
    // }

    const { to, amount } = req.body;
    try {
        const tx = await contract.buyShares(to, amount, { value: ethers.utils.parseEther((amount).toString()) });
        const receipt = await tx.wait();
        res.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

};

module.exports = { buyShares };