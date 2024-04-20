import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {userInfoStore} from "@/stores/counter.js";
import {useCookies} from 'vue3-cookies'

const {cookies} = useCookies() // 导入vue3使用cookies
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        }
    ]
})
export default router
router.beforeEach(function (to, from, next) {
  if (to.name === "login") {
    next()
    return;
  }
  let store = userInfoStore()
  if (!store.token) {
    console.log("未登录", cookies.get("info"))
    // next({name: "login"})
    router.push({name: "login"})
  } else {
    next();
  }
})