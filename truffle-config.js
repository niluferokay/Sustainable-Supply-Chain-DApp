const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    develop: {
      port: 7545
    }
  }
};
