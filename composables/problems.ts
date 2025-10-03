import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiQueryClient } from "~/api/client";

import type { INewProblem, IEditProblem } from "~/types/IProblem";

export const GET_PROBLEMS_QUERY_KEY = "getProblems";
export const GET_PROBLEM_QUERY_KEY = "getProblem";
export const GET_PROBLEMS_BY_PATIENT_ID_QUERY_KEY = "getProblemsByPatientId";

// get all problems composable
export const useGetProblems = (search?: Ref<string>, page?: Ref<number>, limit?: Ref<number>) => {
  const { data: problems, isLoading, refetch: fetchProblems } = useQuery({
    queryKey: [GET_PROBLEMS_QUERY_KEY, search, page, limit],
    queryFn: async () => {
      const res = await apiQueryClient.problem.getProblems({
        query: {
          search: search?.value,
          page: page?.value,
          limit: limit?.value,
        },
      });

      if (res.status === 200) {
        return res.body;
      }
    },
    retry: 2,
    enabled: true,
  });

  return {
    problems,
    isLoading,
    fetchProblems,
  };
};

// get single problem by ID composable
export const useGetProblem = (id: number) => {
  const { data: problem, refetch: fetchProblem } = useQuery({
    queryKey: [GET_PROBLEM_QUERY_KEY, id],
    queryFn: async () => {
      return await apiQueryClient.problem.getProblem({
        params: {
          id: id as number,
        },
      });
    },
    enabled: !!id,
  });

  return {
    problem,
    fetchProblem,
  };
};

// create new problem composable
export const useCreateProblem = () => {
  const queryClient = useQueryClient();
  const { mutate: createProblem, isPending } = useMutation({
    mutationFn: async (problemData: INewProblem) => {
      return await apiQueryClient.problem.createProblem({
        body: problemData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROBLEMS_QUERY_KEY] });
    },
  });

  return {
    createProblem,
    isPending,
  };
};

// update single problem by ID composable
export const useUpdateProblem = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProblem, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: IEditProblem}) => {
      return await apiQueryClient.problem.updateProblem({
        params: {
          id: id,
        },
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROBLEMS_QUERY_KEY] });
    },
  });

  return {
    updateProblem,
    isPending,
  };
};

// delete single problem by ID composable
export const useDeleteProblem = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProblem, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await apiQueryClient.problem.deleteProblem({
        params: {
          id: id,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [GET_PROBLEMS_QUERY_KEY] });
    },
  });

  return {
    deleteProblem,
    isPending,
  };
};

// get problems by patient ID composable
export const useGetProblemsByPatientId = (patientId: Ref<number> | number) => {
  const id = isRef(patientId) ? patientId : ref(patientId);

  const { data: problem, isLoading, refetch: fetchProblems } = useQuery({
    queryKey: [GET_PROBLEMS_BY_PATIENT_ID_QUERY_KEY, id],
    queryFn: async () => {
      const res = await apiQueryClient.problem.getProblemsByPatientId({
        params: {
          id: id.value,
        },
      });

      if (res.status === 200) {
        return res.body;
      }
    },
    enabled: computed(() => !!id.value),
    retry: 2,
  });

  return {
    problem,
    isLoading,
    fetchProblems,
  };
};
