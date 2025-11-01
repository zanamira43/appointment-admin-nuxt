import { initContract } from "@ts-rest/core";


export type ISetting = {
  id: number;
  system_name: string 
  phone_number: string
  address: string
  bill_prefix: string
}

const c = initContract()
export const settingContract = c.router({
  getSetting: {
    method: 'GET',
    path: "/system/setting",
    responses: {
      200: c.type<ISetting>(),
      400: c.type<{message: string}>(),
      404: c.type<{message: string}>()
    }
  },

   updateSetting: {
    method: 'PUT',
    path: "/system/setting",
    body: c.type<ISetting>(),
    responses: {
      200: c.type<ISetting>(),
      400: c.type<{message: string}>(),
      404: c.type<{message: string}>()
    }
  }
}) 