<template>
    <div>
        <AppHeader></AppHeader>
        <div class="white-container">

            <div class="row">
                <h1 class="col-sm-6">User Management</h1>
            </div>
            <hr>
            <h3>Add user</h3>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" v-model="email">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="role">Role</label>
                        <select v-model="role_id" class="form-control">
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-block" v-on:click="saveUser">Save user</button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <user-item v-for="user in users" :key="user.id" :user="user"></user-item>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users : null,
            // create
            role_id: 2,
            name: '',
            email: '',
            password: ''
        };
    },
    created() {
        let isAdmin = JSON.parse(this.$store.state.user).role_id === 1;
        if (!isAdmin) {
            this.$router.push({ name: 'dashboard' });
        }
        this.getUsers();
    },
    methods: {
        getUsers() {
            this.$store.dispatch('getUsers').then((function () {
                this.users = this.$store.state.users
            }).bind(this))
        },
        saveUser() {
            let data = {
                role_id: this.role_id,
                name: this.name,
                password: this.password,
                email: this.email
            };
            this.$store.dispatch('saveUser', data).then((function () {
                this.getUsers();
                this.name = '';
                this.password = '';
                this.email = '';
            }).bind(this))
        }
    }
}
</script>