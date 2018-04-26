<template>
  <div v-editable="blok">
    <template v-for="(item, i) in blok.body">
      <component  :blok="item" :is="item.component" :key="i"></component>
    </template>
  </div>
</template>

<script>

  export default {
    props: ['blok']
  }

</script>