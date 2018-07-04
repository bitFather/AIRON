<div class="footer-bot">
  <section class="pre-footer" xmlns="http://www.w3.org/1999/html">
    <div class="container">
      <p>
        Airon.io does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. Protect your keys &amp; always check that you are on correct URL.
        <a role="link" tabindex="0" data-toggle="modal" data-target="#disclaimerModal">
          You are responsible for your security.
        </a>
      </p>
    </div>
  </section>

  <footer class="footer" role="content" aria-label="footer" ng-controller='footerCtrl' >

    <article class="block__wrap" style="max-width: 1780px; margin: auto;">

      <section class="footer--left">

        <p>
          Airon &copy; {{getYear()}}
        </p>

      </section>
      <section class="footer--cent">
          <p>
            If you have any questions please contact <a href="mailto:support@airon.io">support@airon.io</a>
          </p>
          <p>
            Our telegram channel <a href="tg://t.me/airon_official">@airon_official</a>
          </p>
      </section>
    </article>

  </footer>
</div>

@@if (site === 'mew' ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './footer-disclaimer-modal.tpl',   { "site": "cx"  } ) }

@@if (site === 'mew' ) { @@include( './onboardingModal.tpl',   { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './onboardingModal.tpl',   { "site": "cx"  } ) }