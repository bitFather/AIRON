<div class="{{wallet?'col-sm-8':'col-xs-12'}}">

    <article class="block">

        <section class="block__title">
            <div class="row">
                <div class="col-xs-12">
                    <div class="account-help-icon">
                        <img src="images/icon-help.svg" class="help-icon"/>
                        <p class="account-help-text" translate="x_AddessDesc">
                            You may know this as your "Account #" or your "Public Key". It's what you send people so
                            they
                            can send you ETH. That icon is an easy way to recognize your address.
                        </p>
                        <h5 ng-show="addresses.length > 0" translate="VIEWWALLET_Header_chooseAddress">
                            Choose address for view:
                        </h5>
                        <h5 ng-show="addresses.length == 0" translate="VIEWWALLET_Header_addFirst">
                            Add address for view:
                        </h5>
                    </div>
                </div>
            </div>
        </section>

        <section class="block__form">
                    <span class="dropdown dropdown-view-address" ng-cloak>
            <div class="input-group">
                        <input ng-model="newAddress"
                               id="infoAddressDropdown"
                               class="form-control"
                               placeholder="0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8"
                               ng-class="Validator.isValidAddress(newAddress) ? 'is-valid' : 'is-invalid'" />

                <div class="input-group-btn">
                    <a class="btn btn-default"
                       style="min-width: 70px;padding-left: 0.5rem;padding-right: 0.5rem;"
                       translate="VIEWWALLET_Header_viewInfo"
                       ng-click="addAddress(newAddress)">
                        <strong>View info</strong>
                    </a>
                </div>
            </div>
                        <ul class="dropdown-menu view-address-menu"
                            id="addressList"
                            ng-show="foundAddress.length > 0">
                            <li ng-repeat="address in foundAddress track by $index">
                                <a  ng-click="updateViewWallet($index)">
                                    {{address}}
                                </a>

                                <img src="images/icon-remove.svg"
                                     title="Remove Token"
                                     ng-click="removeAddress(address)"
                                />
                            </li>
                        </ul>
                    </span>
        </section>
    </article>
</div>


<article class="col-sm-4" ng-show="wallet">
    <wallet-balance-drtv></wallet-balance-drtv>
</article>
