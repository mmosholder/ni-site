<template>
  <section class="ni-text-image">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-text-image-img">
          <img :src="blok.image" alt="">
        </div>
        <div class="ni-text-image-text">
          <h2>{{ blok.title }} </h2>
          <p v-for="(item, i) in blok.paragraphs" :key="i">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TextImage',
    props: ['blok']
  }
</script>

