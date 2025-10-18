// create patient state management store

import { defineStore } from "pinia";


export const useSearchStore = defineStore("searchStore", {
   // search state 
    state: () => ({
    query: "",
  }),

  getters: {},

  // search action
  actions: {
    SetSearch(query: string) {
      this.query = query;
    },
  },
});
