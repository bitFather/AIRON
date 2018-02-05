<main class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.commonWalletInfo.Items.viewWalletInfo.id" ng-controller='viewWalletCtrl' ng-cloak>

  <article class="collapse-container">

    <div ng-click="wd = !wd">
      <a class="collapse-button">
        <span ng-show="wd">+</span><span ng-show="!wd">-</span>
      </a>
      <h1 translate="NAV_ViewWallet">
        View Wallet Details
      </h1>
    </div>

  </article>

  <article class="row">

    @@if (site === 'cx' ) {  @@include( './viewWalletInfo-content.tpl', { "site": "cx" } )    }
    @@if (site === 'mew') {  @@include( './viewWalletInfo-content.tpl', { "site": "mew" } )   }

  </article>

</main>
