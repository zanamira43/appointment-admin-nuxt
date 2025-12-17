import type { IPayment } from "./IPayment"
import type { ISession } from "./ISession"


export type IAllPatient ={
  data: [
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
  ]

  page?: number;
  limit?: number;
  total: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;

};

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
  married_status: string,
  profession: string,
  address: string,
  phone_number: string,
}


export type IUpdatePatient = {
  slug: string,
  name: string,
  gender: string,
  age: number,
  married_status: string,
  profession: string,
  address: string,
  phone_number: string,
}


export type IPatientOutcome = {
  id: number;
  name: string;
  need_sessions_count: number;
  is_dollar_payment: boolean
  session_price_one_month: number;
  sum_received_session_count: number;
  total_received_payments: number;
}