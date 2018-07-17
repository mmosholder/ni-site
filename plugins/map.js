import Vue from 'vue'
import * as VueGoogleMaps from '~/node-modules/vue2-google-maps/src/main'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDj3rc_vdtkDIvbGuUyCNMV3QT_JuHofqs",
    libraries: "places"
  }
});
