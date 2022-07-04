import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import TestView from '../views/TestView.vue'
import gdpr from '../views/gdpr.vue'
import imprint from '../views/imprint.vue'
import blog from '../views/blog.vue'
import p1 from '../views/p1.vue'
import terraformstatefile from '../views/terraform-statefile.vue'
import rcloneionos from '../views/rclone-ionos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog',
    name: 'blog',
    component: blog
  },
  {
    path: '/p1',
    name: 'p1',
    component: p1
  },
  {
    path: '/terraform-statefile',
    name: 'terraform-statefile',
    component: terraformstatefile
  },
  {
    path: '/rclone-ionos',
    name: 'rclone-ionos',
    component: rcloneionos
  },
  {
    path: '/gdpr',
    name: 'gdpr',
    component: gdpr
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: imprint
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  }/*,
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  }
*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
