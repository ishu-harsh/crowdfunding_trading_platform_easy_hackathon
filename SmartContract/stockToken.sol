// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17; // Updated to the latest stable version as of the last update

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // Updated import path to use npm package for better security and reliability

/// @title Stock Tokenization Smart Contract
/// @dev This contract allows for the creation and trade of tokens that represent stocks.
contract StockToken {
    string public name; // Token name
    string public symbol; // Token symbol
    uint8 public decimals = 18; // Set the decimals to 18
    uint256 public totalSupply; // Total supply of the token
    uint256 public stockValue; // Current value of the stock in the contract
    address public owner; // Owner of the contract
    mapping(address => uint256) public balanceOf; // Mapping of balance to addresses
    AggregatorV3Interface internal priceFeed; // Interface to interact with Chainlink Price Feeds

    // Event to emit when a transfer occurs
    event Transfer(address indexed from, address indexed to, uint256 value);

    /// @dev Contract constructor sets initial supply and registers the price feed address
    /// @param _totalSupply Initial total supply of the token
    /// @param _priceFeed Address of the Chainlink Price Feed
    /// @param _name Name of the token
    /// @param _symbol Symbol of the token
    constructor(uint256 _totalSupply, address _priceFeed, string memory _name, string memory _symbol) {
        owner = msg.sender;
        totalSupply = _totalSupply * (10 ** uint256(decimals));
        name = _name;
        symbol = _symbol;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    /// @dev Allows users to buy tokens by sending ETH
    function buyStockToken() public payable {
        require(msg.value > 0, "Must send ether to buy tokens");
        uint256 tokensToBuy = (msg.value * totalSupply) / (stockValue * 1 ether);
        require(tokensToBuy <= balanceOf[owner], "Not enough tokens in supply");
        balanceOf[msg.sender] += tokensToBuy;
        balanceOf[owner] -= tokensToBuy;
        emit Transfer(owner, msg.sender, tokensToBuy);
    }

    /// @dev Allows users to sell tokens in exchange for ETH
    /// @param _amount Amount of tokens to sell
    function sellStockToken(uint256 _amount) public {
        require(_amount > 0, "Must sell at least one token");
        uint256 tokensToSell = (_amount * stockValue * 1 ether) / totalSupply;
        require(tokensToSell <= address(this).balance, "Not enough ether in contract to buy back tokens");
        balanceOf[msg.sender] -= _amount;
        balanceOf[owner] += _amount;
        payable(msg.sender).transfer(tokensToSell);
        emit Transfer(msg.sender, owner, _amount);
    }

    /// @dev Updates the stock value based on the latest price from the price feed
    function updateStockValue() public {
        require(msg.sender == owner, "Only owner can update stock value");
        (, int price, , ,) = priceFeed.latestRoundData();
        stockValue = uint256(price);
    }

    /// @dev Adjusts balances at the end of the day based on stock value changes
function endDay() public {
    require(msg.sender == owner, "Only owner can end day");
    (, int price, , ,) = priceFeed.latestRoundData();
    int256 currentStockValue = int256(stockValue);
    int256 difference = int256(balanceOf[owner]) * (currentStockValue - int256(price)) / int256(1 ether);

    if (difference > 0) {
        uint256 tokensToBuy = uint256(difference * int256(totalSupply) / currentStockValue);
        balanceOf[msg.sender] += tokensToBuy;
        balanceOf[owner] -= tokensToBuy;
        emit Transfer(owner, msg.sender, tokensToBuy);
    } else if (difference < 0) {
        uint256 tokensToSell = uint256(-difference * int256(totalSupply) / currentStockValue);
        balanceOf[msg.sender] -= tokensToSell;
        balanceOf[owner] += tokensToSell;
        emit Transfer(msg.sender, owner, tokensToSell);
    }
    stockValue = uint256(price);
}
}
