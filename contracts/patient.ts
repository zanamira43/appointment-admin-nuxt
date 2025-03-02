import { initContract } from '@ts-rest/core';
import type { Patient, NewPatient} from '~/types';

const c = initContract();

export const patientContract = c.router({
  getPatients: {
    method: 'GET',
    path: '/api/patients',
    responses: {
      200: c.type<Patient[]>(),
    },
    summary: 'Get all patient list',
    
  },

  createPatient: {
    method: 'POST',
    path: '/api/patients',
    responses: {
      200: c.type<NewPatient>(),
    },
    body: c.type<NewPatient>(),
    
    summary: 'Create a new patient',
  },
 
  getPatientbyId: {
    method: 'GET',
    path: '/api/patients/:id',
    pathParams: c.type<{ id: number }>(), 
    responses: {
      200: c.type<Patient>(),
    },
    summary: 'Get single patient',
  },

  updatePatient: {
    method: 'PUT',
    path: '/api/patients/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<Patient>(),
    },
    body: c.type<any>(),
    summary: 'Update patient',
  },
  
  deletePatient: {
    method: "DELETE",
    path: '/api/patients/:id',
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<Patient>(),
    },
    summary: 'Delete patient',
  },

});
