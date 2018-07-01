'use strict';
var viewWalletAironCtrl = function ($rootScope, $scope) {
    $scope.ajaxReq = ajaxReq;

    // debugger;
    // $scope.list = Drive.listFiles();

    $scope.backStage = function () {
        $scope.txState = $scope.txState - 1;
    }

    $scope.selectWallet = null;

    $scope.goEx = function() {
        if ($scope.selectWallet !== null) {
            window.location = "https://etherscan.io/address/" + $scope.selectWallet.addres;
        }
    }

    $scope.walletType = 'pasteprivkey';

    // Decript wallet func
    // $scope.showPDecrypt = false;
    $scope.showPDecrypt = true;
    $scope.requirePPass = false;
    $scope.hidePK = true;
    $scope.isSSL = window.location.protocol == 'https:';
    $scope.modelPK = {
        manualprivkey: '5a4a80af6e1c21dbe768b95c1140be6d5f2fd2488517c2f09d805c8cf6c2ef7b',
        privPassword: ''
    };

    function fixPkey(key) {
        if (key.indexOf('0x') === 0) {
            return key.slice(2);
        }
        return key;
    }

    $scope.onPrivKeyChange = function () {
        $scope.showAOnly = false;
        const manualprivkey = fixPkey($scope.modelPK.manualprivkey);

        $scope.requirePPass = manualprivkey.length == 128 || manualprivkey.length == 132;
        $scope.showPDecrypt = manualprivkey.length == 64;
        console.log(manualprivkey.length);
    };

    $scope.onPrivKeyPassChange = function () {
        $scope.showAOnly = false;
        $scope.showPDecrypt = $scope.modelPK.privPassword.length > 0;
    };

    $scope.decryptWallet = function () {
        $scope.wallet = null;

        try {
            if ($scope.showPDecrypt && $scope.requirePPass) {
                $scope.wallet = Wallet.fromMyEtherWalletKey($scope.modelPK.manualprivkey, $scope.modelPK.privPassword);
            } else if ($scope.showPDecrypt && !$scope.requirePPass) {
                if (!$scope.Validator.isValidHex($scope.modelPK.manualprivkey)) {
                    $scope.notifier.danger(globalFuncs.errorMsgs[37]);
                    return;
                }

                $scope.wallet = new Wallet(fixPkey($scope.modelPK.manualprivkey));

            } else if ($scope.showFDecrypt) {
                $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.fileContent, $scope.filePassword);
                walletService.password = $scope.filePassword;
            } else if ($scope.showMDecrypt) {
                // $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
                // $scope.mnemonicModel.open();
                $scope.onHDDPathChange($scope.mnemonicPassword);
            } else if ($scope.showParityDecrypt) {
                $scope.wallet = Wallet.fromParityPhrase($scope.parityPhrase);
            }

            // walletService.wallet = $scope.wallet;
            $scope.txState = 1;
        } catch (e) {
            $scope.notifier.danger(globalFuncs.errorMsgs[6] + e);
        }

        if ($scope.wallet != null) $scope.notifier.info(globalFuncs.successMsgs[1]);
        $scope.wallet.type = "default";
    }
    // end dwf

    // gend
    $scope.tx = {
        // if there is no gasLimit or gas key in the URI, use the default value. Otherwise use value of gas or gasLimit. gasLimit wins over gas if both present
        gasLimit: globalFuncs.urlGet('gaslimit') != null || globalFuncs.urlGet('gas') != null ? globalFuncs.urlGet('gaslimit') != null ? globalFuncs.urlGet('gaslimit') : globalFuncs.urlGet('gas') : globalFuncs.defaultTxGasLimit,
        data: globalFuncs.urlGet('data') == null ? "" : globalFuncs.urlGet('data'),
        to: globalFuncs.urlGet('to') == null ? "" : globalFuncs.urlGet('to'),
        unit: "ether",
        value: globalFuncs.urlGet('value') == null ? "" : globalFuncs.urlGet('value'),
        nonce: null,
        gasPrice: globalFuncs.urlGet('gasprice') == null ? null : globalFuncs.urlGet('gasprice'),
        donate: false,
        tokensymbol: globalFuncs.urlGet('tokensymbol') == null ? false : globalFuncs.urlGet('tokensymbol'),
    }

    $scope.generateTx = function () {
        if (!$scope.Validator.isValidAddress($scope.tx.to)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[5]);
            return;
        }
        var txData = uiFuncs.getTxData($scope);

        txData.gasPrice = $scope.tx.gasPrice ? '0x' + new BigNumber($scope.tx.gasPrice).toString(16) : null;
        txData.nonce = $scope.tx.nonce ? '0x' + new BigNumber($scope.tx.nonce).toString(16) : null;

        // set to true for offline tab and txstatus tab
        // on sendtx tab, it pulls gas price from the gasprice slider & nonce
        // if its true the whole txData object is set - don't try to change it
        // if false, replace gas price and nonce. gas price from slider. nonce from server.
        if (txData.gasPrice && txData.nonce) txData.isOffline = true;

        if ($scope.tx.sendMode == 'token') {
            // if the amount of tokens you are trying to send > tokens you have, throw error
            if (!isEnough($scope.tx.value, $scope.wallet.tokenObjs[$scope.tokenTx.id].balance)) {
                $scope.notifier.danger(globalFuncs.errorMsgs[0]);
                return;
            }
            txData.to = $scope.wallet.tokenObjs[$scope.tokenTx.id].getContractAddress();
            txData.data = $scope.wallet.tokenObjs[$scope.tokenTx.id].getData($scope.tokenTx.to, $scope.tokenTx.value).data;
            txData.value = '0x00';
        }

        uiFuncs.generateTx(txData, function (rawTx) {
            if (!rawTx.isError) {
                $scope.rawTx = rawTx.rawTx;
                $scope.signedTx = rawTx.signedTx;
                // $rootScope.rootScopeShowRawTx = true;

                $scope.txState = 2;
            } else {
                // $rootScope.rootScopeShowRawTx = false;
                $scope.notifier.danger(rawTx.error);

                $scope.showDecryptModal.close();
            }

            if (!$scope.$$phase) $scope.$apply();
        });
    }
    // end

    // sing tx 
    $scope.rawTx = '';
    $scope.signedTx = '';
    $scope.parseSignedTx = function (signedTx) {
        if (signedTx.slice(0, 2) == "0x") signedTx = signedTx.slice(2, signedTx.length)
        $scope.parsedSignedTx = {}
        var txData = new ethUtil.Tx(signedTx)
        $scope.parsedSignedTx.gasPrice = {}
        $scope.parsedSignedTx.txFee = {}
        $scope.parsedSignedTx.balance = $scope.wallet.getBalance()
        $scope.parsedSignedTx.from = ethFuncs.sanitizeHex(ethUtil.toChecksumAddress(txData.from.toString('hex')))
        $scope.parsedSignedTx.to = ethFuncs.sanitizeHex(ethUtil.toChecksumAddress(txData.to.toString('hex')))
        $scope.parsedSignedTx.value = (txData.value == '0x' || txData.value == '' || txData.value == null) ? '0' : etherUnits.toEther(new BigNumber(ethFuncs.sanitizeHex(txData.value.toString('hex'))).toString(), 'wei')
        $scope.parsedSignedTx.gasLimit = new BigNumber(ethFuncs.sanitizeHex(txData.gasLimit.toString('hex'))).toString()
        $scope.parsedSignedTx.gasPrice.wei = new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).toString()
        $scope.parsedSignedTx.gasPrice.gwei = new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).div(etherUnits.getValueOfUnit('gwei')).toString()
        $scope.parsedSignedTx.gasPrice.eth = etherUnits.toEther(new BigNumber(ethFuncs.sanitizeHex(txData.gasPrice.toString('hex'))).toString(), 'wei')
        $scope.parsedSignedTx.txFee.wei = new BigNumber(parseInt($scope.parsedSignedTx.gasLimit)).times(new BigNumber(parseInt($scope.parsedSignedTx.gasPrice.wei)))
        $scope.parsedSignedTx.txFee.gwei = new BigNumber($scope.parsedSignedTx.txFee.wei).div(etherUnits.getValueOfUnit('gwei')).toString()
        $scope.parsedSignedTx.txFee.eth = etherUnits.toEther(parseInt($scope.parsedSignedTx.txFee.wei), 'wei').toString()
        $scope.parsedSignedTx.nonce = (txData.nonce == '0x' || txData.nonce == '' || txData.nonce == null) ? '0' : new BigNumber(ethFuncs.sanitizeHex(txData.nonce.toString('hex'))).toString()
        $scope.parsedSignedTx.data = (txData.data == '0x' || txData.data == '' || txData.data == null) ? '(none)' : ethFuncs.sanitizeHex(txData.data.toString('hex'))

        $scope.txState = 3;
    }

    $scope.sendTx = function () {
        $scope.showDecryptModal.close();
        uiFuncs.sendTx($scope.signedTx, function (resp) {
            if (!resp.isError) {
                var checkTxLink = "https://www.airon.io?txHash=" + resp.data + "#check-tx-status";
                var txHashLink = $scope.ajaxReq.blockExplorerTX.replace("[[txHash]]", resp.data);
                var emailBody = 'I%20was%20trying%20to..............%0A%0A%0A%0ABut%20I%27m%20confused%20because...............%0A%0A%0A%0A%0A%0ATo%20Address%3A%20https%3A%2F%2Fetherscan.io%2Faddress%2F' + $scope.tx.to + '%0AFrom%20Address%3A%20https%3A%2F%2Fetherscan.io%2Faddress%2F' + $scope.wallet.getAddressString() + '%0ATX%20Hash%3A%20https%3A%2F%2Fetherscan.io%2Ftx%2F' + resp.data + '%0AAmount%3A%20' + $scope.tx.value + '%20' + $scope.unitReadable + '%0ANode%3A%20' + $scope.ajaxReq.type + '%0AToken%20To%20Addr%3A%20' + $scope.tokenTx.to + '%0AToken%20Amount%3A%20' + $scope.tokenTx.value + '%20' + $scope.unitReadable + '%0AData%3A%20' + $scope.tx.data + '%0AGas%20Limit%3A%20' + $scope.tx.gasLimit + '%0AGas%20Price%3A%20' + $scope.tx.gasPrice;
                var verifyTxBtn = $scope.ajaxReq.type != nodes.nodeTypes.Custom ? '<a class="btn btn-xs btn-info" href="' + txHashLink + '" class="strong" target="_blank" rel="noopener noreferrer">Verify Transaction</a>' : '';
                var checkTxBtn = '<a class="btn btn-xs btn-info" href="' + checkTxLink + '" target="_blank" rel="noopener noreferrer"> Check TX Status </a>';
                var emailBtn = '<a class="btn btn-xs btn-info " href="mailto:support@myetherwallet.com?Subject=Issue%20regarding%20my%20TX%20&Body=' + emailBody + '" target="_blank" rel="noopener noreferrer">Confused? Email Us.</a>';
                var completeMsg = '<p>' + globalFuncs.successMsgs[2] + '<strong>' + resp.data + '</strong></p><p>' + verifyTxBtn + ' ' + checkTxBtn + '</p>';
                $scope.notifier.success(completeMsg, 0);
                $scope.wallet.setBalance(applyScope);
                if ($scope.tx.sendMode == 'token') $scope.wallet.tokenObjs[$scope.tokenTx.id].setBalance();
            } else {
                $scope.notifier.danger(resp.error);
            }
        });
    }
    // end

    $scope.txState = 0;

    $scope.toggleWallet = function (wallet) {
        wallet.hide = !wallet.hide;   
    };

    $scope.toggleStar = function (c) {
        c.star = !c.star;
    };

    $scope.toWalletGeneration = () => {
        globalFuncs.changeHash('generate-wallet')
    };

    $scope.decryptModalOpen = function () {
        if ($scope.selectId !== null) {
            $scope.showDecryptModal.open();
        }
    }

    $scope.selectId = null;
    $scope.deselectCascad = function () {
        $scope.wallets.forEach(function (e) {
            e.select = false;
            e.tokens.forEach(function (e) {
                e.select = false;
            });
        });
    }
    $scope.selectMoney = function (c, s) {
        $scope.selectId = c.id;
        $scope.deselectCascad();
        c.select = true;

        $scope.selectWallet = s;
        $scope.rename.newWalletName = s.name;
    };

    $scope.dropdownWalletMenu = false;

    $scope.showDecryptModal = new Modal(document.getElementById('decryptModal'));
    $scope.addWalletModal = new Modal(document.getElementById('addWallet'));
    $scope.renameWalletModal = new Modal(document.getElementById('renameWallet'));

    $scope.Validator = Validator;

    $scope.addWallet = (name, address) => {
        if (!$scope.Validator.isValidAddress(address) || $scope.isExistAddress(address)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[45])
            return
        }
        if (!$scope.Validator.isAlphaNumericSpace(name) || $scope.isExistName(name)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[46])
            return
        }

        // ajaxReq.getAddressTokenBalance(address, data => {
        //     const tokenList = data.tokensInfo.map(x => {
        //         return {
        //             address: x.address,
        //             name: x.symbol,
        //             amount: x.balance,
        //             isFavour: false,
        //         }
        //     })

        //     // ajaxReq.getBalance(address, data => {
        //     //     $scope.data.push({
        //     //         address: address,
        //     //         name: name,
        //     //         ethBalance: etherUnits.toEther(data.data.balance, 'wei'),
        //     //         onlyFavour: false,
        //     //         date: Date.now(),
        //     //         tokenList: tokenList,
        //     //     })
        //     //     globalFuncs.safeWalletToLocal($scope.data[$scope.data.length - 1])
        //     //     if (!$scope.$$phase) $scope.$apply();
        //     // })
        // })

        $scope.newWalletName = '';
        $scope.newWalletAddress = '';
    }

    $scope.renameWallet = function() {
        if ($scope.selectWallet !== null) {
            $scope.selectWallet.name = $scope.rename.newWalletName;

            $scope.dropdownOptionsMenu = false;
            $scope.renameWalletModal.close();
        }
    }

    $scope.showOption = function() {
        $scope.dropdownOptionsMenu = true;
    }

    $scope.dropdownOptionsMenu = false;


    $scope.delWallet = function() {
        if ($scope.selectWallet !== null) {
            $scope.wallets.forEach(function (item, i) {
                $scope.wallets.splice(i, 1);
            });

            $scope.dropdownOptionsMenu = false;
        }
    }

    $scope.rename = {
        newWalletName: ''
    };

    $scope.wallets = [
        {
            name: "Gold Wallet",
            filename: "test.airon-wallet",
            addres: "0x8d12A197cB00D4747a1fe03395095ce2A5CC6819",
            eth: 8.88888888,
            star: true,
            select: false,
            id: 0,
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454,
                    select: false,
                    id: 1,
                    star: true
                },
                {
                    name: "cec",
                    count: 135232.5448454,
                    select: false,
                    id: 2,
                    star: false
                }
            ],
            hide: false
        },
        {
            name: "Prem Wallet",
            filename: "test.airon-wallet",
            addres: "0x5dcaa1d8d8132e5bf9cf12deccfc0cecf26a780d",
            eth: 8.88888888,
            star: false,
            select: false,
            id: 3,
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454,
                    select: false,
                    id: 4,
                    star: false
                },
                {
                    name: "cec",
                    count: 135232.5448454,
                    select: false,
                    id: 5,
                    star: false
                }
            ],
            hide: true
        }
    ];
}

module.exports = viewWalletAironCtrl;