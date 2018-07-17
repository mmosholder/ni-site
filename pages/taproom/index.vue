<template>
  <section>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </section>
</template>

<script>
  export default {
    data() {
      return { story: { content: {} } }
    },
    mounted() {
      if (this.$storyblok.inEditor) {
        this.$storyblok.init()

        this.$storyblok.on('change', () => {
          location.reload(true)
        })
      }
    },
    asyncData(context) {
      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

      return context.app.$storyapi.get('cdn/stories/taproom', {
        version: version
      }).then((r) => {
        return JSON.parse(JSON.stringify(r.data));
      }).catch((r) => {
        context.error({ statusCode: r.response.status, message: r.response.data })
      })
    }
  }
</script>
