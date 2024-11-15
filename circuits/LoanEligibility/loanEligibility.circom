pragma circom 2.0.0;

template LoanEligibility() {
    signal input collateral;           // User's collateral amount
    signal input expectedCollateral;   // Expected collateral amount
    signal output isValid;             // Output: Whether the user is eligible for the loan or not

    signal diff;                       // Difference between collateral and expectedCollateral
    diff <== collateral - expectedCollateral;

    // Ensure diff is zero by squaring it (this enforces collateral == expectedCollateral)
    isValid <== diff * diff;           // If diff is 0, collateral == expectedCollateral
}

// Create the main component
component main = LoanEligibility();