import { createRouter as createVueRouter, createWebHashHistory, Router } from "vue-router";
import CEOHomeView from "../views/CEOHomeView.vue"; 
import CEOCreateView from "../views/CEOCreateView.vue"; 
import CEOActivityView from "../views/CEOActivityView.vue"; 
import CoordinatorLoginView from "../views/CoordinatorLoginView.vue"; 
import CoordinatorHomeView from "../views/CoordinatorHomeView.vue"; 
import StudentSearchView from "../views/StudentSearchView.vue"; 
import StudentRecordsView from "../views/StudentRecordsView.vue"; 
import { createAuthGuard } from "@auth0/auth0-vue";
 
import { App } from 'vue';

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "ceo-home",
        component: CEOHomeView,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/ceo-create",
        name: "ceo-create",
        component: CEOCreateView,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/ceo-activity/:activityCode",
        name: "ceo-activity",
        component: CEOActivityView,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/coordinator-login",
        name: "coordinator-login",
        component: CoordinatorLoginView, 
      },
      {
        path: "/coordinator-home/:activityCode",
        name: "coordinator-home",
        component: CoordinatorHomeView,
      },
      {
        path: "/student-search",
        name: "student-search",
        component: StudentSearchView,
      },
      {
        path: "/student-records/:studentNumber",
        name: "student-record",
        component: StudentRecordsView,
      },
 
    ],
    history: createWebHashHistory()
  })
}
