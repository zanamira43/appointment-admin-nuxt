import { initContract } from '@ts-rest/core';
import type{ IRequestUser,  IAllUsers, IUser, IUpdateRequestUser, UserPassword } from '@/types/IUser';

const c = initContract()

export const userContract = c.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: c.type<IAllUsers>(),
      400: c.type<{ errors: string }>(),
      403: c.type<{ errors: string }>(),
    },
  },
  createUser: {
    method: 'POST',
    path: '/users',
    body: c.type<IRequestUser>(),
    responses: {
      200: c.type(),
      422: c.type<{ errors: string }>(),
      400: c.type<{ errors: string }>(),

    },
  },
  getUser: {
    method: 'GET',
    path: '/users/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IUser>(),
      400: c.type<{ errors: string }>(),
      404: c.type<{ errors: string }>(),
    },
  },
  updateUser: {
    method: 'PUT',
    path: '/users/:id',
    pathParams: c.type<{ id: number }>(),
    body: c.type<IUpdateRequestUser>(),
    responses: {
      200: c.type(),
      422: c.type<{ errors: string }>(),
      400: c.type<{ errors: string }>(),
      404: c.type<{ errors: string }>(),
    },
  },
  updateUserPassword: {
    method: 'PUT',
    path: '/users/:id/password',
    pathParams: c.type<{ id: number }>(),
    body: c.type<UserPassword>(),
    responses: {
      200: c.type(),
      422: c.type<{ errors: string }>(),
      400: c.type<{ errors: string }>(),
      404: c.type<{ errors: string }>(),
    },
  },
  deleteUser: {
    method: 'DELETE',
    path: '/users/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type(),
      400: c.type<{ errors: string }>(),
      404: c.type<{ errors: string }>(),
    },
  },
})