import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      firstname: '',
      lastname: '',
    },
  }),
  actions: {
    setUser(user) {
      this.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      };
    },
  },
});
