'use strict'
var tokenCreationCtrl = function($scope, $sce, walletService) {
    $scope.ajaxReq = ajaxReq
    walletService.wallet = null
    walletService.password = ''
    $scope.ajaxReq = ajaxReq
    $scope.Validator = Validator
    $scope.unitReadable = 'reiss1'
    $scope.dropdownEnabled = true

    $scope.contract = null
    $scope.signedTx = null

    $scope.token = {
        name: '',
        description: '',
        totalCount: '',
        decimals: '',
        weiPerToken: 10000000,
    }

    $scope.tokenCalculate = {
        fee: null,
        isFeeErr: false,
    }

    $scope.tx = {
        // if there is no gasLimit or gas key in the URI, use the default value. Otherwise use value of gas or gasLimit. gasLimit wins over gas if both present
        gasLimit:
            globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null
                ? globalFuncs.urlGet('gaslimit') != null ? globalFuncs.urlGet('gaslimit') : globalFuncs.urlGet('gas')
                : globalFuncs.defaultTxGasLimit,
        unit: 'ether',
        nonce: null,
        gasPrice: globalFuncs.urlGet('gasprice') == null ? null : globalFuncs.urlGet('gasprice'),
        donate: false,
        data:
            '60606040526001600760016101000a81548160ff0219169083151502179055506000600760026101000a81548160ff02191690831515021790555060c060405190810160405280600060ff168152602001600360ff168152602001600960ff168152602001600460ff168152602001600260ff168152602001600960ff16815250600b60008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555060608201518160000160036101000a81548160ff021916908360ff16021790555060808201518160000160046101000a81548160ff021916908360ff16021790555060a08201518160000160056101000a81548160ff021916908360ff160217905550505034156200015657600080fd5b60405162002fad38038062002fad83398101604052808051820191906020018051820191906020018051820191906020018051906020019091908051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506009600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360ff1602179055506000821415156200025057816003819055505b80600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806002819055508560049080519060200190620002d49291906200032e565b508460059080519060200190620002ed9291906200032e565b5082600760006101000a81548160ff021916908360ff1602179055508360069080519060200190620003219291906200032e565b50505050505050620003dd565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200037157805160ff1916838001178555620003a2565b82800160010185558215620003a2579182015b82811115620003a157825182559160200191906001019062000384565b5b509050620003b19190620003b5565b5090565b620003da91905b80821115620003d6576000816000905550600101620003bc565b5090565b90565b612bc080620003ed6000396000f300606060405260043610610149576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063048cf8ed1461014e5780630659928c146101a857806306fdde03146101d157806318160ddd1461025f578063221ef94d14610288578063231b48aa146102c3578063242654a2146102e657806326b6c0b4146103135780632c6e879f14610340578063313ce5671461036d5780633691dd111461039c5780634279523e146103ff578063540d915e1461047857806370a08231146104d75780637284e4161461052457806373654b6d146105b257806383197ef01461062b578063887d813d146106405780638da5cb5b14610693578063946ca295146106e857806395d89b4114610742578063a0d1f9e9146107d0578063d5235a041461082a578063dc77e5e114610857578063dd62ed3e146108a4575b600080fd5b341561015957600080fd5b61018e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610910565b604051808215151515815260200191505060405180910390f35b34156101b357600080fd5b6101bb610ac9565b6040518082815260200191505060405180910390f35b34156101dc57600080fd5b6101e4610acf565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610224578082015181840152602081019050610209565b50505050905090810190601f1680156102515780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561026a57600080fd5b610272610b6d565b6040518082815260200191505060405180910390f35b341561029357600080fd5b6102a96004808035906020019091905050610b77565b604051808215151515815260200191505060405180910390f35b34156102ce57600080fd5b6102e46004808035906020019091905050610e2d565b005b34156102f157600080fd5b6102f9610f57565b604051808215151515815260200191505060405180910390f35b341561031e57600080fd5b610326610f6a565b604051808215151515815260200191505060405180910390f35b341561034b57600080fd5b610353611020565b604051808215151515815260200191505060405180910390f35b341561037857600080fd5b610380611179565b604051808260ff1660ff16815260200191505060405180910390f35b34156103a757600080fd5b6103e5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001909190505061118c565b604051808215151515815260200191505060405180910390f35b341561040a57600080fd5b610436600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611398565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561048357600080fd5b6104bb600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560ff16906020019091905050611afc565b604051808260ff1660ff16815260200191505060405180910390f35b34156104e257600080fd5b61050e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611d12565b6040518082815260200191505060405180910390f35b341561052f57600080fd5b610537611dc1565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561057757808201518184015260208101905061055c565b50505050905090810190601f1680156105a45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156105bd57600080fd5b610611600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611e5f565b604051808215151515815260200191505060405180910390f35b341561063657600080fd5b61063e6122f6565b005b341561064b57600080fd5b610677600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506123a4565b604051808260ff1660ff16815260200191505060405180910390f35b341561069e57600080fd5b6106a661246f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156106f357600080fd5b610728600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050612494565b604051808215151515815260200191505060405180910390f35b341561074d57600080fd5b610755612793565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561079557808201518184015260208101905061077a565b50505050905090810190601f1680156107c25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156107db57600080fd5b610810600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050612831565b604051808215151515815260200191505060405180910390f35b341561083557600080fd5b61083d6129a3565b604051808215151515815260200191505060405180910390f35b341561086257600080fd5b61088e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506129b6565b6040518082815260200191505060405180910390f35b34156108af57600080fd5b6108fa600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612ab9565b6040518082815260200191505060405180910390f35b6000600b60000160019054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561098657600080fd5b6109d883600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600960008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a3083600254612b4090919063ffffffff16565b6002819055507f513ad9cb3d7322925a753c33553f76f957fe2bcd7e6eece06ffb610225368f59600960008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548460025460405180848152602001838152602001828152602001935050505060405180910390a1600191505092915050565b60035481565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b655780601f10610b3a57610100808354040283529160200191610b65565b820191906000526020600020905b815481529060010190602001808311610b4857829003601f168201915b505050505081565b6000600254905090565b600080600b60000160029054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515610bee57600080fd5b600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491506000821115610e2157610c8b82600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d4182600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b5990919063ffffffff16565b600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f6dc12f1c8f7f05ad5a604be48731fce75e5dffc2751614676ad364dbae193d62338386604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a160019250610e26565b600092505b5050919050565b600b60000160039054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515610ea157600080fd5b6000821115610f5357816003819055507fb618cbba21c41634b3cf1e59d52a7507c4e46a0bd039c3db2ec828f4fedc06e1604051808060200180602001838103835260108152602001807f5b7765695065724d696e546f6b656e5d00000000000000000000000000000000815250602001838103825260078152602001807f6368616e676564000000000000000000000000000000000000000000000000008152506020019250505060405180910390a15b5050565b600760029054906101000a900460ff1681565b6000600b60000160019054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515610fe057600080fd5b600760029054906101000a900460ff1615600760026101000a81548160ff021916908315150217905550600760029054906101000a900460ff1691505090565b6000600b60000160059054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561109657600080fd5b600760019054906101000a900460ff1615611109576009600b60000160006101000a81548160ff021916908360ff1602179055506000600b60000160026101000a81548160ff021916908360ff1602179055506000600760016101000a81548160ff021916908315150217905550611163565b6000600b60000160006101000a81548160ff021916908360ff1602179055506009600b60000160026101000a81548160ff021916908360ff1602179055506001600760016101000a81548160ff0219169083151502179055505b600760019054906101000a900460ff1691505090565b600760009054906101000a900460ff1681565b60006040600481016000369050101515156111a357fe5b600b60000160009054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561121757600080fd5b600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485141561138a5783600a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925866040518082815260200191505060405180910390a36001925061138f565b600092505b50509392505050565b6000806000600b60000160049054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561141157600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561161f5784600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600b60000160049054906101000a900460ff16600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360ff160217905550600b60000160049054906101000a900460ff16600860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360ff1602179055507f756d5e0da4f56601d7ac3cd5fdfb5760f730e364a5947ba505d302b3c5fb6c1d85600b60000160059054906101000a900460ff16600b60000160049054906101000a900460ff16604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390a15b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611acf576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915061176f82600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600960008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506118478260096000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b5990919063ffffffff16565b60096000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055600b60000160059054906101000a900460ff1660086000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360ff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f756d5e0da4f56601d7ac3cd5fdfb5760f730e364a5947ba505d302b3c5fb6c1d85600b60000160049054906101000a900460ff16600b60000160059054906101000a900460ff16604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390a15b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169350505050919050565b600080600b60000160039054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515611b7357600080fd5b600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169150600b60000160039054906101000a900460ff1660ff168260ff16111515611cbb5783600860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360ff1602179055507f756d5e0da4f56601d7ac3cd5fdfb5760f730e364a5947ba505d302b3c5fb6c1d858386604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390a15b600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169250505092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff161415611d7957600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050611dbc565b600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611e575780601f10611e2c57610100808354040283529160200191611e57565b820191906000526020600020905b815481529060010190602001808311611e3a57829003601f168201915b505050505081565b6000604060048101600036905010151515611e7657fe5b600b60000160009054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515611eea57600080fd5b83600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015611fb5575083600a60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b801561203c5750600760029054906101000a900460ff168061203b5750600b60000160019054906101000a900460ff1660ff16600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1610155b5b156122e85761209384600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061216584600a60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600a60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061223784600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b5990919063ffffffff16565b600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a3600192506122ed565b600092505b50509392505050565b600b60000160059054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561236a57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000600b60000160019054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561241a57600080fd5b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16915050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006040600481016000369050101515156124ab57fe5b600b60000160009054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff161215151561251f57600080fd5b83600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156125e95750600760029054906101000a900460ff16806125e85750600b60000160019054906101000a900460ff1660ff16600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1610155b5b156127865761264084600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b4090919063ffffffff16565b600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506126d584600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b5990919063ffffffff16565b600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a36001925061278b565b600092505b505092915050565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156128295780601f106127fe57610100808354040283529160200191612829565b820191906000526020600020905b81548152906001019060200180831161280c57829003601f168201915b505050505081565b6000600b60000160019054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff16121515156128a757600080fd5b6128f983600960008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054612b5990919063ffffffff16565b600960008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061295183600254612b5990919063ffffffff16565b6002819055507f0e0643ae2a9b2f61e98f15e3055620c1aecafcdf546153f95ecf03b71e9c165783600254604051808381526020018281526020019250505060405180910390a1600191505092915050565b600760019054906101000a900460ff1681565b6000600b60000160019054906101000a900460ff1660ff1680600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1660ff1612151515612a2c57600080fd5b6000600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915050919050565b6000600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000818310151515612b4e57fe5b818303905092915050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038311151515612b8957fe5b8183019050929150505600a165627a7a723058206e12b321666e4253ab6e1b59a4cb8e67f83eec299f281327acaeb7596e5ebf210029',
    }

    var applyScope = function() {
        if (!$scope.$$phase) $scope.$apply()
    }

    $scope.$watch(
        function() {
            if (walletService.wallet == null) return null
            return walletService.wallet.getAddressString()
        },
        function() {
            if (walletService.wallet == null) return
            $scope.wallet = walletService.wallet
            $scope.wd = true
            $scope.wallet.setBalance(applyScope)
            $scope.wallet.setTokens()
            console.log(window.web3)
            console.log(web3)
            $scope.contract = new window.web3.eth.Contract(node.token.abi)
        },
    )

    $scope.generateToken = function() {
        try {
            if (!$scope.token.name) {
                throw new Error('Name 3-4 symbols')
            }
            if (!$scope.token.totalCount) {
                throw new Error('Total tokens count not specified')
            }
            if (!$scope.token.decimals) {
                throw new Error('Decimals from 0 to 18')
            }
        } catch (e) {
            $scope.notifier.danger(e)
        }
    }
    $scope.canGenerateToken = () => {
        if (!$scope.token.name || !$scope.token.totalCount || !$scope.token.decimals) {
            return false
        }
        return true
    }
    $scope.calculateFee = () => {
        $scope.createRawContract()
        return 1
    }
    //Fee
    $scope.$watch(
        'token',
        () => {
            $scope.tokenCalculate.fee = $scope.canGenerateToken() ? $scope.calculateFee() : null
            $scope.tokenCalculate.isFeeErr = !(!$scope.tokenCalculate.fee || $scope.hasEnoughBalance())
        },
        true,
    )

    $scope.hasEnoughBalance = function() {
        if ($scope.wallet.balance == 'loading' || $scope.tokenCalculate.fee === null) return false
        return new BigNumber($scope.tokenCalculate.fee).lte(new BigNumber($scope.wallet.balance))
    }

    $scope.createRawContract = () => {
        let txData = $scope.contract.deploy({
            data: $scope.tx.data,
            arguments: [$scope.token.name, $scope.token.name, $scope.token.description, 10000, $scope.token.totalCount],
        })
        txData.from = $scope.wallet.getAddressString()
        txData.gasLimit = $scope.tx.gasLimit
        txData.gasPrice = $scope.tx.gasPrice
        console.log(txData)
        window.web3.eth.signTransaction(txData, txData.from).then(signed => {
            console.log(signed)
        })
    }
}
module.exports = tokenCreationCtrl
