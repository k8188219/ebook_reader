import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/read/:name?',
    name: 'Read',
    component: () => import('../views/Read.vue'),
    props: true
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/bookshelf',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'bookshelf/:gid?',
        name: 'BookShelf',
        component: () => import('../views/home/BookShelf.vue'),
        props: true
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('../views/home/Setting.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
