import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/bags',
        name: 'bags',
        component: () => import('../components/bag/Home.vue')
    },
    {
        path: '/bags/create',
        name: 'bagCreate',
        component: () => import('../components/bag/Create.vue')
    },
    {
        path: '/bags/edit/:id',
        name: 'bagEdit',
        component: () => import('../components/bag/Edit.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../components/product/Home.vue')
    },
    {
        path: '/products/create',
        name: 'productCreate',
        component: () => import('../components/product/Create.vue')
    },
    {
        path: '/products/edit/:id',
        name: 'productEdit',
        component: () => import('../components/product/Edit.vue')
    },
    {
        path: '/coupons',
        name: 'coupons',
        component: () => import('../components/coupon/Home.vue')
    },
    {
        path: '/coupons/create',
        name: 'couponCreate',
        component: () => import('../components/coupon/Create.vue')
    },
]

const router = new VueRouter({
    routes
});

export default router;