<template>
    <div class="flex justify-between h-14 border-b px-4">
        <div class="flex items-center space-x-2">
            <el-breadcrumb>
                <el-breadcrumb-item v-for="(item,index) in pagePaths" :key="index">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="user" class="flex items-center space-x-2 h-full">
            <div @click="toggleFullscreen" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer">
                <component :is="isFullscreen ? OffScreen:FullScreen" :stroke-width="3" :size="18"/>
            </div>
            <el-dropdown>
                <div class="flex items-center space-x-1 cursor-pointer">
                    <el-avatar :size="32" :src="user.avatar"></el-avatar>
                    <div class="text-sm">{{ user.name }}</div>
                    <i class="bi-chevron-down mt-1"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><i class="bi-person mr-1"></i>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout" divided><i class="bi-power mr-1"></i>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import {useLayout} from "../store/layout";
import {useFullscreen} from "@vueuse/core";
import {FullScreen, OffScreen} from "@icon-park/vue-next";
import {computed} from "vue";
import {treePath} from "../utils/tree";
import {useAuth} from "../store/auth";
import {useScreenSaver} from "../store/screensaver";
import apis from "../apis";
import router from "../router";
import {authConfig} from "../configs";

const layout = useLayout()
const auth = useAuth()
const screensaver = useScreenSaver()

const {isFullscreen, toggle: toggleFullscreen} = useFullscreen()

const pagePaths = computed(() => treePath(layout.menuTree, 'path', layout.activeMenu?.path))

const user = computed(() => auth.user)

const logout = () => {
    screensaver.show('正在退出登录')

    apis.auth.logout({}, {catch: true}).then(res=>{

    }).catch(()=>{

    }).finally(() => {
        auth.logout()
        layout.clear()
        router.push(authConfig.login).then(() => {
            screensaver.hide()
        })
    })
}
</script>

<style scoped>

</style>
