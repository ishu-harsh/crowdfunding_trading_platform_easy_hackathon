// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShareToken is ERC20, Ownable {
    constructor() ERC20("CompanyShare", "CSH") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function buyShares(address to, uint256 amount) public payable {
        require(msg.value >= amount * 1 ether, "Not enough XRP sent");  // Assuming 1 XRP per share for simplicity
        _transfer(address(this), to, amount);
    }
}
