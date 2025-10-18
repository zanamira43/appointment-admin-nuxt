import { type IPatient } from "./IPatient";
import {  type ISession } from "./ISession";



export type IAllPayment = {
  data: [
    {
      id: number;
      patient_id: number;
      payment_type_id: string;
      payment_type: {
        id: number;
        name: string;
      };
      amount: number;
      payment_date: string; // ISO date string
      created_at: string; // ISO date string
      updated_at: string; // ISO date string
    }
  ]


  page?: number;
  limit?: number;
  total: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}

export type IPayment = {
  id: number;
  patient_id: number;
  payment_type_id: string;
  payment_type: {
    id: number;
    name: string;
  };
  amount: number;
  payment_date: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
    
}

export type INewPayment = {
  patient_id: number;
  payment_type_id: string;
  amount: number;
  payment_date: string; // ISO date string
}

export type IUpdatePayment = {
  patient_id: number;
  payment_type_id: string;
  amount: number;
  payment_date: string; // ISO date string
}

////////////////////// paymentType  Types  /////////////////////////////////

  export type IPaymentTypes = {

    data: [
      {
        id: number;
        name: string;
      }
    ]
    page?: number;
    limit?: number;
    total: number;
    total_pages?: number;
    has_next?: boolean;
    has_prev?: boolean;
  }

  export type IPaymentType = {
    id: number;
    name: string;
  }

  export type INewPaymentType = {
    name: string;
  }

  export type IEditPaymentType = {
    name: string;
  }