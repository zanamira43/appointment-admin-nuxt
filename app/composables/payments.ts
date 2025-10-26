import { apiQueryClient } from "@/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import type { INewPayment, IUpdatePayment } from "@/types/IPayment";


export const GET_PAYMENTS_QUERY_KEY = "getPayments";
export const GET_PAYMENT_QUERY_KEY = "getPayment";


// get all payments composable
export const useGetPayments = (search?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: payments, isLoading, refetch: fetchPayments } = useQuery({
    queryKey: [GET_PAYMENTS_QUERY_KEY],
    queryFn: async () => {
      return await apiQueryClient.payment.getPayments({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });
    },
  }); 

  return {
    payments,
    isLoading,
    fetchPayments
  };
}

// get all payments by Patient composable
export const useGetPaymentsByPatient = (id: number, search?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: payments, isLoading, refetch: fetchPayments } = useQuery({
    queryKey: [GET_PAYMENTS_QUERY_KEY],
    queryFn: async () => {
      const {status, body} =  await apiQueryClient.payment.getPaymentsByPatient({
        params: {
          id: id
        },
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });

      if(status === 200){
        return body
      }
    },
  }); 

  return {
    payments,
    isLoading,
    fetchPayments
  };
}

// get single payment by Id composable
export const useGetPayment = (id: number) => {
  const { data: payment, isLoading, refetch: fetchPayments } = useQuery({
    queryKey: [GET_PAYMENT_QUERY_KEY],
    queryFn: async () => {
      const {status, body} =  await apiQueryClient.payment.getPayment({
        params: {
          id: id
        }
      });

      if(status === 200){
        return body
      }

      if(status === 400 || status === 404) {
        throw new Error(body.message)
      }


    },
    enabled: !!id
  }); 

  return {
    payment,
    isLoading,
    fetchPayments
  };
}

// create new payment composable
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  const { mutate: createPayment, isPending: isCreatePaymentLoading } = useMutation({
    mutationFn: async (paymentData: INewPayment) => {
      return await apiQueryClient.payment.createPayment({body: paymentData});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PAYMENTS_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log("Error create payment", error);
    },
  });

  return {
    createPayment,
    isCreatePaymentLoading
  }
};


// update single payment by Id composable
export const useUpdatePaymet = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePayment, isPending: isUpdatePaymentLoading } = useMutation({
    mutationFn: async ({id , data }: {id:number; data:IUpdatePayment}) => {
      return await apiQueryClient.payment.updatePayment({
        params: {
          id: id
        },
        body: data
      })
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: [GET_PAYMENTS_QUERY_KEY]});
    },
    onError: (error: any) => {
      console.log("Error update payment", error);
    },
  })

  return {
    updatePayment,
    isUpdatePaymentLoading
  }
}

// delete payment by Id composable
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deletePayment, isSuccess: isPaymentDeleted, isPending: isDeletePaymentLoading } = useMutation({
    mutationFn: async (id: number) => {
     return  await apiQueryClient.payment.deletePayment({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [GET_PAYMENTS_QUERY_KEY]});
    },
    onError: (error: any) => {
      console.log("Error deleting payment", error);
    },
  });

  return { 
    deletePayment,
    isPaymentDeleted,
    isDeletePaymentLoading
  }
}