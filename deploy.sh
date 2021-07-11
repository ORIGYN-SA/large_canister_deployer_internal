set -x

# dfx canister call large_canister_deployer reset

# dfx canister call large_canister_deployer appendWasm 'vec { 123; 22; }'

cd chunker_appender && node index.js && cd ..

dfx canister call large_canister_deployer deployWasm '(null, vec {})'
