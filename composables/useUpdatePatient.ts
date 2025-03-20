import {apiQueryClient} from '~/api/client'
import {useMutation, useQueryClient} from "@tanstack/vue-query";


// upate patient composable
export default  function() {
  const queryClient = useQueryClient();
  const validationError = ref<string | null>(null);

  const { mutate, isLoading, isSuccess: isPatientUpdated } = useMutation({
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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(["getPatientbyId", variables.id]);
      console.log("Patient updated successfully");
    },
    onError: (error: any) => {
      console.log("Error update patient", error);
    },
  })


  return { 
    mutate,
    isLoading,
    validationError,
    isPatientUpdated
  };
};
