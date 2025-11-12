export type IAllNotbooks = {
  data: [
    {
      id: number;
      content: string;
      created_at: string;
      updated_at: string;
    }
  ]

  page?: number;
  limit?: number;
  total: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}


export type INewNotbook = {
  content: string;
}

export type IUpdateNotbook = {
  content: string; 
}

export type INotebook = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}