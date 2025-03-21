export type Patient ={
  id: number,
  slug: string,
  name: string,
  gender: string,
  age: number,
  profession: string,
  address: string,
  phone_number: string,
  created_at: Date,
  updated_at: Date
}

export type NewPatient = {
  name: string,
  gender: string,
  age: number,
  profession: string,
  address: string,
  phone_number: string,
}