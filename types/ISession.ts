import type { IPatient } from "./IPatient";


export type IAllSession = {
  data:[
    id: string,
    patient_id: string,
    subject: string,  
    communication_types: string,
    session_date: string,
    duration: number,
    status: string,
    created_at?: string,
    updated_at?: string,
  ];

  page?: number;
  limit?: number;
  total: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}

export type ISession = {
  id: string;
  patient_id: number;
  subject: string;  
  communication_types: string;
  session_date: string;
  duration: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export type INewSession = {
  patient_id: number;
  subject: string;
  communication_types: string;
  session_date: string;
  duration: number;
  status: string;
}

export type IEditSession = {
  patient_id: number;
  subject: string;
  communication_types: string;
  session_date: string;
  duration: number;
  status: string;
}