// file: ./circuits/test/multiplier.test.ts

const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("Loan Eligibility circuit", function () {
  let loanEligibilityCircuit;

  before(async function () {
    loanEligibilityCircuit = await wasm_tester("./circuit/loanEligibility.circom");
  });

  it("Should generate the witness successfully", async function () {
    const input = {
      "loanAmount": "1000", 
      "collateral": "2000000000000000000",  
      "useCollateralVerification": 1,            
      "minCollateral": "1000000000000000000",    
      "amounts": ["500000000000000000", "600000000000000000", "400000000000000000"],  
      "timestamps": ["1609459200", "1640995200", "1682467200"],  
      "minCumulative": "1000000000000000000",    
      "minDate" : "0",
    };
    const witness = await loanEligibilityCircuit.calculateWitness(input);
    console.log(witness);
    await loanEligibilityCircuit.assertOut(witness, {});
  });

  it("Should fail because there is a number out of bounds", async function () {
    const input = { in: [4, 5, 7] };
    try {
      await loanEligibilityCircuit.calculateWitness(input);
    } catch (err) {
      //   console.log(err);
      assert(err.message.includes("Too many values for input signal in"));
    }
  });
});
