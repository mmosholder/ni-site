<template>
  <section class="ni-tap" id="onTap">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-tap-title">
          <h2>{{ blok.title }}</h2>
          <div class="ni-tap-title-icon">
            <img src="~/assets/images/dark-triangle@4x.png" alt="New Image triangle icon">
            <span>Taproom Exclusive</span>
          </div>
        </div>
      </div>
      <div class="ni-row">
        <div class="ni-tap-item" v-for="(beer, i) in beersWithInfo" v-if="beersWithInfo.length" :key="i">
          <nuxt-link :to="'/' + beer.full_slug" class="ni-tap-item-wrapper">
            <div class="ni-tap-item-info">
              <h3>{{ beer.name }}</h3>
              <p>{{ beer.short_description}}</p>
            </div>
            <div v-if="beer.taproom_exclusive" class="ni-tap-item-icon">
              <img src="~/assets/images/dark-triangle@4x.png" alt="New Image triangle icon">
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import _ from 'lodash'
  import axios from 'axios'

  export default {
    props: ['blok'],

    data () {
      return {
        beers: null,
        untappedBeers: null,
        beersWithInfo: []
      }
    },

    created() {
      this.getBeers();
      this.getUntappedBeers();
    },

    computed: {
      onTapBeers() {
        return _.filter(this.beers, function(o) {return o.on_tap})
      }
    },

    watch: {
      beers() {
        if (this.untappedBeers && this.beers) {
          this.setBeers();
        }
      }
    },

    methods: {
      getBeers() {
        axios.get("https://api.storyblok.com/v1/cdn/stories?version=published&token=LnX8nlr2iiejA5zBOCt8Zgtt&starts_with=beers&per_page=100cv=" + Math.floor(Date.now() / 1e3))
          .then((r) => {
          this.beers = r.data.stories;
        }).catch((r) => {

        })
      },

      getUntappedBeers() {
        let headers =
        axios.get('https://business.untappd.com/api/v1/sections/327217/items', { headers: { Authorization: `Basic ${process.env.UNTAPPD}` }})
          .then(r => {
            this.untappedBeers = r.data.items;
          })
      },

      setBeers() {
        // console.log(beers);
        let onTapBeer = {};

        this.untappedBeers.forEach(item => {
          let foundBeer = this.findFromBeers(item);
          let beer = {};
           if (foundBeer) {
             beer.name = foundBeer.name;
             beer.full_slug = foundBeer.full_slug;
             beer.short_description = foundBeer.content.short_description;
             beer.taproom_exclusive = foundBeer.content.taproom_exclusive;
             this.beersWithInfo.push(beer);
             beer = {};
           }
          // beer = item.content;
          // this.$set(beer, 'full_slug', item.full_slug);
          // this.beers.push(beer);
          // beer = {};
        })
      },

      findFromBeers(untappedBeer) {
        return this.beers.find(beer => {
          if (beer.name === untappedBeer.name) {
            return beer;
          }
        })
      }
    }
  }
</script>
