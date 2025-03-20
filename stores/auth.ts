import {defineStore} from 'pinia'
import {useAuthLogin} from '@/composables/auth'




interface Store {
  isLoggedIn: boolean
}

export const useAuthStore = defineStore("authStore", {
  state: (): Store => ({
    isLoggedIn: false
  }),

  getters: {},

  actions: {
    async login({email, password}:{email: string, password: string }) {
      await useAuthLogin({email,  password})
    }
  }
});