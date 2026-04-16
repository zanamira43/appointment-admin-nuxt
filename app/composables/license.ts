import {useQuery} from '@tanstack/vue-query'
import { apiQueryClient } from '@/api/client'

export const GET_SYSTEM_LICENSE = 'getSystemLicense'

export const useGetSystemLicense = () => {
  const {data: getSystemLicense} = useQuery({
    queryKey: [GET_SYSTEM_LICENSE],
    queryFn: async () => {
     const {status, body} = await  apiQueryClient.licence.getLicense()

     if(status === 200){
      return body
     }
    }
  })

  return {
    getSystemLicense
  }
}