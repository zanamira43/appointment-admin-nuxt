import {useQuery, useMutation} from '@tanstack/vue-query'
import { apiQueryClient } from '~/api/client';

import type { ISetting } from '~/contracts/setting';

export const GET_SYSTEM_SETTING_QUERY = "getSystemSetting"

// get setting composable
export const useGetSetting = () => {
  const {data: settingData, isLoading, refetch} =  useQuery({
    queryKey: [GET_SYSTEM_SETTING_QUERY],
    queryFn: async () => {
      const {status, body}  = await apiQueryClient.setting.getSetting()

      if(status === 200){
        return body
      }
      if(status === 400 || status === 404) {
        throw new Error(body.message)
      }
    }
  })

  return {
    settingData,
    isLoading,
    refetch
  }
}

// update setting composable
export const useUpdateSetting = () => {
  const {mutate: updateSystemSetting, isPending} = useMutation({
    mutationFn: async (data: ISetting) => {
      return await apiQueryClient.setting.updateSetting({
        body: data
      })
    }
  })

  return {
   updateSystemSetting,
   isPending
  }
}