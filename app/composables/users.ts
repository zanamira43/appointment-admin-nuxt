import {useQuery, useMutation, useQueryClient} from '@tanstack/vue-query'
import { apiQueryClient } from "@/api/client";

import type { IRequestUser, IUpdateRequestUser, UserPassword } from '@/types/IUser';

export const GET_USERS_QUERY_KEY = "get-users";
export const GET_USER_QUERY_KEY = "get-user";

// get all users composable
export const useGetUsers = () => {
  const { data: users, isLoading, refetch: fetchUsers } = useQuery({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => {
      const {body: response, status} = await apiQueryClient.user.getUsers();

      if(status === 400) {
        throw new Error(response.errors as string);
      }

        if(status === 403) {
        throw new Error(response.errors as string);
      }

      return response
    },
  });

  return {
    users,
    isLoading,
    fetchUsers
  };
}

// get single user composable
export const useGetUser = (id: number) => {
  const { data: user, isLoading, refetch: fetchUser } = useQuery({
    queryKey: [GET_USER_QUERY_KEY, id],
    queryFn: async () => {
      const {body: response, status} = await apiQueryClient.user.getUser({
        params: {
          id: id as number
        }
      });

      if(status === 400) {
        throw new Error(response.errors as string);
      }

      if(status === 404) {
        throw new Error(response.errors as string);
      }

      return response
    },
  });

  return {
    user,
    isLoading,
    fetchUser
  };
}

// create new user composable
export const useCreateUser = () => {
  const { mutate, isPending: isCreateUserLoading } = useMutation({
    mutationFn: async (user: IRequestUser) => {
      const {body: response, status} = await apiQueryClient.user.createUser({body: user});

      if(status === 400) {
        throw new Error(response.errors as string);
      }

      if(status === 422) {
        throw new Error(response.errors as string);
      }

      return response
    },
  });

  return {
    mutate,
    isCreateUserLoading
  }
}

// update user composable
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isUpdateUserLoading } = useMutation({
    mutationFn: async ({id, body}: {id: number, body: IUpdateRequestUser}) => {
      const {body: response, status} = await apiQueryClient.user.updateUser({
        params: {
          id: id
        },
        body: body
      });

      if(status === 400) {
        throw new Error(response.errors as string);
      }

      if(status === 422) {
        throw new Error(response.errors as string);
      }

      if(status === 404) {
        throw new Error(response.errors as string);
      }

      return response
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({queryKey: [GET_USER_QUERY_KEY, id]});
      await apiQueryClient.auth.userInfo()
    },
    onError: (error: any) => {
      console.log("Error update user", error);
    },
  });

  return {
    mutate,
    isUpdateUserLoading
  }
}

// update user password composable
export const useUpdateUserPasswordById = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isUpdateUserLoading } = useMutation({
    mutationFn: async ({id, body}: {id: number, body: UserPassword}) => {
      const {body: response, status} = await apiQueryClient.user.updateUserPassword({
        params: {
          id: id
        },
        body: body
      });

      if(status === 400) {
        throw new Error(response.errors as string);
      }

      if(status === 422) {
        throw new Error(response.errors as string);
      }

      if(status === 404) {
        throw new Error(response.errors as string);
      }

      return response
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({queryKey: [GET_USER_QUERY_KEY, id]});
      await apiQueryClient.auth.userInfo()
    },
    onError: (error: any) => {
      console.log("Error update user", error);
    },
  });

  return {
    mutate,
    isUpdateUserLoading
  }
}


// delete user composable
export const useDeleteUser = () => {
   const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleteUserLoading } = useMutation({
    mutationFn: async (id: number) => {
      const {body: response, status} = await apiQueryClient.user.deleteUser({
        params: {
          id: id
        }
      });

      if(status === 400) {
        throw new Error(response.errors as string);
      }

      if(status === 404) {
        throw new Error(response.errors as string);
      }

      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [GET_USERS_QUERY_KEY]});
    },
    onError: (error: any) => {
      console.log("Error delete user", error);
    },
  });

  return {
    deleteUser,
    isDeleteUserLoading
  }
}