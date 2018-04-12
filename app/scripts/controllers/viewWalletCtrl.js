'use strict';
var viewWalletCtrl = function($scope, walletService) {
    $scope.Validator = Validator;
    walletService.wallet = null;
    walletService.password = '';
    $scope.ajaxReq = ajaxReq

    $scope.data = []

    $scope.loadWalletFromCash = () => {
        if(globalFuncs.localStorage.getItem("localWallet", null) === null){
            return []
        }
        const items = JSON.parse(globalFuncs.localStorage.getItem("localWallet", null)).filter(x => x.network === globalFuncs.getDefaultTokensAndNetworkType().networkType)

        for(let item of items){
            const obj = {
                address: item.address,
                name: item.name,
                ethBalance: item.ethBalance,
                onlyFavour: item.onlyFavour,
                date: item.date,
            }
            //Нужна кнопка обновления по требованию?
            ajaxReq.getAddressTokenBalance(item.address, data => {
                obj.tokenList = data.tokensInfo.map(x => {
                    const oldTokenInfo = item.tokenList.find(y => y.address === x.address)
                    return {
                        address: x.address,
                        name: x.symbol,
                        amount: x.decimals > 0 ? new BigNumber(x.balance).div(10 ** x.decimals).toString() : x.balance,
                        isFavour: oldTokenInfo ? oldTokenInfo.isFavour : false
                    }
                })
                $scope.data.push(obj)
            })
        }
    }
    $scope.loadWalletFromCash()


    //Проверки!!!
    $scope.addWallet = (name, address)  => {
        if(!$scope.Validator.isValidAddress(address)||$scope.isExistAddress(address)){
            $scope.notifier.danger(globalFuncs.errorMsgs[45])
            return
        }
        if(!$scope.Validator.isAlphaNumericSpace(name)||$scope.isExistName(name)){
            $scope.notifier.danger(globalFuncs.errorMsgs[46])
            return
        }
        ajaxReq.getAddressTokenBalance(address, data => {
            const tokenList = data.tokensInfo.map(x => {
                return {
                    address: x.address,
                    name: x.symbol,
                    amount: x.decimals > 0 ? new BigNumber(x.balance).div(10 ** x.decimals).toString() : x.balance,
                    isFavour: false,
                }
            })
            $scope.data.push({
                address: address,
                name: name,
                ethBalance: data.balance,
                onlyFavour: false,
                date: Date.now(),
                tokenList: tokenList,
            })
            globalFuncs.safeWalletToLocal($scope.data[$scope.data.length - 1])
            if (!$scope.$$phase) $scope.$apply();
        })
        $scope.isAdd = false
        $scope.newWalletName = ''; $scope.newWalletAddress = '';
    }

    $scope.updateWalletName = (name, address)  => {
        if(!$scope.Validator.isAlphaNumericSpace(name)||$scope.isExistName(name)){
            $scope.notifier.danger(globalFuncs.errorMsgs[46])
            return
        }
        const index = $scope.data.findIndex(x => x.address === address)
        $scope.data[index].name = name

        globalFuncs.updateWalletToLocal(address, {
            name: 'name',
            value:  name
        })

        if (!$scope.$$phase) $scope.$apply();

        $scope.data[index].isEdit = false
    }

    $scope.updateWalletOnlyFavour = (address)  => {
        const index = $scope.data.findIndex(x => x.address === address)

        globalFuncs.updateWalletToLocal(address,{
            name: 'onlyFavour',
            value: $scope.data[index].onlyFavour
        })

        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.updateTokenIsFavour = (address, tokenAddress)  => {
        const index = $scope.data.findIndex(x => x.address === address)
        const indexToken = $scope.data[index].tokenList.findIndex(x => x.address === tokenAddress)

        globalFuncs.updateWalletToLocalTokens(address, $scope.data[index].tokenList[indexToken].address, {
            name: 'isFavour',
            value:  $scope.data[index].tokenList[indexToken].isFavour
        })

        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.removeWallet = address => {
        const index = $scope.data.findIndex(x => x.address === address)
        $scope.data.splice(index, 1)

        globalFuncs.removeWalletFromLocal(address)

        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.getTokens = (tokenList, isFavour) => {
        if(!tokenList){
            return []
        }
        return isFavour ? tokenList.filter(x => x.isFavour) : tokenList
    }

    $scope.sortByDate = () => {
        return $scope.data.sort((a, b) => {
            return a.date < b.date
        })
    }

    $scope.isExistName = (name) => {
        return $scope.data.findIndex(x => x.name === name) !== -1
    }

    $scope.isExistAddress = (address) => {
        return $scope.data.findIndex(x => x.address === address) !== -1
    }
};
module.exports = viewWalletCtrl;