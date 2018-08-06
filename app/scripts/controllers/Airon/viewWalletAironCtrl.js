'use strict';
var viewWalletAironCtrl = function ($scope, GAPIService) {
    $scope.ajaxReq = ajaxReq;

    $scope.showLoginPage = false;
    $scope.loading = false;
    
    $scope.$watch('statusLogin', (newValue, oldValue) => {
        if (!newValue && oldValue) {
            // Logout
            localStorage.removeItem("setting");
            $scope.wallets.forEach(e => {
                localStorage.removeItem("ch" + e.address);
            });
            $scope.wallets = [];

            if (!$scope.$$phase) $scope.$apply();
        }

        if (newValue && !oldValue) {
            // Login
            $scope.showLoginPage = false;
            $scope.loading = true;
            GAPIService.read().then(function (e) {
                localStorage.setItem("setting", e);

                $scope.loadFromSetting();
                $scope.loading = false;
            });
        }
    });

    $scope.selectedWalletId = null;
    $scope.selectedTokenId = null;

    $scope.selectedWalletObj = null;
    $scope.selectedWalletOutside = null;
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
            $scope.selectedWalletId = $scope.wallets.indexOf($scope.selectedWalletObj);
            $scope.selectedTokenObj = obj.parant.tokenList[idx];
            $scope.selectedTokenId = idx;
        }

        if ($scope.selectedMethod === 'eth') {
            $scope.selectedWalletObj = obj;
            $scope.selectedWalletId = idx;
        }
    }

    $scope.selectWallet = (idx) => {
        const news = $scope.wallets[idx];

        if ($scope.selectedWalletObj != news && $scope.selectedMethod != 'token') {
            $scope.selectedWalletObj = news;
            $scope.selectedMethod = 'eth';
            $scope.selectedWalletId = idx;
        }
        $scope.selectedWalletOutside = news;
    }

    document.addEventListener('click', e => {
        let idxFind = false;

        if (!idxFind) {
            let ignore = [
                'walletHolder',
                'equivalentBox',
                'optionsBox',
                'sendTxModal',
                'paymentBtn',
                'copyBtn',
                'renameWallet',
                'refteshBtn',
                'historyBtn',
                'equivalentBtn',
                'optionsBtn',
                'backPlate'
            ];
            ignore = ignore.map(i => {
                return document.getElementById(i);
            });

            for (let x of ignore) {
                idxFind = e.path.includes(x);
                if (idxFind) {
                    break;
                }
            }
        }

        if (!idxFind) {
            $scope.resetSeleced();
            $scope.selectedWalletOutside = null;

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
                wallet.tokenList = data.tokensInfo.map(x => {
                    return {
                        address: x.address,
                        symbol: x.symbol,
                        decimal: x.decimal,
                        balance: x.balance,
                        parant: wallet,
                        isFavour: wallet.favourList.includes(x.address)
                    }
                });

                localStorage.setItem("ch" + wallet.address, JSON.stringify($scope.__rmReq(wallet)));
                wallet = $scope.__adReq(wallet);
            }
            else {
                wallet.tokenList = [];
            }
        });

        wallet.balance = wallet.usdBalance = wallet.eurBalance = wallet.btcBalance = wallet.chfBalance = wallet.repBalance = wallet.gbpBalance = 'loading';
        ajaxReq.getBalance(wallet.address, data => {
            if (data.error) {
                wallet.balance = data.msg + ", please wait.";
            }
            else {
                wallet.balance = etherUnits.toEther(data.data.balance, 'wei');
                ajaxReq.getETHvalue(data => {
                    wallet.usdPrice = etherUnits.toFiat('1', 'ether', data.usd);
                    wallet.gbpPrice = etherUnits.toFiat('1', 'ether', data.gbp);
                    wallet.eurPrice = etherUnits.toFiat('1', 'ether', data.eur);
                    wallet.btcPrice = etherUnits.toFiat('1', 'ether', data.btc);
                    wallet.chfPrice = etherUnits.toFiat('1', 'ether', data.chf);
                    wallet.repPrice = etherUnits.toFiat('1', 'ether', data.rep);

                    wallet.usdBalance = etherUnits.toFiat(wallet.balance, 'ether', data.usd);
                    wallet.gbpBalance = etherUnits.toFiat(wallet.balance, 'ether', data.gbp);
                    wallet.eurBalance = etherUnits.toFiat(wallet.balance, 'ether', data.eur);
                    wallet.btcBalance = etherUnits.toFiat(wallet.balance, 'ether', data.btc);
                    wallet.chfBalance = etherUnits.toFiat(wallet.balance, 'ether', data.chf);
                    wallet.repBalance = etherUnits.toFiat(wallet.balance, 'ether', data.rep);

                    localStorage.setItem("ch" + wallet.address, JSON.stringify($scope.__rmReq(wallet)));
                    wallet = $scope.__adReq(wallet);
                });
            }
        });

        return wallet;
    }

    $scope.loadFromSetting = (useCache = true) => {
        let setting = localStorage.getItem('setting');
        $scope.wallets = [];

        if (setting !== null) {
            let walletsRaw = JSON.parse(setting);

            walletsRaw.forEach(e => {
                let wallet = undefined;

                if (useCache) {
                    wallet = localStorage.getItem("ch" + e.address);

                    if (!wallet) {
                        wallet = $scope.createWallet(e.address, e.name, e.favourList);
                    }
                    else {
                        wallet = $scope.__adReq(JSON.parse(wallet));
                    }
                }
                else {
                    wallet = $scope.createWallet(e.address, e.name, e.favourList);
                }

                $scope.wallets.push(wallet);
            });
        }

        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.__rmReq = r => {
        r.tokenList = r.tokenList.map(x => {
            delete x.parant;
            return x;
        });

        return r;
    }

    $scope.__adReq = r => {
        r.tokenList = r.tokenList.map(x => {
            x.parant = r;
            return x;
        });

        return r;
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

    $scope.loadFromSetting();

    $scope.goEx = function () {
        if ($scope.selectedWalletObj !== null) {
            var win = window.open("https://etherscan.io/address/" + $scope.selectedWalletObj.address, '_blank');
            win.focus();
        }
    }

    $scope.refresh = function () {
        GAPIService.read().then(function (e) {
            localStorage.setItem("setting", e);

            $scope.loadFromSetting(false);
        });
    }

    $scope.copyToClipboard = function () {
        if ($scope.selectedWalletObj !== null) {
            var textarea = document.createElement('textarea');
            textarea.id = 'temp_element';
            textarea.style.height = 0;
            document.body.appendChild(textarea);
            textarea.value = $scope.selectedWalletObj.address;
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
        if ($scope.selectedWalletObj !== null) {
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
        if ($scope.selectedWalletObj !== null) {
            let wallet = $scope.selectedWalletObj;

            wallet.name = $scope.rename.newWalletName;

            let setting = localStorage.getItem('setting');
            setting = JSON.parse(setting);

            setting[$scope.selectedWalletId].name = $scope.rename.newWalletName;
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
        if ($scope.statusLogin) {
            $scope.dropdownWalletMenu = true;
        }
        else {
            $scope.showLoginPage = true;
        }
    }
    $scope.showAddWalletModal = function () {
        if ($scope.statusLogin) {
            $scope.addWalletModal.open()
        }
        else {
            $scope.showLoginPage = true;
        }
    }
    $scope.showCreateWalletUrl = () => {
        if ($scope.statusLogin) {
            $scope.go('generate-wallet');
        }
        else {
            $scope.showLoginPage = true;
        }
    }
    $scope.showEquivalent = () => {
        if ($scope.selectedWalletObj !== null) {
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
        if ($scope.selectedWalletObj !== null) {
            $scope.wallets.splice($scope.selectedWalletId, 1);

            let up = localStorage.getItem('setting');
            up = JSON.parse(up);
            up.splice($scope.selectedWalletId, 1);
            localStorage.setItem('setting', JSON.stringify(up));

            GAPIService.save(up);

            $scope.resetSeleced();

            $scope.dropdownOptionsMenu = false;
        }
    }

    $scope.rename = {
        newWalletName: ''
    };
}

module.exports = viewWalletAironCtrl;