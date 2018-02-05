'use strict';
var viewWalletCtrl = function($scope, walletService) {
    $scope.Validator = Validator;
    walletService.wallet = null;
    walletService.password = '';

    $scope.usdBalance = "loading";
    $scope.gbpBalance = "loading";
    $scope.eurBalance = "loading";
    $scope.btcBalance = "loading";
    $scope.etherBalance = "loading";
    $scope.tokenVisibility = "hidden";
    $scope.pkeyVisible = false;

    $scope.addresses = []

    $scope.showAddAddress = false

    $scope.ajaxReq = ajaxReq;

    $scope.$watch('ajaxReq.key', function() {
        if ($scope.wallet) {
            $scope.wallet.setBalance();
            $scope.wallet.setTokens();
        }
    });

    $scope.resetWallet = function() {
        $scope.wallet = null;
        walletService.wallet = null;
        walletService.password = '';
        $scope.blob = $scope.blobEnc = $scope.password = "";
    }

    $scope.updateViewWallet = (index) => {
        if ($scope.Validator.isValidAddress($scope.addresses[index]) && $scope.addresses.length > index) {
            var tempWallet = new Wallet();
            $scope.wallet = {
                type: "addressOnly",
                address: $scope.addresses[index],
                getAddressString: function() {
                    return this.address;
                },
                getChecksumAddressString: function() {
                    return ethUtil.toChecksumAddress(this.getAddressString());
                },
                setBalance: tempWallet.setBalance,
                setTokens: tempWallet.setTokens
            }
            $scope.wd = true;

            $scope.wallet.setBalance();
            $scope.wallet.setTokens();
            $scope.dropdownAddress = false
        }
    }

    $scope.addAddress = () => {
        console.log($scope.newAddress)
        console.log($scope.addresses)
        if($scope.newAddress ){
          if(!$scope.addresses.find(x => x==$scope.newAddress)){
                $scope.addresses.push($scope.newAddress)
                $scope.updateViewWallet($scope.addresses.length - 1)
          } else {
              //notify
          }
        }
        $scope.addressDrtv.ensAddressField = ""
    }
};
module.exports = viewWalletCtrl;
