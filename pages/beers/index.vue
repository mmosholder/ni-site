<template>
  <section>
    <BeerHeader />
    <section class="ni-beer">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-beer-title">
            <div class="ni-beer-title-container">
              <h2>Core</h2>
            </div>
            <hr>
          </div>
          <div class="ni-beer-item" v-for="(beer, i) in coreBeers" :key="i">
            <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
              v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
              class="ni-beer-item-content">
              <img :src="beer.main_image" :alt="beer.name" />
              <div v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                <div class="ni-beer-item-text">
                  <h3>{{ beer.name }}</h3>
                  <p>{{ beer.blurb }}</p>
                </div>
                <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-beer-title">
            <div class="ni-beer-title-container">
              <h2>Seasonal</h2>
            </div>
            <hr>
          </div>
          <div class="ni-beer-item" v-for="(beer, i) in seasonalBeers" :key="i">
            <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
              v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
              class="ni-beer-item-content">
              <img :src="beer.main_image" :alt="beer.name" />
              <div v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                <div class="ni-beer-item-text">
                  <h3>{{ beer.name }}</h3>
                  <p>{{ beer.blurb }}</p>
                </div>
                <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-beer-title">
            <div class="ni-beer-title-container">
              <h2>Barrel</h2>
            </div>
            <hr>
          </div>
          <div class="ni-beer-item" v-for="(beer, i) in barrelBeers" :key="i">
            <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
              v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
              class="ni-beer-item-content">
              <img :src="beer.main_image" :alt="beer.name" />
              <div v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                <div class="ni-beer-item-text">
                  <h3>{{ beer.name }}</h3>
                  <p>{{ beer.blurb }}</p>
                </div>
                <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-beer-title">
            <div class="ni-beer-title-container">
              <h2>Special</h2>
            </div>
            <hr>
          </div>
          <div class="ni-beer-item" v-for="(beer, i) in specialBeers" :key="i">
            <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
              v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
              class="ni-beer-item-content">
              <img :src="beer.main_image" :alt="beer.name" />
              <div v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                <div class="ni-beer-item-text">
                  <h3>{{ beer.name }}</h3>
                  <p>{{ beer.blurb }}</p>
                </div>
                <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <BeersCTA v-if="beers.length" />
  </section>
</template>

<script>
  import BeerHeader from '~/components/BeerHeader'
  import BeersCTA from '~/components/BeersCTA'
  import _ from 'lodash'

  export default {
    components: { BeerHeader, BeersCTA },

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

      this.setBeers();
    },

    computed: {
      coreBeers() {
        return _.filter(this.beers, function(o) {return o.type == "core"})
      },

      seasonalBeers() {
        return _.filter(this.beers, function(o) {return o.type == "seasonal"})
      },

      barrelBeers() {
        return _.filter(this.beers, function(o) {return o.type == "barrel"})
      },

      specialBeers() {
        return _.filter(this.beers, function(o) {return o.type == "special"})
      },
    },

    asyncData (context) {
      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

      return context.app.$storyapi.get('cdn/stories', {
        version: version,
        starts_with: 'beers'
      }).then((r) => {
        return r
      }).catch((r) => {
        context.error({ statusCode: r.response.status, message: r.response.data })
      })
    },

    methods: {
      setBeers() {
        let beer = {};
        this.data.stories.forEach(item => {
          beer = item.content;
          this.$set(beer, 'full_slug', item.full_slug);
          this.$set(beer, 'overlay_visible', false)
          this.beers.push(beer);
          beer = {};
        })
      }
    }
  }
</script>
