/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Adverts from '../components/adverts.vue';
import Card from '../components/card.vue';
import CreateAdvert from '../components/createadvert.vue';
import Login from '../components/login.vue';
import Profile from '../components/profile.vue';
import Registration from '../components/registration.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/adverts/:page?/:category?',
        name: 'Adverts',
        component: Adverts,
    }, {
        path: '/card/:id',
        name: 'AdvertCard',
        component: Card,
    }, {
        path: '/createadvert',
        name: 'CreateAdvert',
        component: CreateAdvert,
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
    }, {
        path: '/register',
        name: 'Registration',
        component: Registration,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    }
];

const router = new VueRouter({
    routes,
});

export default router;