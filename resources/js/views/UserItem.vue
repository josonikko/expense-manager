<template>
    <tr>
        <td>
            <input v-if="isEditing" v-model="name" class="form-control input-xs">
            <span v-else>{{ name }}</span>
        </td>
        <td>
            <input v-if="isEditing" v-model="email" class="form-control input-xs">
            <span v-else>{{ email }}</span>
        </td>
        <td>
            <input v-if="isEditing" v-model="password" class="form-control input-xs">
            <span v-else>*****</span>
        </td>
        <td>
            <div v-if="isEditing">
                <select v-model="role_id" class="form-control">
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                </select>
            </div>
            <span v-else>{{ role }}</span>
        </td>
        <td>
            <div v-if="isEditing">
                <button class="btn btn-sm btn-success" v-on:click="updateUser">
                    Save
                </button> 
                <button class="btn btn-sm btn-warning" v-on:click="toggleEdit">
                    Cancel
                </button>  
            </div>
            <div v-else>
                <button class="btn btn-sm btn-info" v-on:click="toggleEdit">
                    Edit
                </button>   

                <div v-if="isDeleting">
                    <button class="btn btn-sm btn-danger" v-on:click="deleteItem">
                        Confirm Delete
                    </button>  
                    <button class="btn btn-sm btn-warning" v-on:click="toggleDelete">
                        Cancel
                    </button>  
                </div>
                <button v-else v-on:click="toggleDelete" class="btn btn-sm btn-danger">
                    Delete
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props : {
        user: {
            type: Object,
            required: true,
        }
    },
    computed: {
        role () {
            let roles = {
                1: "Admin",
                2: "User"
            };
            return roles[this.user.role_id]
        }
    },
    data () {
        return {
            isEditing: false,
            isDeleting: false,
            password: '',
            name: this.user.name,
            id: this.user.id,
            email: this.user.email,
            role_id: this.user.role_id
        }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;
            this.isDeleting = false;
        },  
        toggleDelete() {
            this.isEditing = false;
            this.isDeleting = !this.isDeleting;
        },
        updateUser() {
            this.toggleEdit();
            this.$store.dispatch('updateUser', {
                id: this.id,
                role_id: this.role_id,
                email: this.email,
                name: this.name,
                password: this.password
            }).then(res => {
                this.$parent.getUsers()
            });
        },
        deleteItem() {
            this.$store.dispatch('deleteRecord',{
                id: this.id,
                endpoint: 'user'
            }).then((res => {
                this.$parent.getUsers();
            }).bind(this))
        }
    }
}
</script>
