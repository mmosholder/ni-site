<template>
  <section>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </section>
</template>

<script>
export default {
  data () {
    return { story: { content: {} } }
  },
  created() {
    console.log('testing creation')
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()

      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories/home', {
      version: 'published'
    }).then((r) => {
      console.log(r);
      // return r.data;
    }).catch((r) => {
      console.log(r);
      // context.error({ statusCode: r.response.status, message: r.response })
    })
  }
}
</script>
