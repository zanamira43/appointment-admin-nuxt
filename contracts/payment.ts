import { initContract } from '@ts-rest/core';
import type { IPayment, INewPayment, IAllPayment, IUpdatePayment} from '~/types/IPayment';


const c = initContract();


export const paymnentContract = c.router({
  getPayments: {
      method: 'GET',
      path: '/payments', // or /patients/:id/sessions if nested
      responses: {
        200: c.type<IAllPayment>(),
        400: c.type(), 
      },
      query: c.type<{ page?: number; limit?: number }>(), // Optional pagination
      summary: 'Get all payments',
  },

  createPayment: {
    method: 'POST',
    path: '/payments',
    responses: {
      200: c.type(),
      400: c.type(),
    },
    body: c.type<INewPayment>(),
    summary: 'Create a new payment',
  },

  getPayment: {
    method: 'GET',
    path: '/payments/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IPayment>(),
      400: c.type<{message: string}>(),
      404: c.type<{message: string}>(),
    },

    summary: 'Get single payment',
  },

  updatePayment: {
    method: 'PUT',
    path: '/payments/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IPayment>(),
      400: c.type(),
    },
    body: c.type<IUpdatePayment>(),
    summary: 'Update payment',
  },

  deletePayment: {
    method: "DELETE",
    path: "/payments/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{message: string}>(),
    },
    summary: 'Delete payment',
  },
  
})