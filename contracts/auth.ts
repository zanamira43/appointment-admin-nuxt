import {initContract} from '@ts-rest/core'


const c = initContract()

export const authContract = c.router({
  login: {
    method: 'POST',
    path: '/api/login',
    body: c.type<{ email: string; password: string }>(),
    responses: {
      200: c.type<{ jwt: string }>(),
      401: c.type<{ message: string }>(),
    }
  }
})