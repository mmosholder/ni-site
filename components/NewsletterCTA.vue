<template>
  <section class="ni-cta ni-cta-newsletter">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-cta-card">
          <div class="ni-cta-content-wrapper">
            <div class="ni-row">
              <div class="ni-cta-content">
                <h2>{{blok.title}}</h2>
                <p>{{blok.text}}</p>
                <div class="ni-cta-signup">
                  <div id="mc_embed_signup">
                    <form action="https://nibrewing.us11.list-manage.com/subscribe/post?u=51cbbe7ccc1afadd41266046c&amp;id=00c00d72cc" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                      <div id="mc_embed_signup_scroll">

                        <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                        <div class="mc-field-group form-group-full">
                          <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
                          <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                        </div>
                        <div id="mce-responses" class="clear">
                          <div class="response" id="mce-error-response" style="display:none"></div>
                          <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_51cbbe7ccc1afadd41266046c_00c00d72cc" tabindex="-1" value=""></div>
                          <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn button-green"></div>
                        </div>
                    </form>
                  </div>
                  <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='MMERGE3';ftypes[3]='text';}(jQuery));var $mcj = jQuery;</script>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jQuery from 'jquery';
import $ from 'jquery';

  export default {
    name: 'NewsletterCTA',
    props: ['blok']
  }
</script>

