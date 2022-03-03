import {defineStore} from "pinia"
import persist from "../utils/persist"
import {authConfig} from "../configs";

export const useAuth = defineStore('state', {
    state: () => ({
        token: persist.get('token'),
        user: persist.get('user'),
        expire: persist.get('expire'),
    }),

    getters: {
        hasUser: state => state.user !== null,
        hasToken: state => state.token !== null,
        notExpired: state => state.expire === null || (state.expire >= new Date().getTime()),
    },

    actions: {
        setToken(token = null) {
            this.token = persist.set('token', token)
        },

        setUser(user = null) {
            this.user = persist.set('user', user)
        },

        updateExpire() {
            if (authConfig.expire > 0) {
                this.expire = persist.set('expire', authConfig.expire + new Date().getTime())
            }
        },

        removeExpire() {
            this.expire = persist.remove('expire')
        },

        login(token, user) {
            this.setToken(token)
            this.setUser(user)
            this.updateExpire()
        },

        logout() {
            this.setToken()
            this.setUser()
            this.removeExpire()
        },

        check() {
            return new Promise((resolve, reject) => {
                if (authConfig.enable === false) {
                    resolve()
                } else if (this.hasToken && this.hasUser && this.notExpired) {
                    this.updateExpire()
                    resolve()
                } else {
                    reject()
                }
            })
        },

    },
})
