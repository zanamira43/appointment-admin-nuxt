export type IAllAppointments ={
  data: [
    id: number,
    patient_id: number,
    patient_name: string,
    week_day: string,
    date: string,
    start_time: string,
    end_time: string,
    user_id: number,
    status: string,
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


export type IAppointment = {
    id: number;
    patient_id: number;
    patient_name: string;
    week_day: string;
    date: string;
    start_time: string;
    end_time: string;
    user_id: number;
    status: string;
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

export type INewAppointments = { 
    patient_id?: number,
    patient_name: string,
    week_day: string,
    date: string,
    start_time: string,
    end_time: string,
    status: string,
};
          
export type IEditAppointments = { 
    patient_id?: number,
    patient_name: string,
    week_day: string,
    date: string,
    start_time: string,
    end_time: string,
    status: string,
};