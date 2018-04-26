<template>
  <header class="ni-header" :style="{backgroundImage: 'url(' + this.blok.background_image + ')'}" v-if="blok" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-header-content">
          <h1>{{ blok.title }}</h1>
          <p>{{ blok.text }}</p>
        </div>
      </div>
    </div>
    <div class="ni-header-filter"></div>
    <img class="ni-header-logo" src="~/assets/images/ni-triangle-logo@2x.png" alt="New Image's triangle hops logo">
  </header>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

