import {initContract} from '@ts-rest/core'

import {patientContract} from './patient'
import {userContract} from './user'
import { authContract } from './auth'


const c = initContract()
export const contract = c.router({
  patient: patientContract,
  user: userContract,
  auth: authContract
})
