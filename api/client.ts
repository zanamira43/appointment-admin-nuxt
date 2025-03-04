import { contract } from '~/contracts/contracts';
import {initClient } from "@ts-rest/core"


  // use base url form runtime config
const config = useRuntimeConfig()
  // Create a client instance
export const apiQueryClient = initClient(contract, {
    baseUrl: config.public.APIURL,
    baseHeaders: {
      Accept: 'application/json',
    },
    // credentials: 'include',
  })


 
