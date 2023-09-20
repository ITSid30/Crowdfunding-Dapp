// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract CrowdFunding {

    function fundContract() public payable 
    {
        contributors[msg.sender] = 100;
        raisedAmount += msg.value;
        noOfContributors += 1;
    }

    mapping(address=>uint) public contributors;
    address public manager;
    address public contract1;
    uint public minimumContribution;
    uint public deadline;
    uint public target;
    uint public raisedAmount;
    uint public noOfContributors =0;
    uint public balance;
    uint public numRequests = 0;

    struct Request {
        uint requestno;
        string description;
        address payable reciepent;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address=>bool) voters;
    }
    mapping(uint=> Request) public requests;

    constructor() public {
        manager = msg.sender;
    }

    function getContractAddress() public returns(address) {
        contract1 = address(this);
        return contract1;
    }

    function getTarget() public view returns(uint) {
        return target;
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    modifier OnlyManager() {
        require(msg.sender==manager, "Only manager can call this function.");
        _;
    }

    function setEth(uint tar, uint dline) public 
    {
        target = tar;   //whatever amount of target the manager has to get
        deadline = block.timestamp + dline;  // global variable to get current block timestamp - Unit=(seconds).
        minimumContribution = 100 wei;
        manager= msg.sender;
    }

     event Transfer (
        address indexed _from,
        address indexed _to,
        uint value
    );
    event RequestsWrite (
        string indexed description,
        address indexed reciepent,
        uint indexed value,
        bool completed,
        uint noOfVoters
    );
    mapping(address=>bool) voters;

    function createRequests(string memory _description, address payable _reciepent, uint _value) public OnlyManager {
        Request storage newRequest = requests[numRequests];
        newRequest.requestno = numRequests++;
        newRequest.description = _description;
        newRequest.reciepent = _reciepent;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;
        emit RequestsWrite(newRequest.description, newRequest.reciepent, newRequest.value, newRequest.completed, newRequest.noOfVoters);
    }

    function voteRequest(uint _requestNo) public {
        require(contributors[msg.sender]>0, "You must be a COntributor");
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.voters[msg.sender] ==false, "You have already voted");
        thisRequest.voters[msg.sender] =true;
        thisRequest.noOfVoters++;
    }

    function makePayment(uint _requestNo) public payable OnlyManager {
        require(raisedAmount>=target);
        Request storage thisRequest= requests[_requestNo];
        require(thisRequest.completed == false, "The request has been completed");
        require(thisRequest.noOfVoters > noOfContributors/2, "Majority does not support");
        require(thisRequest.value <= raisedAmount, "Insufficient Contract Balance");
        //emit Transfer(manager, thisRequest.reciepent, thisRequest.value);
        raisedAmount -= thisRequest.value;
        address payable reciepent = payable(thisRequest.reciepent);
        reciepent.transfer(thisRequest.value);
        thisRequest.completed = true;
    }

}