import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/threejs",
      name: "threejs",
      component: () => import("./views/threejs.vue")
    },
    {
      path: "/points",
      name: "points",
      component: () => import("./views/points.vue")
    },
    {
      path: "/move",
      name: "move",
      component: () => import("./views/move.vue")
    },
    {
      path: "/scene",
      name: "scene",
      component: () => import("./views/scene.vue")
    },
    {
      path: "/geo",
      name: "geo",
      component: () => import("./views/geometries.vue")
    },
    {
      path: "/hello",
      name: "hello",
      component: () => import("./views/helloworld.vue")
    },
    {
      path: "/line",
      name: "line",
      component: () => import("./views/line.vue")
    },
    {
      path: "/grid",
      name: "grid",
      component: () => import("./views/grid.vue")
    },
    {
      path: "/geom",
      name: "geom",
      component: () => import("./views/geometry.vue")
    },
    {
      path: "/shadow",
      name: "shadow",
      component: () => import("./views/shadow.vue")
    },
    {
      path: "/gui",
      name: "gui",
      component: () => import("./views/datagui.vue")
    },
    {
      path: "/mesh",
      name: "mesh",
      component: () => import("./views/mesh.vue")
    },
    {
      path: "/light",
      name: "light",
      component: () => import("./views/ambientlight.vue")
    },
    {
      path: "/spot",
      name: "spot",
      component: () => import("./views/spotlight.vue")
    },
    {
      path: "/fly",
      name: "fly",
      component: () => import("./views/flycamera.vue")
    },
    {
      path: "/attr",
      name: "attr",
      component: () => import("./views/meshattr.vue")
    },
    {
      path: "/shader",
      name: "shader",
      component: () => import("./views/shader.vue")
    },
    {
      path: "/sprite",
      name: "sprite",
      component: () => import("./views/sprite.vue")
    },
    {
      path: "/high",
      name: "high",
      component: () => import("./views/highgeo.vue")
    }
  ]
});
