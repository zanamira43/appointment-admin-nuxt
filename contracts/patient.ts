import { initContract } from '@ts-rest/core';
import type { IPatient, INewPatient, IAllPatient, IUpdatePatient} from '~/types/IPatient';

export type SearchPagination = {
  search?: string;
  searchByCode?: string;
  page?: number;
  limit?: number;
};

const c = initContract();

export const patientContract = c.router({
  getPatients: {
    method: 'GET',
    path: '/patients',
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllPatient>(),
    },
    summary: 'Get all patient list',
    
  },
  createPatient: {
    method: 'POST',
    path: '/patients',
    responses: {
      200: c.type(),
      400: c.type<string>(),
    },
    body: c.type<INewPatient>(),
    
    summary: 'Create a new patient',
  },
 
  getPatientbyId: {
    method: 'GET',
    path: '/patients/:id',
    pathParams: c.type<{ id: number }>(), 
    responses: {
      200: c.type<IPatient>(),
    },
    summary: 'Get single patient',
  },

  updatePatient: {
    method: 'PUT',
    path: '/patients/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IPatient>(),
      400: c.type<string>(),
    },
    body: c.type<IUpdatePatient>(),
    summary: 'Update patient',
  },
  
  deletePatient: {
    method: "DELETE",
    path: '/patients/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{message: string}>(),
    },
    summary: 'Delete patient',
  },
});
