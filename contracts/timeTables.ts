import { initContract } from "@ts-rest/core";
import type {
  IAllTimeTables,
  ITimeTable,
  IEditTimeTables,
  INewTimeTables,
} from "~/types/ITimeTable";

export type SearchPagination = {
  search?: string;
  searchByWeekDays?: string;
  page?: number;
  limit?: number;
};

const c = initContract();

export const timeTablesContract = c.router({
  getTimeTables: {
    method: "GET",
    path: "/timetables",
    query: c.type<SearchPagination>(),
    responses: {
      200: c.type<IAllTimeTables>(),
      400: c.type<{ message: string }>(),
    },
  },
  createTimeTables: {
    method: "POST",
    path: "/timetables",
    responses: {
      200: c.type(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<INewTimeTables>(),
  },
  getTimeTable: {
    method: "GET",
    path: "/timetables/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<ITimeTable>(),
      400: c.type<{ message: string }>(),
    },
  },
  updateTimeTable: {
    method: "PUT",
    path: "/timetables/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<ITimeTable>(),
      400: c.type<{ message: string }>(),
    },
    body: c.type<IEditTimeTables>(),
  },
  deleteTimeTable: {
    method: "DELETE",
    path: "/timetables/:id",
    pathParams: c.type<{ id: number }>(),
    responses: {
      200: c.type<{ mssage: string }>(),
      400: c.type<{ message: string }>(),
    },
  },
});
