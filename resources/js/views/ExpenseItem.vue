<template>
    <tr>
        <td>
            <input v-if="isEditing" v-model="description" class="form-control input-xs">
            <span v-else>{{ description }}</span>
        </td>
        <td>
            {{ category }}
        </td>
        <td>{{ createdAt }}</td>
        <td>
            <input v-if="isEditing" v-model="amount" class="form-control input-xs">
            <span v-else>{{ parseFloat(amount).toFixed(2) }}</span>
        </td>
        <td>
            <div v-if="isEditing">
                <button class="btn btn-sm btn-success" v-on:click="updateExpense">
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
        expense: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            isEditing: false,
            isDeleting: false,
            description: this.expense.description,
            id: this.expense.id,
            createdAt: this.expense.created_at,
            amount: this.expense.amount,
            category: this.expense.category_name
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
        updateExpense() {
            this.toggleEdit();
            this.$store.dispatch('updateExpense', {
                id: this.id,
                amount: this.amount,
                description: this.description
            }).then(res => {
                this.$msg({text: 'Expense Updated'})
                this.$parent.getExpenseTableData()
            });
        },
        deleteItem() {
            this.$store.dispatch('deleteRecord',{
                id: this.id,
                endpoint: 'expense'
            }).then((res => {
                this.$msg({text: 'Expense removed!'})
                this.$parent.getExpenseTableData();
            }).bind(this))
        }
    }
}
</script>
