import { apiQueryClient } from "~/api/client";
import {useQuery} from "@tanstack/vue-query"

export default  function (){
  const {data: patients, isLoading, refetch: fetchPatients } = useQuery({
    queryKey: ["getPatients"],
    queryFn: async () => { 
     return await apiQueryClient.patient.getPatients()
     },
    retry: 2

  })

  return {
    patients,
    isLoading,
    fetchPatients
  };

}