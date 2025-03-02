import {apiQueryClient} from '~/api/client'
import { useMutation } from "@tanstack/vue-query";

export default  () => { 

  const { mutate} = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: async (id: number) => {
      const {} = await apiQueryClient.deletePatient({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
    
      console.log("Patient deleted successfully");
    },
    onError: (error: any) => {
      console.log("Error deleting patient", error);
    },
  });


  return { 
    mutate,
  }

}