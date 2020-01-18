<template>
    <tr>
        <td>
            <input v-if="isEditing" v-model="name" class="form-control input-xs">
            <span v-else>{{ name }}</span>
        </td>
        <td>
            <div v-if="isEditing">
                <button class="btn btn-sm btn-success" v-on:click="saveCategoryItem">
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
        cat: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            name: this.cat.name,
            id: this.cat.id,
            isEditing: false,
            isDeleting: false,
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
        saveCategoryItem() {
            this.toggleEdit();
            this.$store.dispatch('updateCategory',{
                name:this.name,
                id: this.id
            }).then((res => {
                this.$parent.getCategories();
            }).bind(this))
        },
        deleteItem() {
            this.$store.dispatch('deleteRecord',{
                id: this.id,
                endpoint: 'categories'
            }).then((res => {
                this.$parent.getCategories();
            }).bind(this))
        }
    }
}
</script>