import {initContract} from '@ts-rest/core'
import type { IAllNotbooks, INewNotbook, INotebook, IUpdateNotbook } from '~/types/INotebook'



export type SearchPagination = {
  search?: string;
  page?: number;
  limit?: number;
};

const c = initContract()

export const NotebookContracts = c.router({
   getAllNotebooks: {
    method: 'GET',
    path: '/notebooks',
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllNotbooks>(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
  },

  createNotebook: {
    method: 'POST',
    path: '/notebooks',
    body: c.type<INewNotbook>(),
    responses: {
      200: c.type(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
  },

  getNotebook: {
    method: 'GET',
    path: '/notebooks/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<INotebook>(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    } 
  },
 
  updateNotebook: {
    method: 'PUT',
    path: '/notebooks/:id',
    pathParams: c.type<{ id: number }>(),
    body: c.type<IUpdateNotbook>(),
    responses: {
      200: c.type<INotebook>(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
  },

  deleteNotebook: {
    method: 'DELETE',
    path: "/notebooks/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
  }
  
})