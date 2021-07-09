set -x

dfx canister call large_canister_deployer reset

# TODO: script to chunk big wasm file and call appendWasm

dfx canister call large_canister_deployer appendWasm 'vec { 123; 22; }'


dfx canister call large_canister_deployer deployWasm 'record {}'
