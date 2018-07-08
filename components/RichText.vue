<template>
  <div class="ni-rich-text" v-if="blok" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-rich-text-content">
          <div v-html="text"></div>
        </div>
      </div>
    </div>
  </div>
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

