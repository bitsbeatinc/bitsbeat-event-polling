
// Please change both value as per your contract
var contractAddress = "0x3205e5A439cD5682838430d48BAf473B294a984c";
var contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_userVote",
                "type": "bool"
            }
        ],
        "name": "doVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "votedBy",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "votedFor",
                "type": "bool"
            }
        ],
        "name": "VotedEvent",
        "type": "event"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getMyVote",
        "outputs": [
            {
                "name": "country",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getVoteCount",
        "outputs": [
            {
                "name": "france",
                "type": "int256"
            },
            {
                "name": "croatia",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isVoted",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
