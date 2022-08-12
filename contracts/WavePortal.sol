// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavesHistory;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        address sender = msg.sender;
        addAddressToHistory(sender);
        console.log("%s has waved!", sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function addAddressToHistory(address _account) public {
        wavesHistory.push(_account);
    }

    function getWaveHistory() public view returns (address[] memory) {
        return wavesHistory;
    }
}
