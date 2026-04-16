import { initContract } from '@ts-rest/core';
import type { ILicense } from '~/types/ILicense';

const c = initContract()

export const licenseContract = c.router({
  getLicense: {
    method: 'GET',
    path: "/license",
    responses: {
      200: c.type<ILicense>()
    }
  }
})