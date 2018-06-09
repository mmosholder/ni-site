<template>
  <section class="to-go" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="to-go-title">
          <h2>{{blok.title}}</h2>
        </div>
      </div>
      <div class="ni-row centered">
        <div class="to-go-text">
          <p>{{blok.text}}</p>
        </div>
        <div class="to-go-image">
          <img :src="blok.image" alt="">
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

