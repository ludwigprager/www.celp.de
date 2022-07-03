import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCompositionAPI from '@vue/composition-api'
import vuetify from "./plugins/vuetify";
import i18n from './i18n'
//import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
//Vue.use(Vuetify)

/*
// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-123584996-1',
  router,

//disabled: false,
//disabled: true,

//debug: {
//  enabled: true, // default value
//  trace: true, // default value
//  sendHitTask: true // default value
//}

});
*/

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
