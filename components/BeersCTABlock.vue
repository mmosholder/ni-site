<template>
  <div v-editable="blok" style="background-color: #F9F9F9;">
    <section :class="['ni-beer-cta', $route.name == 'index' ? 'home-cta' : '']">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-beer-cta-title"><h2>{{blok.title}}</h2></div>
        </div>
        <div class="ni-row centered">
          <div :class="['ni-beer-cta-text', computedTextStyle]">
            <p v-if="blok.text">{{ blok.text }}</p>
          </div>
          <div class="ni-beer-cta-buttons" :style="computedButtonsStyle">
            <div class="ni-beer-cta-button" v-if="blok.hollow_button_text">
              <a class="button button-knockout" :href="blok.hollow_button_url.cached_url">{{blok.hollow_button_text}}</a>
            </div>
            <div class="ni-beer-cta-button" v-if="blok.color_button_text">
              <a class="button button-green" :href="blok.color_button_url.cached_url">{{blok.color_button_text}}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['blok'],

  computed: {
    computedButtonsStyle() {
      if (this.blok.hollow_button_text && this.blok.color_button_text) {
        return 'justify-content: center;'
      }
    },

    computedTextStyle() {
      if (this.blok.hollow_button_text && this.blok.color_button_text) {
        return '-centered';
      }
    }
  }
}
</script>

