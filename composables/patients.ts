import { apiQueryClient } from "~/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { NewPatient } from "~/types";

import  { type PatientFormSchema } from  '~/validation/patientvalidation'

// create new patient composable
export const useCreatePatient = () => {
  const validationError = ref<string | null>(null);
  
  const { mutate, isSuccess: isPatientCreated } = useMutation({
    mutationKey: ["createPatient"],

    mutationFn: async (data: PatientFormSchema) => {
      const response = await apiQueryClient.patient.createPatient({
        body: data as NewPatient
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
    },
  });

  return {
   mutate,
   isPatientCreated,
   validationError
  };
}

// use get All Patients composable
export const useGetPatients = () => {
  const { data: patients, isLoading, refetch: fetchPatients } = useQuery({
    queryKey: ["getPatients"],
    queryFn: async () => {
      return await apiQueryClient.patient.getPatients();
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
    queryKey: ['getPatientbyId', id],
    queryFn: async () => {
     return  await apiQueryClient.patient.getPatientbyId({
        params: {
          id: id as number
        }
      })
    }
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
  const validationError = ref<string | null>(null);

  const { mutate, isSuccess: isPatientUpdated } = useMutation({
    mutationFn: async (varialbles : {id: number, updatePatientForm: any}) => {
      const response =  await apiQueryClient.patient.updatePatient({
        params: {
          id: varialbles.id as number,
        },
        body: varialbles.updatePatientForm,
      });

      if(response.status === 400) {
        validationError.value = response.body
        throw new Error(response.body);
      }

      return response.body
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["getPatientbyId", variables.id] });
      console.log("Patient updated successfully");
    },
    onError: (error: any) => {
      console.log("Error update patient", error);
    },
  })


  return { 
    mutate,
    isLoading: false, // Assuming you want to handle loading state separately
    validationError,
    isPatientUpdated
  };
};


// use delete Patient composable
export const useDeletePatient =  () => { 
  const queryClient = useQueryClient();
  
  const { mutate, isSuccess: isPatientDeleted } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: async (id: number) => {
      const {} = await apiQueryClient.patient.deletePatient({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["getPatients"]});
      console.log("Patient deleted successfully");
    },
    onError: (error: any) => {
      console.log("Error deleting patient", error);
    },
  });


  return { 
    mutate,
    isPatientDeleted
  }

}