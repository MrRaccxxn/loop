template LoanEligibility() {
    signal input isReturningBorrower;        // 0 = new, 1 = returning
    signal input past_loans_count;           // Number of past loans
    signal input successful_repayments;      // Number of successful repayments
    signal input collateral_or_income;       // Alternative credit source (e.g., income, collateral)

    signal output eligible;

    // Returning users need 80% successful repayments
    signal returnEligible = isReturningBorrower * ((successful_repayments * 100) >= (past_loans_count * 80));

    // New users need collateral or income > minimum threshold
    signal newEligible = (1 - isReturningBorrower) * (collateral_or_income >= minimum_collateral);

    // Either condition satisfies eligibility
    eligible <== returnEligible + newEligible;
}

// Instantiate the circuit
component main = LoanEligibility();