'use strict';
var viewWalletAironCtrl = function ($rootScope, $scope, GAPIService) {
    $scope.ajaxReq = ajaxReq;

    $scope.updateTokensForce = (wallet) => {
        ajaxReq.getAddressTokenBalance(wallet.address, data => {
            if (!data.error) {
                if (wallet.tokenList.length > 0) {
                    wallet.tokenList = data.tokensInfo.map((e, i) => {
                        if (wallet.tokenList[i]['IsFavour']) {
                            e.IsFavour = wallet.tokenList[i].IsFavour;
                        }
                        else {
                            e.IsFavour = false;
                        }

                        return e;
                    });
                } else {
                    wallet.tokenList = data.tokensInfo;
                }

                localStorage.setItem('tokens_' + wallet.address, JSON.stringify(wallet.tokenList));
            }
        });
    }

    $scope.updateTokens = function (wallet, force) {
        let tokens = localStorage.getItem('tokens_' + wallet.address);

        if (!tokens || force) {
            ajaxReq.getAddressTokenBalance(wallet.address, data => {
                if (!data.error) {
                    if (wallet.tokenList.length > 0) {
                        wallet.tokenList = data.tokensInfo.map((e, i) => {
                            if (i > wallet.tokenList.length - 1) {
                                e.IsFavour = false;
                            } else {
                                e.IsFavour = wallet.tokenList[i].IsFavour;
                            }
                            return e;
                        });
                    } else {
                        wallet.tokenList = data.tokensInfo;
                    }

                    localStorage.setItem('tokens_' + wallet.address, JSON.stringify(wallet.tokenList));
                }
            });
        }
        else {
            if (!wallet.tokenList || wallet.tokenList.length == 0) {
                wallet.tokenList = JSON.parse(tokens);
            }
        }
    }

    $scope.loadFromSetting = function () {
        let setting = localStorage.getItem('setting');
        $scope.wallets = [];

        if (setting !== null) {
            let walletsRaw = JSON.parse(setting);

            walletsRaw.forEach(function (e) {
                let wallet = new aironWallet(e);
                wallet.tokenList = e.tokens;
                wallet.pullBalance(() => {
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });

                $scope.updateTokens(wallet, false);

                $scope.wallets.push(wallet);
            });
        }
    }

    $scope.updateTokenIsFavour = (token) => {
        if (token.IsFavour !== true) {
            token.IsFavour = true;
        }
        else {
            token.IsFavour = !token.IsFavour;
        }

        let save = $scope.wallets.map(e => e.toSave());

        GAPIService.save(save);

        localStorage.setItem('setting', JSON.stringify(save));
    }

    $scope.loadFromSetting();

    $scope.$on('google:drive:get', function () {
        $scope.loadFromSetting();
    });

    $scope.selectWallet = null;

    $scope.goEx = function () {
        if ($scope.selectWallet !== null) {
            var win = window.open("https://etherscan.io/address/" + $scope.wallets[$scope.selectWallet].address, '_blank');
            win.focus();
        }
    }

    $scope.refresh = function () {
        GAPIService.read().then(function (e) {
            localStorage.setItem("setting", e);
            $scope.loadFromSetting();
            $scope.updateTokens(wallet, true);
        });
    }

    $scope.copyToClipboard = function () {
        if ($scope.selectWallet !== null) {
            var walletIds = document.getElementById("walletIds");
            var byId = walletIds.children[$scope.selectWallet];

            var copyText = byId.getElementsByClassName('wallet-address');

            var textarea = document.createElement('textarea');
            textarea.id = 'temp_element';
            textarea.style.height = 0;
            document.body.appendChild(textarea);
            textarea.value = copyText[0].innerText;
            var selector = document.querySelector('#temp_element');
            selector.select();
            document.execCommand('copy');

            $scope.notifier.success("Copy to Clipboard: " + textarea.value, 5000);

            document.body.removeChild(textarea);
        }
    }

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

    $scope.sendTxModalOpen = function () {
        if ($scope.selectWallet !== null) {
            $scope.sendTxModal.open();
        }
    }
    $scope.selectWalletObj = null;
    $scope.selectTokenObj = null;

    $scope.selectPay = null;
    $scope.selectPayFunc = (idx) => {
        $scope.selectPay = idx;

        setTimeout((idx) => {
            $scope.selectTokenObj = $scope.selectWalletObj.tokenList[idx];
        }, 10, idx);
    }

    $scope.selectWalletFunc = function (idx) {
        $scope.select = true;
        $scope.selectWallet = idx;

        $scope.selectWalletObj = $scope.wallets[idx];
    };

    $scope.dropdownWalletMenu = false;

    $scope.sendTxModal = new Modal(document.getElementById('sendTxModal'));
    $scope.addWalletModal = new Modal(document.getElementById('addWallet'));
    $scope.renameWalletModal = new Modal(document.getElementById('renameWallet'));

    $scope.Validator = Validator;

    $scope.isExistAddress = function (address) {
        return false;
    }

    $scope.isExistName = function (name) {
        return false;
    }

    $scope.addWallet = (name, address) => {
        if (!$scope.Validator.isValidAddress(address) || $scope.isExistAddress(address)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[45])
            return
        }
        if (!$scope.Validator.isAlphaNumericSpace(name) || $scope.isExistName(name)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[46])
            return
        }
        let rawWallet = { name: name, address: address, tokenList: [] };
        let wallet = new aironWallet(rawWallet);
        wallet.pullBalance(() => {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        wallet.tokenList = [];

        $scope.updateTokens(wallet, true);

        let up = localStorage.getItem('setting');
        if (up === null) {
            up = "[]";
        }

        up = JSON.parse(up);
        up.push(rawWallet);
        localStorage.setItem('setting', JSON.stringify(up));

        GAPIService.save(up);

        $scope.wallets.push(wallet);

        $scope.dropdownWalletMenu = false;
        $scope.addWalletModal.close();

        $scope.newWalletName = '';
        $scope.newWalletAddress = '';
    }

    $scope.renameWallet = function () {
        if ($scope.selectWallet !== null) {
            $scope.wallets[$scope.selectWallet].name = $scope.rename.newWalletName;

            $scope.rename.newWalletName = "";

            let save = $scope.wallets.map(e => e.toSave());
            GAPIService.save(save);
            localStorage.setItem('setting', JSON.stringify(save));

            $scope.dropdownOptionsMenu = false;
            $scope.renameWalletModal.close();
        }
    }

    $scope.showOption = function () {
        $scope.dropdownOptionsMenu = true;
    }
    $scope.showAddMenu = function () {
        $scope.dropdownWalletMenu = true;
    }
    $scope.showEquivalent = () => {
        if ($scope.selectWallet !== null) {
            $scope.dropdownEquivalentMenu = true;
        }
    }
    $scope.hideMenu = function () {
        $scope.dropdownOptionsMenu = false;
        $scope.dropdownWalletMenu = false;
        $scope.dropdownEquivalentMenu = false;
    }

    $scope.dropdownOptionsMenu = false;
    $scope.dropdownWalletMenu = false;
    $scope.dropdownEquivalentMenu = false;


    $scope.delWallet = function () {
        if ($scope.selectWallet !== null) {
            $scope.wallets.splice($scope.selectWallet, 1);

            let up = localStorage.getItem('setting');
            up = JSON.parse(up);
            up.splice($scope.selectWallet, 1);
            localStorage.setItem('setting', JSON.stringify(up));

            GAPIService.save(up);

            $scope.selectWallet = null;

            $scope.dropdownOptionsMenu = false;
        }
    }

    $scope.rename = {
        newWalletName: ''
    };
}

module.exports = viewWalletAironCtrl;