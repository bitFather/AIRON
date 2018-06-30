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