import { apiQueryClient } from "~/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { INewPatient, IUpdatePatient } from "~/types/IPatient";

const toast = useToast();

export const GET_PATIENTS_QUERY_KEY = "getPatients";
export const GET_PATIENT_QUERY_KEY = "getPatient";
// create new patient composable
export const useCreatePatient = () => {
  const validationError = ref<string | null>(null);
  
  const { mutate, isPending} = useMutation({
    mutationFn: async (data: INewPatient) => {
      const response = await apiQueryClient.patient.createPatient({
        body: data
      })

      if(response.status === 400) {
        validationError.value = response.body
        throw new Error(response.body);
      }

      return response.body
      
    },
    onSuccess: () => {
      console.log("Patient created successfully");
    },
    onError: (error: any) => {
      console.log("Error creating patient", error);
      toast.add({
        title: 'Error creating patient',
        color: 'warning',
        icon: 'i-heroicons-x-circle',
      })
    },
  });

  return {
   mutate,
   isPending
  };
}

// use get All Patients composable
export const useGetPatients = (search?: Ref<string>, searchByCode?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: patients, isLoading, refetch: fetchPatients } = useQuery({
    queryKey: [GET_PATIENTS_QUERY_KEY, search, searchByCode, page, limit],
    queryFn: async () => {
      const res =  await apiQueryClient.patient.getPatients({
        query: {
          search: search?.value,
          searchByCode: searchByCode?.value,
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
    patients,
    isLoading,
    fetchPatients
  };
}

// use get Patient by ID composable
export const useGetPatientbyId =  (id: number) => {
  const {data: patient, isLoading, refetch: fetchPatient} = useQuery({
    queryKey: [GET_PATIENT_QUERY_KEY, id],
    queryFn: async () => {
     return  await apiQueryClient.patient.getPatientbyId({
        params: {
          id: id as number
        }
      })
    },
    enabled: !!id
  })

  return {
    patient,
    isLoading,
    fetchPatient
  }
}

// use update Patient composable
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  const { mutate,  isPending} = useMutation({
    mutationFn: async ({id, data}:{id: number, data: IUpdatePatient}) => {
      const response =  await apiQueryClient.patient.updatePatient({
        params: {
          id: id,
        },
        body: data,
      });

      if(response.status === 400) {
        throw new Error(response.body);
      }

      return response.body
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: [GET_PATIENT_QUERY_KEY, id] });
      console.log("Patient updated successfully");
    },
    onError: (error: any) => {
      console.log("Error update patient", error);
    },
  })


  return { 
    mutate,
    isPending
  };
};


// use delete Patient composable
export const useDeletePatient =  () => { 
  const queryClient = useQueryClient();
  
  const { mutate, isSuccess: isPatientDeleted, isPending: isDeletePatientLoading } = useMutation({
    mutationFn: async (id: number) => {
     return  await apiQueryClient.patient.deletePatient({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [GET_PATIENTS_QUERY_KEY]});
      console.log("Patient deleted successfully");
    },
    onError: (error: any) => {
      console.log("Error deleting patient", error);
    },
  });


  return { 
    mutate,
    isPatientDeleted,
    isDeletePatientLoading
  }

}