<template>
  <section class="ni-error">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-error-content">
          <h1 v-if="error.statusCode === 404">404.</h1>
          <h2 v-if="error.statusCode === 404">Sorry, looks like there was an error with the page you were trying to visit.</h2>
          <h1 v-else>An error occurred</h1>
          <nuxt-link class="button button-green" to="/">Back to the home page</nuxt-link>
        </div>
      </div>
    </div>
    <div class="ni-header-filter"></div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>
