<template>
    <div>
        <AppHeader></AppHeader>
        <div class="white-container">
            <div class="row">
                <h1 class="col-sm-4">Expenses Manager</h1>
                <div class="col-sm-8 text-right">
                    <label>Add Expenses:</label>
                    <input type="text" v-model="description" class="form-control inline" placeholder="Description">
                    <input type="text" v-model="amount" class="form-control inline" placeholder="Amount" width="100px">
                    <select v-model="category" class="form-control inline">
                        <option v-for="cat in categories" v-bind:value="cat.id" >{{cat.name}}</option>
                    </select>
                    <button v-on:click="addExpense" class="btn btn-success">
                        Add Expense
                    </button>
                </div>
            </div>
            <hr>
            
            <div class="col-sm-12">
                <h3>Current Expenses: {{total.toFixed(2)}}</h3>
                <table class="table table-hover table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <expense-item v-for="expense in expenses" :key="expense.id" :expense="expense"></expense-item>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <b>{{ total.toFixed(2) }}</b>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            expenses: this.$store.state.expenses,
            categories: null,
            description: '',
            category: 0,
            amount: 0
        }   
    },
    created () {
        this.getCategories()
        this.getExpenseTableData();
    },
    computed: {
        total () {
            return this.expenses.reduce( (acc, xpence) => {
                return acc + xpence.amount
            }, 0)
        },
        isValid() {
            return this.amount > 0;
        }
    },
    methods: {
        getExpenseTableData() {
            this.$store.dispatch('getExpenses').then((res => {
                this.expenses =this.$store.state.expenses
            }).bind(this))
        },
        getCategories() {
            this.$store.dispatch('getCategories').then((res => {
                this.categories = this.$store.state.categories
                if (this.categories.length > 0) {
                    this.category = this.categories[0].id
                }
            }).bind(this))
        },
        addExpense() {
            let expense = {
                description: this.description,
                category: this.category,
                amount: parseFloat(this.amount)
            }

            this.$store.dispatch('addExpense', expense).then(res => {
                this.getExpenseTableData();
                this.$msg({text: res.data});
            }).catch((function (e){
                this.$msg({text: 'Invalid request!'})
            }).bind(this));
        }
    }
}
</script>