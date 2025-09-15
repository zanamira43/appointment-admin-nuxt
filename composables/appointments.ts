import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiQueryClient } from "~/api/client";

import type { INewAppointments, IEditAppointments } from "~/types/IAppointment";

export const GET_APPOINTMENTS_QUERY_KEY = "getAppointments";
export const GET_APPOINTMENT_QUERY_KEY = "getAppointment";

// get all appointments composable
export const useGetAppointments = (search?: Ref<string>, page?: Ref<number>, limit?: Ref<number>) => {
  const { data: appointments, isLoading, refetch: fetchAppointments } = useQuery({
    queryKey: [GET_APPOINTMENTS_QUERY_KEY, search, page, limit],
    queryFn: async () => {
      const res = await apiQueryClient.appointment.getAppointments({
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
    appointments,
    isLoading,
    fetchAppointments,
  };
};

// get single appointment by ID composable
export const useGetAppointment = (id: number) => {
  const { data: appointment, refetch: fetchAppointment } = useQuery({
    queryKey: [GET_APPOINTMENT_QUERY_KEY, id],
    queryFn: async () => {
      const res = await apiQueryClient.appointment.getAppointment({
        params: {
          id: id as number,
        },
      });

      if (res.status === 200) {
        return res.body;
      }
    },

    enabled: !!id,
  });

  return {
    appointment,
    fetchAppointment,
  };
};

// create new appointment composable
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { mutate: createAppointment, isPending } = useMutation({
    mutationFn: async (appointmentData: INewAppointments) => {
      return await apiQueryClient.appointment.createAppointments({
        body: appointmentData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_APPOINTMENTS_QUERY_KEY] });
    },
  });

  return {
    createAppointment,
    isPending,
  };
};

// update single  appointment by ID composable
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const { mutate: updateAppointment, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: IEditAppointments }) => {
      return await apiQueryClient.appointment.updateAppointment({
        params: {
          id: id,
        },
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_APPOINTMENTS_QUERY_KEY] });
    },
  });

  return {
    updateAppointment,
    isPending,
  };
};

// delete single appoinment by ID composable
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAppointment, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await apiQueryClient.appointment.deleteAppointment({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [GET_APPOINTMENTS_QUERY_KEY] });
    },
  });

  return {
    deleteAppointment,
    isPending,
  };
};
