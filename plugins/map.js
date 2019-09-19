import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MAP_KEY || "AIzaSyBnZmc-ydhJ9Wi9LY5EmaNLS6HA679EQ4Y",
    libraries: "places"
  }
});
