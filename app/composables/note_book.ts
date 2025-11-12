
import { useQuery, useMutation, useQueryClient} from "@tanstack/vue-query";
import { apiQueryClient } from "~/api/client";
import type { INewNotbook, IUpdateNotbook } from "~/types/INotebook";

export const GET_NOTEBOOKS_QUERY_KEY = "getNotebooks";
export const GET_NOTEBOOK_QUERY_KEY = "getNotebook";


// get all notebooks composable
export const useGetNotbooks = (search?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: notebooks, isLoading, refetch: fetchNotebooks } = useQuery({
    queryKey: [GET_NOTEBOOKS_QUERY_KEY],
    queryFn: async () => {
      const {status, body} = await apiQueryClient.noteBook.getAllNotebooks({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });

      if(status === 200){
        return body
      }
      if(status === 400 || status === 404) {
        throw new Error(body.message)
      }
    }
  }) 

  return {
    notebooks,
    isLoading,
    fetchNotebooks
  }
}

// get single notebook composable
export const useGetNotebook = (id: number) => {
  const { data: notebook, isLoading, refetch: fetchSingleNotebook } = useQuery({
    queryKey: [GET_NOTEBOOK_QUERY_KEY, id],
    queryFn: async () => {
      const {status, body} = await apiQueryClient.noteBook.getNotebook({
        params: {
          id: id
        }
      });

      if(status === 200){
        return body
      }
      if(status === 400 || status === 404) {
        throw new Error(body.message)
      }
    },  
  })

  return {
    notebook,
    isLoading,
    fetchSingleNotebook
  }
}


// create new notebook composable
export const useCreateNotebook = () => {
  const queryClient = useQueryClient();

  const { mutate: createNotebook, isPending } = useMutation({
    mutationFn: async (data: INewNotbook) => {
      const response =  await apiQueryClient.noteBook.createNotebook({
        body: data
      });

      if(response.status === 400 || response.status === 404){
        throw new Error(response.body.message)
      }

      if(response.status === 200){
        return response.body
      }
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [GET_NOTEBOOKS_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log("Error create notebook", error);
    },

  });

  return {
    createNotebook,
    isPending
  }
}

// update notebook composable
export const useUpdateNotebook = () => {
  const queryClient = useQueryClient();

  const { mutate: updateNotebook, isPending } = useMutation({
    mutationFn: async ({id, data}: {id: number, data: IUpdateNotbook}) => {
      const resposne =  await apiQueryClient.noteBook.updateNotebook({
        params: {
          id: id
        },
        body: data
      })

      if(resposne.status === 400 || resposne.status === 404){
        throw new Error(resposne.body.message)
      }

      if(resposne.status === 200){
        return resposne.body
      }
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [GET_NOTEBOOKS_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log("Error update notebook", error);
    },
  })

  return {
    updateNotebook,
    isPending
  }
}


// delete notebook composable
export const useDeleteNotebook = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteNotebook, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await apiQueryClient.noteBook.deleteNotebook({
        params: {
          id: id
        }
      });
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [GET_NOTEBOOKS_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log("Error deleting notebook", error);
    },
  });

  return {
    deleteNotebook,
    isPending
  }

}