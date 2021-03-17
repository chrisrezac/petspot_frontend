import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import PetsIndex from "../views/PetsIndex.vue";
import PetsNew from "../views/PetsNew.vue";
import PetsShow from "../views/PetsShow.vue";
import PetsEdit from "../views/PetsEdit.vue";
import PostsIndex from "../views/PostsIndex";
import PostsNew from "../views/PostsNew.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsEdit from "../views/PostsEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit
  },
  {
    path: "/pets",
    name: "pets-index",
    component: PetsIndex
  },
  {
    path: "/pets/new",
    name: "pets-new",
    component: PetsNew
  },
  {
    path: "/pets/:id",
    name: "pets-show",
    component: PetsShow
  },
  {
    path: "/pets/:id/edit",
    name: "pets-edit",
    component: PetsEdit
  },
  {
    path: "/posts",
    name: "posts-index",
    component: PostsIndex
  },
  {
    path: "/posts/new",
    name: "posts-new",
    component: PostsNew
  },
  {
    path: "/posts/:id",
    name: "posts-show",
    component: PostsShow
  },
  {
    path: "/posts/:id/edit",
    name: "posts-edit",
    component: PostsEdit
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
