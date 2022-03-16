const Assessments = artifacts.require("Assessments");

module.exports = function (deployer) {
  deployer.deploy(Assessments);
};
