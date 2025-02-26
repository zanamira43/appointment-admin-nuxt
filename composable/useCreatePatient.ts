export default async function () {

  const { $apiQueryClient } = useNuxtApp();
  const { mutate, isLoading } = await $apiQueryClient.createPatient.useMutation({
    mutationKey: ["createPatient"],
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