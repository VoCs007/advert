/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable eol-last */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/adverts';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        user,
    },
});