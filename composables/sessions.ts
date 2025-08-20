import { apiQueryClient } from "~/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { type INewSession, type IUpdateSession } from "~/types/ISession";



export const  GET_SESSIONS_QUERY_KEY = "getSessions";
export const GET_SESSION_QUERY_KEY = "getSession";

// use get All Sessions composable
export const useGetSessions = () => {
  const { data: sessions, isLoading, refetch: fetchSessions } = useQuery({
    queryKey: [GET_SESSIONS_QUERY_KEY],
    queryFn: async () => {
      return await apiQueryClient.session.getSessions();
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

  return useMutation({
    mutationFn: async (sessionData: INewSession) => {
      return await apiQueryClient.session.createSession({body: sessionData});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_SESSIONS_QUERY_KEY] });
    },
  });
};


// get single session composable
export const useGetSession = (id: number) => {
  const {data: session, isLoading} = useQuery({
    queryKey: [GET_SESSION_QUERY_KEY],
    queryFn: async () => {
      return await apiQueryClient.session.getSession({
        params: {
          id: 1
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
    mutationFn: async ({id , data }: {id:number; data:IUpdateSession}) => {
      return await apiQueryClient.session.updateSession({
        params: {
          id: id
        },
        body: data
      })
    },
    onSuccess: async(_, id) => {
      await queryClient.invalidateQueries({queryKey: [GET_SESSION_QUERY_KEY, id]});
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
  
  const { mutate: deleteSession, isSuccess: isSessionDeleted, isPending: isDeleteSessionLoading } = useMutation({
    mutationFn: async (id: number) => {
     return  await apiQueryClient.session.deleteSession({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [GET_SESSIONS_QUERY_KEY]});
      console.log("Session deleted successfully");
    },
    onError: (error: any) => {
      console.log("Error deleting session", error);
    },
  });

  return { 
    deleteSession,
    isSessionDeleted,
    isDeleteSessionLoading
  }
}