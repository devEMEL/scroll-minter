
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EmelTokenModule = buildModule("EmelTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 20000);

  const emelToken = m.contract("EmelToken", [initialSupply]);

  return { emelToken };
});

export default EmelTokenModule;
