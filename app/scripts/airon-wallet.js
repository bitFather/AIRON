'use strict';

var AironWallet = function (obj) {
  this.address = obj.address;
  this.name = obj.name;
}

AironWallet.prototype.getAddress = function () {
  return ethUtil.publicToAddress(this.address, true)
}
AironWallet.prototype.getAddressString = function () {
  return '0x' + this.getAddress().toString('hex')
}

AironWallet.prototype.toRaw = function () {
  return { address: this.address, name: this.name };
}

AironWallet.prototype.setTokens = function () {
  this.tokenObjs = [];
  var defaultTokensAndNetworkType = globalFuncs.getDefaultTokensAndNetworkType();
  var tokens = Token.popTokens;

  for (var i = 0; i < tokens.length; i++) {
    this.tokenObjs.push(
      new Token(
        tokens[i].address,
        this.getAddressString(),
        tokens[i].symbol,
        tokens[i].decimal,
        tokens[i].type
      )
    );

    var autoTokens = globalFuncs.localStorage.getItem('autoLoadTokens')
    var autoLoadTokens = autoTokens ? autoTokens : [];
    var thisAddr = tokens[i].address

    if (autoLoadTokens.indexOf(thisAddr) > -1) {
      this.tokenObjs[this.tokenObjs.length - 1].setBalance();
    }
  }

  var storedTokens = globalFuncs.localStorage.getItem('localTokens', null) != null ? JSON.parse(globalFuncs.localStorage.getItem('localTokens')) : [];

  var conflictWithDefaultTokens = [];
  for (var e = 0; e < storedTokens.length; e++) {
    if (globalFuncs.doesTokenExistInDefaultTokens(storedTokens[e], defaultTokensAndNetworkType)) {
      conflictWithDefaultTokens.push(storedTokens[e]);
      // don't push to tokenObjs if token is default; continue to next element
      continue;
    }

    this.tokenObjs.push(
      new Token(
        storedTokens[e].contractAddress,
        this.getAddressString(),
        globalFuncs.stripTags(storedTokens[e].symbol),
        storedTokens[e].decimal,
        storedTokens[e].type,
      )
    );
    this.tokenObjs[this.tokenObjs.length - 1].setBalance();
  }
  removeAllTokenConflicts(conflictWithDefaultTokens, storedTokens)
};

function saveToLocalStorage(key, value) {
  globalFuncs.localStorage.setItem(key, JSON.stringify(value))
}

function removeConflictingTokensFromLocalStorage(conflictLocalTokens, localTokens) {
  for (var i = 0; i < conflictLocalTokens.length; i++) {
    for (var e = 0; e < localTokens.length; e++) {
      if (conflictLocalTokens[i] === localTokens[e]) {
        localTokens.splice(e, 1);
      }
    }
  }
  return localTokens;
}

// https://stackoverflow.com/questions/32238602/javascript-remove-duplicates-of-objects-sharing-same-property-value
function removeDuplicates(originalArray, objKey) {
  var trimmedArray = [];
  var values = [];
  var value;

  for (var i = 0; i < originalArray.length; i++) {
    value = originalArray[i][objKey];

    if (values.indexOf(value) === -1) {
      trimmedArray.push(originalArray[i]);
      values.push(value);
    }
  }
  return trimmedArray;
}

function removeAllTokenConflicts(conflictWithDefaultTokens, localTokens) {
  var deConflictedTokens = removeConflictingTokensFromLocalStorage(conflictWithDefaultTokens, localTokens);
  var deDuplicatedTokens = removeDuplicates(deConflictedTokens, 'symbol');
  saveToLocalStorage("localTokens", deDuplicatedTokens)
}

AironWallet.prototype.toSave = function () {
  return {
    address: this.address, name: this.name, tokens: this.tokenList.map(e => {
      return {
        address: e.address,
        balance: e.balance,
        symbol: e.symbol,
        IsFavour: (e.IsFavour) ? true : false
      }
    })
  };
}

AironWallet.prototype.pullToken = function (callback) {
  var parentObj = this;

  ajaxReq.getAddressTokenBalance(parentObj.address, data => {
    parentObj.tokenList = data.tokensInfo;
  })
}

AironWallet.prototype.pullBalance = function (callback) {
  var parentObj = this;
  this.balance = this.usdBalance = this.eurBalance = this.btcBalance = this.chfBalance = this.repBalance = this.gbpBalance = 'loading';

  ajaxReq.getBalance(parentObj.address, function (data) {
    if (data.error) {
      parentObj.balance = data.msg;
    }
    else {
      parentObj.balance = etherUnits.toEther(data.data.balance, 'wei');

      ajaxReq.getETHvalue(function (data) {
        parentObj.usdPrice = etherUnits.toFiat('1', 'ether', data.usd);
        parentObj.gbpPrice = etherUnits.toFiat('1', 'ether', data.gbp);
        parentObj.eurPrice = etherUnits.toFiat('1', 'ether', data.eur);
        parentObj.btcPrice = etherUnits.toFiat('1', 'ether', data.btc);
        parentObj.chfPrice = etherUnits.toFiat('1', 'ether', data.chf);
        parentObj.repPrice = etherUnits.toFiat('1', 'ether', data.rep);

        parentObj.usdBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.usd);
        parentObj.gbpBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.gbp);
        parentObj.eurBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.eur);
        parentObj.btcBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.btc);
        parentObj.chfBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.chf);
        parentObj.repBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.rep);

        if (callback) {
          callback();
        }
      });
    }
  });
}

module.exports = AironWallet;