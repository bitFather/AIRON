'use strict';
var viewWalletAironCtrl = function ($scope) {

    $scope.toggleWallet = function(wallet) {
        wallet.hide = !wallet.hide;
    };

    $scope.wallets = [
        {
            name: "Gold Wallet",
            filename: "test.airon-wallet",
            addres: "0xasfsdglsngskjdgnsdkglasd3wwe",
            eth: 8.88888888,
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454
                },
                {
                    name: "cec",
                    count: 135232.5448454
                }
            ],
            hide: false
        },
        {
            name: "Prem Wallet",
            filename: "test.airon-wallet",
            addres: "0xasdfsdgsdfskjdgnsdkglasd3xwe",
            eth: 8.88888888,
            tokens: [
                {
                    name: "xxx",
                    count: 12.5448454
                },
                {
                    name: "cec",
                    count: 135232.5448454
                }
            ],
            hide: true
        }
    ];
}

module.exports = viewWalletAironCtrl;