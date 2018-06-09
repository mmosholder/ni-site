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
                  <form>
                    <input class="cta-input" type="email" placeholder="yourname@email.com">
                    <button class="button button-green" type="submit">{{blok.button_text}}</button>
                  </form>
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
  export default {
    name: 'NewsletterCTA',
    props: ['blok']
  }
</script>

