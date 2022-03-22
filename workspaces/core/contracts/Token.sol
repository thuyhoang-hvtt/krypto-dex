// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import './interfaces/IERC20.sol';
import './libraries/SafeMath.sol';

contract Token {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint256 public totalSupply;
  uint256 public decimals;
  uint256 public numberOfTransactions;
  address public master;

  mapping(address => uint256) balances;
  mapping(address => mapping(address => uint256)) allowed;

  TransferStruct[] private _transactions;

  struct TransferStruct {
    address source;
    address destination;
    uint256 amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  event Transfer(
    address indexed _source,
    address indexed _destination,
    uint256 _amount,
    string _message,
    uint256 _timestamp,
    string _keyword
  );

  event Approval(address indexed _master, address indexed _spender, uint256 _value);

  constructor() {
    name = 'The Mysterious Illusionist';
    symbol = 'TMI';
    totalSupply = 1e22;
    decimals = 11;
    balances[msg.sender] = totalSupply;
    master = msg.sender;
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

  function approve(address _delegate, uint256 _amount) public returns (bool) {
    allowed[msg.sender][_delegate] = _amount;
    emit Approval(msg.sender, _delegate, _amount);
    return true;
  }

  function allowance(address _owner, address _delegate) public view returns (uint256) {
    return allowed[_owner][_delegate];
  }

  function transferFrom(
    address _owner,
    address _buyer,
    uint256 _amount
  ) public returns (bool) {
    require(_amount <= balances[_owner], 'Owner must have enough tokens');
    require(_amount <= allowed[_owner][msg.sender], 'Allowance must have enough tokens');

    balances[_owner] = balances[_owner].sub(_amount);
    allowed[_owner][msg.sender] = allowed[_owner][msg.sender].sub(_amount);
    balances[_buyer] = balances[_buyer].add(_amount);

    emit Transfer(_owner, _buyer, _amount, 'The Mysterious Illusionist', block.timestamp, 'TMI');

    return true;
  }

  function getTransactions() external view returns (TransferStruct[] memory) {
    return _transactions;
  }
}
