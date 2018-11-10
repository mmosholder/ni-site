<template>
  <section>
    <BeerHeader />
    <section class="ni-beer">
      <div class="ni-container">
        <div class="ni-row">
          <div class="ni-beer-categories">
            <h2>Categories</h2>
            <div class="ni-beer-category">
              <i class="fas fa-atom"></i>
              <span>Core</span>
            </div>
            <div class="ni-beer-category">
              <i class="far fa-sun"></i>
              <span>Seasonal</span>
            </div>
            <div class="ni-beer-category">
              <i class="far fa-star"></i>
              <span>Special</span>
            </div>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-beer-col">
            <div class="ni-beer-item" v-for="beer in col1" :key="beer.name">
              <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
                v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
                class="ni-beer-item-content">
                <img :class="[beer.overlay_visible ? '-blur' : '']" :src="beer.main_image" :alt="beer.name" />
                <transition name="fade">
                  <a :href="`/${beer.full_slug}`" v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                    <div class="ni-beer-item-text">
                      <div class="ni-beer-item-overlay-title">
                        <i :class="setIcon(beer.type)"></i>
                        <h3>{{ beer.name }}</h3>
                      </div>
                      <p>{{ beer.blurb }}</p>
                    </div>
                    <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
                  </a>
                </transition>
              </div>
            </div>
          </div>
          <div class="ni-beer-col">
            <div class="ni-beer-item" v-for="beer in col2" :key="beer.name">
              <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
                v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
                class="ni-beer-item-content">
                <img :class="[beer.overlay_visible ? '-blur' : '']" :src="beer.main_image" :alt="beer.name" />
                <transition name="fade">
                  <a :href="`/${beer.full_slug}`" v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                    <div class="ni-beer-item-text">
                      <div class="ni-beer-item-overlay-title">
                        <i :class="setIcon(beer.type)"></i>
                        <h3>{{ beer.name }}</h3>
                      </div>
                      <p>{{ beer.blurb }}</p>
                    </div>
                    <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
                  </a>
                </transition>
              </div>
            </div>
          </div>
          <div class="ni-beer-col">
            <div class="ni-beer-item" v-for="beer in col3" :key="beer.name">
              <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
                v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
                class="ni-beer-item-content">
                <img :class="[beer.overlay_visible ? '-blur' : '']" :src="beer.main_image" :alt="beer.name" />
                <transition name="fade">
                  <a :href="`/${beer.full_slug}`" v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                    <div class="ni-beer-item-text">
                      <div class="ni-beer-item-overlay-title">
                        <i :class="setIcon(beer.type)"></i>
                        <h3>{{ beer.name }}</h3>
                      </div>
                      <p>{{ beer.blurb }}</p>
                    </div>
                    <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
                  </a>
                </transition>
              </div>
            </div>
          </div>
          <div class="ni-beer-mobile">
            <div class="ni-beer-item" v-for="beer in mobileCol" :key="beer.name">
              <div v-on:mouseenter="beer.overlay_visible = !beer.overlay_visible"
                v-on:mouseleave="beer.overlay_visible = !beer.overlay_visible"
                class="ni-beer-item-content">
                <img :class="[beer.overlay_visible ? '-blur' : '']" :src="beer.main_image" :alt="beer.name" />
                <transition name="fade">
                  <a :href="`/${beer.full_slug}`" v-if="beer.overlay_visible" :class="['ni-beer-item-overlay ni-beer-item-overlay-' + beer.color]">
                    <div class="ni-beer-item-text">
                      <div class="ni-beer-item-overlay-title">
                        <i :class="setIcon(beer.type)"></i>
                        <h3>{{ beer.name }}</h3>
                      </div>
                      <p>{{ beer.blurb }}</p>
                    </div>
                    <nuxt-link :to="'/' + beer.full_slug">More Info</nuxt-link>
                  </a>
                </transition>
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
        beers: [],
        col1: [],
        col2: [],
        col3: [],
        mobileCol: []
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

    },

    asyncData (context) {
      let version = context.query._storyblok || context.isDev ? 'published' : 'published'

      return context.app.$storyapi.get('cdn/stories', {
        version: version,
        starts_with: 'beers'
      }).then((r) => {
        return r
      }).catch((r) => {
        context.error({ statusCode: r.response.status, message: r.response })
      })
    },

    methods: {
      setBeers() {
        let beer = {};
        this.data.stories.forEach((item, i) => {
          beer = item.content;
          this.$set(beer, 'full_slug', item.full_slug);
          this.$set(beer, 'overlay_visible', false);
          this.$set(beer, 'position', i + 1);

          if (beer.position % 3 === 0) {
            this.col1.push(beer);
          } else if (beer.position % 3 === 1) {
            this.col2.push(beer);
          } else if (beer.position % 3 === 2) {
            this.col3.push(beer);
          }

          this.mobileCol.push(beer);
          beer = {};
        });
      },

       setIcon(cat) {
        if (cat == "core") {
          return "fas fa-atom";
        } else if (cat == "seasonal") {
          return "far fa-sun";
        } else if (cat == "special") {
          return "far fa-star";
        }
      }
    }
  }
</script>
