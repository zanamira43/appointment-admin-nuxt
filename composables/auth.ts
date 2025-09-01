import { useMutation } from '@tanstack/vue-query'
import {apiQueryClient} from '~/api/client'
import type { Profile, UserPassword } from '~/types/IUser'
import type { AuthenticationFormSchema } from '~/validation/authentication'





export const useAuthLogin = async (body:  AuthenticationFormSchema) => {
  const { body: response, status} =  await apiQueryClient.auth.login({
      body: body,
    })

    if (status === 200) {
      return response
    }

    throw 'Login failed'
}

// update user information
export const useUpdateProfile = async () => {
  const {mutate: updateProfile, isPending} = useMutation({
    mutationFn: async (body:  Profile) => {
      const { body: response, status} =  await apiQueryClient.auth.updateProfile({
          body: body,
        })
  
        if (status === 200) {
          return response
        }
  
        throw 'update Profile failed'
    }
  })

  return {updateProfile, isPending}
}

// update user password 
export const useUpdateUserPassword = async() => {
  const {mutate: updatePassword, isPending} = useMutation({
    mutationFn: async (body:  UserPassword) => {
      const { body: response, status} =  await apiQueryClient.auth.updatePassword({
          body: body,
        })
  
        if (status === 200) {
          return response
        }
        
        if(status === 400){
           throw  response
        }
        
      
    }
  })

  return {updatePassword, isPending}
}