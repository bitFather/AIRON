<div class="{{addresses.length != 0?'col-sm-8':'col-xs-12'}}">

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
            <div class="input-group" ng-click-out="closeDrop()">
                    <span class="dropdown dropdown-view-address" ng-cloak>
                        <input ng-model="newAddress"
                               ng-click="dropdownAddress = true"
                               class="form-control"
                               placeholder="0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8"
                               ng-class="Validator.isValidAddress(newAddress) ? 'is-valid' : 'is-invalid'" />

                        <ul class="dropdown-menu view-address-menu"
                            ng-show="dropdownAddress && foundAddress.length > 0">
                            <li ng-repeat="address in foundAddress track by $index" ng-show=" address!=newAddress">
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
                <div class="input-group-btn">
                    <a class="btn btn-default"
                       style="min-width: 70px;padding-left: 0.5rem;padding-right: 0.5rem;"
                       translate="VIEWWALLET_Header_viewInfo"
                       ng-click="addAddress(newAddress)">
                        <strong>View info</strong>
                    </a>
                </div>
            </div>
        </section>
    </article>
</div>


<article class="col-sm-4" ng-show="foundAddress.length != 0">
    <wallet-balance-drtv></wallet-balance-drtv>
</article>
