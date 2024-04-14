// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title InfinDAO
 * @dev Implementation of a DAO that integrates with the InfinToken for decentralized governance.
 */
    return (totalSupply(blockNumber) * 4) / 100; // 4% of token total supply needed for quorum
    }

    function execute(bytes32 proposalId) public payable override(TimelockController, Governor) {
        super.execute(proposalId);
    }

    function getVotes(address account, uint256 blockNumber) public view override returns (uint256) {
        return super.getVotes(account, blockNumber);
    }

    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }
}
