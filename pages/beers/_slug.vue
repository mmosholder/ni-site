<template>
  <div>
     <section :class="['ni-profile ni-profile-' + story.content.color]" v-editable="story.content">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-profile-left">
            <img class="-logo" :src="story.content.secondary_image" :alt="story.content.name">
            <img class="-can" :src="story.content.main_image" :alt="story.content.name">
            <nuxt-link :class="['ni-profile-left-link ni-profile-left-link-' + story.content.color]" :to="'/beers'">&lt; Back to All Beers</nuxt-link>
          </div>
          <div class="ni-profile-right">
            <div class="ni-profile-title">
              <h1>{{story.content.name}}</h1>
              <p>{{ story.content.short_description }}</p>
            </div>
            <div class="ni-profile-science">
              <h2>The Science</h2>
              <p>{{ story.content.science_blurb }} </p>
              <ul class="ni-profile-science-list">
                <li>
                  <img src="~/assets/images/malt-icon@2x.png" alt="">
                  <p>{{story.content.malt}}</p>
                </li>
                <li>
                  <img src="~/assets/images/hop-icon@2x.png" alt="">
                  <p>{{story.content.hops}}</p>
                </li>
                <li>
                  <img src="~/assets/images/yeast-icon@2x.png" alt="">
                  <p>{{story.content.yeast}}</p>
                </li>
              </ul>
            </div>
            <div class="ni-profile-story">
              <h2>The Story</h2>
              <p>{{ story.content.story_text }}</p>
            </div>
            <div class="ni-profile-info">
              <h2>Gotta Have It?</h2>
              <p :class="['ni-profile-info-' + story.content.color]">Check out or <a href="#">Beerfinder</a> to find a bar or retailer near you</p>
              <p :class="['ni-profile-info-' + story.content.color]">{{ story.content.name }} is currently <strong>{{ computedStatus }}</strong> at the taproom. <a v-if="story.content.on_tap" href="">Get directions</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="ni-cta ni-cta-newsletter">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-cta-content">
            <h2>We're Pretty Fun</h2>
            <p>And we want you to have fun with us! Words about registering for our newsletter so you don’t miss out because missing out is lame.</p>
          </div>
          <div class="ni-cta-signup">
            <form>
              <input type="email" placeholder="yourname@email.com">
              <button class="button button-green" type="submit">Keep Me in The Loop</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return { story: { content: {} } }
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

    return context.app.$storyapi.get(`cdn/stories/beers/${context.params.slug}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  },

  computed: {
    computedStatus() {
      if (this.story.content.on_tap) {
        return 'ON TAP';
      } else {
        return 'not on tap';
      }
    }
  }
}
</script>
