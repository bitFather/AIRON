'use strict';
var viewWalletAironCtrl = function ($rootScope, $scope, GAPIService) {
    $scope.ajaxReq = ajaxReq;

    $scope.selectedWalletId = null;
    $scope.selectedTokenId = null;

    $scope.selectedWalletObj = null;
    $scope.selectedTokenObj = null;
    $scope.selectedMethod = null; // 'eth' 'token'

    $scope.resetSeleced = () => {
        $scope.selectedWalletId = null;
        $scope.selectedTokenId = null;

        $scope.selectedWalletObj = null;
        $scope.selectedTokenObj = null;
        $scope.selectedMethod = null;
    }

    $scope.selectPay = (idx, method, obj) => {
        $scope.resetSeleced();

        $scope.selectedMethod = method;

        if ($scope.selectedMethod === 'token') {
            $scope.selectedWalletObj = obj.parant;
            $scope.selectedTokenObj = obj.parant.tokenList[idx];
            $scope.selectedTokenId = idx;
        }

        if ($scope.selectedMethod === 'eth') {
            $scope.selectedWalletObj = obj;
            $scope.selectedWalletId = idx;
        }
    }

    $scope.selectWallet = (idx) => {
        $scope.selectedWalletObj = $scope.wallets[idx];
        $scope.selectedWalletId = idx;
    }

    document.addEventListener('click', e => {
        let children = document.getElementById('walletHolder').children;
        let idxFind = false;
        for (let x of children) {
            idxFind = e.path.includes(x);
            if (idxFind) {
                break;
            }
        }

        if (!idxFind) {
            $scope.resetSeleced();

            $scope.$apply();
        }
    });

    $scope.createWallet = (address, name, favourList) => {
        let wallet = {
            name: name,
            address: address,
            tokenList: [],
            balance: "loading...",
            favourList: favourList
        };

        ajaxReq.getAddressTokenBalance(wallet.address, data => {
            if (!data.error) {
                wallet.balance = data.balance;
                wallet.tokenList = data.tokensInfo.map(x => {
                    return {
                        address: x.address,
                        symbol: x.symbol,
                        decimal: x.decimal,
                        balance: x.balance,
                        isFavour: wallet.favourList.includes(x.address),
                        parant: wallet
                    }
                });
            }
            else {
                wallet.balance = data.msg + ", please wait.";
                wallet.tokenList = [];
            }
        });

        return wallet;
    }

    $scope.loadFromSetting = () => {
        let setting = localStorage.getItem('setting');
        $scope.wallets = [];

        if (setting !== null) {
            let walletsRaw = JSON.parse(setting);

            walletsRaw.forEach(e => {
                $scope.wallets.push($scope.createWallet(e.address, e.name, e.favourList));
            });
        }
    }

    $scope.updateTokenIsFavour = (token) => {
        token.IsFavour = !token.IsFavour;

        let l = token.parant.favourList;
        l.includes(token.address) ? l.splice(l.indexOf(token.address), 1) : l.push(token.address);
        token.parant.favourList = l;

        let setting = localStorage.getItem('setting');

        if (setting !== null) {
            setting = JSON.parse(setting);

            const wallet = setting.find(e => e.address === token.parant.address);
            const idxWallet = setting.indexOf(wallet);

            setting[idxWallet].favourList = token.parant.favourList;
        }

        localStorage.setItem('setting', JSON.stringify(setting));
        GAPIService.save(setting);
    }

    $scope.$on('google:drive:get', function () {
        $scope.loadFromSetting();
    });

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
        });
    }

    $scope.copyToClipboard = function () {
        if ($scope.selectWallet !== null) {
            var walletHolder = document.getElementById("walletHolder");
            var byId = walletHolder.children[$scope.selectWallet];

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

        let wallet = $scope.createWallet(address, name, []);

        let up = localStorage.getItem('setting');
        if (up === null) {
            up = "[]";
        }

        up = JSON.parse(up);
        up.push({
            address: wallet.address,
            name: wallet.name,
            favourList: wallet.favourList,
        });
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
            let wallet = $scope.wallets[$scope.selectWallet];

            wallet.name = $scope.rename.newWalletName;

            let setting = localStorage.getItem('setting');
            setting = JSON.parse(setting);

            setting[$scope.selectWallet].name = $scope.rename.newWalletName;
            $scope.rename.newWalletName = "";

            localStorage.setItem('setting', JSON.stringify(setting));
            GAPIService.save(setting);

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