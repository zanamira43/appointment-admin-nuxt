import { initContract } from '@ts-rest/core';
import type { IAllSession, INewSession, ISession, IEditSession } from '~/types/ISession';



export type SearchPagination = {
  search?: string;
  page?: number;
  limit?: number;
};

const c = initContract();

export const sessionContract = c.router({
  getSessions: {
      method: 'GET',
      path: '/sessions',
      responses: { 
        200: c.type<IAllSession>(),
        400: c.type<{ message: Record<string, string> }>(), 
      },
      query: c.type<SearchPagination>(), // Optional pagination
      summary: 'Get all sessions',
  },

  getSessionsByPatient: {
      method: 'GET',
      path: '/sessions/patient/:id', // or /patients/:id
      pathParams: c.type<{ id: number }>(), 
      responses: { 
        200: c.type<IAllSession>(),
        400: c.type<{ message: Record<string, string> }>(), 
      },
      query: c.type<SearchPagination>(), // Optional pagination
      summary: 'Get all sessions',
  },
  
  createSession: {
    method: 'POST',
    path: '/sessions',
    body: c.type<INewSession>(),
    responses: {
      200: c.type(),
      400: c.type(),
    },
    summary: 'Create a new session',
  },
 
  getSession: {
    method: 'GET',
    path: '/sessions/:id',
    pathParams: c.type<{ id: number }>(), 
    responses: {
      200: c.type<ISession>(),
    },
    summary: 'Get single session',
  },

  updateSession: {
    method: 'PUT',
    path: '/sessions/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<ISession>(),
      400: c.type(),
    },
    body: c.type<IEditSession>(),
    summary: 'Update session',
  },
  
  deleteSession: {
    method: "DELETE",
    path: '/sessions/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{message: string}>(),
    },
    summary: 'Delete session',
  },
});
