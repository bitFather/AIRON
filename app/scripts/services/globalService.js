'use strict'
var globalService = function($http, $httpParamSerializerJQLike) {

    globalFuncs.checkAndRedirectHTTPS()
    ajaxReq.http = $http
    ajaxReq.postSerializer = $httpParamSerializerJQLike
    ajaxReq.getETHvalue = nodes.ethPrice.getETHvalue
    ajaxReq.getRates = nodes.ethPrice.getRates

    var tabs = {
      generateWallet: {
          type: 'tab',
          id: 0,
          name: "NAV_GenerateWallet_alt",
          url: "generate-wallet",
          hidden: true,
          mew: true,
          cx: false
      },
       viewWalletInfo: {
          type: 'tab',
          id: 1,
          name: "x_Wallet",
          url: "view-wallet-info",
          mew: true,
          cx: false
      },
        sendTransaction: {
            type: 'tab',
            id: 2,
            name: "NAV_SendEther",
            url: "send-transaction",
            mew: true,
            cx: true
        },
        swap: {
            type: 'tab',
            id: 3,
            name: "NAV_Swap",
            url: "swap",
            mew: false,
            cx: false
        },
        offlineTransaction: {
            type: 'tab',
            id: 4,
            name: "NAV_Offline",
            url: "offline-transaction",
            mew: false,
            cx: false
        },
        contracts: {
            type: 'tab',
            id: 5,
            name: "NAV_Contracts",
            url: "contracts",
            mew: false,
            cx: false
        },
        ens: {
            type: 'tab',
            id: 6,
            name: "NAV_ENS",
            url: "ens",
            mew: false,
            cx: false
        },
        domainsale: {
            type: 'tab',
            id: 7,
            name: "NAV_DomainSale",
            url: "domainsale",
            mew: false,
            cx: false
        },
        txStatus: {
            type: 'tab',
            id: 8,
            name: "NAV_CheckTxStatus",
            url: "check-tx-status",
            mew: true,
            cx: true
        },
        signMsg: {
            type: 'tab',
            id: 9,
            name: "NAV_SignMsg",
            url: "sign-message",
            mew: false,
            cx: false
        },
        bulkGenerate: {
            type: 'tab',
            id: 10,
            name: "NAV_BulkGenerate",
            url: "bulk-generate",
            mew: false,
            cx: false
        },
        tokenCreation: {
            type: 'tab',
            id: 11,
            name: "NAV_TokenCreation",
            url: "token-creation",
            mew: true,
            cx: true
        }
    }

    var currentTab = 3
    if (typeof chrome != 'undefined')
        currentTab = chrome.windows === undefined ? 0 : 1
    return {
        tabs: tabs,
        currentTab: currentTab
    }

    var tokensLoaded = false

}

module.exports = globalService


