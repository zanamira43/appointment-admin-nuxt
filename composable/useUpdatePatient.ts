import {apiQueryClient} from '~/api/client'
import {useMutation} from "@tanstack/vue-query";


// upate patient composable
export default  function() {
  
  const { mutate } = useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: async (varialbles : {id: number, updatePatientForm: any}) => {
      return  await apiQueryClient.updatePatient({
        params: {
          id: varialbles.id as number,
        },
        body: varialbles.updatePatientForm,
      });
    },
    onSuccess: () => {
      console.log("Patient updated successfully");
    },
    onError: (error: any) => {
      console.log("Error update patient", error);
    },
  })


  return { 
    mutate,
  };
};
