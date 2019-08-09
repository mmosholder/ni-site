<template>
  <section class="ni-finder" v-if="blok" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <!-- <div class="ni-finder-search" v-if="latLng">
          <label>Search</label>
          <gmap-autocomplete @place_changed="setCenter">
          </gmap-autocomplete>
        </div> -->
        <div class="ni-finder-search">
          <label for="search">Search by name</label>
          <input type="text" name="search" id="" v-model="searchTerm">
        </div>
        <div class="ni-finder-info">
          <!-- <div class="ni-finder-list">
            <div class="ni-finder-list-wrapper">
              <p class="ni-finder-list-none" v-if="!locationsReady">Loading...</p>
              <p class="ni-finder-list-none" v-if="locations && locations.length == 0 && locationsReady">Sorry, no locations in this area!</p>
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
          </div> -->
          <div class="ni-finder-list -temp" v-if="locations">
            <div class="ni-finder-list-wrapper">
              <div class="ni-finder-list-item" v-for="(loc, i) in paginatedData" v-if="loc.content.active_account" :key="i">
                  <h3>{{ loc.name }} </h3>
                  <div class="ni-finder-list-item-types">
                    <p v-for="(locType, i) in loc.content.product_types" :key="i">{{locType}}</p>
                  </div>
                  <p>{{loc.content.address_line_1}}</p>
                  <p>{{loc.content.address_line_2}}</p>
                </div>
            </div>
            <div v-if="pageCount > 0" class="pagination">
              <div
                v-if="page != 0"
                class="pagination-text"
                @click="prevPage"
              >Previous Page</div>
              <div
                class="pagination-text"
                @click="nextPage"
                v-if="page <= pageCount -1"
              >Next Page</div>
            </div>
          </div>
          <!-- <div class="ni-finder-map">
            <GmapMap
              :center="latLng"
              :zoom="14"
              @idle="setMarkerList"
              ref="gmap"
            >
              <gmap-marker
                v-if="locationsReady"
                :key="index"
                v-for="(m, index) in locations"
                :position="m.position"
                @click="latLng=m.position"
              ></gmap-marker>
            </GmapMap>
          </div> -->
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
        latLng: {lat: 39.7996433, lng: -105.0845088},
        currentPlaces: [],
        locations: null,
        bounds: undefined,
        locationsReady: false,
        searchTerm: '',
        page: 0,
        size: 25,
        total: null,
        per_page: 25,
      }
    },

    mounted() {
      // this.geolocate();
      this.getLocations();
    },

    created() {

    },

    computed: {
      google: gmapApi,

      pageCount() {
        return Math.round(this.total / 25);
      },

      filteredLocations() {
        if (this.locations && this.locations.length > 0 && this.searchTerm.length > 0) {
          return _.orderBy(this.locations.filter(location => {
            this.pageNumber = 0;
              return location.name
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase());
            }), ['name', 'asc']);
        } else {
          return _.orderBy(this.locations, ['name'], ['asc']);
        }
      },

      paginatedData() {
        const start = this.page * this.size;
        const end = start + this.size;
        return this.filteredLocations.slice(start, end);
      }
    },

    methods: {
      nextPage() {
        this.page++;
      },

      prevPage() {
        this.page--;
      },

      geolocate() {
        navigator.geolocation.getCurrentPosition(position => {
          this.latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      setCenter(place) {
         // Set the center of the map after searching for a new address
        console.log('place', place);
        this.latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      },

      getLocations() {
        // Get all locations from admin
        axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=LnX8nlr2iiejA5zBOCt8Zgtt&starts_with=locations&per_page=1000&cv="' +
            Math.floor(Date.now() / 1e3)
          )
          .then(r => {
            // this.setLocations(r.data.stories);
            this.locations = r.data.stories;
            this.total = r.data.stories.length;
          })
          .catch(err => {
            console.log('getLoc error', err);
          })
      },

      setLocations(stories) {
        this.locations = [];

        stories.forEach((item, i) => {
          if (item.content.active_account) {
            this.locations.push(item.content);
          }
          if (i+1 == stories.length) {
            console.log('firing set addresses');
            this.setAddresses();
          }
        })


      },

      setAddresses() {
        // Loop over locations and get the google map lat/long for each address and save it to data
        console.log('setting addresses');
        this.locations.forEach((loc, i) => {
          if (!loc.position && loc.name.length > 1) {
            setTimeout(() => {
              axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=` + loc.address_line_1 + loc.address_line_2 + `&key=` + process.env.maps)
              .then(r => {
                // console.log(r.data.results[0], loc.name);
                if (r.data.results[0]) {
                  const tempPos = {
                    lat: r.data.results[0].geometry.location.lat, lng: r.data.results[0].geometry.location.lng
                  }

                  if (tempPos) {
                    this.$set(loc, 'position', tempPos);
                    this.$set(loc, 'inView', false);
                  }
                }

                // Find last iteration of loop
                if ((i+1) == this.locations.length) {
                  // Set any markers in view after getting all addresses
                  console.log('setting markers from then');
                  this.setMarkerList();
                }
              })
            }, 1000);

          }
        });
      },

      setMarkerList() {
        // Ensure the map is mounted and that there are locations
        console.log('seting markers')
        if (this.$refs.gmap && (this.locations && this.locations.length > 0)) {
          console.log('actually setting markers')
          let bounds = this.$refs.gmap.$mapObject.getBounds();

          // Check if locations are in view
          this.locations.forEach((loc, i) => {

            if (loc.position && loc.position.lat && loc.position.lng) {

              if (bounds.contains(JSON.parse(JSON.stringify(loc.position)))) {
                this.$set(loc, 'inView', true)
              } else {
                this.$set(loc, 'inView', false)
              }
            }

            if ((i+1) == this.locations.length) {
              this.locationsReady = true;
            }
          })
        }

      }
    }
  }
</script>

