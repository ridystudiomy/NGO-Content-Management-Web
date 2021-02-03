import Vue from 'vue'

import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import {  store } from './store'
import firebase from 'firebase'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import titleMixin from './mixins/titleMixin'


Vue.config.productionTip = false
Vue.config.silent = true


Vue.use(Router)

import Autocomplete from '@trevoreyre/autocomplete-vue'


import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)

import CountryFlag from 'vue-country-flag'

Vue.component('country-flag', CountryFlag)

Vue.use(Autocomplete)

Vue.mixin(titleMixin)
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

import LoadScript from 'vue-plugin-load-script';
 
Vue.use(LoadScript);



import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: { key:"API-KEY HERE",
  libraries: 'places'
},
installComponents: true
});


// create global filter
Vue.filter('snippet', val => {
  if(!val || typeof(val) != 'string') return ''
  val = val.slice(0, 100) + '...'
  return val
})

let app=null;

if(!app){
firebase.auth().onAuthStateChanged(() => {
app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

})
}


