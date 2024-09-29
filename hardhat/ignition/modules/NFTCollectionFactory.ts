import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const NFTCollectionFactoryModule = buildModule("NFTCollectionFactory", (m) => {

  const NFTCollectionFactory = m.contract("NFTCollectionFactory");

  return { NFTCollectionFactory };
});

export default NFTCollectionFactoryModule;
