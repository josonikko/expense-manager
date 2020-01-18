<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light menu-container" v-if="isLoggedIn">
        <a class="navbar-brand" href="#">Expense Manager</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'dashboard' }">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'expense-manager' }">Expense Management</router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link class="nav-link" :to="{ name: 'user-management' }">User Management</router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link class="nav-link" :to="{ name: 'expense-category' }">Manage Categories</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'change-password' }">Change Password</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'logout' }">Logout</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            user: JSON.parse(this.$store.state.user)
        }
    },
    computed:{
        isAdmin () {
            if (typeof this.user != "undefined" && this.user != null) {
                return this.user.role_id === 1;
            }
            return false;
        },
        isLoggedIn() {
            return this.$route.path !== '/';
        }
    }
}
</script>