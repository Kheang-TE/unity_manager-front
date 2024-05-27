import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      pseudo: 'unknown',
    },
  }),
  actions: {
    setUser(pseudo) {
      this.user.pseudo = pseudo;
    },
  },
});
