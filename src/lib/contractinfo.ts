export const contactManagerAddress = '0x56D00509536aDa38928B27A03086DaFFe88A4C73'
export const contactManagerABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "contactAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "contactName",
                "type": "string"
            }
        ],
        "name": "ContactAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addContact",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContacts",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct ContactManager.Contact[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const