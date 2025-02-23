import {initQueryClient} from "@ts-rest/vue-query"
import { contract } from '~/api/contract'


export default defineNuxtPlugin(() => {
  // use base url form runtime config
const config = useRuntimeConfig()

  // Create a client instance
  const apiQueryClient = initQueryClient(contract, {
    baseUrl: config.public.APIURL,
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
  })


  return {
    provide:{
      apiQueryClient
    }
  }
})