import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TourAvailability from '../views/TourAvailability.vue'

/*global wpData:true*/
/*eslint no-undef: "error"*/
const appPath = `/${wpData.app_path}`;

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/tour-availability',
      name: 'Availability',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TourAvailability
    }
];

const router = new VueRouter({
  base: appPath, // path of the SPA relative to the domain.
  mode: 'hash',
  routes,
});

export default router
