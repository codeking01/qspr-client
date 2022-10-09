const routes = [
    {path: '/', component: () => import('@/views/HomePage.vue')},
    {path: '/upload', component: () => import('@/components/Upload.vue')},
]

export default routes;