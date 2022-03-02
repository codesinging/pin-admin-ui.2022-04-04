import {defineStore} from "pinia"
import persist from "../utils/persist"
import config from '../configs/auth'

export const useAuth = defineStore('state', {
    state: () => ({
        token: persist.get('token'),
        user: persist.get('user'),
        expire: persist.get('expire'),
    }),

    actions: {
        setToken(token) {
            this.token = persist.set('token', token)
        },

        removeToken() {
            this.token = persist.remove('token')
        },

        setUser(user) {
            this.user = persist.set('user', user)
        },

        removeUser() {
            this.user = persist.remove('user')
        },

        updateExpire() {
            if (config.expire > 0) {
                this.expire = persist.set('expire', config.expire + new Date().getTime())
            }
        },

        removeExpire() {
            this.expire = persist.remove('expire')
        }
    },
})
