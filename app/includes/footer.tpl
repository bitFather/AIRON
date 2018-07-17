<div class="footer-bot">
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