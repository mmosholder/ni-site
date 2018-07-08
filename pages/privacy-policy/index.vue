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
      return context.app.$storyapi.get('cdn/stories/privacy-policy', {
        version: 'draft'
      }).then((r) => {
        return r.data
      }).catch((r) => {
        context.error({ message: r.response })
      })
    }
  }
</script>

