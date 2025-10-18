import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiQueryClient } from "@/api/client";

import type { INewTimeTables, IEditTimeTables } from "@/types/ITimeTable";

export const GET_TIMETABLES_QUERY_KEY = "getTimetables";
export const GET_TIMETABLE_QUERY_KEY = "getTimeTable";

// get all time tables composable
export const useGetTimeTables = (search?: Ref<string>, searchByWeekDays?: Ref<string>, page?: Ref<number>, limit?: Ref<number>) => {
  const { data: timeTables, isLoading, refetch: fetchTimeTables } = useQuery({
    queryKey: [GET_TIMETABLES_QUERY_KEY, search, searchByWeekDays, page, limit],
    queryFn: async () => {
      const res = await apiQueryClient.timeTable.getTimeTables({
        query: {
          search: search?.value,
          searchByWeekDays: searchByWeekDays?.value,
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
    timeTables,
    isLoading,
    fetchTimeTables,
  };
};

// get single time table by ID composable
export const useGetTimeTable = (id: number) => {
  const { data: timeTable, refetch: fetchTimeTable } = useQuery({
    queryKey: [GET_TIMETABLE_QUERY_KEY, id],
    queryFn: async () => {
      return await apiQueryClient.timeTable.getTimeTable({
        params: {
          id: id as number,
        },
      });
    },
    enabled: !!id,
  });

  return {
    timeTable,
    fetchTimeTable,
  };
};

// create new time table composable
export const useCreateTimeTable = () => {
  const queryClient = useQueryClient();
  const { mutate: createTimeTable, isPending } = useMutation({
    mutationFn: async (appointmentData: INewTimeTables) => {
      return await apiQueryClient.timeTable.createTimeTables({
        body: appointmentData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TIMETABLES_QUERY_KEY] });
    },
  });

  return {
    createTimeTable,
    isPending,
  };
};

// update single time table by ID composable
export const useUpdateTimeTable = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTimeTable, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: IEditTimeTables}) => {
      return await apiQueryClient.timeTable.updateTimeTable({
        params: {
          id: id,
        },
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TIMETABLES_QUERY_KEY] });
    },
  });

  return {
    updateTimeTable,
    isPending,
  };
};

// delete single time table by ID composable
export const useDeleteTimeTable = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTimeTable, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await apiQueryClient.timeTable.deleteTimeTable({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [GET_TIMETABLES_QUERY_KEY] });
    },
  });

  return {
    deleteTimeTable,
    isPending,
  };
};
