<template>
  <section class="ni-home-grid" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-home-grid-image">
          <h2>Beer</h2>
          <div :style="{backgroundImage: 'url(' + blok.beer + ')'}" class="bg-image"></div>
        </div>
        <div class="ni-home-grid-image">
          <h2>Food</h2>
          <div :style="{backgroundImage: 'url(' + blok.food + ')'}" class="bg-image"></div>
        </div>
        <div class="ni-home-grid-image">
          <h2>Passion</h2>
          <div :style="{backgroundImage: 'url(' + blok.passion + ')'}" class="bg-image"></div>
        </div>
        <div class="ni-home-grid-image">
          <h2>Purpose</h2>
          <div :style="{backgroundImage: 'url(' + blok.purpose + ')'}" class="bg-image"></div>
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
