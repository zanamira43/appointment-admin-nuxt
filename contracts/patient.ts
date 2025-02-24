import { initContract } from '@ts-rest/core';
import type { Patient, NewPatient} from '~/types';

const c = initContract();

export const contract = c.router({
  createPatient: {
    method: 'POST',
    path: '/api/patients',
    responses: {
      200: c.type<NewPatient>(),
    },
    body: c.type<NewPatient>(),
    
    summary: 'Create a new patient',
  },
  getPatients: {
    method: 'GET',
    path: '/api/patients',
    responses: {
      200: c.type<Patient[]>(),
    },
    summary: 'Get all patient list',
  },

  getPatient: {
    method: 'GET',
    path: '/api/patient/:id',
    responses: {
      200: c.type<Patient>(),
    },
    summary: 'Get single patient',
  },

});

// export interface Patient{
//   id: number,
//   slug: string,
//   name: string,
//   gender: string,
//   age: number,
//   profession: string,
//   address: string,
//   phone_number: string,
//   created_at: Date,
//   updated_at: Date
// }

// export interface NewPatient{
//   name: string,
//   gender: string,
//   age: number,
//   profession: string,
//   address: string,
//   phone_number: string,
// }