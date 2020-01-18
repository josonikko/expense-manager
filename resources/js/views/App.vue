<template>
    <!-- <p>
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'hello' }">Hello World</router-link>
    </p> -->
    <div class="container">
        <!-- <AppHeader></AppHeader> -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name : "login"
    }
</script>