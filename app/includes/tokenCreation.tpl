<main class="tab-pane tokenCreation active"
      ng-if="globalService.currentTab==globalService.tabs.tokenCreation.id"
      ng-controller='tokenCreationCtrl'
      ng-cloak>

    <!-- Header : todo turn into warning notification-->
    <div class="alert alert-info" ng-show="hasQueryString">
        <p translate="WARN_Send_Link">
            You arrived via a link that has the address, amount, gas or data fields filled in for you. You can change any information before sending. Unlock your wallet to get started.
        </p>
    </div>

    <!-- Title -->
    <div class="block text-center">
        <h1>
            <a translate="NAV_TokenCreation"
               ng-class="{'isActive': visibility=='createTokenView'}"
               ng-click="setVisibility('createTokenView')">
                Create token
            </a>
            or
            <a translate="NAV_VerifyTokenTx"
               ng-class="{'isActive': visibility=='verifyTokenTxView'}"
               ng-click="setVisibility('verifyTokenTxView')">
                Verify token transaction
            </a>
        </h1>
    </div>
    <!-- / Title -->

    <!-- Unlock Wallet -->
    <article class="collapse-container">
        <div ng-show="!wallet&&visibility=='createTokenView'">
            @@if (site === 'cx' )  {  <cx-wallet-decrypt-drtv></cx-wallet-decrypt-drtv>   }
            @@if (site === 'mew' ) {  <wallet-decrypt-drtv></wallet-decrypt-drtv>         }
        </div>
    </article>

        @@if (site === 'mew' ) { @@include( './tokenCreation-content.tpl', { "site": "mew" } ) }



</main>