<template>
    <div class="flex items-center justify-center h-screen">
        <el-card class="w-96">
            <template #header>
                <div class="flex items-center justify-center">管理员登录</div>
            </template>

            <el-form :model="data" ref="form" :rules="rules" @keyup.enter="submit">
                <el-form-item prop="username">
                    <el-input v-model="data.username" placeholder="请输入登录账号">
                        <template #prepend>
                            <div class="w-12">登录账号</div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="data.password" placeholder="请输入登录密码" show-password>
                        <template #prepend>
                            <div class="w-12">登录密码</div>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="mt-2">
                    <el-button type="primary" @click="submit" :loading="state.states.submit||state.states.redirect" class="w-full">登录</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import apis from "../apis";
import {useAuth} from "../store/auth";
import {useState} from "../store/state";
import {useRouter} from "vue-router";
import {appConfig} from "../configs";
import {warning} from "../utils/message";

const auth = useAuth()
const state = useState()
const router = useRouter()

const data = reactive({
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
})

const rules = {
    username: {required: true, message: '请输入登录账号'},
    password: {required: true, message: '请输入登录密码'}
}

const form = ref()

const submit = () => {
    form.value.validate(valid => {
        if (valid) {
            apis.auth.login(data, 'submit').then(res => {
                auth.login(res.token, res.admin)
                state.set('redirect')
                router.push(appConfig.home).then(() => state.unset('redirect'))
            })
        } else {
            warning('表单验证未通过，请重新填写')
        }
    })
}
</script>

<style scoped>

</style>
