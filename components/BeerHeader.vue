<template>
  <header class="ni-header" :style="{backgroundImage: 'url(' + $store.state.globalHeading.background_image + ')'}" v-if="$store.state.globalHeading" v-editable="$store.state.globalHeading">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-header-title">
          <h1>{{ $store.state.globalHeading.title }}</h1>
        </div>
        <div class="ni-header-text">
          <p>{{ $store.state.globalHeading.text }}</p>
        </div>
      </div>
    </div>
    <div class="ni-header-filter"></div>
    <img class="ni-header-logo" src="~/assets/images/ni-triangle-logo@2x.png" alt="New Image's triangle hops logo">
  </header>
</template>

<script>
  export default {
  }
</script>

