import {initClient} from "@ts-rest/core"
import { contract } from './contract'

// use base url form runtime config
const baseAPIURL = useRuntimeConfig().public.APIURL

// Create a client instance
export const client = initClient(contract, {
  baseUrl: baseAPIURL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  // credentials: 'include',
})