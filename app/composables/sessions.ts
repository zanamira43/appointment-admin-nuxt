import { apiQueryClient } from "@/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { type INewSession, type IEditSession } from "@/types/ISession";



export const GET_SESSIONS_QUERY_KEY = "getSessions";
export const GET_SESSION_QUERY_KEY = "getSession";
export const GET_SESSION_QUERY_KEY_BY_PATIENT_ID = "getSessionByPatientId";

// use get All Sessions composable
export const useGetSessions = (search?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: sessions, isLoading, refetch: fetchSessions } = useQuery({
    queryKey: [GET_SESSIONS_QUERY_KEY, search, page, limit],
    queryFn: async () => {
      const res =  await apiQueryClient.session.getSessions({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });

      if(res.status === 200) {
        return res.body
      }
    },

    retry: 2
  });

  return {
    sessions,
    isLoading,
    fetchSessions
  };
} 


export const useGetSessionsByPatient = (id: number,  search?: Ref<string>, page?: Ref<number>, limit?: Ref<number>) => {
  const { data: sessions, isLoading, refetch: fetchSessions } = useQuery({
    queryKey: [GET_SESSION_QUERY_KEY_BY_PATIENT_ID, search, page, limit],
    queryFn: async () => {
      const res =  await apiQueryClient.session.getSessionsByPatient({
        params: {
          id: id
        },
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });

      if(res.status === 200) {
        return res.body
      }
    },
  });

  return {
    sessions,
    isLoading,
    fetchSessions
  };
}

// create new session composable
export const useCreateSession = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewSession, isPending } = useMutation({
    mutationFn: async (sessionData: INewSession) => {
      return await apiQueryClient.session.createSession({body: sessionData});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_SESSION_QUERY_KEY_BY_PATIENT_ID] });
    },
  });

  return {
    createNewSession,
    isPending
  }
};


// get single session composable
export const useGetSession = (id: number) => {
  const {data: session, isLoading} = useQuery({
    queryKey: [GET_SESSION_QUERY_KEY, id],
    queryFn: async () => {
      return await apiQueryClient.session.getSession({
        params: {
          id: id
        }
      });
    },
    enabled: !!id
  })

  return {
    session,
    isLoading
  }
}

// update session composable
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  const {mutate: updateSession, isPending: isSessionUpdating} = useMutation({
    mutationFn: async ({id , data }: {id:number; data:IEditSession}) => {
      return await apiQueryClient.session.updateSession({
        params: {
          id: id
        },
        body: data
      })
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: [GET_SESSION_QUERY_KEY]});
      await queryClient.invalidateQueries({queryKey: [GET_SESSION_QUERY_KEY_BY_PATIENT_ID]});
    },
    onError: (error: any) => {
      console.log("Error update session", error);
    },
  })

  return {
    updateSession,
    isSessionUpdating
  }
}


// delete single session by Id composable
export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deleteSession, isPending: isDeleteSessionLoading } = useMutation({
    mutationFn: async (id: number) => {
     return  await apiQueryClient.session.deleteSession({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({queryKey: [GET_SESSION_QUERY_KEY_BY_PATIENT_ID]});
      console.log("Session deleted successfully");
    },
    onError: (error: any) => {
      console.log("Error deleting session", error);
    },
  });

  return { 
    deleteSession,
    isDeleteSessionLoading
  }
}