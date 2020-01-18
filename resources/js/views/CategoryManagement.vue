<template>
    <div class="white-container">

        <div class="row">
            <h1 class="col-sm-6">Categories</h1>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-6">
                <h3>All Categories</h3>
                <table class="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <category-item v-for="cat in categories" :key="cat.id" :cat="cat"></category-item>
                    </tbody>
                </table>
            </div>
            
            <div class="col-sm-6">
                <h3>Add Category</h3>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="name" placeholder="New Category Name">
                            <br>
                            <button class="btn btn-primary btn-block" v-on:click="saveCategory">Save Category</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
export default {
    data() {
        return {
            name: '',
            categories: null
        };
    },
    created() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            this.$store.dispatch('getCategories').then((res => {
                this.categories = this.$store.state.categories
            }).bind(this))
        },
        saveCategory() {
            this.$store.dispatch('saveCategory',{
                name:this.name
            }).then((res => {
                this.getCategories();
            }).bind(this))
        }
    }
}
</script>