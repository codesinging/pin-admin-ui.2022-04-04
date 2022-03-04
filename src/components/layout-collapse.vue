<template>
    <div class="h-12 text-white flex items-center justify-end">
        <div class="h-full flex items-center justify-center" :style="{width: layoutConfig.sidebar.minWidth + 'px'}">
            <div @click="layout.toggleCollapsed" class="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 rounded-full">
                <component :is="layout.collapsed ? MenuUnfold : MenuFold" :strokeWidth="3"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useLayout} from "../store/layout";
import {layoutConfig} from "../configs";
import {MenuFold, MenuUnfold} from "@icon-park/vue-next";

const layout = useLayout()
</script>

<style scoped>

</style>
