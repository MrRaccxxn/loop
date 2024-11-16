// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FixedInterestLoan {
    struct Loan {
        address borrower;
        address lender;
        uint256 amount;       // Principal loan amount
        uint256 collateral;   // Collateral amount
        uint256 dueDate;      // Due date in timestamp
        bool isPaid;          // Loan repayment status
    }

    uint256 public constant FIXED_INTEREST_RATE = 5; // 5% interest
    uint256 public loanCounter;
    mapping(uint256 => Loan) public loans;

    event LoanRequested(uint256 loanId, address borrower, uint256 amount, uint256 collateral);
    event LoanAccepted(uint256 loanId, address lender);
    event LoanRepaid(uint256 loanId);

    // Borrower requests a loan
    function requestLoan(uint256 amount, uint256 collateral) public payable {
        require(msg.value == collateral, "Collateral must be sent with the loan request");

        loans[loanCounter] = Loan({
            borrower: msg.sender,
            lender: address(0), // No lender yet
            amount: amount,
            collateral: collateral,
            dueDate: 0, // To be set when loan is accepted
            isPaid: false
        });

        emit LoanRequested(loanCounter, msg.sender, amount, collateral);
        loanCounter++;
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
        require(msg.sender == loan.borrower, "Only the borrower can repay the loan");
        require(block.timestamp <= loan.dueDate, "Loan is overdue");
        require(!loan.isPaid, "Loan is already repaid");

        uint256 totalRepayment = loan.amount + (loan.amount * FIXED_INTEREST_RATE / 100);
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
