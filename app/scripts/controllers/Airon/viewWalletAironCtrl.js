'use strict';
var viewWalletAironCtrl = function ($scope, authService) {

    $scope.auth = authService;

    $scope.toggleWallet = function(wallet) {
        wallet.hide = !wallet.hide;
    };

    $scope.toggleStar = function (c) {
        c.star = !c.star;
    };

    $scope.toWalletGeneration = () => {
        globalFuncs.changeHash('generate-wallet')
    };

    $scope.decryptModalOpen = function() {
        if ($scope.selectId !== null) {
            $scope.showDecryptModal.open();
        }
    }

    $scope.selectId = null;
    $scope.deselectCascad = function() {
        $scope.wallets.forEach(function(e) {
            e.select = false;
            e.tokens.forEach(function (e) {
                e.select = false;
            });
        });
    }
    $scope.selectMoney = function(c) {
        $scope.selectId = c.id;
        $scope.deselectCascad();
        c.select = true;
    };

    $scope.dropdownWalletMenu = false;

    $scope.showDecryptModal = new Modal(document.getElementById('decryptModal'));
    $scope.addWalletModal = new Modal(document.getElementById('addWallet'));

    $scope.Validator = Validator;

    //Проверки!!!
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

    $scope.wallets = [
        {
            name: "Gold Wallet",
            filename: "test.airon-wallet",
            addres: "0xasfsdglsngskjdgnsdkglasd3wwe",
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
            addres: "0xasdfsdgsdfskjdgnsdkglasd3xwe",
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