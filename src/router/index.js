import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import ToDoList from '../views/ToDoList.vue'
import CreateToDo from '../views/CreateToDo.vue'
import ViewUpdateToDo from '../views/ViewUpdateToDo.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: HomeView,
    meta: { requiresGuest: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/todos',
    name: 'ToDoList',
    component: ToDoList,
    meta: { requiresAuth: true }
  },
  {
    path: '/todos/create',
    name: 'CreateToDo',
    component: CreateToDo,
    meta: { requiresAuth: true }
  },
  {
    path: '/todos/:id',
    name: 'ViewUpdateToDo',
    component: ViewUpdateToDo,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next('/todos')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
