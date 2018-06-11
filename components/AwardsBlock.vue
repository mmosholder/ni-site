<template>
  <section class="ni-awards" v-editable="blok">
    <div class="ni-awards-container">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-awards-wrapper">
            <div class="ni-awards-item" v-for="(item, i) in blok.awards" :key="i">
              <p class="ni-awards-item-top">{{ item.top_text }}</p>
              <div class="ni-awards-item-number">
                <span>NO</span>
                <h2>{{ item.number }}</h2>
              </div>
              <p class="ni-awards-item-bottom">{{ item.bottom_text }}</p>
            </div>
          </div>
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

