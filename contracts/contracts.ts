import {initContract} from '@ts-rest/core'

import {patientContract} from './patient'
import {userContract} from './user'
import { authContract } from './auth'
import { sessionContract } from './session'
import { paymnentContract } from './payment'
import { appointmentsContract } from './appointments'

const c = initContract()
export const contract = c.router({
  auth: authContract,
  user: userContract,
  patient: patientContract,
  session: sessionContract,
  payment: paymnentContract,
  appointment: appointmentsContract
})
