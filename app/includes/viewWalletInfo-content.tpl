<article class="row block">
    <section class="accordion">
        <div class="new-wallet">
            <h5 translate="VIEWWALLET_Header_chooseAddress">
                Choose address for view:
            </h5>
            <a class="btn btn-primary ng-scope" ng-click="isAdd = true">{{'VIEWWALLET_New' | translate}}</a>
        </div>
        <div id="wrapper">
            <ul>
                <li ng-show="isAdd">
                    <div class="add-wallet">
                        <input class="form-control"
                               placeholder="New Wallet Name"
                               ng-model="newWalletName"
                               type="text"
                               ng-class="Validator.isAlphaNumericSpace(newWalletName) && !isExistName(newWalletName) ? 'is-valid' : 'is-invalid'">
                        <input class="form-control"
                               placeholder="0x3f0efedfe0a0cd611f2465fac9a3699f92d6a06613bc3ead4f786856f5c73e9c"
                               ng-model="newWalletAddress"
                               type="text"
                               ng-class="Validator.isValidAddress(newWalletAddress) && !isExistAddress(newWalletAddress)? 'is-valid' : 'is-invalid'">
                        <section class="container-buttons">
                            <a class="btn btn-primary ng-scope" ng-click="addWallet(newWalletName,newWalletAddress)">{{'VIEWWALLET_Save' | translate}}</a>
                            <a class="btn btn-primary ng-scope" ng-click="isAdd = false">{{'VIEWWALLET_Back' | translate}}</a>
                        </section>
                    </div>
                </li>
                <li ng-repeat="tab in sortByDate(data) track by $index">
                    <input type="checkbox" checked>
                    <div class="header">
                        <h2>
                            <b>{{tab.name}}</b><br>
                            <span >{{tab.address}}</span>
                        </h2>
                        <div class="border-line"></div>
                    </div>
                    <div class="accordion-inner">
                        <div class="table-container">
                            <table class="tokens-info">
                                <tr>
                                    <td>
                                        <span class="pencil-button" role="button" ng-click="tab.isEdit = !tab.isEdit; updatedWallet = tab.name;"></span>
                                    </td>
                                    <td>
                                        <b>{{ tab.ethBalance }}</b>
                                    </td>
                                    <td>
                                        <b>{{'  ETH'}}</b>
                                    </td>
                                    <td>
                                        <input type="checkbox" ng-click= "updateWalletOnlyFavour(tab.address)" ng-model="tab.onlyFavour" ng-checked="tab.onlyFavour">
                                        <span class="favour-button border">
                                            <div></div>
                                        </span>
                                    </td>
                                </tr>
                                <tr ng-hide="tab.isEdit"
                                    ng-class="''"
                                    ng-repeat="token in getTokens(tab.tokenList, tab.onlyFavour) track by $index">
                                    <td>
                                        {{ token.amount }}
                                    </td>
                                    <td colspan="2">
                                        {{ token.name }}
                                    </td>
                                    <td>
                                        <input type="checkbox" ng-click= "updateTokenIsFavour(tab.address,token.address)" ng-model="token.isFavour" ng-checked="token.isFavour">
                                        <span class="favour-button">
                                            <div></div>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="update-wallet"  ng-show="tab.isEdit">
                            <input class="form-control"
                                   placeholder="New Wallet Name"
                                   ng-model="updatedWallet"
                                   type="text"
                                   ng-class="Validator.isAlphaNumericSpace(updatedWallet) && !isExistName(updatedWallet) ? 'is-valid' : 'is-invalid'">
                            <section class="container-buttons">
                                <a class="btn btn-primary ng-scope" ng-click="updateWalletName(updatedWallet, tab.address)">{{'VIEWWALLET_Save' | translate}}</a>
                                <a class="btn btn-primary ng-scope" ng-click="tab.isEdit = false">{{'VIEWWALLET_Back' | translate}}</a>
                                <a class="btn btn-primary ng-scope" ng-click="removeWallet(tab.address)">{{'VIEWWALLET_Delete' | translate}}</a>
                            </section>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</article>