import { initContract } from '@ts-rest/core';
import type { IAllSession, INewSession, ISession, IUpdateSession } from '~/types/ISession';


const c = initContract();

export const sessionContract = c.router({
  getSessions: {
      method: 'GET',
      path: '/sessions', // or /patients/:id/sessions if nested
      responses: { 
        200: c.type<IAllSession>(),
        400: c.type<{ message: Record<string, string> }>(), 
      },
      query: c.type<{ page?: number; limit?: number }>(), // Optional pagination
      summary: 'Get all sessions',
  },
  createSession: {
    method: 'POST',
    path: '/sessions',
    responses: {
      200: c.type(),
      400: c.type(),
    },
    body: c.type<INewSession>(),
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
    body: c.type<IUpdateSession>(),
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
