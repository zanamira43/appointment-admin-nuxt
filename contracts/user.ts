import { initContract } from '@ts-rest/core'

const c = initContract()

export const userContract = c.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: c.type<{ users: { id: number; username: string }[] }>(),
      422: c.type<{ errors: string }>(),
    },
  },
})