import { defineStore } from "pinia";

 const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      code_color: "",
    },
  }),
  actions: {
    persistToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    setUser(user) {
      console.log("setUser called with:", user);
      if (
        user.id &&
        user.firstname &&
        user.lastname &&
        user.email &&
        user.code_color
      ) {
        this.user = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          code_color: user.code_color,
        };
        this.persistToLocalStorage();
        console.log("Updated user state:", this.user);
      }
    },
    $reset() {
      this.$state.user = {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        code_color: "",
      };
      localStorage.removeItem("user");
    },
  },
});

export default useUserStore