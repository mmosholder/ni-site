<template>
  <div>
    <Nav />
    <main id="main" role="main" :class="[this.$route.name == 'index' ? 'home' : '']">
      <nuxt/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
</style>
