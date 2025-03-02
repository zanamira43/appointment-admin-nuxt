import {initClient } from "@ts-rest/core"
import { patientContract } from '~/contracts/patient'


  // use base url form runtime config
const config = useRuntimeConfig()
  // Create a client instance
export const apiQueryClient = initClient(patientContract, {
    baseUrl: config.public.APIURL,
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
  })


 
