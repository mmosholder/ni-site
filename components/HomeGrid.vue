<template>
  <section class="ni-home-grid" v-if="blok"  v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-home-grid-image">
          <div class="bg-image" :style="{backgroundImage: 'url(' + blok.left_image + ')'}"></div>
        </div>
        <div class="ni-home-grid-image">
          <div class="bg-image" :style="{backgroundImage: 'url(' + blok.right_image + ')'}"></div>
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

