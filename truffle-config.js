// require('babel-register');
// require('babel-polyfill');

module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*" // OR "5777" OR Match any network id
      },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis/',
    compilers: {
      solc: {
        version: '^0.6.0',
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }