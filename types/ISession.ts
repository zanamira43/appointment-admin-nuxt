import type { IPatient } from "./IPatient";


export type IAllSession = {
  id: string;
  patient_id: string;
  duration: number;
  status: string;
  notes: string;  
  session_date: string;
  created_at?: string;
  updated_at?: string;
}[];

export type ISession = {
  id: string;
  patient_id: string;
  duration: number;
  status: string;
  result: string;  
  session_date: string;
  created_at?: string;
  updated_at?: string;

  patient?:IPatient;

}

export type INewSession = {
  patient_id: string;
  duration: number;
  status: string;
  result: string;
  session_date: string;
}

export type IUpdateSession = {
  patient_id: string;
  duration: number;
  status: string;
  result: string;
  session_date: string;
}