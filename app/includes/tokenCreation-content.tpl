<!-- If unlocked with PK -->
<article class="row block" ng-show="visibility=='createTokenView'&&wallet || visibility=='verifyTokenTxView'">
    <div ng-show="visibility=='createTokenView'&&wallet">
        <h2 class="col-xs-12" translate="CREATETOKEN_Title">
            Token generation
        </h2>

        <!-- Name -->
        <article class="clearfix">
            <section class="col-xs-11">
                <label translate="CREATETOKEN_name">
                    Name of your asset
                </label>
                <p translate="CREATETOKEN_name_help">
                    Please use only Latin letters
                </p>
                <input class="form-control"
                       type="text"
                       pattern="[a-zA-Z]{3,4}"
                       ng-model="token.name"/>
            </section>
        </article>

        <!-- Description -->
        <article class="clearfix">
            <section class="col-xs-11">
                <label translate="CREATETOKEN_description">
                    Description:
                </label>
                <input class="form-control"
                       type="text"
                       placeholder="{{'CREATETOKEN_description_short' | translate }}"
                       ng-model="token.description"/>
            </section>
        </article>

        <!-- Total tokens -->
        <article class="clearfix">
            <section class="col-xs-11">
                <label translate="CREATETOKEN_totalTokens">
                    Total tokens
                </label>
                <input class="form-control" type="number" ng-model="token.totalCount" min="0"/>
            </section>
        </article>

        <!-- Decimals -->
        <article class="clearfix">
            <section class="col-xs-11">
                <label translate="CREATETOKEN_decimals">
                    Decimals
                </label>
                <p translate="CREATETOKEN_decimals_help">
                    This field defines the number of decimal signs for your token
                </p>
                <input class="form-control"
                       type="number"
                       min="0"
                       max="18"
                       placeholder="{{'CREATETOKEN_decimals_short' | translate }}"
                       ng-model="token.decimals"/>
            </section>
        </article>

        <!-- ABI Textarea -->
        <article class="clearfix">
            <section class="col-xs-11">
                <div class="red-fee" ng-show="tx.gasLimit !== null">
                    {{'CREATETOKEN_fee' | translate }} {{calculateFee()}} ether
                </div>
            </section>
            <section class="col-xs-11">
                <a class="btn btn-primary btn-block"
                   type="submit"
                   ng-click="tryOpenModal()"
                   ng-show="!isGenerate"
                   translate="CREATETOKEN_generate">
                    Generate
                </a>
            </section>
        </article>
    </div>

    <div ng-show="visibility=='verifyTokenTxView'">
        <h2 class="col-xs-12" translate="CREATETOKEN_VerifyTitle">
            Verify token create status
        </h2>
        <section class="col-xs-11 clearfix">
            <input
                    class="form-control"
                    type="text"
                    placeholder="0x3f0efedfe0a0cd611f2465fac9a3699f92d6a06613bc3ead4f786856f5c73e9c"
                    ng-model="txResult.hash"
                    aria-label="{{'x_TxHash' | translate}}" ng-class="Validator.isValidTxHash(txResult.hash) ? 'is-valid' : 'is-invalid'"/>
            <button tabindex="0"
                    role="button"
                    class="btn btn-primary"
                    ng-click="startVerifyTokenTxStatus()"
                    translate="CREATETOKEN_CheckTokenTxStatus"> Check Token TX Status </button>
        </section>
    </div>

    <br />
    <!-- Wait for tx -->
    <article class="clearfix" ng-show="Validator.isValidTxHash(txResult.hash)&& txResult.status != -1">
        <section class="col-xs-11">
            <div class="cont-md" ng-show="txResult.status == txStatus.mined">
                <h3 class="text-success" translate="CREATETOKEN_txResultFoundOnChain"> Transaction Found </h3>
                <h5> <a href="https://etherscan.io/tx/{{ tx.hash }}" target="_blank" rel="noopener noreferrer"> {{ tx.hash }} </a> </h5>
                <p><strong translate="CREATETOKEN_txResultFoundOnChain_1"></strong></p>
                <ul>
                    <li translate="CREATETOKEN_txResultFoundOnChain_2"></li>
                    <li translate="CREATETOKEN_txResultFoundOnChain_3"></li>
                </ul>
            </div>

            <div class="cont-md" ng-show="txResult.status == txStatus.notFound">
                <h3 class="text-danger" translate="CREATETOKEN_txResultNotFound">
                    Transaction Not Found
                </h3>
                <p>
                    <strong translate="CREATETOKEN_txResultNotFound_1"></strong>
                </p>
                <ul>
                    <li translate="CREATETOKEN_txResultNotFound_2"></li>
                    <li translate="CREATETOKEN_txResultNotFound_3"></li>
                    <li translate="CREATETOKEN_txResultNotFound_4"></li>
                </ul>
            </div>

            <div class="cont-md" ng-show="txResult.status == txStatus.found">
                <h3 class="text-warning" translate="CREATETOKEN_txResultFoundInPending">
                    Pending Transaction Found
                </h3>
                <ul>
                    <li translate="CREATETOKEN_txResultFoundInPending_1"></li>
                    <li translate="CREATETOKEN_txResultFoundInPending_2"></li>
                    <li translate="CREATETOKEN_txResultFoundInPending_3"></li>
                </ul>
            </div>

            <div class="cont-md" ng-show="txResult.status == txStatus.unknown">
                <h3 class="text-warning" translate="CREATETOKEN_txResultUnknownTx">
                    Unknow Transaction Found
                </h3>
                <ul>
                    <li translate="CREATETOKEN_txResultUnknownTx_1"></li>
                </ul>
            </div>

            <div>
                <h4 translate="CREATETOKEN_txResultDetails" class="cont-md">
                    Transaction Details
                </h4>
                <br />
                <table class="table table-striped txstatus__2 cont-md">
                    <tbody>
                    <tr>
                        <td translate="CREATETOKEN_txResultHash">
                            Hash
                        </td>
                        <td>
                            {{txResult.hash}}
                        </td>
                    </tr>
                    <tr ng-show="txResult.tokenAddress">
                        <td translate="CREATETOKEN_txResultTokenAddress">
                            Token address
                        </td>
                        <td>
                            {{txResult.tokenAddress}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="col-xs-12 clearfix" ng-show="visibility=='createTokenView'">
            <button class="btn btn-primary"
                    ng-click="clearPage()"
                    translate="CREATETOKEN_txResultStopWaitingAndClearPage"
                    ng-show="txResult.status != txStatus.mined">
                Clear
            </button>
            <button class="btn btn-primary"
                    ng-click="clearPage()"
                    translate="CREATETOKEN_txResultClose"
                    ng-show="txResult.status == txStatus.mined">
                Close
            </button>
        </section>
    </article>
    @@if (site === 'mew' ) { @@include( '../includes/tokenCreation-content-modal.tpl', { "site": "mew" } ) }

</article>
<!-- / Content -->