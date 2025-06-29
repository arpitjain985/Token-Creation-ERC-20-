async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("MyCustomToken");
  const token = await Token.deploy(
    "CryptoDevToken",   // Name
    "CDT",              // Symbol
    18,                 // Decimals
    1000000             // Initial supply (1 million)
  );

  await token.deployed();

  console.log("Token deployed to:", token.address);
  
  // Verify contract (optional)
  try {
    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: [
        "CryptoDevToken",
        "CDT",
        18,
        1000000
      ],
    });
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
