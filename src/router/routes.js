const routes = [
    // todo 动态导包
    {path: '/', component: () => import('@/views/HomePage.vue')},
    {path: '/SaturatedVaporPressure', component: () => import('@/components/Upload/Upload.vue')},
    {path: '/upload', component: () => import('@/components/Upload/Upload.vue')},
]

export default routes;