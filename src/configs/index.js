export const appConfig = {
    name: '后台管理系统',
    home: '/home',
}

export const authConfig = {
    enable: true,
    expire: 60 * 60 * 1000,
    login: '/login',
}

export const httpConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10 * 1000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export const storageConfig = {
    prefix: 'pin_admin_',
    driver: window.localStorage,
}
