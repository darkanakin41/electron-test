import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.min.css';
require('./style/app.scss')

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
