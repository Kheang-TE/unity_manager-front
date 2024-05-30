import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      code_color: null,
    },
  }),
  actions: {
    persistToLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    setUser(user) {
      console.log('user : ', user);
      this.user = { ...this.user, ...user };
      this.persistToLocalStorage();
    },
    logout() {
      this.$state.user = {
        id: null,
        firstname: null,
        lastname: null,
        email: null,
        code_color: null,
      };
      localStorage.removeItem('user');
    },
  },
  getters: {
    getUser: (state) => state.user,
    fullname: (state) => `${state.user.firstname} ${state.user.lastname}`,
    initials: (state) => `${state.user.firstname[0]}${state.user.lastname[0]}`,
    isLoggedIn: (state) => state.user.id !== null,
    isAdmin: (state) => state.user.isAdmin === 'true',
  },
});

export default useUserStore;
