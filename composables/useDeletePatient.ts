import {apiQueryClient,} from '~/api/client'
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export default  () => { 
  const queryClient = useQueryClient()
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
      await queryClient.invalidateQueries(["getPatients"]);
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