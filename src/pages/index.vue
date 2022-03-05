<template>
    <screensaver>
        <div class="h-screen flex">
            <div class="flex flex-col flex-shrink-0 flex-grow-0 h-full bg-gray-700 overflow-hidden">
                <layout-brand/>
                <layout-menu/>
                <layout-collapse/>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden">
                <layout-header/>
                <layout-tab/>
                <layout-content/>
            </div>
        </div>
    </screensaver>
</template>

<script setup>
import Screensaver from "../components/screensaver.vue";
import {useScreenSaver} from "../store/screensaver";
import LayoutBrand from "../components/layout-brand.vue";
import LayoutMenu from "../components/layout-menu.vue";
import LayoutCollapse from "../components/layout-collapse.vue";
import apis from "../apis";
import {useLayout} from "../store/layout";
import {useRouter} from "vue-router";
import LayoutHeader from "../components/layout-header.vue";
import LayoutTab from "../components/layout-tab.vue";
import LayoutContent from "../components/layout-content.vue";

const screensaver = useScreenSaver()
const layout = useLayout()
const router = useRouter()

screensaver.show('loading')

apis.auth.menus({label: 'menu', message: false, catch: true}).then(menus => {
    menus = menus || []
    menus.forEach(item => {
        item.id = item.id.toString()
        if (item.parent_id) {
            item.parent_id = item.parent_id.toString()
        }
    })

    layout.setMenus(menus)

    const currentPath = router.currentRoute.value.path
    const currentMenu = menus.find(item => '/' + item.path === currentPath)

    layout.addTab(layout.homeMenu)
    layout.addTab(currentMenu)
    layout.setActiveMenu(currentMenu)

    screensaver.hide()
}).catch(() => {
    screensaver.hide()
})
</script>

<style scoped>

</style>
