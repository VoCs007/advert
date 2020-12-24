import Vue from 'vue'
import VueRouter from 'vue-router'
import Adverts from '../components/adverts.vue'
import Card from '../components/card.vue'
import CreateAdvert from '../components/createadvert.vue'
import Login from '../components/login'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Adverts',
    component: Adverts
}, {
    path: '/card/:id',
    name: 'Card',
    component: Card,
}, {
    path: '/createadvert',
    name: 'CreateAdvert',
    component: CreateAdvert,
}, {
    path: '/login',
    name: Login,
    component: Login
}]

const router = new VueRouter({
    routes
})

export default router