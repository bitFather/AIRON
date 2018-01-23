<!-- If unlocked with PK -->
<article class="row block" ng-hide="wallet.type=='addressOnly'">

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
            <input class="form-control" type="number" ng-model="token.totalCount"/>
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
               translate="CREATETOKEN_generate">
                Generate
            </a>
        </section>
    </article>
    @@if (site === 'mew' ) { @@include( '../includes/tokenCreation-content-modal.tpl', { "site": "mew" } ) }

</article>
<!-- / Content -->