import axios from "axios"
import message from "./message"
import {useState} from "../store/state"
import {httpConfig} from "../configs"

const defaultLabel = 'loading'

const http = axios.create(httpConfig)

const setStates = (config) => {
    const state = useState()

    state.set(defaultLabel)

    if (config.label){
        state.set(config.label)
    }
}

const unsetStates = config => {
    const state = useState()

    state.unset(defaultLabel)

    if (config.label){
        state.unset(config.label)
    }
}

const logError = (title, content) => {
    console.log(title, content)
}

const showSuccess = (content, config) => {
    if (config.message || config.successMessage) {
        message.success(typeof config.successMessage === 'string' ? config.successMessage : content)
    }
}

const showError = (content, config) => {
    if (config.message || config.errorMessage) {
        message.error(typeof config.errorMessage === 'string' ? config.errorMessage : content)
        logError('http config', config)
    }
}

const initConfig = config => {
    config = typeof config === 'string' ? {label: config} : config

    config.message = config.message ?? true
    config.successMessage = config.successMessage ?? true
    config.errorMessage = config.errorMessage ?? true
    config.catch = config.catch ?? false

    return config
}

const handle = (request, config) => {
    return new Promise(((resolve, reject) => {
        request.then(res => {
            if (res.status === 200) {
                if (res.data?.code === 0) {
                    showSuccess(res.data?.message, config)
                    resolve(res.data?.data)
                    return
                }
            }

            let error = `[${res.data?.code}]${res.data.message || res.statusText || '请求响应结果错误'}`

            showError(error, config)
            logError('http response status error', res)

            if (config.catch) {
                reject(error)
            }
        }).catch(error => {
            error = error.toJSON()
            let content = error.status === null ? '网络或服务器连接错误' : `[${error.status}]${error.response?.data?.message || error.response?.message || '请求响应错误'}`

            showError(content, config)
            logError('http response error', error)

            if (config.catch) {
                reject(content)
            }
        }).finally(() => {
            unsetStates(config)
        })
    }))
}

const get = (url, config = {}) => {
    config = initConfig(config)
    setStates(config)
    return handle(http.get(url, config), config)
}

const del = (url, config = {}) => {
    config = initConfig(config)
    setStates(config)
    return handle(http.delete(url, config), config)
}

const post = (url, data, config = {}) => {
    config = initConfig(config)
    setStates(config)
    return handle(http.post(url, data, config), config)
}

const put = (url, data, config = {}) => {
    config = initConfig(config)
    setStates(config)
    return handle(http.put(url, data, config), config)
}

export default {
    get,
    del,
    post,
    put,
}
