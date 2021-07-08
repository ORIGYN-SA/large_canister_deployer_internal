import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as large_canister_deployer_idl, canisterId as large_canister_deployer_id } from 'dfx-generated/large_canister_deployer';

const agent = new HttpAgent();
const large_canister_deployer = Actor.createActor(large_canister_deployer_idl, { agent, canisterId: large_canister_deployer_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await large_canister_deployer.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
