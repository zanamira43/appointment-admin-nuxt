import type { IPayment } from "./IPayment"
import type { ISession } from "./ISession"


export type IAllPatient ={
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
}[];

export type IPatient ={
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

  sessions?: ISession[];
  payments?: IPayment[];
}

export type INewPatient = {
  name: string,
  gender: string,
  age: number,
  profession: string,
  address: string,
  phone_number: string,
}


export type IUpdatePatient = {
  id: number,
  slug: string,
  name: string,
  gender: string,
  age: number,
  profession: string,
  address: string,
  phone_number: string,
}