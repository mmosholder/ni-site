<template>
  <section class="ni-image-grid ni-image-grid-two" v-if="blok"  v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-image-grid-item" v-for="(item, i) in blok.images" :key="i">
          <SingleImage :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SingleImage from "~/components/SingleImage"

export default {
  components: { SingleImage },
  props: ['blok']
}
</script>

