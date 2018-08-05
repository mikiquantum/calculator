pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleCalculator.sol";

contract TestSimpleCalculator {

  function testItAddsValues() public {
    SimpleCalculator simpleCalculator = SimpleCalculator(DeployedAddresses.SimpleCalculator());

    uint calculated = simpleCalculator.addition(10, 100);

    uint expected = 110;

    Assert.equal(calculated, expected, "It should store the value 110.");
  }

}
