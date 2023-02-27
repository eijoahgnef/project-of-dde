import { RouteRecordRaw } from "vue-router";

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
    },
    {
        path: '/diary',
        name: 'diary',
        component: () => import('../views/diary/index.vue'),
        meta: { showBar: true }
    },
    {
        path: '/notepad',
        name: 'notepad',
        component: () => import('../views/notepad/index.vue'),
        meta: { showBar: true }
    }, 
    {
        path: '/bill',
        name: 'bill',
        component: () => import('../views/bill/index.vue'),
        meta: { showBar: true }
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/index.vue'),
        meta: { showBar: true }
    },
    {
        path: '/article',
        name: 'article',
        component: () => import('../views/article/index.vue')
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/upload/index.vue')
    },
    {
        path: '/visualData',
        name: 'visualData',
        component: () => import('../views/visualData/index.vue')
    }
]

export default constantRoutes