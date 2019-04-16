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
//挂载全局常量
import global_ from './components/Global'
Vue.prototype.GLOBALDATA = global_

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
