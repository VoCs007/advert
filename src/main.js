/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/store';

Vue.config.productionTip = false;
Vue.config.useEslint = false;
new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');