import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../components/Home.vue";
import MovieCreation from "../components/MovieCreation.vue";
import Movie from "../components/Movie.vue";

Vue.use(VueRouter);
const routes = [
  { path: "/", name: "Home", component: Home, props: true },
  {
    path: "/Admin",
    name: "Admin",
    component: MovieCreation,
    props: true,
  },

  {
    path: "/Movie/:id",
    name: "Movie",
    component: Movie,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
