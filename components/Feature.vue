<template>
  <section class="ni-feature">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-feature-container">
          <hr>
          <h2>{{ blok.title }}</h2>
          <div class="ni-row">
            <div class="ni-feature-text">
              <p v-for="(item,i) in blok.paragraphs" :key="i">{{ item.body }}</p>
            </div>
            <div class="ni-feature-image">
              <img :src="blok.image" alt="">
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    props: ['blok'],
  }
</script>

