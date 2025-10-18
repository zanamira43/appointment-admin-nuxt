import {defineStore} from 'pinia'

interface User {
  Id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  role: string
  active: boolean
  created_at: string
  updated_at: string

}

export const useMyUserStore = defineStore("myUserStore", {
  state: (): User => ({
    Id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: '',
    active: false,
    created_at: '',
    updated_at: '',

  }),


  actions: {
    setUser({first_name, last_name, email, phone_number, role, active ,created_at, updated_at, Id}: User) {
      this.Id = Id
      this.first_name = first_name
      this.last_name =last_name
      this.email = email
      this.phone_number = phone_number
      this.role = role
      this.active = active
      this.created_at = created_at
      this.updated_at = updated_at
    }
  }
})