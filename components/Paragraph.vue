<template>
  <section class="ni-paragraph">
    <div class="ni-container">
      <div class="ni-row">
        <p>{{blok.body}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Paragraph',
    props: ['blok'] 
  }
</script>

