<template>
    
    <div class="col-sm-4 offset-sm-4 white-container login-container">
        <h1 class="text-center">Expense Manager</h1>
        <hr>

        <form v-on:submit.prevent="login()">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Your Email" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Your Password" v-model="password">
            </div>
            <button class="btn btn-primary btn-block">Login</button>
        </form>
    </div>

</template>
<script>
export default {
    name : "login",
    data () {
        return {
            email: '',
            password: ''
        }   
    },
    created() {
        if (this.$store.state.token) {
            this.$router.push({ name: 'dashboard' });
        }
    },
    methods: {
        login() {
            let credentials = {
                username: this.email,
                password: this.password
            };
            
            this.$store.dispatch('getToken', credentials).then((function () {
                this.$store.dispatch('getUserDetails', credentials).then((() => {
                    this.$router.push({ name: 'dashboard' });
                }).bind(this));
            }).bind(this))
            
        }
    }
}
</script>