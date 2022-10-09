import {createRouter, createWebHashHistory} from "vue-router";
import routes from './routes.js'

const router = createRouter({
    history: createWebHashHistory(),
    // Es6特性:  kv 一致可以省略 后面的 V(routes)
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {top: 0}
    }
})
export default router
