import { apiQueryClient } from "~/api/client";
import { useMutation } from '@tanstack/vue-query';
import type { NewPatient } from "~/types";




export default function () { 

  const validationError = ref<string | null>(null);
  
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createPatient"],

    mutationFn: async (data: NewPatient) => {

      const response = await apiQueryClient.createPatient({
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
    },
  });

  return {
   mutate,
   isLoading,
   validationError
  };

}