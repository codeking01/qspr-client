const routes = [
    // 动态导包
    // {path: '/', component: () => import('@/views/HomePage.vue')},
    {
        path: '/backend', component: () => import('@/views/BackEnd/index.vue'),
        children: [
            {path: '/backend/compute_model', component: () => import ('@/views/BackEnd/compute_model.vue')},
            {path: '/backend/substance', component: () => import ('@/views/BackEnd/substance.vue')},
            {path: '/backend/substance_category', component: () => import ('@/views/BackEnd/substance_category.vue')},
            {path: '/backend/property', component: () => import ('@/views/BackEnd/property.vue')},
        ]
    },
    {
        path: '/常规有机物', component: () => import('@/views/GeneralOrganics/index.vue'),
    },
    {
        path: '/环糊精', component: () => import('@/views/Cyclodextrin/index.vue'),
    },
    {path: '/SaturatedVaporPressure', component: () => import('@/components/Upload/Upload.vue')},
    {path: '/upload', component: () => import('@/components/Upload/Upload.vue')},
]

export default routes;