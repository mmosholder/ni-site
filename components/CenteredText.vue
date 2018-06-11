<template>
  <section class="ni-centered" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-centered-text">
          <p>{{blok.body}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

