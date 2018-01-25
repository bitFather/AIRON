'use strict'
var tokenCreationCtrl = function($scope, $sce, walletService) {
    $scope.ajaxReq = ajaxReq
    walletService.wallet = null
    walletService.password = ''
    $scope.Validator = Validator

    $scope.contract = null
    $scope.signedTx = null
    $scope.sendTxModal = new Modal(document.getElementById('deployToken'))

    $scope.ethFuncs = ethFuncs

    $scope.web3
    $scope.tokenBytecode =
        '606060405234156200001057600080fd5b604051620012323803806200123283398101604052808051820191906020018051820191906020018051820191906020018051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508060058190555084600190805190602001906200011992919062000172565b5083600290805190602001906200013292919062000172565b5081600360006101000a81548160ff021916908360ff16021790555082600490805190602001906200016692919062000172565b50505050505062000221565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001b557805160ff1916838001178555620001e6565b82800160010185558215620001e6579182015b82811115620001e5578251825591602001919060010190620001c8565b5b509050620001f59190620001f9565b5090565b6200021e91905b808211156200021a57600081600090555060010162000200565b5090565b90565b61100180620002316000396000f3006060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b457806318160ddd14610142578063313ce5671461016b5780633691dd111461019a57806370a08231146101fd5780637284e4161461024a57806373654b6d146102d85780638da5cb5b14610351578063946ca295146103a657806395d89b4114610400578063dd62ed3e1461048e575b600080fd5b34156100bf57600080fd5b6100c76104fa565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101075780820151818401526020810190506100ec565b50505050905090810190601f1680156101345780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561014d57600080fd5b610155610598565b6040518082815260200191505060405180910390f35b341561017657600080fd5b61017e6105a2565b604051808260ff1660ff16815260200191505060405180910390f35b34156101a557600080fd5b6101e3600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919080359060200190919050506105b5565b604051808215151515815260200191505060405180910390f35b341561020857600080fd5b610234600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061074c565b6040518082815260200191505060405180910390f35b341561025557600080fd5b61025d6107fb565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029d578082015181840152602081019050610282565b50505050905090810190601f1680156102ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102e357600080fd5b610337600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610899565b604051808215151515815260200191505060405180910390f35b341561035c57600080fd5b610364610c34565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103b157600080fd5b6103e6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610c59565b604051808215151515815260200191505060405180910390f35b341561040b57600080fd5b610413610e5c565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610453578082015181840152602081019050610438565b50505050905090810190601f1680156104805780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561049957600080fd5b6104e4600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610efa565b6040518082815260200191505060405180910390f35b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105905780601f1061056557610100808354040283529160200191610590565b820191906000526020600020905b81548152906001019060200180831161057357829003601f168201915b505050505081565b6000600554905090565b600360009054906101000a900460ff1681565b60006040600481016000369050101515156105cc57fe5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484141561073f5782600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a360019150610744565b600091505b509392505050565b6000808273ffffffffffffffffffffffffffffffffffffffff1614156107b357600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506107f6565b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108915780601f1061086657610100808354040283529160200191610891565b820191906000526020600020905b81548152906001019060200180831161087457829003601f168201915b505050505081565b60006040600481016000369050101515156108b057fe5b82600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015801561097b575082600760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b15610c27576109d283600660008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f8190919063ffffffff16565b600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610aa483600760008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f8190919063ffffffff16565b600760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610b7683600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f9a90919063ffffffff16565b600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150610c2c565b600091505b509392505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000604060048101600036905010151515610c7057fe5b82600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515610e5057610d0a83600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f8190919063ffffffff16565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d9f83600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f9a90919063ffffffff16565b600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150610e55565b600091505b5092915050565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ef25780601f10610ec757610100808354040283529160200191610ef2565b820191906000526020600020905b815481529060010190602001808311610ed557829003601f168201915b505050505081565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000818310151515610f8f57fe5b818303905092915050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038311151515610fca57fe5b8183019050929150505600a165627a7a72305820d8e19847c278d9c683b7e6bc9af406989fb1497581f0035ac5bd7168bef68b4f0029'

    $scope.token = {
        name: '',
        description: '',
        totalCount: '',
        decimals: '',
    }

    $scope.tx = {
        gasLimit: '',
        data: '',
        to: '',
        nonce: null,
        gasPrice: null,
        unit: 'ether',
        value: 0,
    }

    var applyScope = function() {
        if (!$scope.$$phase) $scope.$apply()
    }

    $scope.getFromLS = (key, errorMsg) => {
        var localStorageItemString = globalFuncs.localStorage.getItem(key)
        if (!localStorageItemString && errorMsg) {
            throw Error(errorMsg)
        } else if (!localStorageItemString) {
            return null
        } else {
            return JSON.parse(localStorageItemString)
        }
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
            $scope.tx.nonce = 0
            let current = $scope.getFromLS('curNode', '').key
            $scope.web3 = new window.Web3(new window.Web3.providers.HttpProvider(nodes.nodeList[current].lib.SERVERURL))
            $scope.contract = new $scope.web3.eth.Contract(nodes.token.abi)
        },
    )

    $scope.tryOpenModal = function() {
        try {
            if (!$scope.token.name) {
                throw globalFuncs.errorMsgs[41]
            }
            if (!$scope.token.totalCount || $scope.token.totalCount > 999999999999999) {
                throw globalFuncs.errorMsgs[42]
            }
            if (!$scope.token.decimals) {
                throw globalFuncs.errorMsgs[43]
            }
            if (!$scope.tx.gasLimit) {
                throw globalFuncs.errorMsgs[40]
            }

            $scope.sendTxModal.open()
        } catch (e) {
            $scope.notifier.danger(e)
        }
    }

    $scope.canGenerateToken = () => {
        if (!$scope.token.name || !$scope.token.totalCount || !$scope.token.decimals) {
            return false
        }
        if($scope.token.totalCount > 999999999999999){
            return false
        }
        return true
    }

    $scope.$watchGroup(
        ['token.name', 'token.description', 'token.totalCount', 'token.decimals', 'ethFuncs.gasAdjustment'],
        () => {
            if (!$scope.canGenerateToken()) {
                $scope.tx.gasLimit = null
                return
            }
            let calculatedTotalCount = new BigNumber($scope.token.totalCount).mul(
                new BigNumber(10).pow($scope.token.decimals),
            )
            $scope.tx.data = $scope.contract
                .deploy({
                    data: $scope.tokenBytecode,
                    arguments: [
                        $scope.token.name,
                        $scope.token.name,
                        $scope.token.description,
                        $scope.token.decimals,
                        calculatedTotalCount,
                    ],
                })
                .encodeABI()
            let data = {
                from: $scope.wallet.getAddressString(),
                value: '0x0',
                data: ethFuncs.sanitizeHex('0x' + $scope.tx.data),
            }
            ethFuncs.estimateGas(data, function(data) {
                if (!data.error) {
                    $scope.tx.gasLimit = data.data
                } else {
                    $scope.tx.gasLimit = null
                    $scope.notifier.danger(globalFuncs.errorMsgs[40])
                }
            })
        },
        true,
    )

    $scope.calculateFee = () => {
        if (!$scope.tx.gasLimit || !$scope.ethFuncs.gasAdjustment) {
            return 0
        }
        let gasPrice = ethUtil.solidityUtils.toWei($scope.ethFuncs.gasAdjustment, 'Gwei')
        return ethUtil.solidityUtils.fromWei(new BigNumber($scope.tx.gasLimit).mul(gasPrice), 'ether')
    }

    $scope.createAndSendRawContract = () => {
        try {
            $scope.tx.gasLimit = null
            if (!$scope.canGenerateToken()) {
                return
            }
            let calculatedTotalCount = new BigNumber($scope.token.totalCount).mul(
                new BigNumber(10).pow($scope.token.decimals),
            )
            $scope.tx.data = $scope.contract
                .deploy({
                    data: $scope.tokenBytecode,
                    arguments: [
                        $scope.token.name,
                        $scope.token.name,
                        $scope.token.description,
                        $scope.token.decimals,
                        calculatedTotalCount,
                    ],
                })
                .encodeABI()
            let data = {
                from: $scope.wallet.getAddressString(),
                value: '0x0',
                data: ethFuncs.sanitizeHex('0x' + $scope.tx.data),
            }
            ethFuncs.estimateGas(data, fee => {
                if (!fee.error) {
                    if (fee.data == '-1') throw globalFuncs.errorMsgs[21]
                    $scope.tx.gasLimit = fee.data
                } else throw fee.msg
                if ($scope.wallet == null) throw globalFuncs.errorMsgs[3]
                else if (!ethFuncs.validateHexString($scope.tx.data)) throw globalFuncs.errorMsgs[9]
                else if (!globalFuncs.isNumeric($scope.tx.gasLimit) || parseFloat($scope.tx.gasLimit) <= 0)
                    throw globalFuncs.errorMsgs[8]
                $scope.tx.data = ethFuncs.sanitizeHex($scope.tx.data)
                ajaxReq.getTransactionData($scope.wallet.getAddressString(), function(data) {
                    if (data.error) $scope.notifier.danger(data.msg)
                    data = data.data
                    $scope.tx.to = '0xCONTRACT'
                    $scope.tx.contractAddr = ethFuncs.getDeteministicContractAddress(
                        $scope.wallet.getAddressString(),
                        data.nonce,
                    )
                    var txData = uiFuncs.getTxData($scope)
                    uiFuncs.generateTx(txData, function(rawTx) {
                        if (!rawTx.isError) {
                            $scope.rawTx = rawTx.rawTx
                            $scope.signedTx = rawTx.signedTx
                            $scope.sendTx()
                        } else {
                            $scope.notifier.danger(rawTx.error)
                        }
                        if (!$scope.$$phase) $scope.$apply()
                    })
                })
            })
        } catch (e) {
            $scope.notifier.danger(e)
        }
    }

    $scope.sendTx = function() {
        $scope.sendTxModal.close()
        uiFuncs.sendTx($scope.signedTx, function(resp) {
            if (!resp.isError) {
                var bExStr =
                    $scope.ajaxReq.type != nodes.nodeTypes.Custom
                        ? "<a href='" +
                          $scope.ajaxReq.blockExplorerTX.replace('[[txHash]]', resp.data) +
                          "' target='_blank' rel='noopener'> View your transaction </a>"
                        : ''
                var contractAddr =
                    $scope.tx.contractAddr != ''
                        ? " & Contract Address <a href='" +
                          ajaxReq.blockExplorerAddr.replace('[[address]]', $scope.tx.contractAddr) +
                          "' target='_blank' rel='noopener'>" +
                          $scope.tx.contractAddr +
                          '</a>'
                        : ''
                $scope.notifier.success(
                    globalFuncs.successMsgs[2] + '<br />' + resp.data + '<br />' + bExStr + contractAddr,
                )
            } else {
                $scope.notifier.danger(resp.error)
            }
        })
    }
}
module.exports = tokenCreationCtrl
