<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Airon.io</title>
  <meta property="og:title" content="Airon.io: Your Key to Ethereum">
  <meta property="og:site_name" content="Airon.io: Your Key to Ethereum">
  <meta name="twitter:title" content="Airon.io: Your Key to Ethereum">
  <meta name="apple-mobile-web-app-title" content="Airon.io: Your Key to Ethereum">
  <link href="https://www.airon.io" rel="canonical">
  <meta content="https://www.airon.io" property="og:url">
  <meta content="https://www.airon.cio" name="twitter:url">
  <link rel="stylesheet" href="css/etherwallet-master.min.css">
  <script type="text/javascript" src="js/etherwallet-static.min.js"></script>
  <script type="text/javascript" src="js/etherwallet-master.js"></script>
  <meta name="description" content="Airon.io is a free, open-source, client-side interface for generating Ethereum wallets & more. Interact with the Ethereum blockchain easily & securely.">
  <meta property="og:description"  content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
  <meta name="twitter:description" content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta name="google-site-verification" content="IpChQ00NYUQuNs_7Xs6xlnSdzalOlTUYbBsr8f7OpvM" />
  <link href="images/fav/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
  <link href="images/fav/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
  <link href="images/fav/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
  <link href="images/fav/manifest.json" rel="manifest">
  <link href="images/fav/safari-pinned-tab.svg" rel="mask-icon" color="#2f99b0">
  <link href="images/fav/favicon.ico" rel="shortcut icon">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <meta name="apple-mobile-web-app-title" content="Airon.io &middot; Your Key to Ethereum">
  <meta name="application-name" content="Airon.io">
  <meta name="msapplication-config" content="images/fav/browserconfig.xml">
  <meta name="theme-color" content="#1d6986">
  <meta name="apple-mobile-web-app-status-bar-style" content="#1d6986">
  <meta property="og:url" content="https://www.airon.io" />
  <meta property="og:title" content="Airon.io  &middot; Your Key to Ethereum" />
  <meta property="og:type" content="website">
  <meta property="og:image" content="/images/myetherwallet-logo-banner.png" />
  <meta property="og:image" content="/images/myetherwallet-logo.png" />
  <meta property="og:image" content="/images/myetherwallet-logo-square.png" />
  <meta property="og:image" content="/images/myetherwallet-banner-fun.jpg" />
  <meta name="twitter:image" content="/images/myetherwallet-logo-twitter.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Airon.io">
  <meta name="twitter:creator" content="@Airon.io">
  <script type="application/ld+json">
{
"@context": "http://schema.org",
"@type" : "Organization",
"name" : "Airon.io",
"legalName" : "Airon.io LLC",
"url" : "https://www.airon.io/",
"contactPoint" : [{
  "@type" : "ContactPoint",
  "email" : "support@airon.io",
  "url"   : "https://airon.io",
  "contactType" : "customer service"
}],
"logo" : "https://www.myetherwallet.com/images/myetherwallet-logo.png",
"description": "Airon.io is a free, open-source, client-side interface for generating Ethereum wallets &amp; more. Interact with the Ethereum blockchain easily &amp; securely.",
"sameAs" : [
  "https://www.airon.io/",
  "https://chrome.google.com/webstore/detail/myetherwallet-cx/nlbmnnijcnlegkjjpcfjclmcfggfefdm",
  "https://www.facebook.com/MyEtherWallet/",
  "https://twitter.com/myetherwallet",
  "https://medium.com/@myetherwallet",
  "https://myetherwallet.github.io/knowledge-base/",
  "https://github.com/kvhnuke/etherwallet",
  "https://github.com/MyEtherWallet",
  "https://kvhnuke.github.io/etherwallet/","https://myetherwallet.slack.com/"
]
}
</script>
</head>
<body>

