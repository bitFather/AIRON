'use strict';
var customNode = require('./customNode');
var infura = function(srvrUrl, searchUrl, searchParser, tokenInfoUrl, tokenInfoParser, port, httpBasicAuthentication) {
    var _temp = new customNode(srvrUrl, searchUrl, searchParser, tokenInfoUrl, tokenInfoParser, port, httpBasicAuthentication);
    for (var attr in _temp) {
        this[attr] = _temp[attr];
    }
    this.getRandomID = function() {
        return new BigNumber('0x' + globalFuncs.getRandomBytes(5).toString('hex')).toNumber();
    }
}
module.exports = infura;
