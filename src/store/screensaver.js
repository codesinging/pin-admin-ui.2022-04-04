import {defineStore} from "pinia";

export const useScreenSaver = defineStore('screensaver', {
    state: () => ({
        visible: false,
        text: '',
    }),

    actions: {
        show(text) {
            this.visible = true
            this.text = text
        },

        hide() {
            this.visible = false
            this.text = ''
        }
    }
})
