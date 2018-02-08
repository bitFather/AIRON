'use strict'
var tokenCreationCtrl = function($scope, $sce, walletService) {
    $scope.ajaxReq = ajaxReq
    $scope.visibility = 'createTokenView'
    walletService.wallet = null
    walletService.password = ''
    $scope.Validator = Validator


    $scope.tokenFactory = {
        address: null,
        abi: nodes.tokenFactory.abi,
        functions: [],
    }
    $scope.signedTx = null
    $scope.sendTxModal = new Modal(document.getElementById('deployToken'))

    $scope.ethFuncs = ethFuncs

    $scope.isGenerate = false

    $scope.currentNodeIndex

    $scope.web3
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
        unit: 'wei',
        value: null,
    }

    $scope.txStatus = {
        found: 0,
        notFound: 1,
        mined: 2,
        unknown:3,
    }

    $scope.txResult = {
        hash: '',
        status: -1,
        tokenAddress: null,
    }

    $scope.$watch('txResult.hash', () => {
        $scope.txResult.status = -1
        $scope.txResult.tokenAddress = null
    });

    var applyScope = () => {
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
            $scope.currentNodeIndex = $scope.getFromLS('curNode', '').key
            $scope.tokenFactory.address = nodes.nodeList[$scope.currentNodeIndex].tokenFactoryAddress
            $scope.tokenFactory.functions = {};

            let tAbi = $scope.tokenFactory.abi;
            for (let i in tAbi)
                if (tAbi[i].type == "function") {
                    tAbi[i].inputs.map(function(i) { i.value = ''; });
                    $scope.tokenFactory.functions[tAbi[i].name] = tAbi[i];
                }

            if (!$scope.tokenFactory.address || $scope.tokenFactory.address == '0x0') {
                $scope.notifier.danger(globalFuncs.errorMsgs[44])
            }
        },
    )
    //Node update
    $scope.$watch(
        function() {
            $scope.currentNodeIndex = $scope.getFromLS('curNode', '').key
            return $scope.currentNodeIndex
        },
        function() {
            $scope.currentNodeIndex = $scope.getFromLS('curNode', '').key
            $scope.tokenFactory.address = nodes.nodeList[$scope.currentNodeIndex].tokenFactoryAddress
            if (!$scope.tokenFactory.address || $scope.tokenFactory.address == '0x0') {
                $scope.notifier.danger(globalFuncs.errorMsgs[44])
            }
        },
    )

    $scope.tryOpenModal = function() {
        try {
            if (!$scope.tokenFactory.address || $scope.tokenFactory.address == '0x0') {
                throw globalFuncs.errorMsgs[44]
            }
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
        if (
            !$scope.token.name ||
            !$scope.token.totalCount ||
            !$scope.token.decimals ||
            (!$scope.tokenFactory || $scope.tokenFactory == '0x0')
        ) {
            return false
        }
        if ($scope.token.totalCount > 999999999999999) {
            return false
        }
        return true
    }

    $scope.clearInputs = () => {
        $scope.token.name = null
        $scope.token.totalCount = null
        $scope.token.decimals = null
        $scope.token.description = null
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
            $scope.tx.data = $scope.createERC20Data([
                $scope.token.name,
                $scope.token.name,
                $scope.token.description,
                $scope.token.decimals,
                calculatedTotalCount,
            ])
            $scope.getAddictionFee((decFee) => {
                let data = {
                    from: $scope.wallet.getAddressString(),
                    to: nodes.nodeList[$scope.currentNodeIndex].tokenFactoryAddress,
                    value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(decFee)),
                    data: ethFuncs.sanitizeHex($scope.tx.data),
                }
                $scope.tx.value = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(decFee))
                ethFuncs.estimateGas(data, function (data) {
                    if (!data.error) {
                        $scope.tx.gasLimit = data.data
                    } else {
                        $scope.tx.gasLimit = null
                        $scope.notifier.danger(globalFuncs.errorMsgs[40])
                    }
                })
            })
        },
        true,
    )

    $scope.calculateFee = () => {
        if (!$scope.tx.gasLimit || !$scope.tx.value || !$scope.ethFuncs.gasAdjustment) {
            return 0
        }
        let gasPrice = ethUtil.solidityUtils.toWei($scope.ethFuncs.gasAdjustment, 'Gwei')
        return ethUtil.solidityUtils.fromWei(new BigNumber($scope.tx.gasLimit).mul(gasPrice).plus($scope.tx.value), 'ether')
    }

    $scope.createAndSendRawContract = () => {
        try {
            $scope.tx.gasLimit = null
            if (!$scope.canGenerateToken()) {
                return
            }
            $scope.isGenerate = true
            let calculatedTotalCount = new BigNumber($scope.token.totalCount).mul(
                new BigNumber(10).pow($scope.token.decimals),
            )
            $scope.tx.data = $scope.createERC20Data([
                    $scope.token.name,
                    $scope.token.name,
                    $scope.token.description,
                    $scope.token.decimals,
                    calculatedTotalCount,
                ])
            $scope.getAddictionFee((decFee) => {
                let data = {
                    from: $scope.wallet.getAddressString(),
                    to: nodes.nodeList[$scope.currentNodeIndex].tokenFactoryAddress,
                    value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(decFee)),
                    data: ethFuncs.sanitizeHex($scope.tx.data),
                }
                $scope.tx.value = ethFuncs.sanitizeHex(ethFuncs.decimalToHex(decFee))
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
                    ajaxReq.getTransactionData($scope.wallet.getAddressString(), function (data) {
                        if (data.error) $scope.notifier.danger(data.msg)
                        data = data.data
                        $scope.tx.to = nodes.nodeList[$scope.currentNodeIndex].tokenFactoryAddress
                        let txData = uiFuncs.getTxData($scope)
                        uiFuncs.generateTx(txData, function (rawTx) {
                            if (!rawTx.isError) {
                                $scope.rawTx = rawTx.rawTx
                                $scope.signedTx = rawTx.signedTx
                                $scope.sendTx()
                            } else {
                                $scope.notifier.danger(rawTx.error)
                                $scope.isGenerate = false
                            }
                            if (!$scope.$$phase) $scope.$apply()
                        })
                    })
                })
            })
        } catch (e) {
            $scope.notifier.danger(e)
            $scope.isGenerate = false
        }
    }

    $scope.sendTx = () => {
        $scope.sendTxModal.close()
        uiFuncs.sendTx($scope.signedTx, function(resp) {
            if (!resp.isError) {
                let bExStr =
                    $scope.ajaxReq.type != nodes.nodeTypes.Custom
                        ? "<a href='" +
                          $scope.ajaxReq.blockExplorerTX.replace('[[txHash]]', resp.data) +
                          "' target='_blank' rel='noopener'> View your transaction </a>"
                        : ''
                let contractAddr =
                    $scope.tx.contractAddr != ''
                        ? " & Contract Address <a href='" +
                          ajaxReq.blockExplorerAddr.replace('[[address]]', $scope.tx.contractAddr) +
                          "' target='_blank' rel='noopener'>" +
                          $scope.tx.contractAddr +
                          '</a>'
                        : ''
                //Await for event
                $scope.txResult.hash = resp.data
                $scope.startVerifyTokenTxStatus()
            } else {
                $scope.notifier.danger(resp.error)
                $scope.isGenerate = false
            }
        })
    }

    $scope.startVerifyTokenTxStatus = () => {
        if ($scope.waitForMined) {
            clearInterval($scope.waitForMined)
        }
        if(Validator.isValidTxHash($scope.txResult.hash)) {
            $scope.waitForMined = setInterval(() => {
                $scope.getTxStatus()
            }, 500)
        }
    }

    $scope.getTxStatus = () => {
        ajaxReq.getTransaction($scope.txResult.hash, txInfo => {
            if (txInfo.error) {
                $scope.notifier.danger(txInfo.msg)
            } else {
                if (txInfo.data) {
                    if (txInfo.data.blockNumber) {
                        ajaxReq.getTransactionReceipt($scope.txResult.hash, receipt => {
                            if (receipt.data) {
                                if (receipt.data.blockNumber) {
                                    try {
                                        let tokenAddress = receipt.data.logs[0].topics[2]
                                        while (tokenAddress[0] == '0' || tokenAddress[0] == 'x') {
                                            tokenAddress = tokenAddress.slice(1)
                                        }
                                        $scope.txResult.tokenAddress = '0x' + tokenAddress
                                        $scope.txResult.status = $scope.txStatus.mined
                                    } catch(e) {
                                        $scope.txResult.status = $scope.txStatus.unknown
                                    }

                                    $scope.isGenerate = false

                                    $scope.clearInputs()

                                    if ($scope.waitForMined) {
                                        clearInterval($scope.waitForMined)
                                    }
                                } else {
                                    $scope.txResult.status = $scope.txStatus.found
                                }
                            } else {
                                $scope.txResult.status = $scope.txStatus.notFound
                                if ($scope.waitForMined) {
                                    clearInterval($scope.waitForMined)
                                }
                            }
                        })
                    } else {
                        $scope.txResult.status = $scope.txStatus.found
                    }
                } else {
                    $scope.txResult.status = $scope.txStatus.notFound
                }
            }
        })
    }



    $scope.clearPage = () => {
        $scope.txResult.hash = ''
        $scope.txResult.status = -1
        $scope.txResult.tokenAddress = null

        $scope.isGenerate = false

        $scope.clearInputs()

        if ($scope.waitForMined) {
            clearInterval($scope.waitForMined)
        }
    }

    $scope.getAddictionFee = (callback) => {
        let curFunc = $scope.tokenFactory.functions['minFeeWei'];
        let fullFuncName = ethUtil.solidityUtils.transformToFullName(curFunc);
        let funcSig = '0x' + ethFuncs.getFunctionSignature(fullFuncName);
        ajaxReq.getEthCall({ to: $scope.tokenFactory.address, data: funcSig }, function(res) {
            if (!res.error) {
                let outTypes = curFunc.outputs.map(function(i) {
                    return i.type;
                });
                let decoded = ethUtil.solidityCoder.decodeParams(outTypes, res.data.replace('0x', ''));
                callback(decoded[0])
            } else throw res.msg;

        });
    }
    
    $scope.createERC20Data = (inputs) => {
        let curFunc = $scope.tokenFactory.functions['createERC20'];
        let fullFuncName = ethUtil.solidityUtils.transformToFullName(curFunc);
        let funcSig = ethFuncs.getFunctionSignature(fullFuncName);
        let typeName = ethUtil.solidityUtils.extractTypeName(fullFuncName);
        let types = typeName.split(',');
        types = types[0] == "" ? [] : types;
        return '0x' + funcSig + ethUtil.solidityCoder.encodeParams(types, inputs);
    }

    $scope.setVisibility = function(str) {
        $scope.visibility = str
        $scope.clearPage()
    }
}
module.exports = tokenCreationCtrl
