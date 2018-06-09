<template>
  <section class="home">
    <div class="ni-container">
      <div class="ni-row">
        <div class="home-title-text">
          <h1>{{ blok.title}}</h1>
        </div>
      </div>
    </div>
    <div class="home-filter-bg"></div>
    <img class="home-logo" src="~/assets/images/ni-triangle-logo@2x.png" alt="New Image's triangle hops logo">
  </section>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

