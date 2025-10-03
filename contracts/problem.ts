import { initContract } from "@ts-rest/core";
import type {
  IAllProblem,
  IProblem,
  IEditProblem,
  INewProblem,
} from "~/types/IProblem";

export type SearchPagination = {
  search?: string;
  page?: number;
  limit?: number;
};

const c = initContract();

export const problemsContract = c.router({
  getProblems: {
    method: "GET",
    path: "/problems",
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllProblem>(),
      400: c.type<{ message: string }>(),
    },
  },
  createProblem: {
    method: "POST",
    path: "/problems",
    responses: {
      200: c.type(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<INewProblem>(),
  },
  getProblem: {
    method: "GET",
    path: "/problems/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IProblem>(),
      400: c.type<{ message: string }>(),
    },
  },
  updateProblem: {
    method: "PUT",
    path: "/problems/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IProblem>(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<IEditProblem>(),
  },
  deleteProblem: {
    method: "DELETE",
    path: "/problems/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{ message: string }>(),
      400: c.type<{ message: string }>(),
    },
  },
  getProblemsByPatientId: {
    method: "GET",
    path: "/problems/patient/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IProblem>(),
      400: c.type<{ message: string }>(),
    },
  },
});
