pragma solidity ^0.4.23;

contract ERC20 {
    function totalSupply() external constant returns (uint256 _totalSupply);
    function balanceOf(address _owner) external constant returns (uint256 balance);
    function transfer(address _to, uint256 _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
    function approve(address _spender, uint256 _old, uint256 _new) external returns (bool success);
    function allowance(address _owner, address _spender) external constant returns (uint256 remaining);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

library SafeMath {
    uint256 constant private    MAX_UINT256     = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    function safeAdd (uint256 x, uint256 y) internal pure returns (uint256 z) {
        assert (x <= MAX_UINT256 - y);
        return x + y;
    }

    function safeSub (uint256 x, uint256 y) internal pure returns (uint256 z) {
        assert (x >= y);
        return x - y;
    }

    function safeMul (uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x * y;
        assert(x == 0 || z / x == y);
    }

    function safeDiv (uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x / y;
        return z;
    }
}

contract DetailedERC20 is ERC20 {

    using SafeMath for uint256;

    address public              owner;

    string  public              name;
    string  public              symbol;
    uint8   public              decimals;
    string  public              description;
    uint256 private             summarySupply;

    mapping(address => uint256)                      private   accounts;
    mapping(address => mapping (address => uint256)) private   allowed;

    constructor (address _owner, string _name, string _symbol,string _description, uint8 _decimals, uint256 _startTokens) public {
        owner = _owner;

        accounts[owner]  = _startTokens;
        summarySupply    = _startTokens;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        description = _description;
        emit Transfer(msg.sender, _to, _value);
    }

    modifier onlyPayloadSize(uint size) {
        assert(msg.data.length >= size + 4);
        _;
    }

    function transfer(address _to, uint256 _value) onlyPayloadSize(64) external returns (bool success) {
        require(accounts[msg.sender] >= _value);
        accounts[msg.sender] = accounts[msg.sender].safeSub(_value);
        accounts[_to] = accounts[_to].safeAdd(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) onlyPayloadSize(64) external returns (bool success) {
        require ((accounts[_from] >= _value) && (allowed[_from][msg.sender] >= _value));
            accounts[_from] = accounts[_from].safeSub(_value);
            allowed[_from][msg.sender] = allowed[_from][msg.sender].safeSub(_value);
            accounts[_to] = accounts[_to].safeAdd(_value);
            emit Transfer(_from, _to, _value);
            return true;
    }

    function approve(address _spender, uint256 _old, uint256 _new) onlyPayloadSize(64) external returns (bool success) {
        require (_old == allowed[msg.sender][_spender]);
            allowed[msg.sender][_spender] = _new;
            Approval(msg.sender, _spender, _new);
            return true;
    }

    function allowance(address _owner, address _spender) external constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function balanceOf(address _owner) external constant returns (uint256 balance) {
        if (_owner == 0x00)
            return accounts[msg.sender];
        return accounts[_owner];
    }

    function totalSupply() external constant returns (uint256 _totalSupply) {
        _totalSupply = summarySupply;
    }
}

contract Factory{
    address public owner;
    address public pendingOwner;

    address public feeRecipient;
    uint256 public minFeeWei;

    event newTokenCreated(address indexed _tokenOwner, address indexed _tokenAddress);

    constructor (address _feeRecipient, uint256 _minFeeWei) public{
        owner = msg.sender;
        feeRecipient = _feeRecipient;
        minFeeWei = _minFeeWei;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        pendingOwner = newOwner;
    }

    function claimOwnership() onlyPendingOwner public {
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    function createERC20(string name, string symbol,string description, uint8 decimals, uint256 startTokens) external payable returns(address){
        require(msg.value >= minFeeWei);
        address newToken = new DetailedERC20(msg.sender, name, symbol, description, decimals, startTokens);
        feeRecipient.transfer(msg.value);
        newTokenCreated(msg.sender,newToken);
    }

    function setFeeRecipient(address newFeeRecipient) onlyOwner external{
        require(newFeeRecipient != 0x00);
        feeRecipient = newFeeRecipient;
    }

    function setMinFeeWei(uint256 newMinFeeWei) onlyOwner external {
        minFeeWei = newMinFeeWei;
    }
}