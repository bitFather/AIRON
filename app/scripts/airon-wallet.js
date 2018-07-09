'use strict';

var AironWallet = function (obj) {
    this.address = obj.address;
    this.name = obj.name;
}

AironWallet.prototype.pullBalance = function (callback) {
    var parentObj = this;
    this.balance = this.usdBalance = this.eurBalance = this.btcBalance = this.chfBalance = this.repBalance =  this.gbpBalance = 'loading';

    ajaxReq.getBalance(parentObj.address, function(data) {
        if (data.error){
            parentObj.balance = data.msg;
        }
        else {
            parentObj.balance = etherUnits.toEther(data.data.balance, 'wei');

            ajaxReq.getETHvalue(function(data) {
                parentObj.usdPrice   = etherUnits.toFiat('1', 'ether', data.usd);
                parentObj.gbpPrice   = etherUnits.toFiat('1', 'ether', data.gbp);
                parentObj.eurPrice   = etherUnits.toFiat('1', 'ether', data.eur);
                parentObj.btcPrice   = etherUnits.toFiat('1', 'ether', data.btc);
                parentObj.chfPrice   = etherUnits.toFiat('1', 'ether', data.chf);
                parentObj.repPrice   = etherUnits.toFiat('1', 'ether', data.rep);

                parentObj.usdBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.usd);
                parentObj.gbpBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.gbp);
                parentObj.eurBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.eur);
                parentObj.btcBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.btc);
                parentObj.chfBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.chf);
                parentObj.repBalance = etherUnits.toFiat(parentObj.balance, 'ether', data.rep);

                if(callback) {
                    callback();
                }
            });
        }
    });
}

module.exports = AironWallet;