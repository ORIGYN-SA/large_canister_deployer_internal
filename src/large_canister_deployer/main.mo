import P "mo:base/Prelude";
import Array "mo:base/Array";
actor {
    type CanisterSettings = {
        controller: Principal;
        cycles: Nat64;
    };

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
    public func deployWasm(canisterSettings: CanisterSettings): async (Principal) {
        // deploy the `canisterWasm` metadata and return the Principal
        P.nyi()
    };
};
