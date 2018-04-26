<template>
  <section>
    <BeersHeader />
    <section v-for="(item, i) in data.stories" :key="i" class="ni-beers">
      <nuxt-link class="ni-beers-beer" :to="'/' + item.full_slug">
        {{ item.content.name }}
      </nuxt-link>
    </section>
  </section>
</template>

<script>
  import BeersHeader from '~/components/BeersHeader'

  export default {
    components: { BeersHeader },

    data () {
      return {
        total: 0,
        data: {
          stories: []
        },
        beers: []
      }
    },

    mounted () {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
      this.$storyblok.on('published', () => {
        location.reload(true)
      })
    },

    asyncData (context) {
      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

      return context.app.$storyapi.get('cdn/stories', {
        version: version,
        starts_with: `beers/`
      }).then((r) => {
        return r
      }).catch((r) => {
        context.error({ statusCode: r.response.status, message: r.response.data })
      })
    }
  }
</script>
