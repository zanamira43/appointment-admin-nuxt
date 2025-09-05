export type UserInfo = {
  Id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  role: string,
  active: boolean
  created_at: string,
  updated_at: string,
}

export type Profile = {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
}

export type UserPassword = {
  password: string;
  password_confirmation: string;
}

export type IAllUsers = {
  Id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  role: string,
  active: boolean
  created_at: string,
  updated_at: string
}


export type IUser = {
  Id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  role: string,
  active: boolean
  created_at: string,
  updated_at: string

}

export type IRequestUser = {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string;
  role: string;
  active: boolean
}

export type IUpdateRequestUser = {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  role: string;
  active: boolean
}