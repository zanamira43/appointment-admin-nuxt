import { type IPatient } from "./IPatient";
import {  type ISession } from "./ISession";



 export type IAllPayment = {
    id: number;
    patient_id: number;
    session_id: number;
    amount: number;
    payment_date: string; // ISO date string
    payment_method: string;
    status: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }[];

export type IPayment = {
    id: number;
    patient_id: number;
    session_id: number;
    amount: number;
    payment_date: string; // ISO date string
    payment_method: string;
    status: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string

    patient?: IPatient; // Optional, if the patient is included
    session?: ISession; // Optional, if the session is included
    
  }



 
  export type INewPayment = {
    patient_id: number;
    session_id: number;
    amount: number;
    payment_date: string; // ISO date string
    payment_method: string;
    status: string;
  }

   export type IUpdatePayment = {
    patient_id: number;
    session_id: number;
    amount: number;
    payment_date: string; // ISO date string
    payment_method: string;
    status: string;
  }

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