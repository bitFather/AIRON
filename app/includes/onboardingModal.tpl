<article class="modal fade" id="onboardingModal" tabindex="-1" ng-controller='onboardingCtrl'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">

        <article class="onboarding__modal">
          <h3 class="onboarding__title" translate="ONBOARD_welcome_title">
            What is Airon
          </h3>
          <p translate="ONBOARD_welcome_description">
            Airon is a free, open-source, comfortable client-side interface You can create your new custom ERC20 token You and only you are responsible for your security. Multisign wallet*</p>
          <section class="row row--flex">
            <div class="col-xs-12 onboarding__content">
              <h5 translate="ONBOARD_welcome_header">
                *coming after march 2018
              </h5>
              <ul>
                <li translate="ONBOARD_welcome_content__1">
                  If you send your public key (address) to someone, they can send you ETH or tokens.</li>
                <li translate="ONBOARD_welcome_content__2">
                  If you send your private key to someone, they now have full control of your account.
                </li>
                <li translate="ONBOARD_welcome_content__3">
                  If you lose your public and private key then you lose your tokens
                </li>
                <li translate="ONBOARD_welcome_content__4">
                  We never transmit, receive or store your private key, password, or other account information.</li>
                <li translate="ONBOARD_welcome_content__5">
                  We cannot recover your funds or freeze your account if you visit a phishing site or lose your private key.
                </li>
              </ul>
            </div>
          </section>
          <div class="onboarding__buttons text-center">
            <a ng-click="clickButton()" class="btn btn-primary">
              <span translate="ONBOARD_welcome_button">
                Start
              </span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</article>
