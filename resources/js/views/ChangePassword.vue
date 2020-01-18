<template>
    <div>
        <AppHeader></AppHeader>
        <div class="white-container">
            <h1>Change Password</h1>
            <hr>
            <div class="col-sm-6 offset-sm-3">
                <div class="form-group">
                    <label>New Password</label>
                    <input type="text" class="form-control" v-model="password" placeholder="Your new password">
                </div>
                <div class="form-group">
                    <label>New Password</label>
                    <input type="text" class="form-control" v-model="confirmPassword" placeholder="Should match password">
                </div>

                <button v-if="isPasswordMatch" v-on:click="changePassword" class="btn btn-success">Change Password</button>
                <small v-else>**New passwords should match</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        isPasswordMatch() {
            if (
                this.password.length 
                && this.confirmPassword.length
            ) {
                return this.password.length === this.confirmPassword.length;
            }

            return false;
        }
    },
    methods: {
        changePassword() {            
            this.$store.dispatch('changePass', {password:this.password}).then( res => {
                this.$msg({text: 'Your password has been updated!'})
            })
        }
    }
}
</script>