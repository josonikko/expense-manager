import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from './store/stores'
import Vuetify, { VSnackbar } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'
import Msg from 'vue-message'

// pages
import App from './views/App'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import ExpenseManager from './views/ExpenseManager'
import UserManagement from './views/UserManagement'
import ChangePassword from './views/ChangePassword'
import CategoryManagement from './views/CategoryManagement'
import Logout from './views/Logout'

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(VueRouter)
Vue.use(Msg)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/expense-manager',
            name: 'expense-manager',
            component: ExpenseManager,
        },
        {
            path: '/user-management',
            name: 'user-management',
            component: UserManagement,
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: ChangePassword,
        },
        {
            path: '/expense-category',
            name: 'expense-category',
            component: CategoryManagement,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
        },
    ],
});

Vue.use(Donut);
Vue.use(Vuetify, {
    components: {
        VSnackbar
    }
})
  
Vue.use(VuetifyToast)

const app = new Vue({
    el: '#app',
    store: store,
    components: { App },
    router,
});