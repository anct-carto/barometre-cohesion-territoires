import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/facteur-cohesion/:cohesionFactorSlug",
    name: "CohesionFactorDetail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "CohesionFactorDetail" */ "../views/CohesionFactorDetail"
      ),
  },
  {
    path: "/facteur-cohesion/:cohesionFactorSlug/:statisticalIndicatorId",
    name: "StatisticalIndicatorDetail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "StatisticalIndicatorDetail" */ "../views/StatisticalIndicatorDetail"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
