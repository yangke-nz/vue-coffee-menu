import Vue from 'vue';
import 'bulma/css/bulma.min.css';
import App from './App.vue';

import store from './store';
// Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
