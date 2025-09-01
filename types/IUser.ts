export type UserInfo = {
  Id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
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