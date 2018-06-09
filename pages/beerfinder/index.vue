<template>
  <section>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    <BeerfinderForm />
  </section>
</template>

<script>
  import BeerfinderForm from '~/components/BeerfinderForm'

  export default {
    components: { BeerfinderForm },

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
      return context.app.$storyapi.get('cdn/stories/beerfinder', {
        version: 'draft'
      }).then((r) => {
        return r.data
      }).catch((r) => {
        context.error({ statusCode: r.response.status, message: r.response.data })
      })
    }
  }
</script>
