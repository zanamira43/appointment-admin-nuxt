import {defineStore} from 'pinia'
import {useAuthLogin} from '~/composables/auth'
import { apiQueryClient } from '~/api/client'






interface Store {
  isLoggedIn: boolean
}
 

export const useAuthStore = defineStore("authStore", {
  state: (): Store => ({
    isLoggedIn: false,
  }),
  
  actions: {
    async fetchUser() {
      const userStore = useMyUserStore()
      const router = useRouter()
      try {
        
        const {status, body} = await apiQueryClient.auth.userInfo();
        if (status === 200 && body.user) {
          userStore.setUser({
            Id: body.user?.Id,
            first_name: body.user?.first_name,
            last_name: body.user?.last_name,
            email: body.user?.email,
            phone_number: body.user?.phone_number,
            created_at: body.user?.created_at,
            updated_at: body.user?.updated_at,
          })
          
          this.isLoggedIn = true
        }else{
          this.isLoggedIn = false
          router.replace('/')
        }
      }catch(e){
        this.isLoggedIn = false
        console.error('Failed to fetch user:', e);
        router.replace('/')
      }
    },
    
    async fetchUserOnBrowserReload(){
      await this.fetchUser()
    },
    async login(phone_number: string, password: string ) {
      
      const router = useRouter()
      const toast = useToast()
      const { $i18n } = useNuxtApp() // ✅ Call here instead of top-level
      const t = $i18n.t
      try {
        await useAuthLogin({phone_number ,  password})
        await this.fetchUser()
        router.replace('/admin')
      }catch(e){
        toast.add({
          color: 'error', 
          description: t('wrong_credentials'),
          ui: {
            description: 'text-xl'
          }
        })
      }
    }, 
    async logout(){
      const router = useRouter() 
      
      try {

        const {status} = await apiQueryClient.auth.logout()
        if(status === 200){
           this.isLoggedIn = false
           router.replace('/')
        }
      }catch(e){
        console.error(e)
      }
     
    }
  }

  
});