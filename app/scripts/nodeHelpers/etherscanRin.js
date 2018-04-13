'use strict';
var _ethscan = require('./etherscan');
var rinkeby = {};
for (var attr in _ethscan) {
    rinkeby[attr] = _ethscan[attr];
}
rinkeby.SERVERURL = 'https://rinkeby.etherscan.io/api';
rinkeby.SearchURL = 'https://rinkeby.etherscan.io/searchHandler?t=t&term=';
rinkeby.tokenInfoUrl = 'https://rinkeby.etherscan.io/address/[[address]]'
rinkeby.searchResultParser = data => {
    let result = []
    let index = 0
    for (let elem of data) {
        if (index > 5) {
            break
        }
        let resElem = []
        resElem.length = 3
        let symbol = elem.match(/\([^\s]*\)/g)
        resElem[1] = symbol[symbol.length - 1]
        resElem[0] = elem.slice(0, elem.lastIndexOf(resElem[1]))
        resElem[1] = resElem[1].slice(1, resElem[1].length - 1)
        resElem[2] = elem.split('\t')[1]
        result.push(resElem)
        index++
    }
    return {result: result, total: data.length}
}

rinkeby.tokenInfoParser = data => {
    const result = {
        balance: 0,
        tokensInfo: []
    }
    const reg = /<ul id="balancelist"[\s\S]*<\/ul>/
    const ul = data.match(reg)[0]
    const parser = new DOMParser()
    const listItems=parser.parseFromString(ul, "text/html").body.children[0].children;

    for(let i = 1; i < listItems.length; i++){
        const regIsToken = /<a href="\/token\/0x/
        if(listItems[i].innerHTML.match(regIsToken)){
            const values = [...listItems[i].children].find(x => x.localName === 'a').innerText
            const array = values.split('\n')
            const symbol = array[1].split(' ')[1]
            const balance = array[1].split(' ')[0].split(',').join('')
            if(balance !== '0'){
                const address = array[0].slice(0, array[0].indexOf(symbol))
                result.tokensInfo.push({
                    address: address,
                    symbol: symbol,
                    balance:balance
                })
            }
        }
    }
    return result
}

module.exports = rinkeby;