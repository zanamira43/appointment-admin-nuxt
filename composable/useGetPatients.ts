import { apiQueryClient } from "~/api/client";
import {useQuery} from "@tanstack/vue-query"

export default  function (){
  const {data: patients, isLoading, refetch } = useQuery({
    queryKey: ["getPatients"],
    queryFn: async () => { 
     return await apiQueryClient.getPatients()
     },
    retry: 2

  })

  return {
    patients,
    isLoading,
    refetch
  };

}