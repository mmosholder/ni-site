<template>
  <div :style="{backgroundImage: 'url(' + this.item.image + ')'}" class="bg-image"></div>
</template>

<script>
export default {
  props: ["item"]
}
</script>

