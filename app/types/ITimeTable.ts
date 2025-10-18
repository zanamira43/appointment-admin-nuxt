import type { IPatient } from "./IPatient";

export type IAllTimeTables ={
  data: [
    id: number,
    patient_id: number,
    patient_name: string,
    week_day: string[],
    start_time: string,
    end_time: string,
    user_id: number,
    patient: IPatient | null,
    user: {
      Id: number
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      role: string;
      active: boolean;
      created_at: string;
      updated_at: string
    },
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


export type ITimeTable = {
    id: number;
    patient_id: number;
    patient_name: string;
    week_day: string[];
    start_time: string;
    end_time: string;
    user_id: number;
    user: {
      Id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      role: string;
      active: boolean;
      created_at: string;
      updated_at: string
    },
    created_at: Date;
    updated_at: Date;

};

export type INewTimeTables = { 
    patient_id?: number | null,
    patient_name: string,
    week_day: string[],
    start_time: string,
    end_time: string,
};
          
export type IEditTimeTables = { 
    patient_id: number | null,
    patient_name: string,
    week_day: string[],
    start_time: string,
    end_time: string,
};