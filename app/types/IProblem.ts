export type IAllProblem = {
  data: [
    {
      id: number,
      patient_id: number,
      main_problems: string[],
      secondary_problems: string[],
      need_sessions_count: number,
			is_dollar_payment: boolean,
      session_price: number,
      session_total_price: number,
      patient_image: string,
      details: string,
      created_at: string,
      updated_at: string,
    }
  ];

  page?: number;
  limit?: number;
  total: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}

export type IProblem = {
	id: number;
	patient_id: number;
	main_problems: string[];
	secondary_problems: string[];
	need_sessions_count: number;
	is_dollar_payment: boolean,
	session_price: number;
	session_total_price: number;
	patient_image: string;
	details: string;
	created_at: string;
	updated_at: string;
}


export type INewProblem = {
	patient_id: number;
	main_problems: string[];
	secondary_problems: string[];
	need_sessions_count: number;
	is_dollar_payment: boolean,
	session_price: number;
	patient_image: string;
	details: string;
}

export type IEditProblem = {
	patient_id: number;
	main_problems: string[];
	secondary_problems: string[];
	need_sessions_count: number;
	is_dollar_payment: boolean,
	session_price: number;
	patient_image: string;
	details: string;
}