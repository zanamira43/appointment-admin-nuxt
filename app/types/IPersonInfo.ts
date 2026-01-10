

export type IAllPersonInfo ={
  data: [
    id: number,
    full_name: string,
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


export type IPersonInfo = {
    id: number;
    full_name: string,
    phone_number: string,
    created_at: Date;
    updated_at: Date;

};

export type INewPersonInfo = { 
    full_name: string,
    phone_number: string,
};
          
export type IEditPersonInfo = { 
    full_name: string,
    phone_number: string,
};