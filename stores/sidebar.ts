import {defineStore} from 'pinia'


export const useSidebarStore = defineStore('sidebarStore', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
})