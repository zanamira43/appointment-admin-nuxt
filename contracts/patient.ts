import { initContract } from '@ts-rest/core';

const c = initContract();

export const contract = c.router({
  getPatients: {
    method: 'GET',
    path: '/api/patients',
    responses: {
      200: c.type<Patient[]>(),
    },
    summary: 'Get all patient list',
  },
});

export interface Patient{
  id: number,
  slug: string,
  name: string,
  gender: string,
  age: number,
  profession: string,
  address: string,
  phone_number: string,
  created_at: Date,
  updated_at: Date
}