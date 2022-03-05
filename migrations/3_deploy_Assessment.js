const Assessment = artifacts.require("Assessment");

module.exports = function (deployer) {
  deployer.deploy(Assessment);
};
