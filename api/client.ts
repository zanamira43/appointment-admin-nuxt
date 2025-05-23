import { contract } from '~/contracts/contracts';
import {initClient, tsRestFetchApi, type ApiFetcherArgs } from "@ts-rest/core"


// Import the contract you want to use
const APIUrl = import.meta.env.VITE_API_BASE_URL


  // Create a client instance
export const apiQueryClient = initClient(contract, {
    baseUrl: APIUrl,
    validateResponse: false,
    baseHeaders: {
      Accept: 'application/json',
    },
    credentials: 'include',

    api: async function (args: ApiFetcherArgs) {
      return tsRestFetchApi(args)
    }
})
