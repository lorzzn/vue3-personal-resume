import { createRouter, createWebHashHistory } from 'vue-router';
const home = () => import( /* webpackChunkName: "home" */ "../views/home/home.vue");
const resumeIndex = () => import( /* webpackChunkName: "resume" */ "../views/resume/index.vue");
const resumeView = () => import( /* webpackChunkName: "resume" */ "../views/resume/resume.vue");
const resumeEdit = () => import( /* webpackChunkName: "resume" */ "../views/resume/edit.vue");

// 路由数组
const routes = [
    {
        path: "/",
        name: "home",
        component: home,
        meta: {
            title: "我的主页"
        }
    },
    {
        path: "/resume",
        name: "resumeIndex",
        component: resumeIndex,
        meta: {
            title: "我的简历"
        },
        children: [
            {
                path: "",
                name: "resumeView",
                component: resumeView,
                meta: {
                    title: "我的简历"
                },
            },
            {
                path: "edit",
                name: "resumeEdit",
                component: resumeEdit,
                meta: {
                    title: "编辑简历"
                },
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "我的个人网站"
    }
    next()
})

export default router
