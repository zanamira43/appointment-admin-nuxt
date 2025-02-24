export default async function (){

  const { $apiQueryClient } = useNuxtApp();
  const { data: patients, isLoading } = await $apiQueryClient.getPatients.useQuery(["getPatients"]);

  
  return {
    patients,
    isLoading,
  };
}