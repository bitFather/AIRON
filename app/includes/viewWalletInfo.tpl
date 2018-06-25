<main class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.viewWalletInfo.id" ng-controller='viewWalletCtrl' ng-cloak>

    <article class="row">

        @@if (site === 'cx' ) {  @@include( './viewWalletInfo-content.tpl', { "site": "cx" } )    }
        @@if (site === 'mew') {  @@include( './viewWalletInfo-content.tpl', { "site": "mew" } )   }

    </article>

<article class="row">
    <article class="row block">
        <section class="accordion">
            <div class="new-wallet">
                <h5 translate="VIEWWALLET_Header_createNewWallet">
                    Create a new wallet
                </h5>
                <a class="btn btn-primary ng-scope ng-binding" translate="VIEWWALLET_New" ng-click="toWalletGeneration()">
                    New Wallet
                </a>
            </div>
        </section>
    </article>
</article>

</main>
