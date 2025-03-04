import {apiQueryClient} from '~/api/client'
import {useMutation} from "@tanstack/vue-query";


// upate patient composable
export default  function() {

  const validationError = ref<string | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["updatePatient"],
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
    onSuccess: () => {
      console.log("Patient updated successfully");
    },
    onError: (error: any) => {
      console.log("Error update patient", error);
    },
  })


  return { 
    mutate,
    isLoading,
    validationError
  };
};
