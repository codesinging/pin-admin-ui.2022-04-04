<template>
    <el-dialog v-model="modelValue" :width="width+'%'" :top="top + 'vh'" :fullscreen="fullscreen" v-bind="attributes" @close="onClose" destroy-on-close>
        <template #title>
            <div class="flex items-center space-x-2">
                <i v-if="icon" :class="icon"></i>
                <span>{{ title }}</span>
            </div>
        </template>

        <slot></slot>

        <template #footer>
            <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                    <el-tooltip content="增大" placement="top">
                        <el-button @click="zoomOut" :disabled="!canZoomOut" circle size="small"><i class="bi-plus-lg"></i></el-button>
                    </el-tooltip>
                    <el-tooltip content="缩小" placement="top">
                        <el-button @click="zoomIn" :disabled="!canZoomIn" circle size="small"><i class="bi-dash-lg"></i></el-button>
                    </el-tooltip>
                    <el-tooltip :content="fullscreen ? '退出全屏':'全屏'" placement="top">
                        <el-button @click="toggleFullscreen" circle size="small"><i class="bi-fullscreen"></i></el-button>
                    </el-tooltip>
                </div>
                <div class="flex items-center space-x-2">
                    <slot name="actions"></slot>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {computed, ref} from "vue";

const props = defineProps({
    modelValue: Boolean,
    title: String,
    icon: String,
    attributes: Object,
    fullscreen: Boolean,
})

const width = ref(60)
const top = ref(20)
const fullscreen = ref(props.fullscreen)

const zoomOut = () => {
    width.value += 20
    top.value -= 10
}

const zoomIn = () => {
    width.value -= 20
    top.value += 10
}

const canZoomOut = computed(() => width.value < 100)
const canZoomIn = computed(() => width.value > 40)

const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value
}

const emits = defineEmits(['update:modelValue'])

const onClose = () => {
    emits('update:modelValue', false)
}
</script>

<style scoped>

</style>
