<article class="col-sm-8 view-wallet-content">

  <section class="block">

    <div class="col-xs-11">
      <div class="account-help-icon">
        <img src="images/icon-help.svg" class="help-icon" />
        <p class="account-help-text" translate="x_AddessDesc">
          You may know this as your "Account #" or your "Public Key". It's what you send people so they can send you ETH. That icon is an easy way to recognize your address.
        </p>
        <h5 ng-show="addresses.length > 0">
          Choose address for view:
        </h5>
        <h5 ng-show="addresses.length == 0">
          Add address for view:
        </h5>
      </div>
    </div>
    <div class="row form-group" ng-show="addresses.length != 0">
      <div class="col-xs-11" >
        <div class="form-control">
          <a ng-click="dropdownAddress = !dropdownAddress"
             aria-expanded="false">
            <strong>
              {{wallet.getAddressString()}}
              <i class="caret" ng-show="addresses.length > 1"></i>
            </strong>
          </a>
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
      </div>
    </div>

    <!-- Advanced Option Panel -->
    <a ng-click="showAddAddress =! showAddAddress"
       ng-show='addresses.length != 0'>
      <p class="strong" translate="">
        + Advanced: Add Address
      </p>
    </a>

    <!-- To Address -->
    <div class="row form-group" ng-show="showAddAddress || addresses.length == 0">
      <address-field placeholder="0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8" var-name="newAddress" labeltranslated="New address"></address-field>
    </div>

    <!-- Button -->
    <section class="col-xs-12 clearfix" ng-show="showAddAddress || addresses.length == 0">
      <a class="btn btn-info" ng-click="addAddress();" translate="">
        Add address
      </a>
    </section>

  </section>
</article>

<article class="col-sm-4">
  <wallet-balance-drtv></wallet-balance-drtv>
</article>
