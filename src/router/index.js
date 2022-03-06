import {createRouter, createWebHashHistory} from "vue-router"
import routes from '~pages'
import guests from "./guests"
import {useAuth} from "../store/auth";
import {appConfig, authConfig} from "../configs";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next(appConfig.home)
    } else {
        if (guests.includes(to.path)) {
            next()
        } else {
            const auth = useAuth()
            auth.check().then(res => {
                next()
            }).catch(() => {
                next(authConfig.login)
            })
        }
    }
})

export default router
