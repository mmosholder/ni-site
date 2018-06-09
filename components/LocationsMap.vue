<template>
  <section class="ni-finder" v-if="blok" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-finder-search" v-if="center">
          <label>Search</label>
          <gmap-autocomplete @place_changed="setCenter">
          </gmap-autocomplete>
        </div>
        <div class="ni-finder-info">
          <div class="ni-finder-list">
            <div class="ni-finder-list-wrapper">
              <p class="ni-finder-list-none" v-if="!locationsReady">Loading...</p>
              <!-- <p class="ni-finder-list-none" v-if="locations && locations.length == 0 && locationsReady">Sorry, no locations in this area!</p> -->
              <div v-if="locations && locations.length > 0 && locationsReady">
                <div class="ni-finder-list-item" v-for="(loc, i) in locations" v-if="loc.inView && loc.active_account" :key="i">
                  <h3>{{ loc.name }} </h3>
                  <div class="ni-finder-list-item-types">
                    <p v-for="(locType, i) in loc.product_types" :key="i">{{locType}}</p>
                  </div>
                  <p>{{loc.address_line_1}}</p>
                  <p>{{loc.address_line_2}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="ni-finder-map">
            <GmapMap
              :center="center"
              :zoom="14"
              @idle="setMarkerList"
              ref="gmap"
            >
              <gmap-marker
                v-if="locationsReady"
                :key="index"
                v-for="(m, index) in locations"
                :position="m.position"
                @click="center=m.position"
              ></gmap-marker>
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'
  import axios from 'axios';

  export default {
    props: ['blok'],
    data() {
      return {
        center: {lat: 39.7996433, lng: -105.0845088},
        currentPlaces: [],
        locations: null,
        bounds: undefined,
        locationsReady: false
      }
    },

    mounted() {
      this.$refs.gmap.$mapPromise.then((map) => {
        let t = this;

        setTimeout(function() {
          t.getLocations();
        }, 600)
      })
    },

    created() {

    },

    computed: {
      google: gmapApi,
    },

    methods: {
       setCenter(place) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
      },

      getLocations() {
        axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=LnX8nlr2iiejA5zBOCt8Zgtt&starts_with=locations&cv="' +
            Math.floor(Date.now() / 1e3)
          )
          .then(r => {
            this.setLocations(r.data.stories);
          })
      },

      setLocations(stories) {
        console.log('setting locatons');
        this.locations = [];

        stories.forEach(item => {
          this.locations.push(item.content);
        })

        this.setAddresses();
      },

      setAddresses() {
        console.log('setting addresses');
        this.locations.forEach(loc => {

          if (!loc.position && loc.name.length >1) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=` + loc.address_line_1 + loc.address_line_2)
              .then(r => {
                console.log(r.data.results)
                this.$set(loc, 'position', {lat: r.data.results[0].geometry.location.lat,lng: r.data.results[0].geometry.location.lng});
                this.$set(loc, 'inView', false);
              })
              .catch(error => {
                console.log(error)
              })
          }
        });

        this.setMarkerList();
      },

      setMarkerList() {
        if (this.$refs.gmap && (this.locations && this.locations.length > 0)) {
          this.locationsReady = true;
          let bounds = this.$refs.gmap.$mapObject.getBounds();

          this.locations.forEach((loc) => {
            if (bounds.contains(loc.position)) {
              this.$set(loc, 'inView', true)
            } else {
              this.$set(loc, 'inView', false)
            }
          })
        }

      }
    }
  }
</script>

