// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract TokenBatcher {
    address public owner;
    address public docTokenAddress;
    uint256 public feePercentage = 500; // 5%

    constructor(address _docTokenAddress) {
        owner = msg.sender;
        docTokenAddress = _docTokenAddress;
    }

    function setFee(uint256 _feePercentage) external {
        require(msg.sender == owner, "Only owner can set fee");
        feePercentage = _feePercentage;
    }

    function batchTransfer(IERC20[] calldata tokens, uint256[] calldata amounts) external {
        require(tokens.length == amounts.length, "Tokens and amounts length mismatch");

        uint256 totalAmount;
        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 amount = amounts[i];
            tokens[i].transferFrom(msg.sender, address(this), amount);
            totalAmount += amount;
        }

        uint256 fee = (totalAmount * feePercentage) / 10000;
        uint256 amountAfterFee = totalAmount - fee;

        IERC20(docTokenAddress).transfer(msg.sender, amountAfterFee);
    }
}