<header class="{{curNode.name}} {{curNode.service}} {{curNode.service}} nav-index-{{gService.currentTab}}" aria-label="header" ng-controller='tabsCtrl' >

  <section class="bg-gradient header-branding">
    <section class="container">
      @@if (site === 'mew' ) {
      <a class="brand" href="/" aria-label="Go to homepage">
        <img src="images/logo-myetherwallet.svg"   height="64px" width="245px" alt="Airon.io" />
      </a>
      }
      @@if (site === 'cx'  ) {
      <a class="brand" href="/cx-wallet.html" aria-label="Go to homepage">
        <img src="images/logo-myetherwalletcx.svg" height="64px" width="245px" alt="Airon.io" />
      </a>
      }
      <a ng-click="mobileMenuIsOpen = !mobileMenuIsOpen" class="mobile-menu">
        <span ></span>
      </a>
      <div class="tagline" ng-class="{opened: mobileMenuIsOpen}">
        <span class="dropdown dropdown-lang" ng-cloak>
      <li tabindex="0"  aria-haspopup="true" aria-expanded="false" aria-label="change language. current language {{curLang}}" class="dropdown-toggle  btn btn-white" ng-click="dropdown = !dropdown">{{curLang}}<i class="caret"></i>
      <ul class="dropdown-menu" ng-show="dropdown">
        <li><a ng-class="{true:'active'}[curLang=='English']"         ng-click="changeLanguage('en','English'        )"> English         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='简体中文']"         ng-click="changeLanguage('zhcn','简体中文'      )"> 简体中文         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='繁體中文']"         ng-click="changeLanguage('zhtw','繁體中文'      )"> 繁體中文         </a></li>
        <!--
        <li><a ng-class="{true:'active'}[curLang=='Català']"          ng-click="changeLanguage('ca','Català'         )"> Català          </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Deutsch']"         ng-click="changeLanguage('de','Deutsch'        )"> Deutsch         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Ελληνικά']"        ng-click="changeLanguage('el','Ελληνικά'       )"> Ελληνικά        </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Español']"         ng-click="changeLanguage('es','Español'        )"> Español         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Farsi']"           ng-click="changeLanguage('fa','Farsi'          )"> Farsi           </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Suomi']"           ng-click="changeLanguage('fi','Suomi'          )"> Suomi           </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Français']"        ng-click="changeLanguage('fr','Français'       )"> Français        </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Magyar']"          ng-click="changeLanguage('hu','Magyar'         )"> Magyar          </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Haitian Creole']"  ng-click="changeLanguage('ht','Haitian Creole' )"> Haitian Creole  </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Indonesian']"      ng-click="changeLanguage('id','Indonesian'     )"> Bahasa Indonesia</a></li>
        <li><a ng-class="{true:'active'}[curLang=='Italiano']"        ng-click="changeLanguage('it','Italiano'       )"> Italiano        </a></li>
        <li><a ng-class="{true:'active'}[curLang=='日本語']"           ng-click="changeLanguage('ja','日本語'          )"> 日本語          </a></li>
        <li><a ng-class="{true:'active'}[curLang=='한국어']"            ng-click="changeLanguage('ko','한국어'          )"> 한국어           </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Nederlands']"      ng-click="changeLanguage('nl','Nederlands'     )"> Nederlands      </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Norsk Bokmål']"    ng-click="changeLanguage('no','Norsk Bokmål'   )"> Norsk Bokmål    </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Polski']"          ng-click="changeLanguage('pl','Polski'         )"> Polski          </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Português']"       ng-click="changeLanguage('pt','Português'      )"> Português       </a></li>
        <li><a ng-class="{true:'active'}[curLang=='ภาษาไทย']"         ng-click="changeLanguage('th','ภาษาไทย'        )"> ภาษาไทย         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Türkçe']"          ng-click="changeLanguage('tr','Türkçe'         )"> Türkçe          </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Русский']"         ng-click="changeLanguage('ru','Русский'        )"> Русский         </a></li>
        <li><a ng-class="{true:'active'}[curLang=='Tiếng Việt']"      ng-click="changeLanguage('vi','Tiếng Việt'     )"> Tiếng Việt      </a></li>
        -->
        <li role="separator" class="divider"></li>
        <li><a data-toggle="modal" data-target="#disclaimerModal" translate="FOOTER_4"> Disclaimer </a></li>
      </ul>
      </li>
    </span>

        <span class="dropdown dropdown-gas" ng-class="{opened: gasPriceMsg && ajaxReq.type=='ETH'}" ng-cloak>
      <li tabindex="0" aria-haspopup="true" aria-label="adjust gas price" class="dropdown-toggle  btn btn-white" ng-click="dropdownGasPrice = !dropdownGasPrice">
        <span translate="OFFLINE_Step2_Label_3">Gas Price</span>:
          {{gas.value}} Gwei
          <i class="caret"></i>
      <ul class="dropdown-menu gas-menu"  ng-show="dropdownGasPrice">
        <div class="header--gas">
          <span translate="OFFLINE_Step2_Label_3">Gas Price</span>:
          {{gas.value}} Gwei
          <input type="range" ng-model="gas.value" min="{{gas.min}}" max="{{gas.max}}" step="{{gas.step}}" ng-change="gasChanged()"/>
          <p class="small col-xs-4 text-left"> <!--translate="GAS_Price_1"-->
            Really, really slow
          </p>
          <p class="small col-xs-4 text-center"> <!--translate="GAS_Price_2"-->
            Maybe Fast?
          </p>
          <p class="small col-xs-4 text-right"> <!--translate="GAS_Price_3"-->
            Fast
          </p>
          <br />
          <p class="small" style="white-space:normal;font-weight:300;margin: 2rem 0 0;" translate="GAS_PRICE_Desc"></p>
          <a class="small"
             translate="x_ReadMore"
             href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html"
             target="_blank"
             rel="noopener noreferrer"></a>
        </div>
      </ul>
      </li>
      <p class="dropdown-gas__msg"
         ng-show="gasPriceMsg && ajaxReq.type=='ETH'">
        The network is really full right now. Check
        <a href="https://ethgasstation.info/"
           target="_blank" rel="noopener noreferrer">Eth Gas Station</a>
        for gas price to use.
      </p>
    </span>

        <!-- Warning: The separators you see on the frontend are in styles/etherwallet-custom.less. If you add / change a node, you have to adjust these. Ping tayvano if you're not a CSS wizard -->
        <span class="dropdown dropdown-node" ng-cloak>
      <li tabindex="0"
          aria-haspopup="true"
          aria-label="change node. current node {{curNode.name}} node by {{curNode.service}}"
          class="dropdown-toggle  btn btn-white"
          ng-click="dropdownNode = !dropdownNode">
           <span translate="X_Network">Network:</span>
           {{curNode.name}}
           <small>({{curNode.service}})</small>
           <i class="caret"></i>
      <ul class="dropdown-menu" ng-show="dropdownNode">
        <li ng-repeat="(key, value) in nodeList">
          <a ng-class="{true:'active'}[curNode == key]" ng-click="changeNode(key)">
            {{value.name}}
            <small> ({{value.service}}) </small>
            <img ng-show="value.service=='Custom'" src="images/icon-remove.svg" class="node-remove" title="Remove Custom Node" ng-click="removeNodeFromLocal(value.name)"/>
          </a>
        </li>
        <li>
          <a ng-click="customNodeModal.open(); dropdownNode = !dropdownNode;" translate="X_Network_Custom">
            Add Custom Network / Node
          </a>
        </li>
      </ul>
      </li>
    </span>
      </div>
    </section>
  </section>

  <section class="nav-section">
    <nav role="navigation" aria-label="main navigation" class="container nav-container overflowing" >
      <a aria-hidden="true" ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);" ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
      <div class="nav-scroll" ng-class="{opened: true}">
        <ul class="nav-inner">
          @@if (site === 'mew' ) {
          <li ng-repeat="(key1, tab) in tabs" \
              class="nav-item {{tab.name}}" \
              ng-show="tab.mew && !tab.hidden">

            <a tabindex="0"
               ng-if="tab.type == 'tab'"
               ng-class="{active: tab.id==activeTab}"
               aria-label="nav item: {{tab.name | translate}}"
               translate="{{tab.name}}"
               ng-click="tabClick(tab.id)"></a>

            <span class="dropdown dropdown-lang"
                  ng-if="tab.type == 'container'"
                  ng-cloak>
              <a tabindex="0"
                 aria-haspopup="true"
                 aria-label="nav item: {{tab.name | translate}}"
                 ng-click="$parent.$parent.dropdownTab[key1] = !$parent.$parent.dropdownTab[key1];">
                <span translate="{{tab.name}}">View Wallet</span>
              </a>
              <ul class="dropdown-menu navigate-menu" ng-show="$parent.$parent.dropdownTab[key1]">
                <li ng-repeat="(key, value) in tab.Items"
                    ng-show="value.mew"
                    ng-click="tabClick(value.id)">
                  <a translate="{{value.name}}" >
                  </a>
                </li>
              </ul>
            </span>

          </li>
          }
          @@if (site === 'cx' ) {
          <li ng-repeat="tab in tabs track by $index" \
              class="nav-item {{tab.name}}" \
              ng-class="{active: $index==gService.currentTab}"
              ng-show="tab.cx && !tab.hidden"
              ng-click="tabClick($index)">
            <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
          </li>
          }

          <li class="nav-item help navbar-right">
            <a class="btn-airon-menu">    
                Logout <i class="material-icons">exit_to_app</i>
            </a>
          </li>

          <!--
          <li class="nav-item help">
            <a href="https://myetherwallet.github.io/knowledge-base/" target="_blank" rel="noopener noreferrer">
              <span translate="яNAV_Help">
                Help
              </span>
            </a>
          </li>
          -->
        </ul>
      </div>
      <a aria-hidden="true"
         ng-show="showRightArrow"
         class="nav-arrow-right"
         ng-click="scrollRight(100);"
         ng-mouseover="scrollHoverIn(false,2);"
         ng-mouseleave="scrollHoverOut()">&#187;</a>
    </nav>
  </section>

  @@if (site === 'mew' ) { @@include( './header-node-modal.tpl', { "site": "mew" } ) }
  @@if (site === 'cx'  ) { @@include( './header-node-modal.tpl', { "site": "cx"  } ) }

</header>