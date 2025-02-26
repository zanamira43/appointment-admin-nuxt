// upate patient composable
export default  async function() {
  
  const { $apiQueryClient } = useNuxtApp();
  const { mutate, isLoading } = await $apiQueryClient.updatePatient.useMutation({
    mutationKey: ["updatePatient"],
    onSuccess: () => {
  
      console.log("Patient updated successfully");
      navigateTo("/");
    },
    onError: (error) => {
      console.log("Error update patient", error);
    },
  })

  return { 
    mutate, 
    isLoading 
  };
};

// delete patient composable