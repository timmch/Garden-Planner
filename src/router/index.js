import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PlantAdd from "../views/PlantAdd.vue";
import RicksGarden from "@/views/RicksGarden.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/plants/add",
    name: "AddPlant",
    component: PlantAdd
  },
  {
    path: "/gardens/ricks",
    name: "RicksGarden",
    component: RicksGarden
  }
  // ,
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
