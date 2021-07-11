const ICAgent = require("@dfinity/agent");
const fetch = require("node-fetch");
// import { Ed25519KeyIdentity } from '@dfinity/auth';
const { Crypto } = require("@peculiar/webcrypto");
const fs = require("fs");
const path = require("path");

// From .dfx/local/canisters/...

const did = ({ IDL }) => {
  const Canister_settings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat),
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat),
  });
  return IDL.Service({
    appendWasm: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat], []),
    deployWasm: IDL.Func(
      [IDL.Opt(Canister_settings), IDL.Vec(IDL.Nat8)],
      [IDL.Principal],
      []
    ),
    getWasmHash: IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    reset: IDL.Func([], [], []),
  });
};
console.log(`did`, did);

global.crypto = new Crypto();

function getAgent() {
  return new ICAgent.HttpAgent({
    // source?: HttpAgent;
    fetch: fetch,
    host: ICP_ENDPOINT,
    identity: new ICAgent.AnonymousIdentity(),
    // identity?: Identity | Promise<Identity>;
    // credentials?: {
    //     name: string;
    //     password?: string;
    // };
  });
}

const ICP_ENDPOINT = "http://localhost:8000";
// const ICP_ED25519 = [ '302a300506032b6570032100b7871183064ab70580d5bab2035c6c6ac2c8ab9f5306a311d3335eec6d03df27', '5c7bb94074101a76513285d047e83a9dd3fd6eca86daf58f09580420842de9f3b7871183064ab70580d5bab2035c6c6ac2c8ab9f5306a311d3335eec6d03df27' ];

const agent = getAgent();

console.log(ICAgent);
const actorClass = ICAgent.Actor.createActorClass(did);

const actor = new actorClass({
  canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
  agent,
});

const bigWasmPath = `/Users/dp/work/ic/rs/rosetta-api/ledger_canister/target_dir/wasm32-unknown-unknown/release/ledger-canister.wasm`;

const data = fs.readFileSync(bigWasmPath);

// console.log({ actor, data });

const SIZE_CHUNK = 1024000; // one megabyte

const chunks = [];

for (var i = 0; i < data.byteLength / SIZE_CHUNK; i++) {
  const startIndex = i * SIZE_CHUNK;
  chunks.push(data.slice(startIndex, startIndex + SIZE_CHUNK));
}

// console.log(chunks);

(async () => {
  console.log("resetting wasm");
  await agent.fetchRootKey(); // in development
  await actor.reset();
  console.log("resetted");
//   console.log(chunks[0])
//   const size = await actor.appendWasm(Array.from(chunks[0]));
//   console.log("size", size)
  for(var i = 0; i < chunks.length; i++) {
    const chnk = chunks[i]
    console.log("appending wasm ", i);
    const size = await actor.appendWasm(Array.from(chnk));
    console.log("appended: size is ", size);
  };

  process.exit(1);
})();
