<template>
    <div class="white-container">
        <div class="row">
            <h1 class="col-sm-6">Dashboard</h1>
        </div>
        <vc-donut :sections="sections" :thickness="25" hasLegend legendPlacement="right">Total Expense:{{ total }}</vc-donut>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            expenses: null,
            total: 0,
            categoryData: 0,
            sections: []
        };
    },
    created() {
        this.getExpenses();
    },
    methods: {
        getExpenses() {
            this.$store.dispatch('getExpenses').then((res => {
                this.expenses = this.$store.state.expenses
                let data = this.getDonutData();
                this.assignData();
            }).bind(this))
        },
        getDonutData(){
            const data = this.expenses;
            let categoryData = [];
            let total = 0.00;
            data.forEach(function (e) {
                if (typeof categoryData[e.category_name] == "undefined") {
                    categoryData[e.category_name] = 0;
                }
                categoryData[e.category_name] = categoryData[e.category_name]+parseFloat(e.amount);
                total += e.amount;
            })

            this.total = total.toFixed(2);
            this.categoryData = categoryData;
        },
        assignData() {
            // https://vuejsexamples.com/lightweight-vue-component-for-drawing-pure-css-donut-charts/
            let sections = [];
            for (const [key, value] of Object.entries(this.categoryData)) {
                let amount = (value/this.total)*100;
                sections.push({
                    label: `${key} : ${value.toFixed(2)}`,
                    value: amount
                });
            }
            this.sections = sections;
        }
    }
}
</script>