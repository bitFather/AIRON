<main class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.viewWalletInfo.id" ng-controller='viewWalletCtrl' ng-cloak>
    <!--div ng-if="userService.user"-->
    <!--article class="row">
    @@if (site === 'cx' ) {  @@include( './viewWalletInfo-content.tpl', { "site": "cx" } )    }
    @@if (site === 'mew') {  @@include( './viewWalletInfo-content.tpl', { "site": "mew" } )   }
</article-->
<article class="row">
    <article class="row block bordered">
        <section class="accordion">
            <div class="new-wallet">
                <a class="btn btn-primary ng-scope ng-binding btn-create" translate="VIEWWALLET_Header_createNewWalletShort" ng-click="toWalletGeneration()">
                    Create
                </a>
                <!--h5 translate="VIEWWALLET_Header_createNewWallet">
                Create a new wallet
                </h5>
                <a class="btn btn-primary ng-scope ng-binding" translate="VIEWWALLET_New" ng-click="toWalletGeneration()">
                    New Wallet
                </a-->
            </div>
            <div class = 'wallets-wrapper'>
                <!--Choose Address for view-->
                <div class="wallet-wrapper" ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]">
                    <div class="wallet-row">
                        <div>Platinum Airon Wallet</div>
                        <div class = 'icon-arrow-down'></div>
                    </div>
                    <div class="wallet-row">
                        <div>
                            0x2837593572039452739485720398462039602398
                        </div>
                    </div>
                    <div class="wallet-row">
                        <div class = "token-info">
                            <div>
                                29845726938456293845729835
                            </div>
                            <div>
                                ETH
                            </div>
                        </div>
                        <div class = 'icon-star'></div>
                    </div>
                    <div class="wallet-row">
                        <div class = "token-info">
                            <div>
                                2.3453456345
                            </div>
                            <div>
                                Gag
                            </div>
                        </div>
                        <div class = 'icon-star'></div>
                    </div>
                </div>
            </section>
        </article>
    </article>
    <!--/div-->
    <!--div class = "row" ng-if="!userService.user">
    <article class="row">
        <article class="row block">
            <section class="accordion">
                <div class="g-signin2">
                    <a id ="signoutHref" href="#" onclick="signOut();">Sign out</a>
                </section>
            </article>
        </article>
    </div-->
</main>