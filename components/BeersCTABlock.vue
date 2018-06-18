<template>
  <div v-editable="blok" style="background-color: #F9F9F9;">
    <section class="ni-beer-cta home-cta">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-beer-cta-title"><h2>{{blok.title}}</h2></div>
        </div>
        <div class="ni-row centered">
          <div class="ni-beer-cta-button">
            <nuxt-link class="button button-knockout" :to="'/' +  blok.hollow_button_url.cached_url">{{blok.hollow_button_text}}</nuxt-link>
          </div>
          <div class="ni-beer-cta-button">
            <nuxt-link class="button button-green" :to="'/' + blok.color_button_url.cached_url">{{blok.color_button_text}}</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

