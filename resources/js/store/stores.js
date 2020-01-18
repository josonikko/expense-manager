import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store  = new Vuex.Store({
    state: {
        expenses: [],
        user: localStorage.getItem('myuser') || null,
        users: null,
        credentials: {
            grant_type: "password",
            client_id: 2,
            client_secret: "ToL1q2em2SiDiGbsylMYte0fySweLaKzDD46rk9O"
        },      
        token: localStorage.getItem('access_token') || null,
        categories: null
    },
    getters: {
        loggedIn() {
            return this.state.token !== null
        }
    },
    mutations: {
        setData(state, data) {
            this.state[data.field] = data.data;
        },
    },
    actions: {
        getIsLoggedIn() {
            return this.state.token != null;
        },
        getToken(context, credentials) {
            let formData = new FormData();
            formData.set('grant_type', this.state.credentials.grant_type);
            formData.set('client_id', this.state.credentials.client_id);
            formData.set('client_secret', this.state.credentials.client_secret);
            formData.set('username', credentials.username);
            formData.set('password', credentials.password);

            return axios.post('http://localhost:8000/oauth/token', formData).then((res) => {
                if (typeof res.data.access_token != "undefined") {
                    localStorage.setItem("access_token", res.data.access_token);
                    context.commit("setData",{ data: res.data.access_token, field: 'token'});
                }
            });
        },
        getUserDetails(context, credentials) {
            let formData = new FormData();
            formData.set('email', credentials.username);

            return axios.post('http://localhost:8000/api/user/details', formData, {
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(res => {
                if (typeof res.data != "undefined") {
                    let user = JSON.stringify(res.data[0]);
                    context.commit("setData",{ data: user, field: 'user'});
                    localStorage.setItem("myuser", user, 'user');
                }
            });
            
        },
        getExpenses(context) {
            let user = JSON.parse(this.state.user)
            return axios.get('http://localhost:8000/api/expense/' + user.id, {
                headers: { Authorization: "Bearer " + this.state.token }
            }).then( res => {
                context.commit("setData",{ data: res.data, field: 'expenses'});
            });
        },
        addExpense(context, expense) {
            let user = JSON.parse(this.state.user)
            let formData = new FormData();
            formData.set('user_id', user.id);
            formData.set('amount', expense.amount);
            formData.set('category_id', expense.category);
            formData.set('description', expense.description);

            return axios.post('http://localhost:8000/api/expense', formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            });
        },
        getCategories(context) {
            return axios.get('http://localhost:8000/api/categories/', {
                headers: { Authorization: "Bearer " + this.state.token }
            }).then( res => {
                context.commit("setData",{ data: res.data, field: 'categories'});
            });
        },
        updateExpense(context, data) {
            let user = JSON.parse(this.state.user)
            let formData = new FormData();
            formData.set('user_id', user.id);
            formData.set('amount', data.amount);
            formData.set('description', data.description);
            
            return axios.post('http://localhost:8000/api/expense/' + data.id, 
                formData,
                {
                    headers: { 
                        "Authorization": "Bearer " + this.state.token
                    }
                });
        },
        getUsers(context) {
            return axios.get('http://localhost:8000/api/user', {
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(res => {
                context.commit("setData",{ data: res.data, field: 'users'});
            });
        },
        updateUser(context, data) {
            let formData = new FormData();
            formData.set('id', data.id);
            formData.set('email', data.email);
            formData.set('name', data.name);
            formData.set('password', data.password);
            formData.set('role_id', data.role_id);

            return axios.post('http://localhost:8000/api/user/' + data.id, 
                formData,
                {
                    headers: { 
                        "Authorization": "Bearer " + this.state.token
                    }
                });
        },
        saveUser(context, data) {
            console.log(data);
            let formData = new FormData();
            formData.set('name', data.name);
            formData.set('email', data.email);
            formData.set('password', data.password);
            formData.set('role_id', data.role_id);

            return axios.post('http://localhost:8000/api/user', formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            });
        },
        changePass(context, data) {
            let formData = new FormData();
            let user = JSON.parse(this.state.user)
            formData.set('user_id', user.id);
            formData.set('password', data.password);

            return axios.post('http://localhost:8000/api/user/change-password', formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(function (res){
                let user = JSON.stringify(res.data);
                context.commit("setData",{ data: user, field: 'user'});
                localStorage.setItem("myuser", user, 'user');
            });
        },
        saveCategory(context, data) {
            let formData = new FormData();
            formData.set('name', data.name);

            return axios.post('http://localhost:8000/api/categories', formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(function (res){
                console.log(res);
            });
        },
        updateCategory(context, data) {
            let formData = new FormData();
            formData.set('name', data.name);
            formData.set('id', data.id);

            return axios.post('http://localhost:8000/api/categories/' + data.id, formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(function (res){
                console.log(res);
            });
        },
        deleteRecord(context, data) {
            let formData = new FormData();
            formData.set('id', data.id);    

            return axios.post(`http://localhost:8000/api/${data.endpoint}/delete/${data.id}`, formData,{
                headers: { Authorization: "Bearer " + this.state.token }
            }).then(function (res){
                console.log(res);
            });
        }
    }
})