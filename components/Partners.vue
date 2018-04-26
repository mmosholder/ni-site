<template>
  <section class="ni-partners">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-partners-container">
          <hr>
          <h2>Partners</h2>
          <div class="ni-partners-content">
            <h3>{{blok.name}}</h3>
            <a :href="blok.url_link">{{blok.url_text}}</a>
            <p>{{ blok.text}}</p>
          </div>
          <div class="ni-partners-logo">
            <img :src="blok.logo" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Partners',
    props: ['blok']
  }
</script>

