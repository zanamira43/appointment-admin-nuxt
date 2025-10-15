import { apiQueryClient } from "~/api/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import type { INewPaymentType, IEditPaymentType } from "~/types/IPayment";


export const GET_PAYMENT_TYPES_QUERY_KEY = "getPaymentTypes";
export const GET_PAYMENT_TYPE_QUERY_KEY = "getPaymentType";


// get all payment types composable
export const useGetPaymentTypes = (search?: Ref<string> ,page?: Ref<number>, limit?: Ref<number>) => {
  const { data: paymentTypes, isLoading, refetch: fetchPaymentTypes } = useQuery({
    queryKey: [GET_PAYMENT_TYPES_QUERY_KEY, search, page, limit],
    queryFn: async () => {
      const {status, body} =  await apiQueryClient.paymentType.getPaymentTypes({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value
        }
      });

      if (status === 200) {
        return body;
      }
      return null;
    },
  }); 

  return {
    paymentTypes,
    isLoading,
    fetchPaymentTypes
  };
}

// get single payment type  by Id composable
export const useGetPaymentType = (id: number) => {
  const { data: paymentType, isLoading, refetch: fetchPaymentType } = useQuery({
    queryKey: [GET_PAYMENT_TYPE_QUERY_KEY],
    queryFn: async () => {
      const {status, body} = await apiQueryClient.paymentType.getPaymentType({
        params: {
          id: id
        }
      });

      if( status === 200) {
        return body;
      }
      return null;
    },
    enabled: !!id
  }); 

  return {
    paymentType,
    isLoading,
    fetchPaymentType
  };
}

// create new payment type composable
export const useCreatePaymentType = () => {
  const queryClient = useQueryClient();

  const { mutate: createPaymentType, isPending: isCreatePaymentTypeLoading } = useMutation({
    mutationFn: async (paymentTypeData: INewPaymentType) => {
      return await apiQueryClient.paymentType.createPaymentType({body: paymentTypeData});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PAYMENT_TYPES_QUERY_KEY] });
    },
    onError: (error: any) => {
      console.log("Error create payment type", error);
    },
  });

  return {
    createPaymentType,
    isCreatePaymentTypeLoading
  }
};


// update single payment type by Id composable
export const useUpdatePaymetType = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePaymentType, isPending: isUpdatePaymentTypeLoading } = useMutation({
    mutationFn: async ({id , data }: {id:number; data:IEditPaymentType}) => {
      return await apiQueryClient.paymentType.updatePaymentType({
        params: {
          id: id
        },
        body: data
      })
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: [GET_PAYMENT_TYPES_QUERY_KEY]});
    },
    onError: (error: any) => {
      console.log("Error update payment type", error);
    },
  })

  return {
    updatePaymentType,
    isUpdatePaymentTypeLoading
  }
}

// delete payment type by Id composable
export const useDeletePaymentType = () => {
  const queryClient = useQueryClient();
  
  const { mutate: deletePaymentType,  isPending: isDeletePaymentTypeLoading } = useMutation({
    mutationFn: async (id: number) => {
     return  await apiQueryClient.paymentType.deletePaymentType({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [GET_PAYMENT_TYPES_QUERY_KEY]});
    },
    onError: (error: any) => {
      console.log("Error deleting payment type", error);
    },
  });

  return { 
    deletePaymentType,
    isDeletePaymentTypeLoading
  }
}