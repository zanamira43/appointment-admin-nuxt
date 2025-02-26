// import { useMutation } from "@tanstack/vue-query";
export default async () => {

  const { $apiQueryClient } = useNuxtApp();
 
  const { mutate} = await $apiQueryClient.deletePatient.useMutation({
    mutationKey: ["deletePatient"],
    onSuccess: () => {
      console.log("Patient deleted successfully");
      // navigate to patients page
      navigateTo("/admin");
    },
    onError: (error: any) => {
      console.log("Error deleting patient", error);
    },
  });


  return { 
    mutate,
  }

}