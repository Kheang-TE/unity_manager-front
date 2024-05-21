
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import ChatWindow from '../views/ChatWindow.vue'
import Board from '../views/Board.vue'
import NotFound from '../views/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/signup",
      name: "sign up",
      component: SignUp,
    },
    {
      path: "/signin",
      name: "sign in",
      component: SignIn,
    },
    {
      path: "/chat",
      name: "ChatWindow",
      component: ChatWindow,
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],

});

export default router;
