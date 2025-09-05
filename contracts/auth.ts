import {initContract} from '@ts-rest/core'
import type {Profile, UserPassword, UserInfo} from '~/types/IUser'


const c = initContract()




export const authContract = c.router({
  // get user inof 
  userInfo: {
    method: 'GET',
    path: '/user/info',
    responses: {
      200: c.type<{user: UserInfo}>(),
      // 400: c.type<{ message: Record<string, string> }>(),
    }
  },
  // login endpoint
  login: {
    method: 'POST',
    path: '/login',
    body: c.type<{ phone_number: string; password: string }>(),
    responses: {
      200: c.type<{ jwt: string }>(),
      404: c.type<{ message: string }>(),
      401: c.type<{ message: string }>(),
      422: c.type<{ message: string }>(),
    }
  },
  // logout
  logout: {
    method: 'POST',
    path: '/user/logout',
    body: c.noBody(),
    responses: {
      200: c.type(),
    }
  },

  updateProfile: {
    method: 'POST',
    path: '/user/updateinfo',
    body: c.type<Profile>(),
    responses: {
      200: c.type(),
    }
  },
  updatePassword: {
    method: 'POST',
    path: '/user/updatepassword',
    body: c.type<UserPassword>(),
    responses: {
      200: c.type(),
      400: c.type<{message: string}>(),
    }
  }
})