<main class="tab-pane active"
      ng-if="globalService.currentTab==globalService.tabs.tokenCreation.id"
      ng-controller='tokenCreationCtrl'
      ng-cloak>

<article class="row block">

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
        <section class="col-sm-11">
          <label translate="CREATETOKEN_totalTokens">
            Total tokens
          </label>
          <div class="input-group">
            <input class="form-control" type="text" ng-model="tx.totalsupply"/>
            <div class="input-group-btn">
              <a style="min-width: 150px"
                 class="btn btn-default dropdown-toggle"
                 ng-click="dropdownAmount = !dropdownAmount"
                 ng-class="dropdownEnabled ? '' : 'disabled'">
                    {{unitReadable}}
                    <i class="caret"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-right" ng-show="dropdownAmount">
                <li>
                  <li ng-repeat="item in dropItems track by $index">
                      <a ng-class="{true:'active'}[token.countType == $index]" ng-click="setCountMode($index, item)" >
                          {{item}}
                      </a>
                  </li>
                </li>
              </ul>
            </div>
          </div>
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
                       type="text"
                       placeholder="{{'CREATETOKEN_decimals_short' | translate }}"
                       ng-model="token.decimals"/>
          </section>
        </article>

      <!-- ABI Textarea -->
        <article class="clearfix">
          <section class="col-xs-11">
            <label translate="CREATETOKEN_preview">
              Preview
            </label>
            <textarea class="form-control"
                      rows="6"
                      readonly=true
                      ng-model="contract.abi">
            </textarea>
             <a class="btn btn-primary" ng-click="generateToken()" translate="CREATETOKEN_generate">
               Generate
            </a>
          </section>
        </article>
      
</article>

</main>
