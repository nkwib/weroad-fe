import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
const HomeView = () => import('@/views/HomeView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const CreateTravelView = () => import('@/views/CreateTravelView.vue');
const CreateTourView = () => import('@/views/CreateTourView.vue');
const EditTourView = () => import('@/views/EditTourView.vue');
const EditTravelView = () => import('@/views/EditTravelView.vue');
const TravelDetail = () => import('@/views/TravelDetail.vue');
const TourDetailView = () => import('@/views/TourDetailView.vue');
const CreateUserView = () => import('@/views/CreateUserView.vue');
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/travels/new',
    name: 'newTravel',
    component: CreateTravelView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/travels/:travelId/tours/new',
    name: 'newTour',
    component: CreateTourView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/travels/:travelId/edit',
    name: 'editTravel',
    component: EditTravelView,
    meta: { requiresAuth: true, requiresEditorOrAdmin: true }
  },
  {
    path: '/travels/:travelId/tours/:tourId/edit',
    name: 'editTour',
    component: EditTourView,
    meta: { requiresAuth: true, requiresEditorOrAdmin: true }
  },
  {
    path: '/travels/:travelId',
    name: 'travelDetail',
    component: TravelDetail,
  },
  {
    path: '/travels/:travelId/tours/:tourId',
    name: 'tourDetail',
    component: TourDetailView,
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateUserView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: { template: '<div></div>' }, // This was tricky to figure out.
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      store.dispatch('logout');
      next({ name: 'home' });
    },
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresEditorOrAdmin = to.matched.some(record => record.meta.requiresEditorOrAdmin);
  const isAuthenticated = store.getters.isAuthenticated;
  const isAdmin = store.getters.isAdmin;
  const isEditor = store.getters.isEditor;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next({ name: 'home' });
  } else if (requiresEditorOrAdmin && (!isAuthenticated || (!isAdmin && !isEditor))) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
