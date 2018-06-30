'use strict';
var viewWalletAironCtrl = function ($scope) {

    $scope.toggleWallet = function(wallet) {
        wallet.hide = !wallet.hide;
    };

    $scope.toggleStar = function (c) {
        c.star = !c.star;
    };

    $scope.showDecryptModal = new Modal(document.getElementById('decryptModal'));

    $scope.wallets = [
        {
            name: "Gold Wallet",
            filename: "test.airon-wallet",
            addres: "0xasfsdglsngskjdgnsdkglasd3wwe",
            eth: 8.88888888,
            star: true,
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454,
                    star: true
                },
                {
                    name: "cec",
                    count: 135232.5448454,
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
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454,
                    star: false
                },
                {
                    name: "cec",
                    count: 135232.5448454,
                    star: false
                }
            ],
            hide: true
        }
    ];
}

module.exports = viewWalletAironCtrl;