
 
 
 /**
     * @dev Override _afterTokenTransfer to update vote delegation
     * Ensures vote counts are updated on token transfers.
     * @param from address The address transferring tokens.
     * @param to address The address receiving tokens.
     * @param amount uint256 The amount of tokens being transferred.
     */
    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * @dev Override _mint to handle vote delegation on minting
     * Ensures vote counts are updated when new tokens are minted.
     * @param account address The address the tokens are minted to.
     * @param amount uint256 The amount of tokens to mint.
     */
    function _mint(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(account, amount);
    }

    /**
     * @dev Override _burn to handle vote delegation on burning
     * Ensures vote counts are adjusted when tokens are burned.
     * @param account address The address the tokens are burned from.
     * @param amount uint256 The amount of tokens to burn.
     */
    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
