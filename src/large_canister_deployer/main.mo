import P "mo:base/Prelude";
import Array "mo:base/Array";
import MgmtCanister "./MgmtCanister";

actor {

    var canisterWasm: [Nat8] = [];
    
    public func reset(): async () {
        canisterWasm := [];
    };

    ////////////////////////////////
    ////////////////////////////////
    // append to the `canisterWasm`
    public func appendWasm(blob: [Nat8]): async (Nat) {
        canisterWasm := Array.append<Nat8>(canisterWasm, blob);
        // return casnisterWasm size
        canisterWasm.size()
    };

    public func getWasmHash(): async (Blob) {
        // return hash of the wasm
        P.nyi()
    };

    // hash 
    public func deployWasm(canisterSettings: ?MgmtCanister.Canister_settings): async (Principal) {
        let mgmtCanister = MgmtCanister.getManagementCanister();
        let resp = await mgmtCanister.create_canister({settings= null});
        // deploy the `canisterWasm` metadata and return the Principal
        return resp.canister_id;
    };
};
