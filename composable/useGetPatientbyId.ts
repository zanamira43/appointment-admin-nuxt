export default  async function (id: any) {

  const { $apiQueryClient } = useNuxtApp();
  const { data: patient, isLoading } = await $apiQueryClient.getPatientbyId.useQuery(
    ["getPatientbyId", id],
    () => ({
      params: {
        id
      }
    })
  );


  return {
    patient,
    isLoading,
  }
}