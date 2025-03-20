import {apiQueryClient} from '~/api/client'
import type { AuthenticationFormSchema } from '~/validation/authentication'

export const useAuthLogin = async (body:  AuthenticationFormSchema) => {
  const { body: response, status} =  await apiQueryClient.auth.login({
      body: body,
    })

    if (status === 200) {
      return response
    }
}