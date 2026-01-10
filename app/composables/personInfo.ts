import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiQueryClient } from "@/api/client";

import type { INewPersonInfo, IEditPersonInfo } from "@/types/IPersonInfo";

export const GET_PERSONINFOS_QUERY_KEY = "get_persons_info";
export const GET_PERSONINFO_QUERY_KEY = "get_person_info";

// get all Persons Inof composable
export const useGetAllPersonsInfo = (search?: Ref<string>, page?: Ref<number>, limit?: Ref<number>) => {
  const { data: personsData, isLoading, refetch: fetchPersonsInfo } = useQuery({
    queryKey: [GET_PERSONINFOS_QUERY_KEY, search, page, limit],
    queryFn: async () => {
      const res = await apiQueryClient.PersonInfo.getPersonsInfo({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value,
        },
      });

      if (res.status === 200) {
        return res.body;
      }
    },
    retry: 2,
    enabled: true,
  });

  return {
    personsData,
    isLoading,
    fetchPersonsInfo,
  };
};

// get single Person Info by ID composable
export const useGetPersonInfo = (id: number) => {
  const { data: personData, refetch: fetchPersonData } = useQuery({
    queryKey: [GET_PERSONINFO_QUERY_KEY, id],
    queryFn: async () => {
      return await apiQueryClient.PersonInfo.getPersonInfo({
        params: {
          id: id as number,
        },
      });
    },
    enabled: !!id,
  });

  return {
    personData,
    fetchPersonData,
  };
};

// create new Person info composable
export const useCreateNewPersonInfo = () => {
  const queryClient = useQueryClient();
  const { mutate: createPersonInfo, isPending } = useMutation({
    mutationFn: async (data: INewPersonInfo) => {
      return await apiQueryClient.PersonInfo.createPersonInfo({
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONINFOS_QUERY_KEY] });
    },
  });

  return {
    createPersonInfo,
    isPending,
  };
};

// update single Person Info by ID composable
export const useUpdatePersonInfo = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePersonInfo, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: IEditPersonInfo}) => {
      return await apiQueryClient.PersonInfo.updatePersonInfo({
        params: {
          id: id,
        },
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PERSONINFOS_QUERY_KEY] });
    },
  });

  return {
    updatePersonInfo,
    isPending,
  };
};

// delete single Person Info by ID composable
export const useDeletePersonInfo = () => {
  const queryClient = useQueryClient();

  const { mutate: deletePersonInfo, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await apiQueryClient.PersonInfo.deletePersonInfo({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [GET_PERSONINFOS_QUERY_KEY] });
    },
  });

  return {
    deletePersonInfo,
    isPending,
  };
};
