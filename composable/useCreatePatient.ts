import { apiQueryClient } from "~/api/client";
import { useMutation } from '@tanstack/vue-query';
import type { NewPatient } from "~/types";
export default function () {

 
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createPatient"],
    mutationFn: async (data: NewPatient) => {
       await apiQueryClient.createPatient({
        body: data
      }) 
    },
    onSuccess: () => {
      console.log("Patient created successfully");
      navigateTo("/");
    },
    onError: (error) => {
      console.log("Error creating patient", error);
    },
  });


  return {
   mutate,
   isLoading
  };

}