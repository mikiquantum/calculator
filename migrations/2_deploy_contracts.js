let SimpleCalculator = artifacts.require("./SimpleCalculator.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleCalculator);
};
