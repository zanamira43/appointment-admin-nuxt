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
            created_at: body.user?.created_at,
            updated_at: body.user?.updated_at,
          })
          
          this.isLoggedIn = true
        }else{
          this.isLoggedIn = false
          router.replace('/login')
        }
      }catch(e){
        this.isLoggedIn = false
        console.error('Failed to fetch user:', e);
        router.replace('/login')
      }
    },
    
    async fetchUserOnBrowserReload(){
      await this.fetchUser()
    },
    async login(email: string, password: string ) {
      
      const router = useRouter()
      const toast = useToast()
      try {
        await useAuthLogin({email,  password})
        await this.fetchUser()
        router.replace('/')
      }catch(e){
        toast.add({
          color: 'error', 
          description: 'Login failed',
        })
      }
    }, 
    async logout(){
      const router = useRouter() 
      
      try {

        const {status} = await apiQueryClient.auth.logout()
        if(status === 200){
           this.isLoggedIn = false
           router.replace('/login')
        }
      }catch(e){
        console.error(e)
      }
     
    }
  }

  
});