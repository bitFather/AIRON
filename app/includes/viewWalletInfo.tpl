<main class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.viewWalletInfo.id" ng-controller='viewWalletAironCtrl' ng-cloak>

<article class="row">
    <article class="row block">
        <section class="accordion">
            <nav class="nav-bar">
                <div class="btn-airon btn-circle btn-shadown" style="margin-top: 14px">
                    <i class="material-icons left">add</i> Create
                </div>

                <div class="space"></div>
           
                <div class="airon-icon">
                    <i class="material-icons dp48">payment</i>
                    <span>Payment</span>
                </div>

                <div class="airon-icon">
                    <i class="material-icons dp48">filter_none</i>
                    <span>Copy address</span>
                </div>

                <div class="airon-icon">
                    <i class="material-icons dp48">refresh</i>
                    <span>Refresh</span>
                </div>

                <div class="airon-icon">
                    <i class="material-icons dp48">view_headline</i>
                    <span>History</span>
                </div>

                <div class="airon-icon">
                    <i class="material-icons dp48">attach_money</i>
                    <span>Equivalent</span>
                </div>

                <div class="airon-icon">
                    <i class="material-icons dp48">more_vert</i>
                    <span>Options</span>
                </div>
            </nav>

            <div class="wallet-scroll">
                <div class="wallet-block" ng-repeat="wallet in wallets">
                    <div class="wallet-content">
                        <span class="wallet-title">{{ wallet.name }}</span>
                        <span class="wallet-addres">{{ wallet.addres }}</span>
                    
                        <span class="wallet-group wallet-eth">
                            <span class="wallet-count">{{ wallet.eth }}</span>
                            <span class="wallet-space"></span>
                            <span class="wallet-name">ETH</span>
                        </span>

                        <div ng-if="!wallet.hide">
                            <div class="wallet-token" ng-repeat="token in wallet.tokens">
                                <span class="wallet-group">
                                    <span class="wallet-count">{{ token.count }}</span>
                                    <span class="wallet-space"></span>
                                    <span class="wallet-name">{{ token.name }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <span class="wallet-space"></span>

                    <i class="wallet-arrow material-icons" ng-click="toggleWallet(wallet)">arrow_drop_down</i>
                </div>
            </div> 
        </section>
    </article>
</article>

</main>
