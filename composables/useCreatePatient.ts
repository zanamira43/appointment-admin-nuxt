import { apiQueryClient } from "~/api/client";
import { useMutation } from '@tanstack/vue-query';
import type { NewPatient } from "~/types";

import  { type PatientFormSchema } from  '~/validation/patientvalidation'




export default function () { 

  const validationError = ref<string | null>(null);
  
  const { mutate, isLoading, isSuccess: isPatientCreated } = useMutation({
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
   isLoading,
   isPatientCreated,
   validationError
  };

}