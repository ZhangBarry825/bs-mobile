// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Vuex from 'vuex'
import store from '../store/store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import SIdentify from './components/SIdentify'

Vue.use(SIdentify)
Vue.use(Vuex)
Vue.use(iView)

Vue.config.productionTip = false

import 'swiper/dist/css/swiper.css';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
