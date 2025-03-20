import { apiQueryClient } from "~/api/client";
import {useQuery} from "@tanstack/vue-query"

export default function (id: number) {
  
  const {data: patient, isLoading, refetch: fetchPatient} = useQuery({
    queryKey: ['getPatientbyId', id],
    queryFn: async () => {
     return  await apiQueryClient.patient.getPatientbyId({
        params: {
          id: id as number
        }
      })
    }
  })

  return {
    patient,
    isLoading,
    fetchPatient
  }
}