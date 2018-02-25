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

    $scope.addresses = globalFuncs.localStorage.getItem("localAddress", null) !== null ?JSON.parse(globalFuncs.localStorage.getItem("localAddress", null)).map(x=>{return x.address.toLowerCase()}) : []

    $scope.foundAddress = $scope.addresses

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

    $scope.$watch("newAddress", () => {
        $scope.updateFoundList()
    })

    $scope.updateFoundList = () => {
        let term = $scope.newAddress.toLowerCase()
        let index = $scope.addresses.indexOf(term)
        if(index != -1 || !term){
            $scope.foundAddress = $scope.addresses
        } else {
            $scope.resetWallet()
            if(term.slice(0,2) == "0x"){
                $scope.foundAddress =  $scope.addresses.filter(x=>{return x.indexOf(term) != -1})
            } else {
                $scope.foundAddress = $scope.addresses
            }
        }
        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.updateViewWallet = (index) => {
        if ($scope.Validator.isValidAddress($scope.foundAddress[index]) && $scope.foundAddress.length > index) {
            let tempWallet = new Wallet();
            $scope.wallet = {
                type: "addressOnly",
                address: $scope.foundAddress[index],
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
            $scope.newAddress = $scope.foundAddress[index]
        }
    }

    $scope.addAddress = (addressAny) => {
        let address = addressAny.toLowerCase()
        if(address){
            if($scope.Validator.isValidAddress(address))
            {
                let index = $scope.addresses.indexOf(address)
                if (index == -1) {
                    $scope.addresses.push(address)
                    if($scope.addresses.length > 10) {
                        $scope.addresses.splice(0, 1)
                    }
                    $scope.updateFoundList()
                    globalFuncs.safeAddressToLocal(address, () => {
                    })
                    let indexFound = $scope.foundAddress.indexOf(address)
                    $scope.updateViewWallet(indexFound)
                } else {
                    let indexFound = $scope.foundAddress.indexOf(address)
                    $scope.updateViewWallet(indexFound)
                }
            } else {

            }
        }
    }

    $scope.removeAddress = (addressAny) => {
        let address = addressAny.toLowerCase()
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
        $scope.updateFoundList()
    }
};
module.exports = viewWalletCtrl;
