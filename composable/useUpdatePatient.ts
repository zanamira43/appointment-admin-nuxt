
// upate patient composable
export default  async function() {
  
  const { $apiQueryClient } = useNuxtApp();
  const { mutate } = await $apiQueryClient.updatePatient.useMutation({
    mutationKey: ["updatePatient"],
    onSuccess: () => {
      console.log("Patient updated successfully");
    },
    onError: (error) => {
      console.log("Error update patient", error);
    },
  })

  return { 
    mutate, 
  };
};
