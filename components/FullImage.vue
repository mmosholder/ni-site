<template>
  <section class="ni-full-image" v-if="blok"  v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-full-image-item" v-for="(item, i) in blok.item" :key="i">
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

