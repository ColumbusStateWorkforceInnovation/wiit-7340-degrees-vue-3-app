import { createRouter, createWebHistory } from 'vue-router';
import { navigationGuard, LoginCallback } from '@okta/okta-vue';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Categories from '../views/Categories.vue';
import MenuItems from '../views/MenuItems.vue';

const parseProps = (r) => ({ id: parseInt(r.params.id, 10) });

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/login/callback', component: LoginCallback },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/items',
    name: 'MenuItems',
    component: MenuItems,
  },
  {
    path: '/edit/category/:id',
    name: 'edit-category',
    meta: {
      requiresAuth: true,
    },
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/EditCategory.vue'),
  },
  {
    path: '/edit/item/:id',
    name: 'edit-item',
    meta: {
      requiresAuth: true,
    },
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/EditMenuItems.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Due to navigation guards mixin issue in vue-router-next, navigation guard logic need to be added manually
router.beforeEach(navigationGuard);

export default router;
