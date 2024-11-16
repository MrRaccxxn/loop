// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";

interface ILoanEligibilityVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external view returns (bool);
}

contract MicroLoans {
    IPyth pyth;
    bytes32 celoUsdPriceId;
    ILoanEligibilityVerifier public verifier;

    constructor(address _pyth, bytes32 _celoUsdPriceId, address _verifier) {
        pyth = IPyth(_pyth);
        celoUsdPriceId = _celoUsdPriceId;
        verifier = ILoanEligibilityVerifier(_verifier);
    }

    struct Loan {
        address borrower;
        address lender;
        uint256 amount; // Principal loan amount
        uint256 collateral; // Collateral amount
        uint256 dueDate; // Due date in timestamp
        bool isPaid; // Loan repayment status
    }

    // Enum for loan types
    enum LoanType {
        Collateral, // Requires collateral
        ProofOfHistoric // Based on platform payment history
    }

    uint256 public constant FIXED_COLLATERAL_PERCENTAGE = 25; //25% extra for collateral
    uint256 public constant FIXED_INTEREST_RATE = 5; // 5% interest
    uint256 public constant FLUCTUACION_TOLERANCE = 3; //3% fluctuacion tolerance

    uint256 public loanCounter;
    mapping(uint256 => Loan) public loans;

    event LoanRequested(
        uint256 loanId,
        address borrower,
        uint256 amount,
        uint256 collateral
    );
    event LoanAccepted(uint256 loanId, address lender);
    event LoanRepaid(uint256 loanId);

    // Borrower requests a loan
    function requestLoan(
        uint256 loanAmount,
        uint256 collateral,
        LoanType loanType,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) public payable {
        require(verifier.verifyProof(a, b, c, input), "Proof denied");

        if (loanType == LoanType.Collateral) {
            require(
                msg.value == collateral,
                "Collateral must be sent with the loan request"
            );

            // Getting the current price of Celo
            PythStructs.Price memory price = pyth.getPriceNoOlderThan(
                celoUsdPriceId,
                60
            );

            uint celoPrice18Decimals = (uint(uint64(price.price)) *
                (10 ** 18)) / (10 ** uint8(uint32(-1 * price.expo)));

            // Calculate the lower bound for 3% price decrease
            uint lowerBoundPrice = (celoPrice18Decimals *
                (100 - FLUCTUACION_TOLERANCE)) / 100; // 97% of the current price

            // Use the lower bound to calculate required collateral
            uint requiredCollateral = (loanAmount * (10 ** 18)) /
                lowerBoundPrice; // Convert USD to CELO using lower bound price
            requiredCollateral = (requiredCollateral * 60) / 100; // 60% of the converted amount

            require(
                loanAmount >= requiredCollateral,
                "Insufficient collateral"
            );

            loans[loanCounter] = Loan({
                borrower: msg.sender,
                lender: address(0), // No lender yet
                amount: loanAmount,
                collateral: collateral,
                dueDate: 0, // To be set when loan is accepted
                isPaid: false
            });

            emit LoanRequested(loanCounter, msg.sender, loanAmount, collateral);
            loanCounter++;
        }

        if (loanType == LoanType.ProofOfHistoric) {}
    }

    // Lender accepts the loan
    function acceptLoan(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];

        require(loan.lender == address(0), "Loan already accepted");
        require(msg.value == loan.amount, "Incorrect loan amount");

        loan.lender = msg.sender;
        loan.dueDate = block.timestamp + 30 days; // Fixed 30 days repayment period

        // Transfer the loan amount to the borrower
        payable(loan.borrower).transfer(loan.amount);

        emit LoanAccepted(loanId, msg.sender);
    }

    // Borrower repays the loan
    function repayLoan(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];
        require(
            msg.sender == loan.borrower,
            "Only the borrower can repay the loan"
        );
        require(block.timestamp <= loan.dueDate, "Loan is overdue");
        require(!loan.isPaid, "Loan is already repaid");

        uint256 totalRepayment = loan.amount +
            ((loan.amount * FIXED_INTEREST_RATE) / 100);
        require(msg.value == totalRepayment, "Incorrect repayment amount");

        // Transfer repayment to the lender
        payable(loan.lender).transfer(totalRepayment);

        // Return the collateral to the borrower
        payable(loan.borrower).transfer(loan.collateral);

        loan.isPaid = true;

        emit LoanRepaid(loanId);
    }

    // Lender seizes collateral if the loan is overdue
    function seizeCollateral(uint256 loanId) public {
        Loan storage loan = loans[loanId];

        require(msg.sender == loan.lender, "Only lender can seize collateral");
        require(block.timestamp > loan.dueDate, "Loan is not overdue");
        require(!loan.isPaid, "Loan is already repaid");

        // Transfer collateral to the lender
        payable(loan.lender).transfer(loan.collateral);

        loan.isPaid = true;
    }
}
