import { initContract } from '@ts-rest/core';
import type {IPaymentType, IPaymentTypes, INewPaymentType, IEditPaymentType} from '@/types/IPayment'


export type SearchPagination = { 
  search?: string;
  page?: number; 
  limit?: number
 };
const c = initContract();

export const paymentTypeContract = c.router({
  getPaymentTypes: {
        method: 'GET',
        path: '/payment-types',
        responses: {
          200: c.type<IPaymentTypes>(),
          400: c.type(), 
        },
        query: c.type<SearchPagination>(), // Optional pagination
        summary: 'Get all payment types',
    },
  
    createPaymentType: {
      method: 'POST',
      path: '/payment-types',
      responses: {
        200: c.type(),
        400: c.type(),
      },
      body: c.type<INewPaymentType>(),
      summary: 'Create a new payment type',
    },
  
    getPaymentType: {
      method: 'GET',
      path: '/payment-types/:id',
      pathParams: c.type<{ id: number }>(),
      responses: {
        200: c.type<IPaymentType>(),
        400: c.type<{message: string}>(),
        404: c.type<{message: string}>(),
      },
  
      summary: 'Get single payment type',
    },
  
    updatePaymentType: {
      method: 'PUT',
      path: '/payment-types/:id',
      pathParams: c.type<{ id: number }>(),
      responses: {
        200: c.type<IPaymentType>(),
        400: c.type(),
      },
      body: c.type<IEditPaymentType>(),
      summary: 'Update payment type',
    },
  
    deletePaymentType: {
      method: "DELETE",
      path: "/payment-types/:id",
      pathParams: c.type<{ id: number }>(),
      responses: {
        200: c.type<{message: string}>(),
      },
      summary: 'Delete payment type',
    },
})