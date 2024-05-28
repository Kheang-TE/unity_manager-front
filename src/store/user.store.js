import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    // Define user object with values set to localStorage values if it exists or else set to an empty object
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      firstname: '',
      lastname: '',
    },
  }),
  actions: {
    persistToLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    setUser(user) {
      this.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      this.persistToLocalStorage();
    },
  },
});

export default useUserStore;
