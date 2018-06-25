'use strict';
var nodes = function() {}
nodes.customNode = require('./nodeHelpers/customNode');
nodes.infuraNode = require('./nodeHelpers/infura');
nodes.metamaskNode = require('./nodeHelpers/metamask');
nodes.nodeTypes = {
    ETH: "ETH",
    ETC: "ETC",
    MUS: "MUSIC",
    Ropsten: "ROPSTEN ETH",
    Kovan: "KOVAN ETH",
    Rinkeby: "RINKEBY ETH",
    RSK: "RSK",
    EXP: "EXP",
    UBQ: "UBQ",
    POA: "POA",
    TOMO: "TOMO",
    ELLA: "ELLA",
    Custom: "CUSTOM ETH"
};
nodes.ensNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.domainsaleNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.customNodeObj = {
    'name': 'CUS',
    'blockExplorerTX': '',
    'blockExplorerAddr': '',
    'type': nodes.nodeTypes.Custom,
    'eip155': false,
    'chainId': '',
    'tokenList': [],
    'abiList': [],
    'service': 'Custom',
    'lib': null
};
nodes.nodeList = {
    'eth_mew': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'Main Network',
        'lib': new nodes.customNode('https://api.myetherapi.com/eth', 'https://ethplorer.io/service/service.php?search=',data => {
            return {result:data.results,total:data.total}
        }, 'https://api.ethplorer.io/getAddressInfo/[[address]]?apiKey=freekey', data => {
            return {
                balance: data.ETH.balance,
                tokensInfo: data.tokens ? data.tokens.map(x => {
                        return {
                            address: x.tokenInfo.address,
                            symbol: x.tokenInfo.symbol,
                            balance: x.tokenInfo.decimals > 0 ? new BigNumber(x.balance).div(10 ** x.tokenInfo.decimals).toString() : x.balance,
                        }
                    }
                ) : []
            }
        }),
        'tokenFactoryAddress': '0xf79475e2d60a46979bcf00687c58e731cb4162ce'
    },
    'eth_ethscan': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'Etherscan.io',
        'lib': require('./nodeHelpers/etherscan'),
        'tokenFactoryAddress': '0xf79475e2d60a46979bcf00687c58e731cb4162ce'
    },
    'eth_infura': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://mainnet.infura.io/mew','https://ethplorer.io/service/service.php?search=',data => {
            return {result:data.results,total:data.total}
        }, 'https://api.ethplorer.io/getAddressInfo/[[address]]?apiKey=freekey', data => {
            return {
                balance: data.ETH.balance,
                tokensInfo: data.tokens ? data.tokens.map(x => {
                        return {
                            address: x.tokenInfo.address,
                            symbol: x.tokenInfo.symbol,
                            balance: x.tokenInfo.decimals > 0 ? new BigNumber(x.balance).div(10 ** x.tokenInfo.decimals).toString() : x.balance,
                        }
                    }
                ) : []
            }
        }),
        'tokenFactoryAddress': '0xf79475e2d60a46979bcf00687c58e731cb4162ce'
    },
    'eth_giveth': {
        'name': 'ETH',
        'blockExplorerTX': 'https://etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.ETH,
        'eip155': true,
        'chainId': 1,
        'tokenList': require('./tokens/ethTokens.json'),
        'abiList': require('./abiDefinitions/ethAbi.json'),
        'service': 'Giveth.io',
        'lib': new nodes.customNode('https://mew.giveth.io','https://ethplorer.io/service/service.php?search=',data => {
            return {result:data.results,total:data.total}
        }, 'https://api.ethplorer.io/getAddressInfo/[[address]]?apiKey=freekey', data => {
            return {
                balance: data.ETH.balance,
                tokensInfo: data.tokens ? data.tokens.map(x => {
                        return {
                            address: x.tokenInfo.address,
                            symbol: x.tokenInfo.symbol,
                            balance: x.tokenInfo.decimals > 0 ? new BigNumber(x.balance).div(10 ** x.tokenInfo.decimals).toString() : x.balance,
                        }
                    }
                ) : []
            }
        }),
        'tokenFactoryAddress': '0xf79475e2d60a46979bcf00687c58e731cb4162ce'
    },
    'rin_ethscan': {
        'name': 'Rinkeby',
        'type': nodes.nodeTypes.Rinkeby,
        'blockExplorerTX': 'https://rinkeby.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://rinkeby.etherscan.io/address/[[address]]',
        'eip155': true,
        'chainId': 4,
        'tokenList': require('./tokens/rinkebyTokens.json'),
        'abiList': require('./abiDefinitions/rinkebyAbi.json'),
        'service': 'Etherscan.io',
        'lib': require('./nodeHelpers/etherscanRin'),
        'tokenFactoryAddress': '0x105d97ef2e723f1cfb24519bc6ff15a6d091a3f1'
    },
    'rin_infura': {
        'name': 'Rinkeby',
        'blockExplorerTX': 'https://rinkeby.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://rinkeby.etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.Rinkeby,
        'eip155': true,
        'chainId': 4,
        'tokenList': require('./tokens/rinkebyTokens.json'),
        'abiList': require('./abiDefinitions/rinkebyAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.infuraNode('https://rinkeby.infura.io/mew','https://rinkeby.etherscan.io/searchHandler?t=t&term=',data => {
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
            },'https://rinkeby.etherscan.io/address/[[address]]',
            data => {
                const result = {
                    balance: 0,
                    tokensInfo: []
                }
                const reg = /<ul id="balancelist"[\s\S]*<\/ul>/
                if(!data.match(reg)){
                    return result
                }
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
        ),
        'tokenFactoryAddress': '0x105d97ef2e723f1cfb24519bc6ff15a6d091a3f1'
    },
};


nodes.ethPrice = require('./nodeHelpers/ethPrice');

nodes.tokenFactory = {
    'abi': require('./abiDefinitions/tokenFactoryAbi.json'),
};
module.exports = nodes;
