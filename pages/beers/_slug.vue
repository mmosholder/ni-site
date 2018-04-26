<template>
  <section>
    <div v-editable="story.content">
      <h1>{{ story.content.name }}</h1>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return { story: { content: { body: '' } } }
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
    let endpoint = `cdn/stories/${context.params.language}/blog/${context.params.slug}`

    return context.app.$storyapi.get(endpoint, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>
