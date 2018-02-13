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

    $scope.addresses = globalFuncs.localStorage.getItem("localAddress", null) !== null ?JSON.parse(globalFuncs.localStorage.getItem("localAddress", null)).map(x=>{return x.address}) : []

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

    $scope.$watch(
        function() {
            if (walletService.wallet == null || $scope.addresses.length > 0) return null
            return walletService.wallet.getAddressString()
        },
        function() {
            if (walletService.wallet == null) $scope.updateViewWallet($scope.addresses.length - 1)

        },
    )

    $scope.updateViewWallet = (index) => {
        if ($scope.Validator.isValidAddress($scope.addresses[index]) && $scope.addresses.length > index) {
            let tempWallet = new Wallet();
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

    $scope.addAddress = (address) => {
        if(address){
          if(!$scope.addresses.find(x => {return x == address})){
                $scope.addresses.push(address)
                globalFuncs.safeAddressToLocal(address,()=>{})
                $scope.updateViewWallet($scope.addresses.length - 1)
          } else {
              //notify
          }
        }
        $scope.addressDrtv.ensAddressField = ""
    }

    $scope.removeAddress = (address) => {
        if($scope.addresses.length > 0 && address) {
            let index = $scope.addresses.indexOf(address)
            globalFuncs.removeAddressFromLocal($scope.addresses[index],()=>{})
            $scope.addresses.splice(index, 1)
            if($scope.addresses.length > 0) {
                $scope.updateViewWallet($scope.addresses.length - 1)
            } else {
                $scope.wallet = null
            }
        }
    }
};
module.exports = viewWalletCtrl;
