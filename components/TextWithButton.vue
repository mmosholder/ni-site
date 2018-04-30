<template>
  <section class="ni-text-block">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-text-block-content">
          <h2>{{ blok.title }}</h2>
          <p>{{ blok.text }}</p>
        </div>
        <div class="ni-text-block-right">
          <div class="ni-text-block-button">
            <nuxt-link class="button button-green" :to="blok.button_url">{{ blok.button_text }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>

