pragma circom 2.0.0;

template LoanEligibility() {
    signal input loanAmount;       // Loan amount requested
    signal input collateral;       // Collateral provided by the user
    signal input useCollateralVerification; // 1: Use collateral verification, 0: Use historical verification
    signal input minCollateral;    // Minimum collateral required

    // Historical data inputs
    signal input amounts[3];      // Array of transaction amounts
    signal input timestamps[3];   // Array of transaction timestamps
    signal input minCumulative;    // Minimum cumulative transaction amount required
    signal input minDate;          // Minimum date for the first transaction

    signal output isEligible;      // Output: Is the user eligible for the loan?

    // === Collateral-Based Verification ===
    signal collateralDiff; 
    signal isCollateralSufficient; 

    // Calculate the difference between collateral and minimum required
    collateralDiff <== collateral - minCollateral;

    // Signals for handling positivity check
    signal collateralNonNegative; // 1 if collateralDiff >= 0, otherwise 0
    signal collateralNegative;     // 1 if collateralDiff < 0, otherwise 0

    // Ensure collateralDiff is non-negative (collateralDiff >= 0)
    collateralNonNegative <== collateralDiff * collateralDiff; // If collateralDiff >= 0, collateralNonNegative will be non-zero.
    
    // Calculate whether collateral is negative (collateralDiff < 0)
    collateralNegative <== collateralDiff * (collateralDiff - 1); // If collateralDiff < 0, collateralNegative will be non-zero.

    // Ensure both collateralNonNegative and collateralNegative cannot be true at the same time
    signal bothNonNegativeAndNegative;
    bothNonNegativeAndNegative <== collateralNonNegative + collateralNegative;

    // If bothNonNegativeAndNegative is 1, this means there's a conflict. Set eligibility accordingly.
    isCollateralSufficient <== collateralNonNegative;

    // === Historical Data-Based Verification ===
    signal cumulativeAmount[11]; // Array to store cumulative sums
    cumulativeAmount[0] <== 0;   // Initial cumulative amount is zero

    for (var i = 0; i < 3; i++) {
        // Ensure the cumulative amount adds up correctly
        cumulativeAmount[i + 1] <== cumulativeAmount[i] + amounts[i];
    }

    // To check if the cumulative amount is greater than or equal to minCumulative
    signal cumulativeAmountDiff;
    cumulativeAmountDiff <== cumulativeAmount[3] - minCumulative;  // Difference between cumulative sum and minimum required

    signal isCumulativeValid;
    isCumulativeValid <== cumulativeAmountDiff * cumulativeAmountDiff; // Ensuring the difference is non-negative (>= 0)

    // === First Transaction Date Check ===
    signal firstTransactionValid;
    signal transactionTimeDiff;
    transactionTimeDiff <== timestamps[0] - minDate; // Calculate the difference
    firstTransactionValid <== transactionTimeDiff * transactionTimeDiff; // Ensure the difference is non-negative (>= 0)

    signal isHistoryValid;
    isHistoryValid <== isCumulativeValid * firstTransactionValid;

    // === Final Eligibility Check ===

    // Intermediate signals to determine eligibility based on collateral or history
    signal collateralCheck;
    collateralCheck <== useCollateralVerification * isCollateralSufficient; // If collateral verification is chosen, set collateralCheck based on isCollateralSufficient

    signal historyCheck;
    historyCheck <== (1 - useCollateralVerification) * isHistoryValid; // If history verification is chosen, set historyCheck based on isHistoryValid

    // Now, combine both checks
    isEligible <== collateralCheck + historyCheck;
}

// Main component
component main = LoanEligibility();
