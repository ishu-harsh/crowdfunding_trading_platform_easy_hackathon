async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const EquityContract = await ethers.getContractFactory("EquityContract");
    const contract = await EquityContract.deploy();
    console.log("EquityContract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
