import {initContract} from '@ts-rest/core'


const c = initContract()

export type userInfo = {
  Id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  created_at: string,
  updated_at: string,
}

export const authContract = c.router({
  // get user inof 
  userInfo: {
    method: 'GET',
    path: '/user/info',
    responses: {
      200: c.type<{user: userInfo}>(),
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
      401: c.type<{ message: string }>(),
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
  }
})