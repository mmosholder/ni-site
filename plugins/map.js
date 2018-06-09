import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDj3rc_vdtkDIvbGuUyCNMV3QT_JuHofqs",
    libraries: "places"
  }
});
