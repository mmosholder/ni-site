<template>
  <section class="ni-text-block ni-text-hours">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-text-block-content ni-text-hours-content">
          <h2>{{ blok.title }}</h2>
          <p>{{ blok.text }}</p>
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

