import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import AtComponents from 'at-ui';
import 'at-ui-style';

Vue.use(AtComponents);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
