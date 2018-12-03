import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHa5ynyRCTTcgK6xodoEVDK-h6lM051xQ",
    libraries: "places"
  }
});
