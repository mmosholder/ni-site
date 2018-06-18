<template>
  <section class="ni-testimonial" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-testimonial-content">
          <div class="ni-testimonial-text">
            <div v-html="text"></div>
          </div>
          <div class="ni-testimonial-info">
            <div class="ni-testimonial-image" :style="{backgroundImage: 'url(' + blok.image + ')'}"></div>
            <div class="ni-testimonial-attribution">
              <h4>{{blok.testimonial_signoff}}</h4>
              <p>{{blok.testimonial_attribution}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'

export default {
  props: ['blok'],
  computed: {
    text () {
      return marked(this.blok.text)
    }
  }
}
</script>

