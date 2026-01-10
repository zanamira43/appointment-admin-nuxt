import { initContract } from "@ts-rest/core";
import type {
  IAllPersonInfo,
  IPersonInfo,
  IEditPersonInfo,
  INewPersonInfo,
} from "@/types/IPersonInfo";

export type SearchPagination = {
  search?: string;
  searchByWeekDays?: string;
  page?: number;
  limit?: number;
};

const c = initContract();

export const PersonInfoContract = c.router({
  getPersonsInfo: {
    method: "GET",
    path: "/persons",
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllPersonInfo>(),
      400: c.type<{ message: string }>(),
    },
  },
  createPersonInfo: {
    method: "POST",
    path: "/persons",
    responses: {
      200: c.type(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<INewPersonInfo>(),
  },
  getPersonInfo: {
    method: "GET",
    path: "/persons/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IPersonInfo>(),
      400: c.type<{ message: string }>(),
    },
  },
  updatePersonInfo: {
    method: "PUT",
    path: "/persons/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<IPersonInfo>(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<IEditPersonInfo>(),
  },
  deletePersonInfo: {
    method: "DELETE",
    path: "/persons/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{ mssage: string }>(),
      400: c.type<{ message: string }>(),
    },
  },
});
