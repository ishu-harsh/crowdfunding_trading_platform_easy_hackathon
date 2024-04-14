// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Interface for ERC20 standard token methods
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);  // Ensure this is included
}

/// @title A contract for exchanging stock tokens with Pi tokens
contract StockExchange {
    address public stockTokenAddress; // Address of the stock token ERC20 contract
    address public piTokenAddress;    // Address of the Pi token ERC20 contract
    uint256 public stockTokenPrice;   // Price of one stock token in terms of Pi tokens

    /// @dev Initializes contract with addresses and price
    /// @param _stockTokenAddress Address of the stock token contract
    /// @param _piTokenAddress Address of the Pi token contract
    /// @param _stockTokenPrice Price of one stock token in Pi tokens
    constructor(address _stockTokenAddress, address _piTokenAddress, uint256 _stockTokenPrice) {
        stockTokenAddress = _stockTokenAddress;
        piTokenAddress = _piTokenAddress;
        stockTokenPrice = _stockTokenPrice;
    }

    /// @dev Allows users to buy stock tokens using Pi tokens
    /// @param _amount Amount of stock tokens to buy
    function buyStockTokens(uint256 _amount) public {
        uint256 cost = _amount * stockTokenPrice;
        require(IERC20(piTokenAddress).balanceOf(msg.sender) >= cost, "Not enough Pi tokens to buy stock tokens");
        require(IERC20(piTokenAddress).allowance(msg.sender, address(this)) >= cost, "Not enough Pi token allowance");
        IERC20(piTokenAddress).transferFrom(msg.sender, address(this), cost);
        IERC20(stockTokenAddress).transfer(msg.sender, _amount);
    }

    /// @dev Allows users to sell stock tokens in exchange for Pi tokens
    /// @param _amount Amount of stock tokens to sell
    function sellStockTokens(uint256 _amount) public {
        require(IERC20(stockTokenAddress).balanceOf(msg.sender) >= _amount, "Not enough stock tokens to sell");
        require(IERC20(stockTokenAddress).allowance(msg.sender, address(this)) >= _amount, "Not enough stock token allowance");
        IERC20(stockTokenAddress).transferFrom(msg.sender, address(this), _amount);
        IERC20(piTokenAddress).transfer(msg.sender, _amount * stockTokenPrice);
    }
}
