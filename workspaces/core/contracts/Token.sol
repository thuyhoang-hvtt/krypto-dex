// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Token {
  string public name = 'The Mysterious Illusionist';
  string public symbol = 'TMI';
  uint256 public totalSupply = 1e7;
  address public master;
  mapping(address => uint256) balances;
  uint256 public numberOfTransactions;
  TransferStruct[] private _transactions;

  constructor() {
    balances[msg.sender] = totalSupply;
    master = msg.sender;
  }

  event Transfer(
    address _source,
    address _destination,
    uint256 _amount,
    string _message,
    uint256 _timestamp,
    string _keyword
  );

  struct TransferStruct {
    address source;
    address destination;
    uint256 amount;
    string messasge;
    uint256 timestamp;
    string keyword;
  }

  function transfer(
    address _to,
    uint256 _amount,
    string memory _message,
    string memory _keyword
  ) external {
    require(balances[msg.sender] >= _amount, 'Not enough tokens');
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
    numberOfTransactions += 1;

    _transactions.push(
      TransferStruct(msg.sender, _to, _amount, _message, block.timestamp, _keyword)
    );

    emit Transfer(msg.sender, _to, _amount, _message, block.timestamp, _keyword);
  }

  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }

  function getTransactions() external view returns (TransferStruct[] memory) {
    return _transactions;
  }
}
