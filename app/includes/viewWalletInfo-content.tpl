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
            <div class="form-group usual-form-group">
                <div class="row">
                    <div class="col-xs-12 col-lg-8" ng-show="addresses.length != 0">
                        <div class="input-group">
                            <div class="form-control sm-scroll">
                                <a ng-click="dropdownAddress = !dropdownAddress"
                                   aria-expanded="false">
                                    <strong>
                                        {{wallet.getAddressString()}}
                                        <i class="caret" ng-show="addresses.length > 1"></i>
                                    </strong>
                                </a>
                            </div>
                        </div>
                        <ul class="dropdown-menu"
                            ng-show="dropdownAddress && addresses.length > 1">
                            <li ng-repeat="address in addresses track by $index">
                                <a ng-class="{true:'active'}[wallet.getAddressString() == address]"
                                   ng-click="updateViewWallet($index)"
                                   ng-show="wallet.getAddressString() != address">
                                    {{address}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-xs-12  col-lg-4">
                        <div class="input-group-btn">
                            <a class="btn btn-default dropdown-toggle"
                               style="min-width: 120px"
                               ng-show='addresses.length != 0'
                               translate="VIEWWALLET_Header_removeAddress"
                               ng-click="removeAddress(wallet.getAddressString())">
                                <strong>Remove</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <br ng-show="addresses.length != 0"/>

        <!-- Advanced Option Panel -->
        <div class="row">
            <div class="col-xs-12">
                <a ng-click="showAddAddress =! showAddAddress"
                   ng-show='addresses.length != 0'>
                    <p class="strong" translate="VIEWWALLET_Header_openAddNew" ng-show="!showAddAddress">
                        + Advanced: Add Address
                    </p>
                    <p class="strong" translate="VIEWWALLET_Header_closeAddNew" ng-show="showAddAddress">
                        -
                    </p>
                </a>
            </div>
        </div>

        <!-- To Address -->
        <div class="row">
            <div class="form-group" ng-show="showAddAddress || addresses.length == 0">
                <address-field placeholder="0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8"
                               var-name="newAddress"
                               labeltranslated="VIEWWALLET_Header_addNewAddress">
                </address-field>
            </div>
        </div>

        <!-- Button -->
        <div class="row">
            <div class="col-xs-11" ng-show="showAddAddress || addresses.length == 0">
                <a class="btn btn-info" ng-click="addAddress(newAddress);" translate="VIEWWALLET_Header_buttonAdd">
                    Add address
                </a>
            </div>
        </div>


    </article>
</div>


<article class="col-sm-4" ng-show="addresses.length != 0">
    <wallet-balance-drtv></wallet-balance-drtv>
</article>
