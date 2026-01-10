import {initContract} from '@ts-rest/core'

import {patientContract} from './patient'
import {userContract} from './user'
import { authContract } from './auth'
import { sessionContract } from './session'
import { paymnentContract } from './payment'
import { timeTablesContract } from './timeTables'
import { problemsContract } from './problem'
import { paymentTypeContract } from './payment_type'
import { settingContract } from './setting'
import { NotebookContracts } from './noteBook'
import { PersonInfoContract } from './personInfo'


const c = initContract()
export const contract = c.router({
  auth: authContract,
  user: userContract,
  patient: patientContract,
  timeTable: timeTablesContract,
  problem: problemsContract,
  session: sessionContract,
  payment: paymnentContract,
  paymentType: paymentTypeContract,
  setting: settingContract,
  noteBook: NotebookContracts,
  PersonInfo: PersonInfoContract
})
