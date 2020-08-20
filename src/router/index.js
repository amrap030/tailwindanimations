import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/training",
    name: "Training",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "training" */ "../views/Training.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/exercises",
    name: "Exercises",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "exercises" */ "../views/Exercises.vue"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue"),
  },
  {
    path: "/calculator",
    name: "Calculator",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "calculator" */ "../views/Calculator.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (hideForAuth && isAuthenticated) {
    next("/training");
  } else {
    next();
  }

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

// router.afterEach((to) => {
//   if (["home", "training"].includes(to.name)) {
//     document.body.style.backgroundColor = "#F7F7F7";
//     // or document.body.classList.add(className);
//   } else {
//     document.body.style.backgroundColor = "#FFFFFF";
//     // or document.body.classList.remove(className);
//   }
// });

export default router;
