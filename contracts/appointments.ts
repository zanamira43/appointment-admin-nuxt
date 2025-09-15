import { initContract } from '@ts-rest/core';
import type { IAllAppointments, IAppointment, IEditAppointments, INewAppointments } from '~/types/IAppointment';


export type SearchPagination = {
  search?: string;
  page?: number;
  limit?: number;
}


const c = initContract();

export const appointmentsContract = c.router({
  getAppointments: {
    method: 'GET',
    path: '/appointments',
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllAppointments>(),
      400: c.type<{message: string}>(),
    },
  },
  createAppointments: {
    method: 'POST',
    path: '/appointments',
    responses: {
      200: c.type(),
      400: c.type<{message: string}>(),
    },
    body: c.type<INewAppointments>(),
  },
  getAppointment: {
    method: 'GET',
    path: '/appointments/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IAppointment>(),
      400: c.type<{message: string}>(),
    },
  },
  updateAppointment: {
    method: 'PUT',
    path: '/appointments/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IAppointment>(),
      400: c.type<{message: string}>(),
    },
    body: c.type<IEditAppointments>(),
  },
  deleteAppointment: {
    method: 'DELETE',
    path: '/appointments/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{mssage: string}>(),
      400: c.type<{message: string}>(),
    },
  }
});