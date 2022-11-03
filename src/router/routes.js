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
        path: '/QSPR', component: () => import('@/views/QSPR/index.vue'),
        children: [
            {path: '/QSPR/常规有机物', component: () => import ('@/views/QSPR/GeneralOrganics/index.vue')},
            {path: '/QSPR/环糊精', component: () => import('@/views/QSPR/Cyclodextrin/index.vue'),},
        ]
    },
    {
        path: '/GC', component: () => import('@/views/GC/index.vue'),
        children: [
            {path: '/GC/常规有机物', component: () => import ('@/views/GC/GeneralOrganics/index.vue')},
        ]
    },
    {path: '/SaturatedVaporPressure', component: () => import('@/components/Upload/Upload.vue')},
    {path: '/upload', component: () => import('@/components/Upload/Upload.vue')},
]

export default routes;